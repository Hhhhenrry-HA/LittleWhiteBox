import {
    createXiaobaiOsFrameBridge,
    type XiaobaiOsFrameBridgeOptions,
    type XiaobaiOsHostFrameBridge,
    type XiaobaiOsHostFrameMessage,
} from './frame-bridge.js';
import type { XiaobaiOsAppDescriptor, XiaobaiOsAppRuntimeRouter } from '../types.js';

const BUTTON_ID = 'xiaobaix-os-button';
const STYLE_ID = 'xiaobaix-os-host-styles';
const OVERLAY_ID = 'xiaobaix-os-overlay';
const IFRAME_ID = 'xiaobaix-os-iframe';

type UnknownRecord = Record<string, unknown>;

export interface XiaobaiOsLifecycleSnapshot {
    theme?: 'light' | 'dark';
}

type XiaobaiOsWindow = Window & {
    MutationObserver?: typeof MutationObserver;
};

export interface XiaobaiOsLifecycleOptions {
    documentTarget?: Document;
    windowTarget?: XiaobaiOsWindow;
    stylesheetHref?: string;
    frameSrc?: string;
    subscribeChatChanged?: (handler: () => void) => () => void;
    getInitSnapshot?: () => XiaobaiOsLifecycleSnapshot | null;
    getAppDescriptors?: () => readonly XiaobaiOsAppDescriptor[];
    appRuntime?: Partial<XiaobaiOsAppRuntimeRouter>;
    bridgeFactory?: (options: XiaobaiOsFrameBridgeOptions) => XiaobaiOsHostFrameBridge;
    onError?: (error: unknown) => void;
}

