import type {
    AdoptServerResult,
    ConfirmResult,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../../host/chat-data-store.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import { projectBalances } from '../../../domains/economy/ledger.js';
import type { TaskCandidateDraft, TaskDomainV1, TaskListingDraft, TaskPublishedForm, TaskRecord } from '../../../domains/tasks/types.js';
import { collectTaskIdentityIds } from '../../../domains/tasks/invariants.js';
import { projectTaskRecords } from '../../../domains/tasks/projection.js';
import { createTaskIdFactory, type TaskIdFactory } from './ids.js';
import { createTaskLocalActions } from './local-actions.js';
import { createTaskMaintenanceCommit } from './maintenance-commit.js';
import {
    readTaskDomain,
    readTaskEconomyLedger,
    validateTaskEconomyConsistency,
} from './root-protocol.js';

export type CommitGuard = () => boolean | Promise<boolean>;

export interface TasksServiceView {
    domain: TaskDomainV1 | null;
    records: TaskRecord[];
    playerBalance: number;
    writeState: XiaobaiOsWriteState;
}

export interface TasksActionResult {
    changed: boolean;
    record?: TaskRecord;
    view: TasksServiceView;
}

export interface AcceptListingRequest {
    actionId: string;
    boardId: string;
    listingId: string;
}

export interface PublishRequest {
    actionId: string;
    form: TaskPublishedForm;
}

export interface ReplaceBoardRequest {
    expectedBoardId: string | null;
    listings: readonly TaskListingDraft[];
    generatedAt: number;
}

export interface ReplaceCandidatesRequest {
    actionId: string;
    taskId: string;
    expectedTaskRevision: number;
    expectedEventId: string;
    candidates: readonly TaskCandidateDraft[];
    observedAssistantCount: number;
}

export interface AssignCandidateRequest {
    actionId: string;
    taskId: string;
    expectedTaskRevision: number;
    expectedEventId: string;
    candidateId: string;
}

export interface CancelTaskRequest {
    actionId: string;
    taskId: string;
    expectedTaskRevision: number;
    expectedEventId: string;
}

interface TaskMaintenanceCommandBase {
    actionId: string;
    taskId: string;
    expectedTaskRevision: number;
    expectedEventId: string;
}

export type TaskMaintenanceCommand =
    | (TaskMaintenanceCommandBase & { kind: 'progress'; progressSummary: string })
    | (TaskMaintenanceCommandBase & { kind: 'complete'; resultSummary: string })
    | (TaskMaintenanceCommandBase & { kind: 'fail'; resultSummary: string });

export interface MaintenanceCommitRequest {
    commands: readonly TaskMaintenanceCommand[];
    observedAssistantCount: number;
}

export interface TasksService {
    readCurrent: () => TasksServiceView;
    createActionId: () => string;
    acceptListing: (input: AcceptListingRequest, guard: CommitGuard) => Promise<TasksActionResult>;
    publish: (input: PublishRequest, guard: CommitGuard) => Promise<TasksActionResult>;
    replaceCandidates: (input: ReplaceCandidatesRequest, guard: CommitGuard) => Promise<TasksActionResult>;
    assignCandidate: (input: AssignCandidateRequest, guard: CommitGuard) => Promise<TasksActionResult>;
    cancel: (input: CancelTaskRequest, guard: CommitGuard) => Promise<TasksActionResult>;
    replaceBoard: (input: ReplaceBoardRequest, guard: CommitGuard) => Promise<TasksActionResult>;
    commitMaintenance: (input: MaintenanceCommitRequest, guard: CommitGuard) => Promise<TasksActionResult>;
    getWriteState: () => XiaobaiOsWriteState;
    confirmPending: () => Promise<ConfirmResult>;
    adoptServerState: () => Promise<AdoptServerResult>;
}

interface TasksServiceDependencies {
    now?: () => number;
    ids?: TaskIdFactory;
    createTransactionId?: () => string;
    getPlayerDisplayName?: (identityKey: string) => string;
    getObservedAssistantCount?: (identityKey: string) => number;
}

export interface TaskApplicationContext {
    store: XiaobaiOsChatDataStore;
    now: () => number;
    ids: TaskIdFactory;
    economyDependencies: { now: () => number; createId?: () => string };
    getPlayerDisplayName: (identityKey: string) => string;
    getObservedAssistantCount: (identityKey: string) => number;
    buildView: (root: XiaobaiOsChatData) => TasksServiceView;
}

export function createTasksService(
    store: XiaobaiOsChatDataStore,
    {
        now = Date.now,
        ids = createTaskIdFactory({ now }),
        createTransactionId,
        getPlayerDisplayName = () => '玩家',
        getObservedAssistantCount = () => 0,
    }: TasksServiceDependencies = {},
): TasksService {
    function buildView(root: XiaobaiOsChatData): TasksServiceView {
        validateTaskEconomyConsistency(root);
        const domain = readTaskDomain(root);
        const ledger = readTaskEconomyLedger(root);
        return {
            domain,
            records: domain ? projectTaskRecords(domain) : [],
            playerBalance: ledger ? projectBalances(ledger).player ?? 0 : 0,
            writeState: store.getWriteState(),
        };
    }

    const context: TaskApplicationContext = {
        store,
        now,
        ids,
        economyDependencies: { now, ...(createTransactionId ? { createId: createTransactionId } : {}) },
        getPlayerDisplayName,
        getObservedAssistantCount,
        buildView,
    };
    const localActions = createTaskLocalActions(context);

    function readCurrent(): TasksServiceView {
        const root = store.readCurrent();
        if (!root) {
            return { domain: null, records: [], playerBalance: 0, writeState: store.getWriteState() };
        }
        return buildView(root);
    }

    function createActionId(): string {
        const domain = readTaskDomain(store.readCurrent());
        return ids.create('action', domain ? collectTaskIdentityIds(domain) : new Set());
    }

    return Object.freeze({
        readCurrent,
        createActionId,
        ...localActions,
        commitMaintenance: createTaskMaintenanceCommit(context),
        getWriteState: store.getWriteState,
        confirmPending: store.confirmPending,
        adoptServerState: store.adoptServerState,
    });
}
