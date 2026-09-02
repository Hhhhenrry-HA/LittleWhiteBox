import { postAction } from '../../../domains/economy/ledger.js';
import { completeTask, failTask, progressTask } from '../../../domains/tasks/commands/maintenance.js';
import type { TaskCommandResult } from '../../../domains/tasks/types.js';
import type {
    CommitGuard,
    MaintenanceCommitRequest,
    TaskApplicationContext,
    TaskMaintenanceCommand,
    TasksActionResult,
} from './service.js';
import { assertTaskCommitGuard, taskEnvironment } from './local-actions.js';
import {
    buildTaskTransactionForRecord,
    installPreparedTaskRoot,
    prepareTaskRoot,
} from './root-protocol.js';

function applyCommand(
    context: TaskApplicationContext,
    domain: ReturnType<typeof prepareTaskRoot>['domain'],
    command: TaskMaintenanceCommand,
    observedAssistantCount: number,
): TaskCommandResult {
    const common = {
        actionId: command.actionId,
        taskId: command.taskId,
        expectedTaskRevision: command.expectedTaskRevision,
        expectedEventId: command.expectedEventId,
        observedAssistantCount,
    };
    const environment = taskEnvironment(context, domain);
    if (command.kind === 'progress') {
        return progressTask(domain, { ...common, progressSummary: command.progressSummary }, environment);
    }
    if (command.kind === 'complete') {
        return completeTask(domain, { ...common, resultSummary: command.resultSummary }, environment);
    }
    return failTask(domain, { ...common, resultSummary: command.resultSummary }, environment);
}

export function createTaskMaintenanceCommit(context: TaskApplicationContext) {
    return async function commitMaintenance(
        input: MaintenanceCommitRequest,
        guard: CommitGuard,
    ): Promise<TasksActionResult> {
        await assertTaskCommitGuard(guard);
        if (!Array.isArray(input.commands) || input.commands.length === 0) {
            return Promise.reject(new TypeError('task maintenance commit requires staged commands'));
        }
        if (new Set(input.commands.map(command => command.taskId)).size !== input.commands.length) {
            return Promise.reject(new TypeError('task maintenance commit contains duplicate tasks'));
        }
        return context.store.mutateCurrent(current => {
            const prepared = prepareTaskRoot(current);
            const initialRevision = prepared.domain.revision;
            let domain = prepared.domain;
            let ledger = prepared.ledger;
            let changed = false;
            let lastRecord: TaskCommandResult['record'] | undefined;
            for (const staged of input.commands) {
                const command = applyCommand(context, domain, staged, input.observedAssistantCount);
                domain = command.domain;
                lastRecord = command.record;
                changed ||= command.changed;
                if (command.changed && command.event) {
                    const transaction = buildTaskTransactionForRecord(command.event, command.record);
                    if (transaction) {
                        ledger = postAction(ledger, [transaction], context.economyDependencies).ledger;
                    }
                }
            }
            domain = {
                ...domain,
                revision: initialRevision + (changed ? 1 : 0),
            };
            const root = installPreparedTaskRoot(prepared, domain, ledger);
            const result: TasksActionResult = {
                changed,
                ...(lastRecord ? { record: structuredClone(lastRecord) } : {}),
                view: context.buildView(root),
            };
            return { next: root, result };
        }, { beforeCommit: () => assertTaskCommitGuard(guard) });
    };
}
