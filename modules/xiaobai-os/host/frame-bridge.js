import { isTrustedMessage, postToIframe } from '../../../core/iframe-messaging.js';

export const XIAOBAI_OS_FRAME_SOURCE = 'LittleWhiteBox-XiaobaiOS';

/**
 * Creates the trusted host side of the Xiaobai OS iframe channel.
 *
 * @param {object} options
 * @param {HTMLIFrameElement} options.iframe
 * @param {(bridge: object) => void|Promise<void>} [options.onReady]
 * @param {(message: object, bridge: object) => void|Promise<void>} [options.onMessage]
 * @param {Window} [options.windowTarget]
 */
export function createXiaobaiOsFrameBridge({
    iframe,
    onReady,
    onMessage,
    windowTarget = window,
} = {}) {
    if (!iframe) throw new TypeError('frame bridge requires an iframe');
    let ready = false;
    let disposed = false;

    const bridge = Object.freeze({
        post(type, payload = {}, requestId = '') {
            if (disposed || !ready || typeof type !== 'string' || !type) return false;
            return postToIframe(iframe, {
                type,
                requestId: String(requestId || ''),
                payload,
            }, XIAOBAI_OS_FRAME_SOURCE);
        },
        isReady() {
            return ready && !disposed;
        },
        dispose,
    });

    function handleLoad() {
        ready = false;
    }

    function handleMessage(event) {
        if (disposed || !isTrustedMessage(event, iframe, XIAOBAI_OS_FRAME_SOURCE)) return;
        const message = event.data;
        if (!message || typeof message.type !== 'string') return;
        if (message.type === 'os/frame-ready') {
            ready = true;
            void onReady?.(bridge);
            return;
        }
        if (!ready) return;
        void onMessage?.(message, bridge);
    }

    function dispose() {
        if (disposed) return;
        disposed = true;
        ready = false;
        iframe.removeEventListener('load', handleLoad);
        windowTarget.removeEventListener('message', handleMessage);
    }

    iframe.addEventListener('load', handleLoad);
    // Origin, contentWindow and protocol source are all checked above.
    // eslint-disable-next-line no-restricted-syntax
    windowTarget.addEventListener('message', handleMessage);
    return bridge;
}
