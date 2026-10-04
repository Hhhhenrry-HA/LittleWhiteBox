import { createXiaobaiOsFrameBridge, type XiaobaiOsFrameBridgeOptions, type XiaobaiOsHostFrameBridge } from '../../../host/frame-bridge.js';
import { storyMessageRole } from '../../../host/story-message.js';
import type { XiaobaiOsChatSurface } from '../../../host/sillytavern-context.js';
import type { MapClientState } from '../types.js';
import { MAP_PROJECTION_COPY } from '../ui/map-copy.js';

interface ProjectionDisplayOptions {
    enabled(): boolean;
    readState(): MapClientState;
    captureChat(): Pick<XiaobaiOsChatSurface, 'identityKey' | 'messages'> | null;
    readTheme(): 'light' | 'dark';
    subscribe(handlers: { stateChanged(): void; messagesChanged(): void; chatChanged(): void }): () => void;
    frameSrc: string;
    bridgeFactory?: (options: XiaobaiOsFrameBridgeOptions) => XiaobaiOsHostFrameBridge;
}

/** A single read-only surface; it never activates the APP or accepts model/storage commands. */
export function createMapProjectionDisplay({ enabled, readState, captureChat, readTheme, subscribe, frameSrc,
    bridgeFactory = createXiaobaiOsFrameBridge }: ProjectionDisplayOptions) {
    let dispose: (() => void) | null = null;
    let themeObserver: MutationObserver | null = null;
    let scheduled: number | null = null;
    let container: HTMLElement | null = null;
    let bridge: XiaobaiOsHostFrameBridge | null = null;
    let identity = '';
    // A run-local display snapshot, invalidated only by domain/settings/status events.
    let state: MapClientState | null = null;
    let stateDirty = true;
    let stateSignature = '';
    let publishedState: MapClientState | null = null;
    let publishedTheme = '';

    function clear(): void {
        bridge?.dispose(); bridge = null;
        container?.remove(); container = null;
        identity = '';
        publishedState = null;
        publishedTheme = '';
    }
    function resetState(): void {
        state = null;
        stateSignature = '';
        stateDirty = true;
    }
    function observeTheme(): void {
        if (!enabled()) { return; }
        for (const element of [document.body, document.documentElement]) {
            themeObserver?.observe(element, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
        }
    }
    function render(): void {
        scheduled = null;
        themeObserver?.disconnect();
        try {
            if (!enabled()) { clear(); resetState(); return; }
            const source = captureChat();
            if (!source) { clear(); resetState(); return; }
            if (stateDirty) {
                const next = readState();
                const signature = JSON.stringify(next);
                if (signature !== stateSignature) { state = next; stateSignature = signature; }
                stateDirty = false;
            }
            if (!state?.projectToChat || source.identityKey !== state.chatIdentity
                || !state.map?.atlas.locations.length) { clear(); return; }
            let index = source.messages.length - 1;
            while (index >= 0 && storyMessageRole(source.messages[index]) !== 'assistant') { index -= 1; }
            const floor = index < 0 ? null : document.querySelector<HTMLElement>(`#chat .mes[mesid="${index}"]`);
            const body = floor?.querySelector('.mes_text');
            if (!body) { clear(); return; }
            if (identity !== source.identityKey || !container || container.parentElement !== body.parentElement
                || !(body.compareDocumentPosition(container) & Node.DOCUMENT_POSITION_FOLLOWING)) {
                clear();
                identity = source.identityKey;
                container = document.createElement('div');
                container.className = 'xb-map-projection';
                container.contentEditable = 'false';
                container.style.cssText = 'display:block;margin:12px 0 0;overflow:hidden;border-radius:14px;';
                const iframe = document.createElement('iframe');
                iframe.title = MAP_PROJECTION_COPY.label;
                iframe.style.cssText = 'display:block;width:100%;height:clamp(420px,65vh,580px);border:0;';
                iframe.src = frameSrc;
                bridge = bridgeFactory({ iframe, onReady() { publishedState = null; schedule(); } });
                container.append(iframe);
                body.after(container);
            }
            const theme = readTheme();
            if ((state !== publishedState || theme !== publishedTheme) && bridge?.post('map/projection-state', { state, theme })) {
                publishedState = state;
                publishedTheme = theme;
            }
        } finally { observeTheme(); }
    }
    function schedule(): void {
        if (dispose && scheduled === null) { scheduled = requestAnimationFrame(render); }
    }
    function stateChanged(): void { stateDirty = true; schedule(); }
    function chatChanged(): void { clear(); resetState(); schedule(); }
    return {
        stateChanged,
        messagesChanged: schedule,
        chatChanged,
        start() {
            if (dispose) { return; }
            dispose = subscribe({ stateChanged, messagesChanged: schedule, chatChanged });
            themeObserver = new MutationObserver(schedule);
            observeTheme(); schedule();
        },
        stop() {
            dispose?.(); dispose = null;
            themeObserver?.disconnect(); themeObserver = null;
            if (scheduled !== null) { cancelAnimationFrame(scheduled); scheduled = null; }
            clear(); resetState();
        },
    };
}
