import { postAction } from '../../../domains/economy/ledger.js';
import {
    collectTaskIdentityIds,
    normalizeTaskActionId,
    normalizeTaskCandidates,
    sameTaskValue,
} from '../../../domains/tasks/invariants.js';
import { acceptTaskListing, publishTask, replaceTaskBoard } from '../../../domains/tasks/commands/create.js';
import { assignTaskCandidate, cancelTask, replaceTaskCandidates } from '../../../domains/tasks/commands/recruitment.js';
import type { TaskCandidate, TaskCandidateDraft, TaskCommandResult, TaskDomainV1, TaskRecord } from '../../../domains/tasks/types.js';
import type {
    AcceptListingRequest,
    AssignCandidateRequest,
    CancelTaskRequest,
    CommitGuard,
    PublishRequest,
    ReplaceBoardRequest,
    ReplaceCandidatesRequest,
    TaskApplicationContext,
    TasksActionResult,
} from './service.js';
import {
    buildTaskTransactionForRecord,
    installPreparedTaskRoot,
    prepareTaskRoot,
} from './root-protocol.js';

export async function assertTaskCommitGuard(guard: CommitGuard): Promise<void> {
    if (typeof guard !== 'function' || await guard() !== true) {throw new Error('tasks_commit_guard_failed');}
}

export function taskEnvironment(context: TaskApplicationContext, domain: TaskDomainV1) {
    const occupied = collectTaskIdentityIds(domain);
    return {
        now: context.now,
        createId: () => context.ids.create('event', occupied),
    };
}

function resultFor(
    context: TaskApplicationContext,
    root: Parameters<TaskApplicationContext['buildView']>[0],
    changed: boolean,
    record?: TaskRecord,
): TasksActionResult {
    return {
        changed,
        ...(record ? { record: structuredClone(record) } : {}),
        view: context.buildView(root),
    };
}

function commitCommand(
    context: TaskApplicationContext,
    prepared: ReturnType<typeof prepareTaskRoot>,
    command: TaskCommandResult,
): { root: ReturnType<typeof installPreparedTaskRoot>; result: TasksActionResult } {
    let ledger = prepared.ledger;
    if (command.changed && command.event) {
        const transaction = buildTaskTransactionForRecord(command.event, command.record);
        if (transaction) {
            ledger = postAction(ledger, [transaction], context.economyDependencies).ledger;
        }
    }
    const root = installPreparedTaskRoot(prepared, command.domain, ledger);
    return { root, result: resultFor(context, root, command.changed, command.record) };
}

function normalizeCandidateDrafts(
    drafts: readonly TaskCandidateDraft[],
    createCandidateId: (index: number) => string,
): TaskCandidate[] {
    if (!Array.isArray(drafts)) {return normalizeTaskCandidates(drafts);}
    return normalizeTaskCandidates(drafts.map((draft, index) => ({
        ...structuredClone(draft),
        candidateId: createCandidateId(index),
    })));
}

function candidateFacts(candidate: TaskCandidate): TaskCandidateDraft {
    const { candidateId: _candidateId, ...draft } = candidate;
    return draft;
}

