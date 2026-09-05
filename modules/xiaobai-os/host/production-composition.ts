import { getRequestHeaders } from '../../../../../../../script.js';
import { extensionFolderPath } from '../../../core/constants.js';
import { createAgentApiModule } from '../apps/agent-api/module.js';
import { createProductionBankModule } from '../apps/bank/production-module.js';
import { createProductionFourthWallModule } from '../apps/fourth-wall/production-module.js';
import { createProductionGameModule } from '../apps/game/production-module.js';
import {
    createMapContextCapabilityRegistration,
    MAP_CONTEXT_CAPABILITY,
} from '../apps/map/context-capability.js';
import { createProductionMapModule } from '../apps/map/production-module.js';
import { createProductionMessagesModule } from '../apps/messages/production-module.js';
import { createMessagesBranchCopy } from '../apps/messages/host/branch-copy.js';
import type { ChatMessage } from '../apps/messages/application/projection.js';
import { createProductionShopModule } from '../apps/shop/production-module.js';
import { createProductionTasksModule } from '../apps/tasks/production-module.js';
import { createWalletModule } from '../apps/wallet/module.js';
import { createFourthWallUpstreamImport } from '../apps/fourth-wall/upgrade/upstream-import.js';
import { createAgentCapabilityRegistration } from '../capabilities/agent/index.js';
import { createEconomyCapabilityRegistrations } from '../capabilities/economy/index.js';
import {
    createMaintenanceCapabilityRegistration,
    MAINTENANCE_CAPABILITY,
} from '../capabilities/maintenance/index.js';
import { createChatBindingManager } from '../storage/chat-binding.js';
import { createChatBindingLifecycle } from '../storage/chat-binding-lifecycle.js';
import { createChatReferencePort } from '../storage/chat-reference.js';
import {
    createSillyTavernFileStorage,
    createSillyTavernUserJsonFilePort,
} from '../storage/sillytavern-file-storage.js';
import { createSillyTavernChatMetadataAdapter } from '../storage/sillytavern-chat-metadata.js';
import { createSidecarIndex } from '../storage/sidecar-index.js';
import { createXiaobaiOsBootstrap, type XiaobaiOsBootstrap } from './bootstrap.js';
import { createKernelComposition } from './kernel-composition.js';
import { createPromptContextAdapter } from './prompt-context/adapter.js';
import { buildPromptCurrentStateBlock, buildPromptSettingBlock } from './prompt-context/format.js';
import type { XiaobaiOsSettingsRepository } from './settings-repository.js';
import {
    getSillyTavernAssistantTurnCount,
    getSillyTavernChatIdentity,
    getSillyTavernChatSurface,
    getSillyTavernShellSnapshot,
} from './sillytavern-context.js';
import {
    createChatBindingEventAdapter,
    createSillyTavernMainGenerationRuntime,
    setSillyTavernPrompt,
    subscribeMaintenanceMessages,
    subscribeMapPromptEvents,
    subscribeShopPromptEvents,
    subscribeTaskPromptEvents,
    subscribeXiaobaiOsChatChanged,
} from './sillytavern-runtime-adapters.js';

const hostStylesheet = `${extensionFolderPath}/modules/xiaobai-os/host.css`;
const frameSource = `${extensionFolderPath}/modules/xiaobai-os/shell/xiaobai-os.html`;

