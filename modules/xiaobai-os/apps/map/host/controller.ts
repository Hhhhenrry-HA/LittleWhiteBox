import type { XiaobaiOsChatDataChange } from '../../../host/chat-data-store.js';
import type { XiaobaiOsHostFrameMessage } from '../../../host/frame-bridge.js';
import type {
    MaintenanceRunOutcome,
    MaintenanceRunner,
    MaintenanceStatus,
} from '../../../host/maintenance/runner.js';
import type { XiaobaiOsSettingsRepository } from '../../../host/settings-repository.js';
import type {
    XiaobaiOsAppActivationContext,
    XiaobaiOsAppRuntime,
    XiaobaiOsChatIdentity,
} from '../../../types.js';
import type { MapService } from '../application/service.js';
import type { MapClientState, MapClientStatus, MapMaintenanceStatus } from '../types.js';

type UnknownRecord = Record<string, unknown>;

interface MapActivation {
    chatIdentity: string;
    post: XiaobaiOsAppActivationContext['post'];
}

interface MapControllerDependencies {
    map: MapService;
    settings: Pick<XiaobaiOsSettingsRepository, 'read' | 'setMapAutoMaintenance' | 'subscribe'>;
    maintenance: Pick<
        MaintenanceRunner,
        'runManual' | 'runRebuild' | 'cancelForeground' | 'getStatus' | 'subscribeStatus'
    >;
    getChatIdentity: () => XiaobaiOsChatIdentity | { key?: unknown } | string | null;
    subscribeData: (listener: (change: XiaobaiOsChatDataChange) => void) => () => void;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity: ReturnType<MapControllerDependencies['getChatIdentity']>): string {
    return typeof identity === 'string' ? identity : String(identity?.key || '');
}

function clientStatus(writeState: ReturnType<MapService['getWriteState']>): {
    status: MapClientStatus;
    message: string;
} {
    if (writeState === 'saving') {return { status: 'saving', message: '正在确认地图保存结果…' };}
    if (writeState === 'unconfirmed') {
        return { status: 'unconfirmed', message: '地图保存结果尚未确认，新的地图写入已冻结。' };
    }
    if (writeState === 'conflict') {
        return { status: 'conflict', message: '服务端数据与当前候选不一致。采用服务端数据后才能继续写入。' };
    }
    return { status: 'ready', message: '' };
}

function maintenanceState(status: MaintenanceStatus): {
    maintenanceStatus: MapMaintenanceStatus;
    maintenanceMessage: string;
} {
    if (status.state === 'running') {
        return {
            maintenanceStatus: status.mode === 'rebuild' ? 'rebuilding' : 'maintaining',
            maintenanceMessage: '',
        };
    }
    return {
        maintenanceStatus: status.state === 'error' ? 'error' : 'idle',
        maintenanceMessage: status.state === 'error' ? '地图维护失败，请稍后重试。' : '',
    };
}

function outcomeMessage(outcome: MaintenanceRunOutcome, mode: 'manual' | 'rebuild'): string {
    if (outcome.status === 'updated') {return mode === 'rebuild' ? '地图已建立并保存。' : '地图已更新。';}
    if (outcome.status === 'unchanged') {
        return mode === 'rebuild' ? '当前聊天未形成可建立的地图。' : '地图无需更新。';
    }
    if (outcome.status === 'partial') {return '地图已部分保存，本次维护未完整完成。';}
    if (outcome.status === 'cancelled') {return '本次地图维护已取消。';}
    if (outcome.status === 'skipped') {
        return outcome.reason === 'generation-active'
            ? '当前正在生成回复，暂时不能维护地图。'
            : '当前聊天没有可维护的完整内容。';
    }
    return '地图维护失败，请检查 Agent API 设置后重试。';
}

