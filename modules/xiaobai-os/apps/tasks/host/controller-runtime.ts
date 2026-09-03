import { normalizeTaskPublishedForm } from '../../../domains/tasks/invariants.js';
import type { TaskPublishedForm } from '../../../domains/tasks/types.js';
import type { XiaobaiOsHostFrameMessage } from '../../../host/frame-bridge.js';
import type { MaintenanceRunOutcome, MaintenanceRunner } from '../../../capabilities/maintenance/runner.js';
import type { EconomyReadCapability } from '../../../capabilities/economy/index.js';
import type { XiaobaiOsSettingsRepository } from '../../../host/settings-repository.js';
import type {
    XiaobaiOsAppActivationContext,
    XiaobaiOsAppRuntime,
    XiaobaiOsChatIdentity,
} from '../../../types.js';
import type { TasksService, TasksServiceView } from '../application/service.js';
import type { TaskGenerationRequests, TaskGenerationRequestResult } from '../generation/request.js';
import type { BoardCompileResult, CandidateCompileResult } from '../generation/types.js';
import type { TasksPresentation, TasksSettings } from '../types.js';
import { presentTaskDetail, presentTaskHistory, presentTasksState } from './presentation.js';

type UnknownRecord = Record<string, unknown>;

interface TaskActivation {
    chatIdentity: string;
    post: XiaobaiOsAppActivationContext['post'];
}

type TaskControllerService = Pick<TasksService,
    | 'readCurrent'
    | 'createActionId'
    | 'acceptListing'
    | 'publish'
    | 'assignCandidate'
    | 'cancel'
    | 'getWriteState'
> & {
    confirmPending(): Promise<{ status: string }>;
    adoptServerState(): Promise<{ status: string }>;
};

export interface TaskControllerRuntimeDependencies {
    tasks: TaskControllerService;
    economy: EconomyReadCapability;
    generation: TaskGenerationRequests;
    settings: Pick<XiaobaiOsSettingsRepository, 'read' | 'setTasksAutoMaintenance' | 'subscribe'>;
    maintenance: Pick<MaintenanceRunner, 'runManual' | 'cancelForeground' | 'getStatus' | 'subscribeStatus'>;
    getChatIdentity: () => XiaobaiOsChatIdentity | { key?: unknown } | string | null;
    isMainGenerationActive: () => boolean;
    subscribeGeneration: (listener: (active: boolean) => void) => () => void;
    subscribeData: (listener: () => void) => () => void;
    schedule?: (task: () => void | Promise<void>) => void;
    report?: (error: unknown) => void;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity: ReturnType<TaskControllerRuntimeDependencies['getChatIdentity']>): string {
    return typeof identity === 'string' ? identity : String(identity?.key || '');
}

function requireId(value: unknown, code: string): string {
    const id = typeof value === 'string' ? value : '';
    if (!id || id !== id.trim() || Array.from(id).length > 160 || /[\u0000-\u001f\u007f-\u009f]/u.test(id)) {
        throw new Error(code);
    }
    return id;
}

function requireTaskCas(payload: UnknownRecord): {
    taskId: string;
    expectedTaskRevision: number;
    expectedEventId: string;
} {
    const revision = payload.expectedTaskRevision;
    if (!Number.isSafeInteger(revision) || Number(revision) < 1) {throw new Error('tasks_request_invalid');}
    return {
        taskId: requireId(payload.taskId, 'tasks_request_invalid'),
        expectedTaskRevision: Number(revision),
        expectedEventId: requireId(payload.expectedEventId, 'tasks_request_invalid'),
    };
}

function publicError(error: unknown): Error {
    const code = isRecord(error) && typeof error.code === 'string' ? error.code : '';
    if (code === 'economy_insufficient_funds') {return new Error('tasks_insufficient_funds');}
    if (code === 'SAVE_UNCONFIRMED' || code === 'storage_unconfirmed') {return new Error('tasks_save_unconfirmed');}
    if (code === 'SAVE_CONFLICT' || code === 'storage_conflict') {return new Error('tasks_save_conflict');}
    if (code === 'CHAT_CHANGED' || code === 'chat_changed') {return new Error('tasks_chat_changed');}
    if (code === 'task_listing_already_accepted') {return new Error('tasks_listing_already_accepted');}
    if (code === 'task_terminal') {return new Error('tasks_terminal');}
    if (code.startsWith('task_')) {return new Error('tasks_state_changed');}
    const message = error instanceof Error ? error.message : '';
    if (message === 'tasks_commit_guard_failed') {return new Error('tasks_state_changed');}
    return new Error('tasks_operation_failed');
}

