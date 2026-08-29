import { getRequestHeaders } from '../../../../../../script.js';
import { extensionFolderPath } from '../../core/constants.js';
import { initAfterAiGate, notifyAfterAiHint, registerAfterAiHandler } from '../../core/after-ai-gate.js';
import { createModuleEvents, event_types } from '../../core/event-manager.js';
import { AssistantStorage } from '../../core/server-storage.js';
import {
    loadSharedAgentSettings,
    saveSharedAgentSettings,
    subscribeSharedAgentSettingsChanged,
} from '../agent-core/settings-repository.js';
import { createFourthWallAgentSettingsDialog } from './apps/fourth-wall/host/agent-settings-dialog.js';
import { createCommentaryBubblePresenter } from './apps/fourth-wall/host/commentary-runtime.js';
import {
    createFourthWallController,
    FOURTH_WALL_APP_DESCRIPTOR,
} from './apps/fourth-wall/host/controller.js';
import { createFourthWallImageProtocol } from './apps/fourth-wall/host/image-protocol.js';
import { createFourthWallVoiceProtocol } from './apps/fourth-wall/host/voice-protocol.js';
import { createChatMetadataRepository } from './host/chat-metadata-repository.js';
import { createDefaultXiaobaiOsSettings } from './host/legacy-migration.js';
import { createXiaobaiOsLifecycle } from './host/lifecycle.js';
import { createSettingsRepository } from './host/settings-repository.js';
import {
    captureSillyTavernCommentaryEvent,
    createSillyTavernChatAdapter,
    createSillyTavernSettingsAdapter,
    getSillyTavernAfterAiHint,
    getSillyTavernChatIdentity,
    getSillyTavernChatSnapshot,
    getSillyTavernShellSnapshot,
} from './host/sillytavern-context.js';

const hostStylesheet = `${extensionFolderPath}/modules/xiaobai-os/host.css`;
const frameSource = `${extensionFolderPath}/modules/xiaobai-os/shell/xiaobai-os.html`;
const agentSource = toRootedBrowserPath(`${extensionFolderPath}/modules/xiaobai-os/dist/fourth-wall-agent.js`);

let runtime = null;
let initPromise = null;
let lifecycleGeneration = 0;
let agentBridgePromise = null;
const settingsRepository = createSettingsRepository(createSillyTavernSettingsAdapter());

function toRootedBrowserPath(path) {
    const value = String(path || '');
    if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(value) || value.startsWith('/') || value.startsWith('./') || value.startsWith('../')) {
        return value;
    }
    return `/${value}`;
}

function loadFourthWallAgentBridge() {
    if (!agentBridgePromise) {
        // The URL points to this extension's own Vite bundle.
        // eslint-disable-next-line no-unsanitized/method
        agentBridgePromise = import(agentSource).then((bridge) => {
            bridge.configureFourthWallAgent?.({ requestHeadersProvider: () => getRequestHeaders?.() || {} });
            return bridge;
        }).catch((error) => {
            agentBridgePromise = null;
            throw error;
        });
    }
    return agentBridgePromise;
}

function subscribeCommentaryEvents(handler) {
    const events = createModuleEvents('xiaobaiOsFourthWallCommentary');
    initAfterAiGate();
    const disposeGate = registerAfterAiHandler('xiaobaiOsFourthWallCommentary', ({ chatId, messageId }) => (
        handler({ kind: 'ai_message', chatId, messageId })
    ));
    const notify = (data, source) => {
        const hint = getSillyTavernAfterAiHint(data, source);
        if (hint) notifyAfterAiHint({ ...hint, source, kind: 'xiaobaiOsFourthWallCommentary' });
    };
    events.on(event_types.MESSAGE_RECEIVED, data => notify(data, 'message_received'));
    events.on(event_types.GENERATION_ENDED, data => notify(data, 'generation_ended'));
    events.on(event_types.MESSAGE_EDITED, data => handler({ kind: 'edited', data }));
    return () => {
        events.cleanup();
        disposeGate();
    };
}

function createProductionLifecycle(settingsRepository) {
    const events = createModuleEvents('xiaobaiOs');
    const chatRepository = createChatMetadataRepository(createSillyTavernChatAdapter());
    const bubble = createCommentaryBubblePresenter();
    const agentDialog = createFourthWallAgentSettingsDialog({
        loadAgentBridge: loadFourthWallAgentBridge,
        loadConfig: () => loadSharedAgentSettings({ storage: AssistantStorage }),
        saveConfig: patch => saveSharedAgentSettings(patch, {
            storage: AssistantStorage,
            silent: false,
            source: 'xiaobai-os-fourth-wall',
        }),
        subscribeConfigChanged: listener => subscribeSharedAgentSettingsChanged(listener),
    });
    const controller = createFourthWallController({
        chatRepository,
        settingsRepository,
        getChatIdentity: getSillyTavernChatIdentity,
        getChatSnapshot: getSillyTavernChatSnapshot,
        generateResponse: async options => (await loadFourthWallAgentBridge()).generateFourthWallResponse(options),
        loadAgentConfig: () => loadSharedAgentSettings({ storage: AssistantStorage }),
        imageProtocol: createFourthWallImageProtocol(),
        voiceProtocol: createFourthWallVoiceProtocol(),
        openAgentSettings: agentDialog.open,
        closeAgentSettings: agentDialog.close,
        commentary: {
            subscribe: subscribeCommentaryEvents,
            capture: captureSillyTavernCommentaryEvent,
            show: bubble.show,
            hide: bubble.hide,
        },
    });
    return createXiaobaiOsLifecycle({
        stylesheetHref: hostStylesheet,
        frameSrc: frameSource,
        subscribeChatChanged(handler) {
            events.on(event_types.CHAT_CHANGED, handler);
            return () => events.cleanup();
        },
        getInitSnapshot: getSillyTavernShellSnapshot,
        getAppDescriptors: () => [FOURTH_WALL_APP_DESCRIPTOR],
        appRuntime: controller,
    });
}

export async function initXiaobaiOs() {
    if (runtime?.isInitialized()) return true;
    if (initPromise) return initPromise;
    const generation = ++lifecycleGeneration;
    initPromise = Promise.resolve().then(async () => {
        const current = await settingsRepository.prepare();
        if (!current.enabled || generation !== lifecycleGeneration) return false;
        const candidate = createProductionLifecycle(settingsRepository);
        runtime = candidate;
        try {
            candidate.init();
            if (generation !== lifecycleGeneration || runtime !== candidate) {
                candidate.cleanup();
                return false;
            }
            return true;
        } catch (error) {
            candidate.cleanup();
            if (runtime === candidate) runtime = null;
            throw error;
        }
    }).finally(() => {
        if (generation === lifecycleGeneration) initPromise = null;
    });
    return initPromise;
}

export function prepareXiaobaiOsSettings() {
    return settingsRepository.prepare().then((current) => {
        try {
            globalThis.localStorage?.removeItem('LittleWhiteBox:fourthWallFloatBtnPos');
        } catch { }
        return current;
    });
}

export async function setXiaobaiOsEnabled(enabled) {
    await settingsRepository.prepare();
    return settingsRepository.setEnabled(enabled);
}

export async function openXiaobaiOs() {
    if (!runtime?.isInitialized()) {
        const initialized = await initXiaobaiOs();
        if (!initialized) return false;
    }
    return runtime.open();
}

export function cleanupXiaobaiOs() {
    lifecycleGeneration += 1;
    initPromise = null;
    const current = runtime;
    runtime = null;
    current?.cleanup();
}

export { createDefaultXiaobaiOsSettings };
