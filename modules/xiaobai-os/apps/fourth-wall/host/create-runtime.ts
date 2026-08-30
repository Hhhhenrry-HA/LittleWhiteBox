import { getRequestHeaders } from '../../../../../../../../../script.js';
import { extensionFolderPath } from '../../../../../core/constants.js';
import { initAfterAiGate, notifyAfterAiHint, registerAfterAiHandler } from '../../../../../core/after-ai-gate.js';
import { createModuleEvents, event_types } from '../../../../../core/event-manager.js';
import { AssistantStorage } from '../../../../../core/server-storage.js';
import {
    loadSharedAgentSettings,
    saveSharedAgentSettings,
    subscribeSharedAgentSettingsChanged,
} from '../../../../agent-core/settings-repository.js';
import type { XiaobaiOsAppRuntime } from '../../../types.js';
import type { XiaobaiOsSettingsRepository } from '../../../host/settings-repository.js';
import {
    captureSillyTavernCommentaryEvent,
    getSillyTavernAfterAiHint,
    getSillyTavernChatSnapshot,
    type CommentaryEventInput,
} from './sillytavern-adapter.js';
import { getSillyTavernChatIdentity } from '../../../host/sillytavern-context.js';
import type { FourthWallChatRepository } from './repository.js';
import { createFourthWallAgentSettingsDialog, type FourthWallAgentBridge } from './agent-settings-dialog.js';
import { createCommentaryBubblePresenter } from './commentary-runtime.js';
import { createFourthWallController } from './controller.js';
import { createFourthWallImageProtocol } from './image-protocol.js';
import { createFourthWallVoiceProtocol } from './voice-protocol.js';

let agentBridgePromise: Promise<FourthWallAgentBridge> | null = null;

function toRootedBrowserPath(path: unknown): string {
    const value = String(path || '');
    if (
        /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(value) ||
        value.startsWith('/') ||
        value.startsWith('./') ||
        value.startsWith('../')
    ) {
        return value;
    }
    return `/${value}`;
}

function loadFourthWallAgentBridge(): Promise<FourthWallAgentBridge> {
    if (!agentBridgePromise) {
        const source = toRootedBrowserPath(
            `${extensionFolderPath}/modules/xiaobai-os/dist/fourth-wall-agent.js`,
        );
        // The URL points to this extension's own Vite bundle.
        // eslint-disable-next-line no-unsanitized/method
        agentBridgePromise = import(source)
            .then((bridge: FourthWallAgentBridge) => {
                bridge.configureFourthWallAgent?.({ requestHeadersProvider: () => getRequestHeaders?.() || {} });
                return bridge;
            })
            .catch((error) => {
                agentBridgePromise = null;
                throw error;
            });
    }
    return agentBridgePromise;
}

function subscribeCommentaryEvents(handler: (event: CommentaryEventInput) => unknown): () => void {
    const events = createModuleEvents('xiaobaiOsFourthWallCommentary');
    initAfterAiGate();
    const disposeGate = registerAfterAiHandler(
        'xiaobaiOsFourthWallCommentary',
        ({ chatId, messageId }: { chatId: string; messageId: number }) => {
            void handler({ kind: 'ai_message', chatId, messageId });
        },
    );
    const notify = (data: unknown, source: string) => {
        const hint = getSillyTavernAfterAiHint(data, source);
        if (hint) {notifyAfterAiHint({ ...hint, source, kind: 'xiaobaiOsFourthWallCommentary' });}
    };
    events.on(event_types.MESSAGE_RECEIVED, (data: unknown) => notify(data, 'message_received'));
    events.on(event_types.GENERATION_ENDED, (data: unknown) => notify(data, 'generation_ended'));
    events.on(event_types.MESSAGE_EDITED, (data: unknown) => {
        void handler({ kind: 'edited', data });
    });
    return () => {
        events.cleanup();
        disposeGate();
    };
}

export function createFourthWallRuntime(
    chatRepository: FourthWallChatRepository,
    settingsRepository: XiaobaiOsSettingsRepository,
): XiaobaiOsAppRuntime {
    const bubble = createCommentaryBubblePresenter();
    const agentDialog = createFourthWallAgentSettingsDialog({
        loadAgentBridge: loadFourthWallAgentBridge,
        loadConfig: () => loadSharedAgentSettings({ storage: AssistantStorage }),
        saveConfig: (patch: Record<string, unknown>) =>
            saveSharedAgentSettings(patch, {
                storage: AssistantStorage,
                silent: false,
                source: 'xiaobai-os-fourth-wall',
            }),
        subscribeConfigChanged: (listener) => subscribeSharedAgentSettingsChanged(listener),
    });
    return createFourthWallController({
        chatRepository,
        settingsRepository,
        getChatIdentity: getSillyTavernChatIdentity,
        getChatSnapshot: getSillyTavernChatSnapshot,
        generateResponse: async (options) => (await loadFourthWallAgentBridge()).generateFourthWallResponse(options),
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
}
