function normalizeTags(value) {
    return String(value || '')
        .trim()
        .replace(/^(?:nsfw|sketchy)\s*:\s*/i, 'nsfw, ')
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .join(', ');
}

function getAvailability(facade) {
    const status = facade?.getStatus?.() || {};
    return status.enabled === true
        && status.ready === true
        && typeof facade?.generateSharedImage === 'function';
}

export function createFourthWallImageProtocol({ getFacade = () => window.xiaobaixDraw } = {}) {
    const active = new Map();

    function getCapabilities() {
        try {
            return { available: getAvailability(getFacade()) };
        } catch {
            return { available: false };
        }
    }

    async function check({ tags }) {
        const prompt = normalizeTags(tags);
        if (!prompt) throw new Error('无效的图片标签');
        const facade = getFacade();
        if (!getAvailability(facade)) return { available: false, cached: null, tags: prompt };
        const cached = typeof facade.checkGeneratedImageCache === 'function'
            ? await facade.checkGeneratedImageCache({ prompt, cacheNamespace: 'fourth-wall' })
            : null;
        return { available: true, cached: cached || null, tags: prompt };
    }

    async function generate({ requestId, tags, onProgress }) {
        const id = String(requestId || '');
        const prompt = normalizeTags(tags);
        if (!id || !prompt) throw new Error('无效的图片请求');
        const facade = getFacade();
        if (!getAvailability(facade)) throw new Error('画图能力不可用');
        active.get(id)?.abort();
        const controller = new AbortController();
        active.set(id, controller);
        try {
            const base64 = await facade.generateSharedImage({
                prompt,
                cacheNamespace: 'fourth-wall',
                signal: controller.signal,
                onProgress(status, ahead, delay) {
                    if (active.get(id) !== controller) return;
                    onProgress?.({
                        status: String(status || ''),
                        position: status === 'queued' ? Number(ahead || 0) + 1 : 0,
                        delay: delay ? Math.round(delay / 1000) : undefined,
                    });
                },
            });
            if (active.get(id) !== controller || controller.signal.aborted) {
                const error = new Error('image_request_cancelled');
                error.name = 'AbortError';
                throw error;
            }
            return { available: true, base64, tags: prompt };
        } finally {
            if (active.get(id) === controller) active.delete(id);
        }
    }

    function cancel(requestId) {
        const controller = active.get(String(requestId || ''));
        if (!controller) return false;
        controller.abort();
        active.delete(String(requestId || ''));
        return true;
    }

    function cancelAll() {
        active.forEach(controller => controller.abort());
        active.clear();
    }

    return Object.freeze({ getCapabilities, check, generate, cancel, cancelAll });
}
