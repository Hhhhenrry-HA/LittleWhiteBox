import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import type { MapClientState } from '../types.js';

type Action = 'refresh' | 'settings' | 'maintain' | 'rebuild' | 'confirm' | 'adopt';
function record(value: unknown): value is Record<string, unknown> {return !!value && typeof value === 'object' && !Array.isArray(value);}

/** The Map UI's host connection. Browsing state is intentionally not owned here. */
export function useMapState(props: XiaobaiOsAppProps) {
    const state = ref(structuredClone(toRaw(props.initialState as MapClientState)));
    const activeRequest = ref<Action | null>(null);
    const localMessage = ref('');
    const localError = ref(false);
    const dismissedMessage = ref('');
    let mounted = false;
    let requestSequence = 0;
    let pushedVersion = 0;
    let unsubscribe = () => {};
    const requiresConfirmation = computed(() => state.value.status === 'unconfirmed' || state.value.writeState === 'unconfirmed');
    const busy = computed(() => activeRequest.value !== null || ['loading', 'saving'].includes(state.value.status) || ['maintaining', 'rebuilding'].includes(state.value.maintenanceStatus || ''));
    const disabledReason = computed(() => {
        if (busy.value) {return '正在更新地图，请稍候';}
        if (requiresConfirmation.value) {return '请先核实上一次保存结果';}
        if (state.value.status === 'conflict') {return '保存的版本不一致，请先处理保存问题';}
        if (state.value.status !== 'ready') {return state.value.message || '地图暂时不可更新';}
        if (!state.value.chatIdentity) {return '请先打开一个聊天';}
        return '';
    });
    const status = computed(() => {
        if (state.value.maintenanceStatus === 'rebuilding' || activeRequest.value === 'rebuild') {return '正在绘制世界…';}
        if (state.value.maintenanceStatus === 'maintaining' || activeRequest.value === 'maintain') {return '正在更新地图…';}
        if (activeRequest.value === 'confirm') {return '正在核实保存…';}
        if (busy.value) {return '正在同步…';}
        return '';
    });
    const message = computed(() => localMessage.value || state.value.message || state.value.maintenanceMessage || '');
    const notice = computed(() => (state.value.status !== 'ready' || message.value !== dismissedMessage.value) ? message.value : '');
    const isError = computed(() => localError.value || ['blocked', 'error', 'conflict'].includes(state.value.status) || state.value.maintenanceStatus === 'error');
    function apply(next: MapClientState): void {
        state.value = structuredClone(next);
        localMessage.value = '';
        localError.value = false;
    }
    function readableError(error: unknown, action: Action): string {
        const text = error instanceof Error ? error.message : String(error);
        if (text.includes('聊天已切换')) {return '聊天已切换，请重新打开地图。';}
        if (text === 'host_request_timeout') {return '等待结果超时，更新可能仍在进行。请稍后查看，不要重复提交。';}
        if (action === 'confirm') {return '仍无法确认保存结果，请稍后再试。';}
        if (action === 'adopt') {return '未能恢复已保存的版本，当前更改仍暂停保存。';}
        if (action === 'settings') {return '设置未能保存，请重试。';}
        return '地图操作未完成，请稍后重试。';
    }
    async function request(endpoint: string, action: Action, extra: Record<string, unknown> = {}): Promise<void> {
        if (activeRequest.value) {return;}
        const sequence = ++requestSequence;
        const version = pushedVersion;
        const identity = state.value.chatIdentity;
        activeRequest.value = action;
        localMessage.value = '';
        dismissedMessage.value = '';
        localError.value = false;
        try {
            const response = await props.bridge.request(endpoint, { chatIdentity: identity, ...extra }, 35_000);
            if (!mounted || sequence !== requestSequence || state.value.chatIdentity !== identity) {return;}
            const result = record(response) ? response.result : undefined;
            const next = record(result) && record(result.state) ? result.state : result;
            if (version === pushedVersion && record(next) && next.chatIdentity === identity) {apply(next as unknown as MapClientState);}
            if (action === 'refresh' && state.value.status === 'ready') {localMessage.value = '已同步保存的地图。';}
            if (action === 'settings') {localMessage.value = state.value.autoMaintenance ? '自动更新已开启。' : '自动更新已关闭。';}
            if (action === 'confirm' && state.value.status === 'ready') {localMessage.value = '保存已确认。';}
            if (action === 'adopt' && record(result) && result.adoption === 'adopted') {localMessage.value = '已恢复当前聊天中保存的 OS 数据。';}
        } catch (error) {
            if (mounted && sequence === requestSequence && state.value.chatIdentity === identity) {
                localMessage.value = readableError(error, action);
                localError.value = true;
            }
        } finally {if (mounted && sequence === requestSequence) {activeRequest.value = null;}}
    }
    onMounted(() => {
        mounted = true;
        unsubscribe = props.bridge.subscribe(message => {
            if (message.type === 'map/state') {
                pushedVersion += 1;
                apply((message.payload as { state: MapClientState }).state);
            } else if (message.type === 'map/error') {
                pushedVersion += 1;
                localError.value = true;
                dismissedMessage.value = '';
                localMessage.value = (message.payload as { message?: string }).message || '地图暂时无法读取，请重新打开。';
            }
        });
    });
    onBeforeUnmount(() => {mounted = false; requestSequence += 1; unsubscribe();});
    return {
        state, activeRequest, busy, disabledReason, requiresConfirmation, status, notice, isError,
        dismissNotice: () => {dismissedMessage.value = message.value;},
        refresh: () => {if (!busy.value && !requiresConfirmation.value) {return request('map/refresh', 'refresh');}},
        confirmSave: () => {if (!busy.value) {return request('map/confirm-save', 'confirm');}},
        adopt: () => {if (!busy.value) {return request('map/adopt-server-state', 'adopt');}},
        setAuto: (enabled: boolean) => request('map/set-auto-maintenance', 'settings', { enabled }),
        update: () => {if (!disabledReason.value && state.value.map) {return request('map/maintain-once', 'maintain');}},
        rebuild: () => {if (!disabledReason.value) {return request('map/rebuild', 'rebuild');}},
    };
}
