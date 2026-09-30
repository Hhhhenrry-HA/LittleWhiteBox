import { computed, onBeforeUnmount, onMounted, ref, shallowRef, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import type { LearningClientState } from '../types.js';

const requestCopy = {
    busy: '上一件事还没做完，等它完成后再试一次吧。这次没有开始。',
    unknown: '暂时没收到结果。请先重新加载，确认内容是否已保存，再决定是否重试。',
};

export function useLearningState(props: XiaobaiOsAppProps) {
    const state = shallowRef(structuredClone(toRaw(props.initialState as LearningClientState)));
    const pending = ref(false);
    const localMessage = ref('');
    let mounted = false;
    let pushed = 0;
    let unsubscribe = () => {};
    const writable = computed(() => !pending.value && !state.value.busy && state.value.storage === 'ready');
    const canChat = computed(() => !pending.value && !state.value.chatBusy && state.value.storage === 'ready');
    async function request(action: string, extra: Record<string, unknown> = {}) {
        if (pending.value) { return; }
        pending.value = true; localMessage.value = '';
        const identity = state.value.chatIdentity;
        const version = pushed;
        try {
            const response = await props.bridge.request(`learning/${action}`, { chatIdentity: identity, ...extra }, 35_000) as {
                result: { state: LearningClientState; document?: unknown; rejected?: 'busy' };
            };
            if (!mounted || state.value.chatIdentity !== identity) { return; }
            if (pushed === version && response.result.state.chatIdentity === identity) { state.value = response.result.state; }
            if (response.result.rejected) { localMessage.value = requestCopy[response.result.rejected]; }
            return response.result;
        } catch {
            if (mounted && state.value.chatIdentity === identity) {
                localMessage.value = requestCopy.unknown;
            }
        } finally { if (mounted) { pending.value = false; } }
    }
    onMounted(() => {
        mounted = true;
        unsubscribe = props.bridge.subscribe(event => {
            if (event.type === 'learning/media') {
                state.value = { ...state.value, media: (event.payload as { media: LearningClientState['media'] }).media }; return;
            }
            if (event.type !== 'learning/state') { return; }
            const next = (event.payload as { state: LearningClientState }).state;
            if (next.chatIdentity === state.value.chatIdentity) { pushed++; state.value = next; localMessage.value = ''; }
        });
    });
    onBeforeUnmount(() => { mounted = false; unsubscribe(); });
    return { state, pending, writable, canChat, localMessage, request };
}
