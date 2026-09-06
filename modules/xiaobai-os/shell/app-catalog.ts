import type { Component } from 'vue';
import appIds from './app-catalog.json';
import { AGENT_API_APP_DESCRIPTOR } from '../apps/agent-api/descriptor.js';
import { BANK_APP_DESCRIPTOR } from '../apps/bank/descriptor.js';
import { FOURTH_WALL_APP_DESCRIPTOR } from '../apps/fourth-wall/descriptor.js';
import { GAME_APP_DESCRIPTOR } from '../apps/game/descriptor.js';
import { MAP_APP_DESCRIPTOR } from '../apps/map/descriptor.js';
import { MESSAGES_APP_DESCRIPTOR } from '../apps/messages/descriptor.js';
import { SHOP_APP_DESCRIPTOR } from '../apps/shop/descriptor.js';
import { TASKS_APP_DESCRIPTOR } from '../apps/tasks/descriptor.js';
import { WALLET_APP_DESCRIPTOR } from '../apps/wallet/descriptor.js';
import { WORLD_APP_DESCRIPTOR } from '../apps/world/descriptor.js';
const agentApiIcon = new URL('../apps/agent-api/ui/icon.svg', import.meta.url).href;
const fourthWallIcon = new URL('../apps/fourth-wall/ui/icon.svg', import.meta.url).href;
const walletIcon = new URL('../apps/wallet/ui/icon.svg', import.meta.url).href;
const shopIcon = new URL('../apps/shop/ui/icon.svg', import.meta.url).href;
const bankIcon = new URL('../apps/bank/ui/icon.svg', import.meta.url).href;
const gameIcon = new URL('../apps/game/ui/icon.svg', import.meta.url).href;
const mapIcon = new URL('../apps/map/ui/icon.svg', import.meta.url).href;
const messagesIcon = new URL('../apps/messages/ui/icon.svg', import.meta.url).href;
const tasksIcon = new URL('../apps/tasks/ui/icon.svg', import.meta.url).href;
const worldIcon = new URL('../apps/world/ui/icon.svg', import.meta.url).href;

interface ComponentModule {
    default: Component;
}

export interface XiaobaiOsAppDefinition {
    id: string;
    name: string;
    accent: string;
    icon: string;
    load(): Promise<Component>;
    resetLoader(): void;
}

export function createAppComponentLoader(importer: () => Promise<ComponentModule>): {
    load(): Promise<Component>;
    reset(): void;
} {
    let loaded: Component | null = null;
    let pending: Promise<Component> | null = null;
    return Object.freeze({
        load() {
            if (loaded) { return Promise.resolve(loaded); }
            pending ??= importer().then(module => {
                if (!module?.default) { throw new Error('app_component_missing'); }
                loaded = module.default;
                return loaded;
            }).catch(error => {
                pending = null;
                throw error;
            });
            return pending;
        },
        reset() {
            loaded = null;
            pending = null;
        },
    });
}

function defineApp(
    descriptor: { id: string; name: string; accent: string },
    icon: string,
    importer: () => Promise<ComponentModule>,
): XiaobaiOsAppDefinition {
    const loader = createAppComponentLoader(importer);
    return Object.freeze({
        ...descriptor,
        icon,
        load: loader.load,
        resetLoader: loader.reset,
    });
}

const appsById: Readonly<Record<string, XiaobaiOsAppDefinition>> = Object.freeze({
    'agent-api': defineApp(AGENT_API_APP_DESCRIPTOR, agentApiIcon, () => import('../apps/agent-api/ui/AgentApiApp.vue')),
    'fourth-wall': defineApp(FOURTH_WALL_APP_DESCRIPTOR, fourthWallIcon, () => import('../apps/fourth-wall/ui/FourthWallApp.vue')),
    wallet: defineApp(WALLET_APP_DESCRIPTOR, walletIcon, () => import('../apps/wallet/ui/WalletApp.vue')),
    shop: defineApp(SHOP_APP_DESCRIPTOR, shopIcon, () => import('../apps/shop/ui/ShopApp.vue')),
    bank: defineApp(BANK_APP_DESCRIPTOR, bankIcon, () => import('../apps/bank/ui/BankApp.vue')),
    game: defineApp(GAME_APP_DESCRIPTOR, gameIcon, () => import('../apps/game/ui/GameApp.vue')),
    map: defineApp(MAP_APP_DESCRIPTOR, mapIcon, () => import('../apps/map/ui/MapApp.vue')),
    messages: defineApp(MESSAGES_APP_DESCRIPTOR, messagesIcon, () => import('../apps/messages/ui/MessagesApp.vue')),
    tasks: defineApp(TASKS_APP_DESCRIPTOR, tasksIcon, () => import('../apps/tasks/ui/TasksApp.vue')),
    world: defineApp(WORLD_APP_DESCRIPTOR, worldIcon, () => import('../apps/world/ui/WorldApp.vue')),
});

export const xiaobaiOsApps: readonly XiaobaiOsAppDefinition[] = Object.freeze(appIds.map(id => {
    const app = appsById[id];
    if (!app) { throw new Error(`missing_shell_app:${id}`); }
    return app;
}));

export const XIAOBAI_OS_SHELL_APP_IDS = Object.freeze(xiaobaiOsApps.map(app => app.id));
