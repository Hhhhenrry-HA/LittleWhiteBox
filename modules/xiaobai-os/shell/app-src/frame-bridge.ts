export const XIAOBAI_OS_FRAME_SOURCE = 'LittleWhiteBox-XiaobaiOS';

export interface FrameMessage<T = unknown> {
    source: typeof XIAOBAI_OS_FRAME_SOURCE;
    type: string;
    requestId?: string;
    payload?: T;
}

interface PendingRequest {
    resolve: (payload: unknown) => void;
    reject: (error: Error) => void;
    timer: ReturnType<typeof setTimeout>;
}

function createRequestId(): string {
    return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createFrameBridge() {
    const pending = new Map<string, PendingRequest>();
    const subscribers = new Set<(message: FrameMessage) => void>();
    let listening = false;

    function post(type: string, payload: unknown = {}, requestId = ''): void {
        parent.postMessage({
            source: XIAOBAI_OS_FRAME_SOURCE,
            type,
            requestId,
            payload,
        }, window.location.origin);
    }

    function settle(message: FrameMessage): boolean {
        const requestId = String(message.requestId || '');
        if (!requestId) {
            return false;
        }
        const request = pending.get(requestId);
        if (!request) {
            return false;
        }
        pending.delete(requestId);
        clearTimeout(request.timer);
        const payload = message.payload as { ok?: boolean; error?: string } | undefined;
        if (payload?.ok === false) {
            request.reject(new Error(payload.error || 'host_request_failed'));
        } else {
            request.resolve(payload);
        }
        return true;
    }

    function handleMessage(event: MessageEvent<FrameMessage>): void {
        if (event.origin !== window.location.origin || event.source !== parent) {
            return;
        }
        if (event.data?.source !== XIAOBAI_OS_FRAME_SOURCE || typeof event.data.type !== 'string') {
            return;
        }
        if (settle(event.data)) {
            return;
        }
        subscribers.forEach(subscriber => subscriber(event.data));
    }

    function start(): void {
        if (listening) {
            return;
        }
        listening = true;
        // The host origin, parent window and protocol source are checked above.
        // eslint-disable-next-line no-restricted-syntax
        window.addEventListener('message', handleMessage);
        post('os/frame-ready');
    }

    function request(type: string, payload: unknown = {}, timeoutMs = 15_000): Promise<unknown> {
        const requestId = createRequestId();
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                pending.delete(requestId);
                reject(new Error('host_request_timeout'));
            }, timeoutMs);
            pending.set(requestId, { resolve, reject, timer });
            post(type, payload, requestId);
        });
    }

    function subscribe(subscriber: (message: FrameMessage) => void): () => void {
        subscribers.add(subscriber);
        return () => subscribers.delete(subscriber);
    }

    function dispose(): void {
        if (listening) {
            window.removeEventListener('message', handleMessage);
        }
        listening = false;
        subscribers.clear();
        pending.forEach(request => {
            clearTimeout(request.timer);
            request.reject(new Error('frame_bridge_disposed'));
        });
        pending.clear();
    }

    return Object.freeze({ start, post, request, subscribe, dispose });
}

export type XiaobaiOsFrameBridge = ReturnType<typeof createFrameBridge>;