export interface XiaobaiOsLifecycle {
    init: () => boolean;
    open: () => boolean;
    closeWindow: (reason?: string) => void;
    cleanup: () => void;
    isInitialized: () => boolean;
    isOpen: () => boolean;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function createLauncherButton(documentTarget: Document): HTMLButtonElement {
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

function insertLauncher(documentTarget: Document, button: HTMLElement): void {
    const sendButton = documentTarget.getElementById('send_but');
    if (!sendButton) {
        throw new Error('xiaobai_os_send_button_unavailable');
    }
    const previewButton = documentTarget.getElementById('message_preview_btn');
    (previewButton || sendButton).before(button);
}

/**
 * Creates an isolated Xiaobai OS host lifecycle.
 *
 */
export function createXiaobaiOsLifecycle({
    documentTarget = document,
    windowTarget = window as XiaobaiOsWindow,
    stylesheetHref,
    frameSrc,
    subscribeChatChanged = () => () => {},
    getInitSnapshot = () => ({}),
    getAppDescriptors = () => [],
    appRuntime = {},
    bridgeFactory = createXiaobaiOsFrameBridge,
    onError = (error) => console.error('[LittleWhiteBox] 小白 OS 运行失败', error),
}: XiaobaiOsLifecycleOptions = {}): XiaobaiOsLifecycle {
    if (!stylesheetHref || !frameSrc) {
        throw new TypeError('xiaobai OS lifecycle requires stylesheetHref and frameSrc');
    }
    const resolvedStylesheetHref = stylesheetHref;
    const resolvedFrameSrc = frameSrc;

    let initialized = false;
    let launcher: HTMLElement | null = null;
    let overlay: HTMLDivElement | null = null;
    let iframe: HTMLIFrameElement | null = null;
    let bridge: XiaobaiOsHostFrameBridge | null = null;
    let unsubscribeChatChanged: (() => void) | null = null;
    let themeObserver: MutationObserver | null = null;
    let activeAppId: string | null = null;
    let generation = 0;
    let appActivationGeneration = 0;

    function addStylesheet(): HTMLLinkElement {
        let stylesheet = documentTarget.getElementById(STYLE_ID) as HTMLLinkElement | null;
        if (stylesheet) {
            return stylesheet;
        }
        stylesheet = documentTarget.createElement('link');
        stylesheet.id = STYLE_ID;
        stylesheet.rel = 'stylesheet';
        stylesheet.href = resolvedStylesheetHref;
        documentTarget.head.append(stylesheet);
        return stylesheet;
    }

    function deactivateActiveApp(reason: string): void {
        appActivationGeneration += 1;
        if (!activeAppId) {
            try {
                appRuntime.cancelForeground?.(reason);
            } catch (error) {
                onError(error);
            }
            return;
        }
        const appId = activeAppId;
        activeAppId = null;
        try {
            appRuntime.deactivate?.(appId, reason);
        } catch (error) {
            onError(error);
        }
    }

    function closeWindow(reason = 'closed'): void {
        generation += 1;
        deactivateActiveApp(reason);
        bridge?.dispose();
        bridge = null;
        stopThemeObserver();
        overlay?.remove();
        overlay = null;
        iframe = null;
        appRuntime.handleWindowClosed?.(reason);
    }

    function handleThemeChanged(): void {
        if (!bridge?.isReady()) {
            return;
        }
        const snapshot = getInitSnapshot();
        bridge.post('os/theme-changed', { theme: snapshot?.theme || 'light' });
    }

    function startThemeObserver(): void {
        if (themeObserver || typeof windowTarget.MutationObserver !== 'function') {
            return;
        }
        themeObserver = new windowTarget.MutationObserver(handleThemeChanged);
        const options = { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] };
        if (documentTarget.documentElement) {
            themeObserver.observe(documentTarget.documentElement, options);
        }
        if (documentTarget.body) {
            themeObserver.observe(documentTarget.body, options);
        }
    }

    function stopThemeObserver(): void {
        themeObserver?.disconnect();
        themeObserver = null;
    }

    async function handleFrameReady(frameBridge: XiaobaiOsHostFrameBridge, openGeneration: number): Promise<void> {
        try {
            const snapshot = await getInitSnapshot();
            if (openGeneration !== generation || frameBridge !== bridge) {
                return;
            }
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

    async function handleFrameMessage(
        message: XiaobaiOsHostFrameMessage,
        frameBridge: XiaobaiOsHostFrameBridge,
        openGeneration: number,
    ): Promise<void> {
        if (openGeneration !== generation || frameBridge !== bridge) {
            return;
        }
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
            const appId = String(isRecord(payload) ? payload.appId || '' : '');
            const descriptor = getAppDescriptors().find((app) => app.id === appId);
            if (!descriptor) {
                frameBridge.post('app/activation-result', { ok: false, error: 'app_unavailable' }, requestId);
                return;
            }
            try {
                deactivateActiveApp('app-switch');
                const activationGeneration = ++appActivationGeneration;
                const state = await appRuntime.activate?.(appId, {
                    post: (messageType: string, messagePayload: unknown = {}, responseId = '') =>
                        frameBridge.post(messageType, messagePayload, responseId),
                });
                if (
                    openGeneration !== generation ||
                    frameBridge !== bridge ||
                    activationGeneration !== appActivationGeneration
                ) {
                    if (
                        openGeneration === generation &&
                        frameBridge === bridge &&
                        appActivationGeneration === activationGeneration + 1
                    ) {
                        appRuntime.cancelForeground?.('activation-cancelled');
                    }
                    frameBridge.post(
                        'app/activation-result',
                        { ok: false, error: 'activation_cancelled' },
                        requestId,
                    );
                    return;
                }
                activeAppId = appId;
                frameBridge.post('app/activation-result', { ok: true, appId, state: state ?? null }, requestId);
            } catch (error) {
                frameBridge.post(
                    'app/activation-result',
                    {
                        ok: false,
                        error: error instanceof Error ? error.message : String(error),
                    },
                    requestId,
                );
            }
            return;
        }
        if (!activeAppId || !type.startsWith(`${activeAppId}/`)) {
            return;
        }
        const messageAppId = activeAppId;
        const messageActivationGeneration = appActivationGeneration;
        const isMessageActivationCurrent = () =>
            activeAppId === messageAppId && appActivationGeneration === messageActivationGeneration;
        try {
            const result = await appRuntime.handleMessage?.(messageAppId, { type, requestId, payload });
            if (requestId && openGeneration === generation && frameBridge === bridge) {
                if (!isMessageActivationCurrent()) {
                    frameBridge.post(`${messageAppId}/result`, { ok: false, error: 'app_inactive' }, requestId);
                } else if (result !== undefined) {
                    frameBridge.post(`${messageAppId}/result`, { ok: true, result }, requestId);
                }
            }
        } catch (error) {
            if (requestId && openGeneration === generation && frameBridge === bridge) {
                frameBridge.post(
                    `${messageAppId}/result`,
                    {
                        ok: false,
                        error: isMessageActivationCurrent()
                            ? error instanceof Error
                                ? error.message
                                : String(error)
                            : 'app_inactive',
                    },
                    requestId,
                );
            }
        }
    }

    function open(): boolean {
        if (!initialized) {
            return false;
        }
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
        iframe.src = resolvedFrameSrc;
        iframe.title = '小白 OS';
        iframe.setAttribute('allow', 'clipboard-read; clipboard-write');
        overlay.append(iframe);
        documentTarget.body.append(overlay);
        bridge = bridgeFactory({
            iframe,
            windowTarget,
            onReady: (frameBridge) => handleFrameReady(frameBridge, openGeneration),
            onMessage: (message, frameBridge) => handleFrameMessage(message, frameBridge, openGeneration),
        });
        appRuntime.handleWindowOpened?.();
        startThemeObserver();
        return true;
    }

    function handleChatChanged(): void {
        appRuntime.cancelAll?.('chat-changed');
        closeWindow('chat-changed');
        appRuntime.handleChatChanged?.();
    }

    function handlePageHide(event: PageTransitionEvent): void {
        if (event.persisted) {
            return;
        }
        cleanup();
    }

    function init(): boolean {
        if (initialized) {
            return true;
        }
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

    function cleanup(): void {
        if (!initialized && !launcher && !overlay && !documentTarget.getElementById(STYLE_ID)) {
            return;
        }
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
