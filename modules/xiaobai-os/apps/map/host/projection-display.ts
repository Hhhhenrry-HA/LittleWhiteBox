import { createXiaobaiOsFrameBridge, type XiaobaiOsFrameBridgeOptions, type XiaobaiOsHostFrameBridge } from '../../../host/frame-bridge.js';
import { storyMessageRole } from '../../../host/story-message.js';
import type { XiaobaiOsChatSurface } from '../../../host/sillytavern-context.js';
import type { MapClientState } from '../types.js';
import { MAP_PROJECTION_COPY } from '../ui/map-copy.js';

interface ProjectionDisplayOptions {
    enabled(): boolean;
    isGenerationActive(): boolean;
    isReplyPaused?(): boolean;
    readState(): MapClientState;
    captureChat(): Pick<XiaobaiOsChatSurface, 'identityKey' | 'messages'> | null;
    readTheme(): 'light' | 'dark';
    subscribe(handlers: { stateChanged(): void; messagesChanged(): void; chatChanged(): void; activityChanged(): void }): () => void;
    frameSrc: string;
    bridgeFactory?: (options: XiaobaiOsFrameBridgeOptions) => XiaobaiOsHostFrameBridge;
}

function isPendingSwipe(message: unknown): boolean {
    if (!message || typeof message !== 'object') { return false; }
    const candidate = message as { swipe_id?: unknown; swipes?: unknown };
    // ST 1.14/1.18 select the next, not-yet-existing candidate before Generate('swipe').
    return typeof candidate.swipe_id === 'number' && Array.isArray(candidate.swipes)
        && candidate.swipe_id === candidate.swipes.length;
}

/** A single read-only surface; it never activates the APP or accepts model/storage commands. */
export function createMapProjectionDisplay({ enabled, isGenerationActive, isReplyPaused = () => false, readState, captureChat, readTheme, subscribe, frameSrc,
    bridgeFactory = createXiaobaiOsFrameBridge }: ProjectionDisplayOptions) {
    let dispose: (() => void) | null = null;
    let themeObserver: MutationObserver | null = null;
    let swipeObserver: MutationObserver | null = null;
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
    const isSuppressed = () => isGenerationActive() || isReplyPaused();

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
        swipeObserver?.disconnect();
        try {
            if (!enabled()) { clear(); resetState(); return; }
            if (isSuppressed()) { clear(); return; }
            const source = captureChat();
            if (!source) { clear(); resetState(); return; }
            let index = source.messages.length - 1;
            while (index >= 0 && storyMessageRole(source.messages[index]) !== 'assistant') { index -= 1; }
            const floor = index < 0 ? null : document.querySelector<HTMLElement>(`#chat .mes[mesid="${index}"]`);
            if (index >= 0 && isPendingSwipe(source.messages[index])) {
                clear();
                // Failed preflight has no completion event. Native rollback replaces
                // floors (1.18) or rewrites swipeid (1.14), without streaming-text observation.
                const chat = document.getElementById('chat');
                if (chat) { swipeObserver?.observe(chat, { childList: true }); }
                if (floor) { swipeObserver?.observe(floor, { attributes: true, attributeFilter: ['swipeid'] }); }
                return;
            }
            if (stateDirty) {
                const next = readState();
                const signature = JSON.stringify(next);
                if (signature !== stateSignature) { state = next; stateSignature = signature; }
                stateDirty = false;
            }
            if (!state?.projectToChat || source.identityKey !== state.chatIdentity
                || !state.map?.atlas.locations.length) { clear(); return; }
            const body = floor?.querySelector('.mes_text');
            if (!body) { clear(); return; }
            if (identity !== source.identityKey || !container || container.parentElement !== body.parentElement
                || !(body.compareDocumentPosition(container) & Node.DOCUMENT_POSITION_FOLLOWING)) {
                clear();
                identity = source.identityKey;
                container = document.createElement('div');
                container.className = 'xb-map-projection';
                container.contentEditable = 'false';
                container.style.cssText = 'display:block;margin:12px 0 0;overflow:hidden;border-radius:14px;container-type:inline-size;';
                const iframe = document.createElement('iframe');
                iframe.title = MAP_PROJECTION_COPY.label;
                iframe.style.cssText = 'display:block;width:100%;height:clamp(260px,50cqw,280px);border:0;';
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
        if (dispose && !isGenerationActive() && scheduled === null) { scheduled = requestAnimationFrame(render); }
    }
    function cancelScheduled(): void {
        if (scheduled !== null) { cancelAnimationFrame(scheduled); scheduled = null; }
    }
    function activityChanged(): void {
        // Remove the whole surface before streaming, but leave all host scrolling alone.
        if (!enabled() || isGenerationActive()) { cancelScheduled(); clear(); }
        else { schedule(); }
    }
    function stateChanged(): void { stateDirty = true; schedule(); }
    function chatChanged(): void { swipeObserver?.disconnect(); clear(); resetState(); schedule(); }
    return {
        stateChanged,
        messagesChanged: schedule,
        chatChanged,
        start() {
            if (dispose) { return; }
            dispose = subscribe({ stateChanged, messagesChanged: schedule, chatChanged, activityChanged });
            themeObserver = new MutationObserver(schedule);
            swipeObserver = new MutationObserver(schedule);
            observeTheme(); schedule();
        },
        stop() {
            dispose?.(); dispose = null;
            themeObserver?.disconnect(); themeObserver = null;
            swipeObserver?.disconnect(); swipeObserver = null;
            cancelScheduled();
            clear(); resetState();
        },
    };
}
