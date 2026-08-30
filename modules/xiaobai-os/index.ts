import { extensionFolderPath } from '../../core/constants.js';
import { createModuleEvents, event_types } from '../../core/event-manager.js';
import { FOURTH_WALL_APP_DESCRIPTOR } from './apps/fourth-wall/descriptor.js';
import { createFourthWallRuntime } from './apps/fourth-wall/host/create-runtime.js';
import { createFourthWallRepository } from './apps/fourth-wall/host/repository.js';
import { WALLET_APP_DESCRIPTOR } from './apps/wallet/descriptor.js';
import { createWalletController } from './apps/wallet/host/controller.js';
import { validateLedger } from './domains/economy/invariants.js';
import { createEconomyRepository } from './domains/economy/repository.js';
import { createEconomyStoryReconciliationRuntime } from './domains/economy/story-reconciliation-runtime.js';
import { createStoryWriteGate } from './domains/economy/story-write-gate.js';
import { createChatDataStore } from './host/chat-data-store.js';
import {
    createDefaultXiaobaiOsSettings,
    validateFourthWallChatState,
} from './host/legacy-migration.js';
import { createAppRuntimeRegistry } from './host/app-runtime-registry.js';
import { createXiaobaiOsLifecycle, type XiaobaiOsLifecycle } from './host/lifecycle.js';
import { createSettingsRepository, type XiaobaiOsSettingsRepository } from './host/settings-repository.js';
import {
    createSillyTavernChatAdapter,
    createSillyTavernSettingsAdapter,
    createSillyTavernStoryAdapter,
    getSillyTavernShellSnapshot,
    getSillyTavernChatIdentity,
} from './host/sillytavern-context.js';

const hostStylesheet = `${extensionFolderPath}/modules/xiaobai-os/host.css`;
const frameSource = `${extensionFolderPath}/modules/xiaobai-os/shell/xiaobai-os.html`;

let runtime: XiaobaiOsLifecycle | null = null;
let initPromise: Promise<boolean> | null = null;
let lifecycleGeneration = 0;
const settingsRepository = createSettingsRepository(createSillyTavernSettingsAdapter());

function createProductionLifecycle(settingsRepository: XiaobaiOsSettingsRepository): XiaobaiOsLifecycle {
    const events = createModuleEvents('xiaobaiOs');
    const chatStore = createChatDataStore(createSillyTavernChatAdapter(), {
        apps: { fourthWall: validateFourthWallChatState },
        domains: { economy: validateLedger },
    });
    const chatRepository = createFourthWallRepository(chatStore);
    const fourthWallRuntime = createFourthWallRuntime(chatRepository, settingsRepository);
    const storyAdapter = createSillyTavernStoryAdapter((handler) => {
        const storyEvents = createModuleEvents('xiaobaiOsEconomyStory');
        const schedule = () => handler();
        storyEvents.on(event_types.MESSAGE_EDITED, schedule);
        storyEvents.on(event_types.MESSAGE_SWIPED, schedule);
        storyEvents.on(event_types.MESSAGE_DELETED, schedule);
        storyEvents.on(event_types.MESSAGE_RECEIVED, schedule);
        return () => storyEvents.cleanup();
    });
    const storyGate = createStoryWriteGate();
    const economy = createEconomyRepository(chatStore, {
        story: { captureCurrent: storyAdapter.captureCurrent, gate: storyGate },
    });
    const storyRuntime = createEconomyStoryReconciliationRuntime(
        storyAdapter,
        economy,
        storyGate,
    );
    const walletRuntime = createWalletController({
        economy,
        storyRuntime,
        getChatIdentity: getSillyTavernChatIdentity,
    });
    const appRegistry = createAppRuntimeRegistry([
        { descriptor: FOURTH_WALL_APP_DESCRIPTOR, runtime: fourthWallRuntime },
        { descriptor: WALLET_APP_DESCRIPTOR, runtime: walletRuntime },
    ], [storyRuntime]);
    return createXiaobaiOsLifecycle({
        stylesheetHref: hostStylesheet,
        frameSrc: frameSource,
        subscribeChatChanged(handler) {
            events.on(event_types.CHAT_CHANGED, handler);
            return () => events.cleanup();
        },
        getInitSnapshot: getSillyTavernShellSnapshot,
        getAppDescriptors: appRegistry.getDescriptors,
        appRuntime: appRegistry,
    });
}

export async function initXiaobaiOs(): Promise<boolean> {
    if (runtime?.isInitialized()) {
        return true;
    }
    if (initPromise) {
        return initPromise;
    }
    const generation = ++lifecycleGeneration;
    initPromise = Promise.resolve()
        .then(async () => {
            const current = await settingsRepository.prepare();
            if (!current.enabled || generation !== lifecycleGeneration) {
                return false;
            }
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
                if (runtime === candidate) {
                    runtime = null;
                }
                throw error;
            }
        })
        .finally(() => {
            if (generation === lifecycleGeneration) {
                initPromise = null;
            }
        });
    return initPromise;
}

export function prepareXiaobaiOsSettings() {
    return settingsRepository.prepare().then((current) => {
        try {
            globalThis.localStorage?.removeItem('LittleWhiteBox:fourthWallFloatBtnPos');
        } catch {}
        return current;
    });
}

export async function setXiaobaiOsEnabled(enabled: boolean) {
    await settingsRepository.prepare();
    return settingsRepository.setEnabled(enabled);
}

export async function openXiaobaiOs(): Promise<boolean> {
    if (!runtime?.isInitialized()) {
        const initialized = await initXiaobaiOs();
        if (!initialized) {
            return false;
        }
    }
    return runtime?.isInitialized() ? runtime.open() : false;
}

export function cleanupXiaobaiOs(): void {
    lifecycleGeneration += 1;
    initPromise = null;
    const current = runtime;
    runtime = null;
    current?.cleanup();
}

export { createDefaultXiaobaiOsSettings };