function boardOutcome(result: TaskGenerationRequestResult<BoardCompileResult>): {
    status: typeof result.status;
    changed: boolean;
    count: number;
    message: string;
} {
    const count = result.compile?.data?.listings.length ?? 0;
    const message = result.status === 'cancelled'
        ? '已取消'
        : result.status === 'failed'
            ? '刷新失败'
            : result.status === 'partial'
                ? `已刷新 ${count} 项，部分结果不可用`
                : `已刷新 ${count} 项`;
    return { status: result.status, changed: result.changed, count, message };
}

function candidateOutcome(result: TaskGenerationRequestResult<CandidateCompileResult>): {
    status: typeof result.status;
    changed: boolean;
    count: number;
    message: string;
} {
    const count = result.compile?.data?.candidates.length ?? 0;
    let message = '招募失败';
    if (result.status === 'cancelled') {message = '已取消';}
    else if (result.status === 'unchanged') {message = count ? '候选名单无变化' : '暂无人应征';}
    else if (result.status === 'partial') {message = '部分候选资料不可用';}
    else if (result.status === 'updated') {message = count ? `找到 ${count} 名候选人` : '暂无人应征';}
    return { status: result.status, changed: result.changed, count, message };
}

function maintenanceMessage(outcome: MaintenanceRunOutcome): string {
    if (outcome.status === 'updated') {return '任务已更新';}
    if (outcome.status === 'unchanged') {return '无需更新';}
    if (outcome.status === 'partial') {return '部分任务状态已保存';}
    if (outcome.status === 'cancelled') {return '已取消';}
    if (outcome.status === 'skipped') {return '当前没有需要更新的任务进展';}
    return '任务更新失败';
}

