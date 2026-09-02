import {
    extension_prompt_roles,
    extension_prompt_types,
    setExtensionPrompt,
} from '../../../../../../../script.js';
import {
    GENERATE_INTERCEPTOR_ORDER,
    registerGenerateInterceptor,
    unregisterGenerateInterceptor,
} from '../../../shared/common/generate-interceptor.js';
import { extensionFolderPath } from '../../../core/constants.js';
import { createModuleEvents, event_types } from '../../../core/event-manager.js';
import { FOURTH_WALL_APP_DESCRIPTOR } from '../apps/fourth-wall/descriptor.js';
import { createFourthWallRuntime } from '../apps/fourth-wall/host/create-runtime.js';
import { createFourthWallRepository } from '../apps/fourth-wall/host/repository.js';
import { MAP_APP_DESCRIPTOR } from '../apps/map/descriptor.js';
import { createMapService } from '../apps/map/application/service.js';
import { createMapController } from '../apps/map/host/controller.js';
import { createMapMaintenanceParticipant } from '../apps/map/host/maintenance-participant.js';
import { createMapPromptRuntime } from '../apps/map/host/prompt-runtime.js';
import { createMapSettingsRuntime } from '../apps/map/host/settings-runtime.js';
import { TASKS_APP_DESCRIPTOR } from '../apps/tasks/descriptor.js';
import { createTasksService } from '../apps/tasks/application/service.js';
import { createTaskGenerationRequests } from '../apps/tasks/generation/request.js';
import { createTaskController } from '../apps/tasks/host/controller.js';
import { createTaskGenerationContextAdapter } from '../apps/tasks/host/context-adapter.js';
import { createTaskMaintenanceParticipant } from '../apps/tasks/host/maintenance-participant.js';
import { createTaskPromptRuntime } from '../apps/tasks/host/prompt-runtime.js';
import { createTaskSettingsRuntime } from '../apps/tasks/host/settings-runtime.js';
import { AGENT_API_APP_DESCRIPTOR } from '../apps/agent-api/descriptor.js';
import { createAgentApiController } from '../apps/agent-api/host/controller.js';
import { BANK_APP_DESCRIPTOR } from '../apps/bank/descriptor.js';
import { createBankController } from '../apps/bank/host/controller.js';
import { GAME_APP_DESCRIPTOR } from '../apps/game/descriptor.js';
import { createGameController } from '../apps/game/host/controller.js';
import { SHOP_APP_DESCRIPTOR } from '../apps/shop/descriptor.js';
import { createShopEffectDeliveryQueue } from '../apps/shop/application/effect-delivery-queue.js';
import { createShopController } from '../apps/shop/host/controller.js';
import { createShopMessageReceipts } from '../apps/shop/host/message-receipts.js';
import { createShopPromptRuntime } from '../apps/shop/host/prompt-runtime.js';
import { createBankService } from '../apps/bank/application/service.js';
import { createGameService } from '../apps/game/application/service.js';
import { createShopService } from '../apps/shop/application/service.js';
import { readShopDomain } from '../apps/shop/application/root-protocol.js';
import { WALLET_APP_DESCRIPTOR } from '../apps/wallet/descriptor.js';
import { createWalletController } from '../apps/wallet/host/controller.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { buildMapPromptBlock } from '../domains/map/projection.js';
import { createAppRuntimeRegistry } from './app-runtime-registry.js';
import { createXiaobaiOsAgentGateway } from './agent/gateway.js';
import { createChatDataStore } from './chat-data-store.js';
import { createDefaultXiaobaiOsSettings } from './settings-normalization.js';
import { createXiaobaiOsLifecycle, type XiaobaiOsLifecycle } from './lifecycle.js';
import { createMainGenerationRuntime } from './main-generation-runtime.js';
import { createMaintenanceRegistry } from './maintenance/registry.js';
import { createMaintenanceRunner } from './maintenance/runner.js';
import { createPromptContextAdapter } from './prompt-context/adapter.js';
import { buildPromptCurrentStateBlock, buildPromptSettingBlock } from './prompt-context/format.js';
import type { XiaobaiOsSettingsRepository } from './settings-repository.js';
import {
    createSillyTavernChatAdapter,
    getSillyTavernAssistantTurnCount,
    getSillyTavernChatIdentity,
    getSillyTavernChatSurface,
    getSillyTavernShellSnapshot,
} from './sillytavern-context.js';