export function createMapController({
    map,
    settings,
    maintenance,
    getChatIdentity,
    subscribeData,
}: MapControllerDependencies): XiaobaiOsAppRuntime & {
    activate: NonNullable<XiaobaiOsAppRuntime['activate']>;
    handleMessage: NonNullable<XiaobaiOsAppRuntime['handleMessage']>;
} {
    let activation: MapActivation | null = null;
    let unsubscribeData: (() => void) | null = null;
    let unsubscribeSettings: (() => void) | null = null;
    let unsubscribeStatus: (() => void) | null = null;

    function currentChatIdentity(): string {
        return identityKey(getChatIdentity());
    }

    function mapEnabled(): boolean {
        return settings.read()?.apps.map.enabled === true;
    }

    function assertActivation(payload: UnknownRecord = {}): MapActivation {
        if (!activation || !mapEnabled()) {throw new Error('地图 APP 未激活');}
        const current = currentChatIdentity();
        if (!current || current !== activation.chatIdentity || String(payload.chatIdentity || '') !== current) {
            throw new Error('聊天已切换，请重新打开地图');
        }
        return activation;
    }

    function assertSameActivation(expected: MapActivation, payload: UnknownRecord = {}): void {
        if (assertActivation(payload) !== expected) {throw new Error('地图页面已切换，请重试');}
    }

    function buildState(chatIdentity: string): MapClientState {
        const view = map.readCurrent();
        const status = clientStatus(view.writeState);
        const maintenanceStatus = maintenanceState(maintenance.getStatus('map'));
        return {
            chatIdentity,
            map: view.map,
            writeState: view.writeState,
            ...status,
            autoMaintenance: settings.read()?.apps.map.autoMaintenance === true,
            ...maintenanceStatus,
        };
    }

    function emitState(current = activation): MapClientState {
        if (!current) {throw new Error('地图 APP 未激活');}
        const state = buildState(current.chatIdentity);
        current.post('map/state', { state });
        return state;
    }

    function emitCurrentState(): void {
        const current = activation;
        if (!current || currentChatIdentity() !== current.chatIdentity || !mapEnabled()) {return;}
        try {
            emitState(current);
        } catch {
            current.post('map/error', { message: '地图状态暂时无法读取，请重新打开。' });
        }
    }

    function activate(context: XiaobaiOsAppActivationContext): MapClientState {
        cancelForeground('app-reactivated');
        const chatIdentity = currentChatIdentity();
        if (!chatIdentity) {throw new Error('请先打开一个聊天');}
        if (!mapEnabled()) {throw new Error('地图 APP 已关闭');}
        activation = { chatIdentity, post: context.post };
        return buildState(chatIdentity);
    }

    function cancelForeground(reason = 'route-left'): void {
        activation = null;
        maintenance.cancelForeground('map', reason);
    }

    async function runMaintenance(
        current: MapActivation,
        payload: UnknownRecord,
        mode: 'manual' | 'rebuild',
    ): Promise<{ outcome: MaintenanceRunOutcome; state: MapClientState; message: string }> {
        maintenance.cancelForeground('map', 'replaced');
        const outcome = mode === 'rebuild'
            ? await maintenance.runRebuild('map')
            : await maintenance.runManual('map');
        assertSameActivation(current, payload);
        return { outcome, state: emitState(current), message: outcomeMessage(outcome, mode) };
    }

    async function handleMessage(message: XiaobaiOsHostFrameMessage): Promise<unknown> {
        const payload = isRecord(message.payload) ? message.payload : {};
        const current = assertActivation(payload);
        if (message.type === 'map/refresh') {
            return emitState(current);
        }
        if (message.type === 'map/confirm-save') {
            const confirmation = await map.confirmPending();
            assertSameActivation(current, payload);
            return { confirmation: confirmation.status, state: emitState(current) };
        }
        if (message.type === 'map/adopt-server-state') {
            const adoption = await map.adoptServerState();
            assertSameActivation(current, payload);
            return { adoption: adoption.status, state: emitState(current) };
        }
        if (message.type === 'map/set-auto-maintenance') {
            if (typeof payload.enabled !== 'boolean') {throw new TypeError('地图自动维护开关无效');}
            await settings.setMapAutoMaintenance(payload.enabled);
            assertSameActivation(current, payload);
            return emitState(current);
        }
        if (message.type === 'map/maintain-once') {
            return runMaintenance(current, payload, 'manual');
        }
        if (message.type === 'map/rebuild') {
            return runMaintenance(current, payload, 'rebuild');
        }
        throw new Error('未知的地图操作');
    }

    function handleDataChange(change: XiaobaiOsChatDataChange): void {
        if (change.identityKey === activation?.chatIdentity) {emitCurrentState();}
    }

    function handleMaintenanceStatus(participantId: string): void {
        if (participantId === 'map') {emitCurrentState();}
    }

    return Object.freeze({
        activate,
        deactivate: cancelForeground,
        cancelForeground,
        cancelAll: cancelForeground,
        handleChatChanged: cancelForeground,
        handleMessage,
        startBackground() {
            unsubscribeData ||= subscribeData(handleDataChange);
            unsubscribeSettings ||= settings.subscribe(emitCurrentState);
            unsubscribeStatus ||= maintenance.subscribeStatus(handleMaintenanceStatus);
        },
        stopBackground() {
            unsubscribeData?.();
            unsubscribeSettings?.();
            unsubscribeStatus?.();
            unsubscribeData = null;
            unsubscribeSettings = null;
            unsubscribeStatus = null;
            cancelForeground('stopped');
        },
    });
}