export function createProductionBootstrap(
    settings: XiaobaiOsSettingsRepository,
): XiaobaiOsBootstrap {
    const storage = createSillyTavernFileStorage({ getRequestHeaders });
    const metadata = createSillyTavernChatMetadataAdapter();
    const index = createSidecarIndex(createSillyTavernUserJsonFilePort({ getRequestHeaders }));
    const upstreamFourthWall = createFourthWallUpstreamImport(metadata);
    const references = createChatReferencePort(metadata, {
        createInstallEffect: upstreamFourthWall.createReferenceInstallEffect,
        recordOrphan: index.remember,
        recordReference: index.remember,
    });
    const bindingManager = createChatBindingManager({ metadata, references, storage, index,
        prepareClonedPartitions: createMessagesBranchCopy(() => {
            const capture = metadata.capture();
            const surface = getSillyTavernChatSurface();
            return capture && surface ? { identityKey: capture.identityKey, messages: surface.messages as ChatMessage[] } : null;
        }),
    });
    const bindingEvents = createChatBindingEventAdapter();
    const mainGeneration = createSillyTavernMainGenerationRuntime();
    const promptContext = createPromptContextAdapter();
    let composition: ReturnType<typeof createKernelComposition>;

    const capabilities = [
        createAgentCapabilityRegistration(),
        ...createEconomyCapabilityRegistrations(),
        createMapContextCapabilityRegistration(),
        createMaintenanceCapabilityRegistration({
            captureSurface: getSillyTavernChatSurface,
            isGenerationActive: mainGeneration.isActive,
            writeGate: {
                getState: () => composition.transactions.getFileState(),
                subscribe: listener => composition.transactions.subscribeFileState(change => listener(change.state)),
            },
            async captureBackground(source, mode) {
                const firstAcceptedIndex = source.messages[0]?.index ?? source.trigger?.index ?? 0;
                const acceptedThroughIndex = source.messages.at(-1)?.index ?? firstAcceptedIndex;
                const captured = await promptContext.capture({
                    throughMessageIndex: acceptedThroughIndex,
                    recentBeforeIndex: firstAcceptedIndex,
                });
                const mapContext = mode === 'rebuild'
                    ? ''
                    : composition.capabilities.require(MAP_CONTEXT_CAPABILITY).readPromptContext();
                const setting = buildPromptSettingBlock(captured.contextSnapshot);
                const currentState = buildPromptCurrentStateBlock(captured.contextSnapshot, {
                    additionalSections: mapContext ? [mapContext] : [],
                });
                return [
                    { role: 'system' as const, content: setting },
                    ...(currentState ? [{ role: 'system' as const, content: currentState }] : []),
                ];
            },
            onError: error => console.error('[LittleWhiteBox] 小白 OS 后台维护失败', error),
        }),
    ];

    const modules = [
        createAgentApiModule(),
        createProductionFourthWallModule(settings, upstreamFourthWall),
        createProductionMessagesModule(mainGeneration),
        createWalletModule({ getChatIdentity: getSillyTavernChatIdentity }),
        createProductionShopModule({
            getChatIdentity: getSillyTavernChatIdentity,
            captureChatSurface: getSillyTavernChatSurface,
            mainGeneration,
            setPrompt: value => setSillyTavernPrompt('xiaobai_os_shop_effects', value),
            subscribePrompt: subscribeShopPromptEvents,
        }),
        createProductionBankModule({
            getChatIdentity: getSillyTavernChatIdentity,
            getCurrentAssistantTurn: getSillyTavernAssistantTurnCount,
            mainGeneration,
        }),
        createProductionGameModule({ getChatIdentity: getSillyTavernChatIdentity, mainGeneration }),
        createProductionMapModule({
            settings,
            getChatIdentity: getSillyTavernChatIdentity,
            setPrompt: value => setSillyTavernPrompt('xiaobai_os_map_context', value),
            subscribePrompt: subscribeMapPromptEvents,
        }),
        createProductionTasksModule({
            settings,
            getChatIdentity: getSillyTavernChatIdentity,
            getPlayerDisplayName: () => getSillyTavernChatSurface()?.playerName ?? '玩家',
            getObservedAssistantCount: () => getSillyTavernAssistantTurnCount(),
            mainGeneration,
            setPrompt: value => setSillyTavernPrompt('xiaobai_os_tasks_context', value),
            subscribePrompt: subscribeTaskPromptEvents,
        }),
    ];

    composition = createKernelComposition({
        storage,
        chatReferences: references,
        capabilities,
        modules,
        prepareInitialPartitions: upstreamFourthWall.prepareInitialPartitions,
    });
    const bindingLifecycle = createChatBindingLifecycle({
        manager: bindingManager,
        installResolvedSidecar: composition.transactions.installResolvedEnvelope,
        invalidateSidecar: composition.transactions.invalidateCurrent,
        events: bindingEvents.source,
        eventNames: bindingEvents.names,
    });
    let productionInstalled = false;

    const productionApps = Object.freeze({
        ...composition.apps,
        async handleWindowOpened() {
            await bindingLifecycle.refresh();
            await composition.apps.handleWindowOpened();
        },
    });
    const productionComposition = {
        apps: productionApps,
        async install() {
            if (productionInstalled) { return; }
            mainGeneration.startBackground?.();
            try {
                await composition.install();
                const maintenance = composition.capabilities.require(MAINTENANCE_CAPABILITY);
                maintenance.runner.startBackground(subscribeMaintenanceMessages);
                bindingLifecycle.start();
                await bindingLifecycle.refresh();
                productionInstalled = true;
            } catch (error) {
                await bindingLifecycle.stop();
                mainGeneration.stopBackground?.();
                await composition.dispose().catch(() => undefined);
                throw error;
            }
        },
        async dispose() {
            if (!productionInstalled) { return; }
            productionInstalled = false;
            await bindingLifecycle.stop();
            bindingEvents.dispose();
            mainGeneration.stopBackground?.();
            await composition.dispose();
        },
    };

    return createXiaobaiOsBootstrap({
        composition: productionComposition,
        stylesheetHref: hostStylesheet,
        frameSrc: frameSource,
        subscribeChatChanged: subscribeXiaobaiOsChatChanged,
        getInitSnapshot: getSillyTavernShellSnapshot,
        captureChatBinding: references.capture,
        isChatBindingCurrent: references.isCurrent,
        onChatRequired: () => (window.toastr as unknown as { info?(message: string): void } | undefined)?.info?.('请先进入聊天，再打开小白 OS。'),
    });
}