export function createTaskLocalActions(context: TaskApplicationContext) {
    async function execute(
        guard: CommitGuard,
        mutate: (
            prepared: ReturnType<typeof prepareTaskRoot>,
            identityKey: string,
        ) => { root: ReturnType<typeof installPreparedTaskRoot>; result: TasksActionResult },
    ): Promise<TasksActionResult> {
        await assertTaskCommitGuard(guard);
        return context.store.mutateCurrent((current, rootContext) => {
            const prepared = prepareTaskRoot(current);
            const outcome = mutate(prepared, rootContext.identityKey);
            return { next: outcome.root, result: outcome.result };
        }, { beforeCommit: () => assertTaskCommitGuard(guard) });
    }

    function acceptListing(input: AcceptListingRequest, guard: CommitGuard): Promise<TasksActionResult> {
        return execute(guard, (prepared, identityKey) => {
            const actionId = normalizeTaskActionId(input.actionId);
            const existing = prepared.domain.events.find(event => event.actionId === actionId);
            const occupied = collectTaskIdentityIds(prepared.domain);
            occupied.add(actionId);
            const taskId = existing?.taskId ?? context.ids.create('task', occupied);
            const command = acceptTaskListing(prepared.domain, {
                actionId,
                taskId,
                boardId: input.boardId,
                listingId: input.listingId,
                playerDisplayName: context.getPlayerDisplayName(identityKey),
                observedAssistantCount: context.getObservedAssistantCount(identityKey),
            }, taskEnvironment(context, prepared.domain));
            return commitCommand(context, prepared, command);
        });
    }

    function publish(input: PublishRequest, guard: CommitGuard): Promise<TasksActionResult> {
        return execute(guard, (prepared, identityKey) => {
            const actionId = normalizeTaskActionId(input.actionId);
            const existing = prepared.domain.events.find(event => event.actionId === actionId);
            const occupied = collectTaskIdentityIds(prepared.domain);
            occupied.add(actionId);
            const taskId = existing?.taskId ?? context.ids.create('task', occupied);
            const command = publishTask(prepared.domain, {
                actionId,
                taskId,
                form: input.form,
                playerDisplayName: context.getPlayerDisplayName(identityKey),
                observedAssistantCount: context.getObservedAssistantCount(identityKey),
            }, taskEnvironment(context, prepared.domain));
            return commitCommand(context, prepared, command);
        });
    }

    function replaceBoard(input: ReplaceBoardRequest, guard: CommitGuard): Promise<TasksActionResult> {
        return execute(guard, prepared => {
            const occupied = collectTaskIdentityIds(prepared.domain);
            const boardId = context.ids.create('board', occupied);
            const listings = input.listings.map(draft => ({
                ...structuredClone(draft),
                listingId: context.ids.create('listing', occupied),
            }));
            const replaced = replaceTaskBoard(prepared.domain, {
                expectedBoardId: input.expectedBoardId,
                boardId,
                listings,
                generatedAt: input.generatedAt,
            });
            const root = installPreparedTaskRoot(prepared, replaced.domain, prepared.ledger);
            return { root, result: resultFor(context, root, true) };
        });
    }

    function replaceCandidates(input: ReplaceCandidatesRequest, guard: CommitGuard): Promise<TasksActionResult> {
        return execute(guard, prepared => {
            const actionId = normalizeTaskActionId(input.actionId);
            const existing = prepared.domain.events.find(event => event.actionId === actionId);
            let candidates: TaskCandidate[];
            if (existing?.kind === 'candidates-replaced') {
                candidates = normalizeCandidateDrafts(input.candidates, index => (
                    existing.candidates[index]?.candidateId ?? `task-candidate-replay-${index}`
                ));
                if (!sameTaskValue(candidates.map(candidateFacts), existing.candidates.map(candidateFacts))) {
                    candidates = candidates.map((candidate, index) => ({
                        ...candidate,
                        candidateId: existing.candidates[index]?.candidateId ?? candidate.candidateId,
                    }));
                }
            } else {
                const occupied = collectTaskIdentityIds(prepared.domain);
                occupied.add(actionId);
                candidates = normalizeCandidateDrafts(input.candidates, () => context.ids.create('candidate', occupied));
            }
            const command = replaceTaskCandidates(prepared.domain, { ...input, actionId, candidates },
                taskEnvironment(context, prepared.domain));
            return commitCommand(context, prepared, command);
        });
    }

    function assignCandidate(input: AssignCandidateRequest, guard: CommitGuard): Promise<TasksActionResult> {
        return execute(guard, (prepared, identityKey) => {
            const command = assignTaskCandidate(prepared.domain, {
                ...input,
                observedAssistantCount: context.getObservedAssistantCount(identityKey),
            }, taskEnvironment(context, prepared.domain));
            return commitCommand(context, prepared, command);
        });
    }

    function cancel(input: CancelTaskRequest, guard: CommitGuard): Promise<TasksActionResult> {
        return execute(guard, (prepared, identityKey) => {
            const command = cancelTask(prepared.domain, {
                ...input,
                observedAssistantCount: context.getObservedAssistantCount(identityKey),
            }, taskEnvironment(context, prepared.domain));
            return commitCommand(context, prepared, command);
        });
    }

    return Object.freeze({ acceptListing, publish, replaceBoard, replaceCandidates, assignCandidate, cancel });
}