export function createTaskControllerRuntime({
    tasks,
    economy,
    generation,
    settings,
    maintenance,
    getChatIdentity,
    isMainGenerationActive,
    subscribeGeneration,
    subscribeData,
    schedule = task => { globalThis.setTimeout(() => { void task(); }, 0); },
    report = error => console.error('[LittleWhiteBox] Tasks controller failed', error),
}: TaskControllerRuntimeDependencies): XiaobaiOsAppRuntime & {
    activate: NonNullable<XiaobaiOsAppRuntime['activate']>;
    handleMessage: NonNullable<XiaobaiOsAppRuntime['handleMessage']>;
} {
    let activation: TaskActivation | null = null;
    let preparation: { activation: TaskActivation; error: string } | null = null;
    let localWriteBusy = false;
    let boardGeneration = 0;
    let candidateGeneration = 0;
    let boardGenerating = false;
    let candidateGenerating = false;
    let unsubscribeData: (() => void) | null = null;
    let unsubscribeGeneration: (() => void) | null = null;
    let unsubscribeSettings: (() => void) | null = null;
    let unsubscribeMaintenance: (() => void) | null = null;

    const currentChatIdentity = () => identityKey(getChatIdentity());

    function assertActivation(payload: UnknownRecord = {}): TaskActivation {
        if (!activation) {throw new Error('tasks_app_inactive');}
        const current = currentChatIdentity();
        if (!current || current !== activation.chatIdentity || String(payload.chatIdentity || '') !== current) {
            throw new Error('tasks_chat_changed');
        }
        return activation;
    }

    function assertSameActivation(expected: TaskActivation, payload: UnknownRecord): void {
        if (assertActivation(payload) !== expected) {throw new Error('tasks_page_changed');}
    }

    function serviceView(): TasksServiceView {
        if (economy.isOpen()) {return tasks.readCurrent();}
        return {
            domain: null,
            records: [],
            playerBalance: 0,
            writeState: tasks.getWriteState(),
        };
    }

    function taskSettings(): TasksSettings {
        return settings.read()?.apps.tasks ?? { autoMaintenance: false };
    }

    function buildState(chatIdentity: string): TasksPresentation {
        const state = presentTasksState({
            chatIdentity,
            serviceView: serviceView(),
            settings: taskSettings(),
            economyReady: economy.isOpen(),
            generationActive: isMainGenerationActive() || boardGenerating || candidateGenerating,
            maintenanceStatus: maintenance.getStatus('tasks'),
        });
        if (!preparation || preparation.activation !== activation) {return state;}
        if (preparation.error) {return { ...state, status: 'blocked', message: preparation.error };}
        if (state.status === 'unconfirmed' || state.status === 'conflict') {return state;}
        return { ...state, status: 'loading', message: '' };
    }

    function emitState(current = activation): TasksPresentation {
        if (!current) {throw new Error('tasks_app_inactive');}
        const state = buildState(current.chatIdentity);
        current.post('tasks/state', { state });
        return state;
    }

    function emitCurrentState(): void {
        const current = activation;
        if (!current || currentChatIdentity() !== current.chatIdentity) {return;}
        try {emitState(current);} catch (error) {
            report(error);
            current.post('tasks/error', { code: 'tasks_state_unavailable' });
        }
    }

    function schedulePreparation(current: TaskActivation): void {
        const pending = { activation: current, error: '' };
        preparation = pending;
        schedule(() => {
            if (preparation !== pending || activation !== current || currentChatIdentity() !== current.chatIdentity) {return;}
            void economy.ensureOpen().then(() => {
                if (preparation !== pending || activation !== current || currentChatIdentity() !== current.chatIdentity) {return;}
                preparation = null;
                emitState(current);
            }).catch((error) => {
                if (preparation !== pending || activation !== current || currentChatIdentity() !== current.chatIdentity) {return;}
                report(error);
                preparation = { activation: current, error: '任务数据暂时无法读取，请稍后重试。' };
                emitState(current);
            });
        });
    }

    function commitGuard(current: TaskActivation): boolean {
        return activation === current
            && currentChatIdentity() === current.chatIdentity
            && !isMainGenerationActive()
            && tasks.getWriteState() === 'ready';
    }

    function assertWritable(current: TaskActivation): void {
        if (localWriteBusy) {throw new Error('tasks_operation_busy');}
        if (boardGenerating || candidateGenerating || isMainGenerationActive()) {throw new Error('tasks_generation_active');}
        if (tasks.getWriteState() !== 'ready') {throw new Error('tasks_write_blocked');}
        if (!economy.isOpen() || activation !== current || currentChatIdentity() !== current.chatIdentity) {
            throw new Error('tasks_state_unavailable');
        }
    }

    async function runLocal<T>(
        current: TaskActivation,
        payload: UnknownRecord,
        command: (actionId: string) => Promise<T>,
    ): Promise<{ result: T; state: TasksPresentation }> {
        assertWritable(current);
        localWriteBusy = true;
        const actionId = tasks.createActionId();
        try {
            const result = await command(actionId);
            assertSameActivation(current, payload);
            return { result, state: emitState(current) };
        } catch (error) {
            report(error);
            if (activation === current && currentChatIdentity() === current.chatIdentity) {emitCurrentState();}
            throw publicError(error);
        } finally {
            if (activation === current) {localWriteBusy = false;}
        }
    }

    async function runBoardGeneration(current: TaskActivation, payload: UnknownRecord) {
        assertWritable(current);
        const token = ++boardGeneration;
        boardGenerating = true;
        emitState(current);
        try {
            const result = await generation.refreshBoard();
            assertSameActivation(current, payload);
            return { outcome: boardOutcome(result), state: emitState(current) };
        } catch (error) {
            assertSameActivation(current, payload);
            report(error);
            return { outcome: { status: 'failed', changed: false, count: 0, message: '刷新失败' }, state: emitState(current) };
        } finally {
            if (token === boardGeneration) {
                boardGenerating = false;
                if (activation === current) {emitCurrentState();}
            }
        }
    }

    async function runCandidateGeneration(current: TaskActivation, payload: UnknownRecord) {
        assertWritable(current);
        const input = requireTaskCas(payload);
        const token = ++candidateGeneration;
        candidateGenerating = true;
        emitState(current);
        try {
            const result = await generation.refreshCandidates(input);
            assertSameActivation(current, payload);
            return { outcome: candidateOutcome(result), state: emitState(current) };
        } catch (error) {
            assertSameActivation(current, payload);
            report(error);
            return { outcome: { status: 'failed', changed: false, count: 0, message: '招募失败' }, state: emitState(current) };
        } finally {
            if (token === candidateGeneration) {
                candidateGenerating = false;
                if (activation === current) {emitCurrentState();}
            }
        }
    }

    function activate(context: XiaobaiOsAppActivationContext): TasksPresentation {
        cancelForeground('app-reactivated');
        const chatIdentity = currentChatIdentity();
        if (!chatIdentity) {throw new Error('tasks_chat_unavailable');}
        const current = { chatIdentity, post: context.post };
        activation = current;
        if (!economy.isOpen()) {schedulePreparation(current);}
        return buildState(chatIdentity);
    }

    function cancelGeneration(reason: string): void {
        boardGeneration += 1;
        candidateGeneration += 1;
        boardGenerating = false;
        candidateGenerating = false;
        generation.cancelAll(reason);
    }

    function cancelForeground(reason = 'route-left'): void {
        activation = null;
        preparation = null;
        localWriteBusy = false;
        cancelGeneration(reason);
        maintenance.cancelForeground('tasks', reason);
    }

    async function handleMessage(message: XiaobaiOsHostFrameMessage): Promise<unknown> {
        const payload = isRecord(message.payload) ? message.payload : {};
        const current = assertActivation(payload);
        if (message.type === 'tasks/activate') {
            const page = typeof payload.page === 'string' ? payload.page : '';
            if (page !== 'board') {
                boardGeneration += 1;
                boardGenerating = false;
                generation.cancelBoard('route-left');
            }
            if (page !== 'published' && page !== 'detail') {
                candidateGeneration += 1;
                candidateGenerating = false;
                generation.cancelCandidates('route-left');
            }
            return emitState(current);
        }
        if (message.type === 'tasks/detail/read') {
            return presentTaskDetail(serviceView(), requireId(payload.taskId, 'tasks_request_invalid'));
        }
        if (message.type === 'tasks/history/load-more') {
            const cursor = requireId(payload.cursor, 'tasks_history_cursor_invalid');
            return presentTaskHistory(serviceView().records, cursor);
        }
        if (message.type === 'tasks/refresh') {return runBoardGeneration(current, payload);}
        if (message.type === 'tasks/candidates/refresh') {return runCandidateGeneration(current, payload);}
        if (message.type === 'tasks/board/accept') {
            const boardId = requireId(payload.boardId, 'tasks_request_invalid');
            const listingId = requireId(payload.listingId, 'tasks_request_invalid');
            return runLocal(current, payload, actionId => tasks.acceptListing(
                { actionId, boardId, listingId },
                () => commitGuard(current),
            ));
        }
        if (message.type === 'tasks/publish') {
            let form: TaskPublishedForm;
            try {form = normalizeTaskPublishedForm(payload.form);} catch {throw new Error('tasks_publish_invalid');}
            return runLocal(current, payload, actionId => tasks.publish(
                { actionId, form },
                () => commitGuard(current),
            ));
        }
        if (message.type === 'tasks/candidates/assign') {
            const cas = requireTaskCas(payload);
            const candidateId = requireId(payload.candidateId, 'tasks_request_invalid');
            return runLocal(current, payload, actionId => tasks.assignCandidate(
                { actionId, ...cas, candidateId },
                () => commitGuard(current),
            ));
        }
        if (message.type === 'tasks/cancel') {
            const cas = requireTaskCas(payload);
            return runLocal(current, payload, actionId => tasks.cancel(
                { actionId, ...cas },
                () => commitGuard(current),
            ));
        }
        if (message.type === 'tasks/settings/update') {
            if (typeof payload.autoMaintenance !== 'boolean') {throw new Error('tasks_request_invalid');}
            await settings.setTasksAutoMaintenance(payload.autoMaintenance);
            assertSameActivation(current, payload);
            return emitState(current);
        }
        if (message.type === 'tasks/maintenance/run') {
            assertWritable(current);
            maintenance.cancelForeground('tasks', 'replaced');
            const outcome = await maintenance.runManual('tasks');
            assertSameActivation(current, payload);
            return { outcome: outcome.status, message: maintenanceMessage(outcome), state: emitState(current) };
        }
        if (message.type === 'tasks/save/confirm') {
            const confirmation = await tasks.confirmPending();
            assertSameActivation(current, payload);
            return { confirmation: confirmation.status, state: emitState(current) };
        }
        if (message.type === 'tasks/save/adopt-server') {
            const adoption = await tasks.adoptServerState();
            assertSameActivation(current, payload);
            return { adoption: adoption.status, state: emitState(current) };
        }
        throw new Error('tasks_request_unknown');
    }

    function handleDataChange(): void { emitCurrentState(); }

    return Object.freeze({
        activate,
        deactivate: cancelForeground,
        cancelForeground,
        cancelAll: cancelForeground,
        handleChatChanged: () => cancelForeground('chat-changed'),
        handleMessage,
        startBackground() {
            unsubscribeData ||= subscribeData(handleDataChange);
            unsubscribeGeneration ||= subscribeGeneration((active) => {
                if (active) {cancelGeneration('main-generation-started');}
                emitCurrentState();
            });
            unsubscribeSettings ||= settings.subscribe(emitCurrentState);
            unsubscribeMaintenance ||= maintenance.subscribeStatus((participantId) => {
                if (participantId === 'tasks') {emitCurrentState();}
            });
        },
        stopBackground() {
            unsubscribeData?.();
            unsubscribeGeneration?.();
            unsubscribeSettings?.();
            unsubscribeMaintenance?.();
            unsubscribeData = null;
            unsubscribeGeneration = null;
            unsubscribeSettings = null;
            unsubscribeMaintenance = null;
            cancelForeground('stopped');
        },
    });
}
