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
import { BANK_APP_DESCRIPTOR } from '../apps/bank/descriptor.js';
import { createBankController } from '../apps/bank/host/controller.js';
import { GAME_APP_DESCRIPTOR } from '../apps/game/descriptor.js';
import { createGameController } from '../apps/game/host/controller.js';
import { SHOP_APP_DESCRIPTOR } from '../apps/shop/descriptor.js';
import { createShopEffectDeliveryQueue } from '../apps/shop/application/effect-delivery-queue.js';
import { createShopController } from '../apps/shop/host/controller.js';
import { createShopMessageReceipts } from '../apps/shop/host/message-receipts.js';
import { createShopPromptRuntime } from '../apps/shop/host/prompt-runtime.js';
import { validateBankDomain } from '../domains/bank/invariants.js';
import { createBankService } from '../apps/bank/application/service.js';
import { validateBankEconomyConsistency } from '../apps/bank/application/root-protocol.js';
import { validateGameDomain } from '../domains/game/invariants.js';
import { createGameService } from '../apps/game/application/service.js';
import { validateGameEconomyConsistency } from '../apps/game/application/root-protocol.js';
import { createShopService } from '../apps/shop/application/service.js';
import { readShopDomain, validateShopEconomyConsistency } from '../apps/shop/application/root-protocol.js';
import { validateShopDomain } from '../domains/shop/invariants.js';
import { WALLET_APP_DESCRIPTOR } from '../apps/wallet/descriptor.js';
import { createWalletController } from '../apps/wallet/host/controller.js';
import { validateLedger } from '../domains/economy/invariants.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { createAppRuntimeRegistry } from './app-runtime-registry.js';
import { createChatDataStore } from './chat-data-store.js';
import {
    createDefaultXiaobaiOsSettings,
    validateFourthWallChatState,
} from './legacy-migration.js';
import { createXiaobaiOsLifecycle, type XiaobaiOsLifecycle } from './lifecycle.js';
import { createMainGenerationRuntime } from './main-generation-runtime.js';
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
const hostStylesheet = `${extensionFolderPath}/modules/xiaobai-os/host.css`;
const frameSource = `${extensionFolderPath}/modules/xiaobai-os/shell/xiaobai-os.html`;

function validateProductionRoot(value: unknown, path: string): void {
    validateShopEconomyConsistency(value, path);
    validateBankEconomyConsistency(value, path);
    validateGameEconomyConsistency(value, path);
}

export function createProductionLifecycle(
    settingsRepository: XiaobaiOsSettingsRepository,
): XiaobaiOsLifecycle {
    const lifecycleEvents = createModuleEvents('xiaobaiOs');
    const chatStore = createChatDataStore(createSillyTavernChatAdapter(), {
        apps: { fourthWall: validateFourthWallChatState },
        domains: {
            economy: validateLedger,
            shop: validateShopDomain,
            bank: validateBankDomain,
            game: validateGameDomain,
        },
        root: validateProductionRoot,
    });
    const economy = createEconomyRepository(chatStore);
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
    const fourthWallRepository = createFourthWallRepository(chatStore);
    const fourthWallRuntime = createFourthWallRuntime(fourthWallRepository, settingsRepository);
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
    const appRegistry = createAppRuntimeRegistry([
        { descriptor: FOURTH_WALL_APP_DESCRIPTOR, runtime: fourthWallRuntime },
        { descriptor: WALLET_APP_DESCRIPTOR, runtime: walletRuntime },
        { descriptor: SHOP_APP_DESCRIPTOR, runtime: shopRuntime },
        { descriptor: BANK_APP_DESCRIPTOR, runtime: bankRuntime },
        { descriptor: GAME_APP_DESCRIPTOR, runtime: gameRuntime },
    ], [mainGenerationRuntime, shopPromptRuntime, shopDeliveryLifecycle]);
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
