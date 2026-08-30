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
import { createShopController } from '../apps/shop/host/controller.js';
import { createShopPromptRuntime } from '../apps/shop/host/prompt-runtime.js';
import { validateBankDomain } from '../domains/bank/invariants.js';
import { createBankService } from '../apps/bank/application/service.js';
import { reconcileBankDomainInRoot, validateBankEconomyConsistency } from '../apps/bank/application/root-protocol.js';
import { validateGameDomain } from '../domains/game/invariants.js';
import { createGameService } from '../apps/game/application/service.js';
import { reconcileGameDomainInRoot, validateGameEconomyConsistency } from '../apps/game/application/root-protocol.js';
import { createShopService } from '../apps/shop/application/service.js';
import { readShopDomain, reconcileShopDomainInRoot, validateShopEconomyConsistency } from '../apps/shop/application/root-protocol.js';
import { validateShopDomain } from '../domains/shop/invariants.js';
import { WALLET_APP_DESCRIPTOR } from '../apps/wallet/descriptor.js';
import { createWalletController } from '../apps/wallet/host/controller.js';
import { validateLedger } from '../domains/economy/invariants.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { reconcileLedgerWithStory } from '../domains/economy/timeline.js';
import type { EconomyLedgerV1 } from '../domains/economy/types.js';
import type { XiaobaiOsChatData } from '../types.js';
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
    createSillyTavernStoryAdapter,
    getSillyTavernChatIdentity,
    getSillyTavernShellSnapshot,
} from './sillytavern-context.js';
import { createStoryActionRunner } from './story-action-runner.js';
import { createStoryReconciliationRuntime, type StoryDomainReconciler } from './story-reconciliation-runtime.js';
import { createStoryWriteGate } from './story-write-gate.js';

export { createDefaultXiaobaiOsSettings };

const SHOP_PROMPT_KEY = 'xiaobai_os_shop_effects';
const hostStylesheet = `${extensionFolderPath}/modules/xiaobai-os/host.css`;
const frameSource = `${extensionFolderPath}/modules/xiaobai-os/shell/xiaobai-os.html`;

function readEconomy(root: XiaobaiOsChatData): EconomyLedgerV1 {
    const value = root.domains.economy;
    validateLedger(value);
    return structuredClone(value);
}

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
    const storyAdapter = createSillyTavernStoryAdapter((handler) => {
        const storyEvents = createModuleEvents('xiaobaiOsStory');
        const schedule = () => handler();
        storyEvents.on(event_types.MESSAGE_EDITED, schedule);
        storyEvents.on(event_types.MESSAGE_SWIPED, schedule);
        storyEvents.on(event_types.MESSAGE_DELETED, schedule);
        storyEvents.on(event_types.MESSAGE_RECEIVED, schedule);
        storyEvents.on(event_types.MESSAGE_UPDATED, schedule);
        return () => storyEvents.cleanup();
    });
    const storyGate = createStoryWriteGate();
    const reconcilers: StoryDomainReconciler[] = [{
        key: 'economy',
        hasData: root => root?.domains.economy !== undefined,
        reconcile(root, fingerprint) {
            const reconciled = reconcileLedgerWithStory(readEconomy(root), fingerprint);
            const next = structuredClone(root);
            next.domains.economy = reconciled.ledger;
            return { root: next, impact: reconciled.impact };
        },
    }, {
        key: 'shop',
        hasData: root => root?.domains.shop !== undefined,
        reconcile: reconcileShopDomainInRoot,
    }, {
        key: 'bank',
        hasData: root => root?.domains.bank !== undefined,
        reconcile: reconcileBankDomainInRoot,
    }, {
        key: 'game',
        hasData: root => root?.domains.game !== undefined,
        reconcile: reconcileGameDomainInRoot,
    }];
    const storyRuntime = createStoryReconciliationRuntime(
        storyAdapter,
        chatStore,
        storyGate,
        reconcilers,
    );
    const actionRunner = createStoryActionRunner(chatStore, storyAdapter, storyGate, storyRuntime.reconcileNow);
    const economy = createEconomyRepository(chatStore, { actionRunner });
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
    const shopPromptRuntime = createShopPromptRuntime({
        captureStory: storyAdapter.captureCurrent,
        readShop: () => readShopDomain(chatStore.readCurrent()),
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
            registerGenerateInterceptor(SHOP_PROMPT_KEY, (
                _chat: unknown,
                _contextSize: unknown,
                _abort: unknown,
                type: unknown,
            ) => handlers.intercept({ type: String(type || '') }), GENERATE_INTERCEPTOR_ORDER.XIAOBAI_OS_SHOP);
            promptEvents.on(event_types.GENERATE_AFTER_DATA, handlers.finished);
            promptEvents.on(event_types.GENERATION_ENDED, handlers.finished);
            promptEvents.on(event_types.GENERATION_STOPPED, handlers.finished);
            return () => {
                unregisterGenerateInterceptor(SHOP_PROMPT_KEY);
                promptEvents.cleanup();
            };
        },
    });
    const shop = createShopService(chatStore, actionRunner, {
        isMainGenerationActive: mainGenerationRuntime.isActive,
    });
    const bank = createBankService(chatStore, actionRunner, {
        getCurrentAssistantTurn: () => storyAdapter.captureCurrent()?.messages.reduce(
            (count, message) => count + Number(message.role === 'assistant'),
            0,
        ) || 0,
        isMainGenerationActive: mainGenerationRuntime.isActive,
    });
    const game = createGameService(chatStore, actionRunner, {
        isMainGenerationActive: mainGenerationRuntime.isActive,
    });
    const fourthWallRepository = createFourthWallRepository(chatStore);
    const fourthWallRuntime = createFourthWallRuntime(fourthWallRepository, settingsRepository);
    const walletRuntime = createWalletController({
        economy,
        storyRuntime,
        getChatIdentity: getSillyTavernChatIdentity,
    });
    const shopRuntime = createShopController({
        shop,
        economy,
        storyRuntime,
        captureStory: storyAdapter.captureCurrent,
        getChatIdentity: getSillyTavernChatIdentity,
        isMainGenerationActive: mainGenerationRuntime.isActive,
        subscribeGeneration: mainGenerationRuntime.subscribe,
    });
    const bankRuntime = createBankController({
        bank,
        economy,
        storyRuntime,
        getChatIdentity: getSillyTavernChatIdentity,
        isMainGenerationActive: mainGenerationRuntime.isActive,
        subscribeGeneration: mainGenerationRuntime.subscribe,
    });
    const gameRuntime = createGameController({
        game,
        economy,
        storyRuntime,
        getChatIdentity: getSillyTavernChatIdentity,
        isMainGenerationActive: mainGenerationRuntime.isActive,
        subscribeGeneration: mainGenerationRuntime.subscribe,
    });
    const appRegistry = createAppRuntimeRegistry([
        { descriptor: FOURTH_WALL_APP_DESCRIPTOR, runtime: fourthWallRuntime },
        { descriptor: WALLET_APP_DESCRIPTOR, runtime: walletRuntime },
        { descriptor: SHOP_APP_DESCRIPTOR, runtime: shopRuntime },
        { descriptor: BANK_APP_DESCRIPTOR, runtime: bankRuntime },
        { descriptor: GAME_APP_DESCRIPTOR, runtime: gameRuntime },
    ], [storyRuntime, mainGenerationRuntime, shopPromptRuntime]);
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