export { createDefaultXiaobaiOsSettings };

const SHOP_PROMPT_KEY = 'xiaobai_os_shop_effects';
const MAP_PROMPT_KEY = 'xiaobai_os_map_context';
const TASKS_PROMPT_KEY = 'xiaobai_os_tasks_context';
const hostStylesheet = `${extensionFolderPath}/modules/xiaobai-os/host.css`;
const frameSource = `${extensionFolderPath}/modules/xiaobai-os/shell/xiaobai-os.html`;

export function createProductionLifecycle(
    settingsRepository: XiaobaiOsSettingsRepository,
): XiaobaiOsLifecycle {
    const lifecycleEvents = createModuleEvents('xiaobaiOs');
    const chatStore = createChatDataStore(createSillyTavernChatAdapter());
    const economy = createEconomyRepository(chatStore);
    const prepareCurrentEconomy = () => {
        if (!getSillyTavernChatIdentity()) {return;}
        void economy.prepareCurrent().catch((error) => {
            console.error('[LittleWhiteBox] 小白 OS 钱包数据升级失败', error);
        });
    };
    const economyDataPreparationRuntime = {
        startBackground: prepareCurrentEconomy,
        handleChatChanged: prepareCurrentEconomy,
    };
    const map = createMapService(chatStore);
    const tasks = createTasksService(chatStore, {
        getPlayerDisplayName(identityKey) {
            const surface = getSillyTavernChatSurface();
            if (!surface || surface.identityKey !== identityKey) {throw new Error('tasks_chat_changed');}
            return surface.playerName;
        },
        getObservedAssistantCount: getSillyTavernAssistantTurnCount,
    });
    const mainGenerationRuntime = createMainGenerationRuntime({
        readHostGenerating: () => document.body.dataset.generating === 'true',
        subscribe(handlers) {
            const generationEvents = createModuleEvents('xiaobaiOsMainGeneration');
            generationEvents.on(event_types.GENERATION_STARTED, (
                type: unknown,
                _options: unknown,
                dryRun: unknown,
            ) => handlers.started({ type: String(type || ''), dryRun: Boolean(dryRun) }));
            generationEvents.on(event_types.GENERATION_ENDED, handlers.hostStateChanged);
            generationEvents.on(event_types.GENERATION_STOPPED, handlers.hostStateChanged);
            generationEvents.on(event_types.GROUP_WRAPPER_STARTED, (event: unknown) => {
                const type = event && typeof event === 'object' && 'type' in event
                    ? String((event as { type?: unknown }).type || '')
                    : '';
                handlers.groupStarted({ type, dryRun: false });
            });
            generationEvents.on(event_types.GROUP_WRAPPER_FINISHED, handlers.groupFinished);
            const observer = new MutationObserver(handlers.hostStateChanged);
            observer.observe(document.body, { attributes: true, attributeFilter: ['data-generating'] });
            return () => {
                observer.disconnect();
                generationEvents.cleanup();
            };
        },
    });
    const shop = createShopService(chatStore, {
        isMainGenerationActive: mainGenerationRuntime.isActive,
    });
    const shopMessageReceipts = createShopMessageReceipts({
        captureChatSurface: getSillyTavernChatSurface,
    });
    const shopDeliveries = createShopEffectDeliveryQueue({
        readCurrent() {
            const identity = getSillyTavernChatIdentity();
            if (!identity) {return null;}
            const domain = readShopDomain(chatStore.readCurrent());
            return getSillyTavernChatIdentity()?.key === identity.key
                ? { chatIdentity: identity.key, domain }
                : null;
        },
        persist: shop.commitDeliveryCurrent,
    });
    const shopPromptRuntime = createShopPromptRuntime({
        captureConversation: shopMessageReceipts.captureConversation,
        readShop: shopDeliveries.readCurrent,
        bindReplyReceipt: shopMessageReceipts.bind,
        enqueueDelivery: shopDeliveries.enqueue,
        setPrompt(value) {
            setExtensionPrompt(
                SHOP_PROMPT_KEY,
                value,
                Number(extension_prompt_types.IN_CHAT) || 1,
                1,
                false,
                Number(extension_prompt_roles.SYSTEM) || 0,
            );
        },
        subscribe(handlers) {
            const promptEvents = createModuleEvents('xiaobaiOsShopPrompt');
            promptEvents.on(event_types.GENERATION_STARTED, (
                type: unknown,
                _options: unknown,
                dryRun: unknown,
            ) => handlers.generationStarted({ type: String(type || ''), dryRun: Boolean(dryRun) }));
            registerGenerateInterceptor(SHOP_PROMPT_KEY, (
                _chat: unknown,
                _contextSize: unknown,
                _abort: unknown,
                type: unknown,
            ) => handlers.intercept({ type: String(type || '') }), GENERATE_INTERCEPTOR_ORDER.XIAOBAI_OS_SHOP);
            promptEvents.on(event_types.GENERATE_AFTER_DATA, handlers.requestBuilt);
            promptEvents.on(event_types.GENERATION_ENDED, handlers.generationEnded);
            promptEvents.on(event_types.GENERATION_STOPPED, handlers.generationStopped);
            promptEvents.on(event_types.MESSAGE_RECEIVED, (messageId: unknown, type: unknown) => {
                handlers.messageReceived(messageId, type);
            });
            return () => {
                unregisterGenerateInterceptor(SHOP_PROMPT_KEY);
                promptEvents.cleanup();
            };
        },
    });
    const bank = createBankService(chatStore, {
        getCurrentAssistantTurn: getSillyTavernAssistantTurnCount,
        isMainGenerationActive: mainGenerationRuntime.isActive,
    });
    const game = createGameService(chatStore, {
        isMainGenerationActive: mainGenerationRuntime.isActive,
    });
    const agentGateway = createXiaobaiOsAgentGateway({ source: 'xiaobai-os-agent-api' });
    const readMapSettings = () => settingsRepository.read()?.apps.map ?? null;
    const readTaskSettings = () => settingsRepository.read()?.apps.tasks ?? null;
    const mapParticipant = createMapMaintenanceParticipant({
        map,
        readSettings: readMapSettings,
    });
    const taskParticipant = createTaskMaintenanceParticipant({
        tasks,
        readSettings: readTaskSettings,
    });
    const promptContext = createPromptContextAdapter();
    const maintenanceRunner = createMaintenanceRunner({
        registry: createMaintenanceRegistry([mapParticipant, taskParticipant]),
        gateway: agentGateway,
        captureSurface: getSillyTavernChatSurface,
        isGenerationActive: mainGenerationRuntime.isActive,
        writeGate: {
            getState: chatStore.getWriteState,
            subscribe(listener) {
                return chatStore.subscribe(change => listener(change.writeState));
            },
        },
        async captureBackground(source, mode) {
            const firstAcceptedIndex = source.messages[0]?.index ?? source.trigger?.index ?? 0;
            const acceptedThroughIndex = source.messages.at(-1)?.index ?? firstAcceptedIndex;
            const captured = await promptContext.capture({
                throughMessageIndex: acceptedThroughIndex,
                recentBeforeIndex: firstAcceptedIndex,
            });
            const mapContext = mode === 'rebuild' ? '' : buildMapPromptBlock(map.readCurrent().map);
            const setting = buildPromptSettingBlock(captured.contextSnapshot);
            const currentState = buildPromptCurrentStateBlock(captured.contextSnapshot, {
                additionalSections: mapContext ? [mapContext] : [],
            });
            return [
                { role: 'system', content: setting },
                ...(currentState ? [{ role: 'system' as const, content: currentState }] : []),
            ];
        },
        onError: error => console.error('[LittleWhiteBox] 小白 OS 后台维护失败', error),
    });
    const mapPromptRuntime = createMapPromptRuntime({
        readCurrentMap: () => map.readCurrent().map,
        setPrompt(value) {
            setExtensionPrompt(
                MAP_PROMPT_KEY,
                value,
                Number(extension_prompt_types.IN_CHAT) || 1,
                1,
                false,
                Number(extension_prompt_roles.SYSTEM) || 0,
            );
        },
        subscribe(handlers) {
            const promptEvents = createModuleEvents('xiaobaiOsMapPrompt');
            let dryRun = false;
            promptEvents.on(event_types.GENERATION_STARTED, (
                _type: unknown,
                _options: unknown,
                value: unknown,
            ) => {
                handlers.generationStarted();
                dryRun = Boolean(value);
            });
            registerGenerateInterceptor(MAP_PROMPT_KEY, (
                _chat: unknown,
                _contextSize: unknown,
                _abort: unknown,
                type: unknown,
            ) => {
                const generationType = String(type || '');
                if (
                    dryRun
                    || !['', 'normal', 'regenerate', 'swipe', 'continue'].includes(generationType)
                ) {
                    handlers.generationStopped();
                    return;
                }
                handlers.intercept();
            }, GENERATE_INTERCEPTOR_ORDER.XIAOBAI_OS_MAP);
            promptEvents.on(event_types.GENERATE_AFTER_DATA, handlers.requestBuilt);
            promptEvents.on(event_types.GENERATION_ENDED, () => {
                dryRun = false;
                handlers.generationEnded();
            });
            promptEvents.on(event_types.GENERATION_STOPPED, () => {
                dryRun = false;
                handlers.generationStopped();
            });
            return () => {
                unregisterGenerateInterceptor(MAP_PROMPT_KEY);
                promptEvents.cleanup();
            };
        },
    });
    const taskContext = createTaskGenerationContextAdapter({
        promptContext,
        readMapContext: () => buildMapPromptBlock(map.readCurrent().map),
    });
    const taskGeneration = createTaskGenerationRequests({
        gateway: agentGateway,
        tasks,
        context: taskContext,
        isMainGenerationActive: mainGenerationRuntime.isActive,
    });
    const taskPromptRuntime = createTaskPromptRuntime({
        tasks,
        setPrompt(value) {
            setExtensionPrompt(
                TASKS_PROMPT_KEY,
                value,
                Number(extension_prompt_types.IN_CHAT) || 1,
                1,
                false,
                Number(extension_prompt_roles.SYSTEM) || 0,
            );
        },
        subscribe(handlers) {
            const promptEvents = createModuleEvents('xiaobaiOsTasksPrompt');
            let dryRun = false;
            promptEvents.on(event_types.GENERATION_STARTED, (
                _type: unknown,
                _options: unknown,
                value: unknown,
            ) => {
                handlers.generationStarted();
                dryRun = Boolean(value);
            });
            registerGenerateInterceptor(TASKS_PROMPT_KEY, (
                _chat: unknown,
                _contextSize: unknown,
                _abort: unknown,
                type: unknown,
            ) => {
                const generationType = String(type || '');
                if (
                    dryRun
                    || !['', 'normal', 'regenerate', 'swipe', 'continue'].includes(generationType)
                ) {
                    handlers.generationStopped();
                    return;
                }
                handlers.intercept();
            }, GENERATE_INTERCEPTOR_ORDER.XIAOBAI_OS_TASKS);
            promptEvents.on(event_types.GENERATE_AFTER_DATA, handlers.requestBuilt);
            promptEvents.on(event_types.GENERATION_ENDED, () => {
                dryRun = false;
                handlers.generationEnded();
            });
            promptEvents.on(event_types.GENERATION_STOPPED, () => {
                dryRun = false;
                handlers.generationStopped();
            });
            return () => {
                unregisterGenerateInterceptor(TASKS_PROMPT_KEY);
                promptEvents.cleanup();
            };
        },
    });
    const agentApiRuntime = createAgentApiController(agentGateway);
    const fourthWallRepository = createFourthWallRepository(chatStore);
    const fourthWallRuntime = createFourthWallRuntime(fourthWallRepository, settingsRepository, agentGateway);
    const walletRuntime = createWalletController({
        economy,
        getChatIdentity: getSillyTavernChatIdentity,
        subscribeData: chatStore.subscribe,
    });
    const shopRuntime = createShopController({
        shop,
        economy,
        getChatIdentity: getSillyTavernChatIdentity,
        isMainGenerationActive: mainGenerationRuntime.isActive,
        subscribeGeneration: mainGenerationRuntime.subscribe,
        subscribeData: chatStore.subscribe,
    });
    const bankRuntime = createBankController({
        bank,
        economy,
        getChatIdentity: getSillyTavernChatIdentity,
        isMainGenerationActive: mainGenerationRuntime.isActive,
        subscribeGeneration: mainGenerationRuntime.subscribe,
        subscribeData: chatStore.subscribe,
    });
    const gameRuntime = createGameController({
        game,
        economy,
        getChatIdentity: getSillyTavernChatIdentity,
        isMainGenerationActive: mainGenerationRuntime.isActive,
        subscribeGeneration: mainGenerationRuntime.subscribe,
        subscribeData: chatStore.subscribe,
    });
    const mapRuntime = createMapController({
        map,
        settings: settingsRepository,
        maintenance: maintenanceRunner,
        getChatIdentity: getSillyTavernChatIdentity,
        subscribeData: chatStore.subscribe,
    });
    const taskRuntime = createTaskController({
        tasks,
        economy,
        generation: taskGeneration,
        settings: settingsRepository,
        maintenance: maintenanceRunner,
        getChatIdentity: getSillyTavernChatIdentity,
        isMainGenerationActive: mainGenerationRuntime.isActive,
        subscribeGeneration: mainGenerationRuntime.subscribe,
        subscribeData: chatStore.subscribe,
    });
    let unsubscribeShopDeliveryState: (() => void) | null = null;
    const shopDeliveryLifecycle = {
        startBackground() {
            unsubscribeShopDeliveryState ||= chatStore.subscribe((change) => {
                if (change.writeState === 'ready') {shopDeliveries.resume(change.identityKey);}
            });
            const identity = getSillyTavernChatIdentity();
            if (identity) {shopDeliveries.resume(identity.key);}
        },
        handleChatChanged() {
            const identity = getSillyTavernChatIdentity();
            if (identity) {shopDeliveries.resume(identity.key);}
        },
        stopBackground() {
            unsubscribeShopDeliveryState?.();
            unsubscribeShopDeliveryState = null;
        },
    };
    const mapSettingsRuntime = createMapSettingsRuntime({
        settings: settingsRepository,
        maintenance: maintenanceRunner,
    });
    const taskSettingsRuntime = createTaskSettingsRuntime({
        settings: settingsRepository,
        maintenance: maintenanceRunner,
    });
    const maintenanceLifecycle = {
        startBackground() {
            maintenanceRunner.startBackground((listener) => {
                const maintenanceEvents = createModuleEvents('xiaobaiOsMaintenance');
                maintenanceEvents.on(event_types.MESSAGE_SENT, (messageIndex: unknown) => {
                    listener(Number(messageIndex));
                });
                return () => maintenanceEvents.cleanup();
            });
        },
        handleChatChanged: maintenanceRunner.handleChatChanged,
        cancelAll: maintenanceRunner.cancelAll,
        stopBackground: maintenanceRunner.stopBackground,
    };
    const appRegistry = createAppRuntimeRegistry([
        { descriptor: AGENT_API_APP_DESCRIPTOR, runtime: agentApiRuntime },
        { descriptor: FOURTH_WALL_APP_DESCRIPTOR, runtime: fourthWallRuntime },
        { descriptor: WALLET_APP_DESCRIPTOR, runtime: walletRuntime },
        { descriptor: SHOP_APP_DESCRIPTOR, runtime: shopRuntime },
        { descriptor: BANK_APP_DESCRIPTOR, runtime: bankRuntime },
        { descriptor: GAME_APP_DESCRIPTOR, runtime: gameRuntime },
        { descriptor: MAP_APP_DESCRIPTOR, runtime: mapRuntime },
        { descriptor: TASKS_APP_DESCRIPTOR, runtime: taskRuntime },
    ], [
        { id: 'service:economy-data-preparation', runtime: economyDataPreparationRuntime },
        { id: 'service:main-generation', runtime: mainGenerationRuntime },
        { id: 'service:shop-prompt', runtime: shopPromptRuntime },
        { id: 'service:shop-delivery', runtime: shopDeliveryLifecycle },
        { id: 'service:map-prompt', runtime: mapPromptRuntime },
        { id: 'service:map-settings', runtime: mapSettingsRuntime },
        { id: 'service:tasks-prompt', runtime: taskPromptRuntime },
        { id: 'service:tasks-settings', runtime: taskSettingsRuntime },
        { id: 'service:maintenance', runtime: maintenanceLifecycle },
    ]);
    return createXiaobaiOsLifecycle({
        stylesheetHref: hostStylesheet,
        frameSrc: frameSource,
        subscribeChatChanged(handler) {
            lifecycleEvents.on(event_types.CHAT_CHANGED, handler);
            return () => lifecycleEvents.cleanup();
        },
        getInitSnapshot: getSillyTavernShellSnapshot,
        getAppDescriptors: appRegistry.getDescriptors,
        appRuntime: appRegistry,
    });
}
