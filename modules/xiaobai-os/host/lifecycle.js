import { createXiaobaiOsFrameBridge } from './frame-bridge.js';

const BUTTON_ID = 'xiaobaix-os-button';
const STYLE_ID = 'xiaobaix-os-host-styles';
const OVERLAY_ID = 'xiaobaix-os-overlay';
const IFRAME_ID = 'xiaobaix-os-iframe';

function createLauncherButton(documentTarget) {
    const button = documentTarget.createElement('button');
    button.id = BUTTON_ID;
    button.type = 'button';
    button.className = 'xiaobaix-os-button interactable';
    button.title = '打开小白 OS';
    button.setAttribute('aria-label', '打开小白 OS');
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', OVERLAY_ID);
    const icon = documentTarget.createElement('i');
    icon.className = 'fa-solid fa-mobile-screen-button';
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon);
    return button;
}

function insertLauncher(documentTarget, button) {
    const sendButton = documentTarget.getElementById('send_but');
    if (!sendButton) throw new Error('xiaobai_os_send_button_unavailable');
    const previewButton = documentTarget.getElementById('message_preview_btn');
    (previewButton || sendButton).before(button);
}

/**
 * Creates an isolated Xiaobai OS host lifecycle.
 *
 * @param {object} options
 * @param {Document} [options.documentTarget]
 * @param {Window} [options.windowTarget]
 * @param {string} options.stylesheetHref
 * @param {string} options.frameSrc
 * @param {(handler: () => void) => (() => void)} [options.subscribeChatChanged]
 * @param {() => object|Promise<object>} [options.getInitSnapshot]
 * @param {() => object[]} [options.getAppDescriptors]
 * @param {object} [options.appRuntime]
 * @param {typeof createXiaobaiOsFrameBridge} [options.bridgeFactory]
 * @param {(error: unknown) => void} [options.onError]
 */
