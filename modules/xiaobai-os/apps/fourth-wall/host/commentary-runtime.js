const DEFAULT_COOLDOWN_MS = 180000;

function wait(milliseconds, signal, setTimer, clearTimer) {
    return new Promise((resolve, reject) => {
        const timer = setTimer(resolve, milliseconds);
        signal.addEventListener('abort', () => {
            clearTimer(timer);
            const error = new Error('commentary_cancelled');
            error.name = 'AbortError';
            reject(error);
        }, { once: true });
    });
}

export function createFourthWallCommentaryRuntime({
    getSettings,
    subscribe,
    capture,
    generate,
    commit,
    show,
    hide,
    isForegroundActive = () => false,
    random = Math.random,
    now = Date.now,
    setTimer = setTimeout,
    clearTimer = clearTimeout,
    cooldownMs = DEFAULT_COOLDOWN_MS,
} = {}) {
    let unsubscribe = null;
    let task = null;
    let lastAcceptedAt = 0;

    function cancel() {
        const hadTask = task !== null;
        task?.abort();
        task = null;
        hide?.();
        return hadTask;
    }

    async function handleEvent(event) {
        const settings = getSettings?.();
        if (!settings?.enabled || task || isForegroundActive()) return false;
        if (now() - lastAcceptedAt < cooldownMs) return false;
        const probability = Number(settings.probability);
        if (random() * 100 >= probability) return false;
        const captured = capture?.(event);
        if (!captured) return false;

        const controller = new AbortController();
        task = controller;
        lastAcceptedAt = now();
        try {
            const delay = event?.kind === 'ai_message'
                ? 1000 + random() * 1000
                : 500 + random() * 500;
            await wait(delay, controller.signal, setTimer, clearTimer);
            const text = await generate(captured, controller.signal);
            if (controller.signal.aborted || !String(text || '').trim()) return false;
            await commit(captured, String(text).trim());
            if (controller.signal.aborted) return false;
            show?.(String(text).trim());
            return true;
        } catch (error) {
            if (error?.name !== 'AbortError') console.warn('[LittleWhiteBox] 四次元壁吐槽失败', error);
            return false;
        } finally {
            if (task === controller) task = null;
        }
    }

    function sync() {
        const shouldSubscribe = getSettings?.()?.enabled === true;
        if (shouldSubscribe && !unsubscribe) unsubscribe = subscribe?.(handleEvent) || (() => {});
        if (!shouldSubscribe && unsubscribe) {
            cancel();
            unsubscribe();
            unsubscribe = null;
        }
    }

    function stop() {
        cancel();
        unsubscribe?.();
        unsubscribe = null;
        lastAcceptedAt = 0;
    }

    return Object.freeze({
        start: sync,
        sync,
        stop,
        cancel,
        handleEvent,
        isRunning: () => task !== null,
    });
}

export function createCommentaryBubblePresenter({
    documentTarget = document,
    windowTarget = window,
    anchorId = 'xiaobaix-os-button',
} = {}) {
    let bubble = null;
    let timer = null;

    function hide() {
        if (timer) windowTarget.clearTimeout(timer);
        timer = null;
        bubble?.remove();
        bubble = null;
    }

    function show(text) {
        hide();
        const anchor = documentTarget.getElementById(anchorId);
        if (!anchor) return false;
        const rect = anchor.getBoundingClientRect();
        bubble = documentTarget.createElement('button');
        bubble.type = 'button';
        bubble.className = 'xiaobaix-os-commentary';
        bubble.textContent = String(text || '');
        bubble.addEventListener('click', hide, { once: true });
        documentTarget.body.append(bubble);
        const bubbleRect = bubble.getBoundingClientRect();
        const left = Math.min(
            Math.max(8, rect.left + (rect.width / 2) - (bubbleRect.width / 2)),
            Math.max(8, windowTarget.innerWidth - bubbleRect.width - 8),
        );
        bubble.style.left = `${left}px`;
        bubble.style.bottom = `${Math.max(8, windowTarget.innerHeight - rect.top + 8)}px`;
        const duration = Math.min(2000 + Math.ceil(String(text || '').length / 5) * 1000, 8000);
        timer = windowTarget.setTimeout(hide, duration);
        return true;
    }

    return Object.freeze({ show, hide, dispose: hide });
}
