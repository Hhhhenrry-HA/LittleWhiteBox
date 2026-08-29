export function createFourthWallVoiceProtocol({ getFacade = () => window.xiaobaixTts } = {}) {
    let active = null;

    function isAvailable() {
        const facade = getFacade();
        return facade?.isEnabled?.() === true && typeof facade.playTransient === 'function';
    }

    function stop(requestId = '') {
        if (!active || (requestId && active.requestId !== requestId)) return false;
        const current = active;
        active = null;
        current.handle?.stop?.();
        return true;
    }

    function play({ requestId, text, emotion, onState }) {
        const normalizedText = String(text || '').trim();
        const id = String(requestId || '');
        if (!normalizedText || !id) throw new Error('无效的语音请求');
        stop();
        const facade = getFacade();
        if (facade?.isEnabled?.() !== true || typeof facade.playTransient !== 'function') {
            throw new Error('TTS 能力不可用');
        }
        const record = { requestId: id, handle: null };
        active = record;
        record.handle = facade.playTransient(normalizedText, String(emotion || ''), {
            requestId: id,
            onState(state, info) {
                if (active !== record) return;
                onState?.({
                    requestId: id,
                    state: String(state || ''),
                    duration: info?.duration,
                    message: info?.message,
                });
                if (state === 'ended' || state === 'stopped' || state === 'error') active = null;
            },
        });
        return { started: true, requestId: id };
    }

    return Object.freeze({
        getCapabilities: () => ({ available: isAvailable() }),
        play,
        stop,
        cancelAll: () => stop(),
    });
}