export function createXiaobaiOsLifecycle({
    documentTarget = document,
    windowTarget = window,
    stylesheetHref,
    frameSrc,
    subscribeChatChanged = () => () => {},
    getInitSnapshot = () => ({}),
    getAppDescriptors = () => [],
    appRuntime = {},
    bridgeFactory = createXiaobaiOsFrameBridge,
    onError = error => console.error('[LittleWhiteBox] 小白 OS 运行失败', error),
} = {}) {
    if (!stylesheetHref || !frameSrc) throw new TypeError('xiaobai OS lifecycle requires stylesheetHref and frameSrc');

    let initialized = false;
    let launcher = null;
    let overlay = null;
    let iframe = null;
    let bridge = null;
    let unsubscribeChatChanged = null;
    let themeObserver = null;
    let activeAppId = null;
    let generation = 0;

    function addStylesheet() {
        let stylesheet = documentTarget.getElementById(STYLE_ID);
        if (stylesheet) return stylesheet;
        stylesheet = documentTarget.createElement('link');
        stylesheet.id = STYLE_ID;
        stylesheet.rel = 'stylesheet';
        stylesheet.href = stylesheetHref;
        documentTarget.head.append(stylesheet);
        return stylesheet;
    }

    function deactivateActiveApp(reason) {
        if (!activeAppId) return;
        const appId = activeAppId;
        activeAppId = null;
        try {
            appRuntime.deactivate?.(appId, reason);
        } catch (error) {
            onError(error);
        }
    }

    function closeWindow(reason = 'closed') {
        generation += 1;
        appRuntime.cancelForeground?.(reason);
        deactivateActiveApp(reason);
        bridge?.dispose();
        bridge = null;
        stopThemeObserver();
        overlay?.remove();
        overlay = null;
        iframe = null;
        appRuntime.handleWindowClosed?.(reason);
    }

    function handleThemeChanged() {
        if (!bridge?.isReady()) return;
        const snapshot = getInitSnapshot();
        bridge.post('os/theme-changed', { theme: snapshot?.theme || 'light' });
    }

    function startThemeObserver() {
        if (themeObserver || typeof windowTarget.MutationObserver !== 'function') return;
        themeObserver = new windowTarget.MutationObserver(handleThemeChanged);
        const options = { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] };
        if (documentTarget.documentElement) themeObserver.observe(documentTarget.documentElement, options);
        if (documentTarget.body) themeObserver.observe(documentTarget.body, options);
    }

    function stopThemeObserver() {
        themeObserver?.disconnect();
        themeObserver = null;
    }

    async function handleFrameReady(frameBridge, openGeneration) {
        try {
            const snapshot = await getInitSnapshot();
            if (openGeneration !== generation || frameBridge !== bridge) return;
            frameBridge.post('os/init', {
                ...snapshot,
                apps: getAppDescriptors(),
            });
        } catch (error) {
            if (openGeneration === generation && frameBridge === bridge) {
                frameBridge.post('os/error', { message: error instanceof Error ? error.message : String(error) });
            }
            onError(error);
        }
    }

    async function handleFrameMessage(message, frameBridge, openGeneration) {
        if (openGeneration !== generation || frameBridge !== bridge) return;
        const { type, requestId = '', payload = {} } = message;
        if (type === 'os/close') {
            closeWindow('frame-close');
            return;
        }
        if (type === 'app/deactivate') {
            deactivateActiveApp('route-left');
            frameBridge.post('app/deactivated', { ok: true }, requestId);
            return;
        }
        if (type === 'app/activate') {
            const appId = String(payload.appId || '');
            const descriptor = getAppDescriptors().find(app => app.id === appId);
            if (!descriptor) {
                frameBridge.post('app/activation-result', { ok: false, error: 'app_unavailable' }, requestId);
                return;
            }
            try {
                deactivateActiveApp('app-switch');
                const state = await appRuntime.activate?.(appId, {
                    post: (messageType, messagePayload = {}, responseId = '') => frameBridge.post(messageType, messagePayload, responseId),
                });
                if (openGeneration !== generation || frameBridge !== bridge) return;
                activeAppId = appId;
                frameBridge.post('app/activation-result', { ok: true, appId, state: state ?? null }, requestId);
            } catch (error) {
                frameBridge.post('app/activation-result', {
                    ok: false,
                    error: error instanceof Error ? error.message : String(error),
                }, requestId);
            }
            return;
        }
        if (!activeAppId || !type.startsWith(`${activeAppId}/`)) return;
        try {
            const result = await appRuntime.handleMessage?.(activeAppId, { type, requestId, payload });
            if (requestId && openGeneration === generation && frameBridge === bridge && result !== undefined) {
                frameBridge.post(`${activeAppId}/result`, { ok: true, result }, requestId);
            }
        } catch (error) {
            if (requestId && openGeneration === generation && frameBridge === bridge) {
                frameBridge.post(`${activeAppId}/result`, {
                    ok: false,
                    error: error instanceof Error ? error.message : String(error),
                }, requestId);
            }
        }
    }

    function open() {
        if (!initialized) return false;
        if (overlay?.isConnected) {
            iframe?.focus();
            return true;
        }
        generation += 1;
        const openGeneration = generation;
        overlay = documentTarget.createElement('div');
        overlay.id = OVERLAY_ID;
        overlay.className = 'xiaobaix-os-overlay';
        iframe = documentTarget.createElement('iframe');
        iframe.id = IFRAME_ID;
        iframe.className = 'xiaobaix-os-frame';
        iframe.src = frameSrc;
        iframe.title = '小白 OS';
        iframe.setAttribute('allow', 'clipboard-read; clipboard-write');
        overlay.append(iframe);
        documentTarget.body.append(overlay);
        bridge = bridgeFactory({
            iframe,
            windowTarget,
            onReady: frameBridge => handleFrameReady(frameBridge, openGeneration),
            onMessage: (message, frameBridge) => handleFrameMessage(message, frameBridge, openGeneration),
        });
        appRuntime.handleWindowOpened?.();
        startThemeObserver();
        return true;
    }

    function handleChatChanged() {
        appRuntime.cancelAll?.('chat-changed');
        closeWindow('chat-changed');
        appRuntime.handleChatChanged?.();
    }

    function handlePageHide(event) {
        if (event.persisted) return;
        cleanup();
    }

    function init() {
        if (initialized) return true;
        addStylesheet();
        launcher = documentTarget.getElementById(BUTTON_ID);
        if (!launcher) {
            launcher = createLauncherButton(documentTarget);
            insertLauncher(documentTarget, launcher);
        }
        launcher.addEventListener('click', open);
        unsubscribeChatChanged = subscribeChatChanged(handleChatChanged);
        windowTarget.addEventListener('pagehide', handlePageHide);
        appRuntime.startBackground?.();
        initialized = true;
        return true;
    }

    function cleanup() {
        if (!initialized && !launcher && !overlay && !documentTarget.getElementById(STYLE_ID)) return;
        generation += 1;
        appRuntime.cancelAll?.('cleanup');
        closeWindow('cleanup');
        stopThemeObserver();
        appRuntime.stopBackground?.();
        unsubscribeChatChanged?.();
        unsubscribeChatChanged = null;
        windowTarget.removeEventListener('pagehide', handlePageHide);
        launcher?.removeEventListener('click', open);
        launcher?.remove();
        launcher = null;
        documentTarget.getElementById(STYLE_ID)?.remove();
        initialized = false;
    }

    return Object.freeze({
        init,
        open,
        closeWindow,
        cleanup,
        isInitialized: () => initialized,
        isOpen: () => !!overlay?.isConnected,
    });
}
