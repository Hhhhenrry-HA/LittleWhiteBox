import type { Component } from 'vue';
import appIds from './app-catalog.json';
import { AGENT_API_APP_DESCRIPTOR } from '../apps/agent-api/descriptor.js';
import { BANK_APP_DESCRIPTOR } from '../apps/bank/descriptor.js';
import { FOURTH_WALL_APP_DESCRIPTOR } from '../apps/fourth-wall/descriptor.js';
import { GAME_APP_DESCRIPTOR } from '../apps/game/descriptor.js';
import { MAP_APP_DESCRIPTOR } from '../apps/map/descriptor.js';
import { SHOP_APP_DESCRIPTOR } from '../apps/shop/descriptor.js';
import { TASKS_APP_DESCRIPTOR } from '../apps/tasks/descriptor.js';
import { WALLET_APP_DESCRIPTOR } from '../apps/wallet/descriptor.js';

interface ComponentModule {
    default: Component;
}

export interface XiaobaiOsAppDefinition {
    id: string;
    name: string;
    accent: string;
    iconPaths: readonly string[];
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
    iconPaths: readonly string[],
    importer: () => Promise<ComponentModule>,
): XiaobaiOsAppDefinition {
    const loader = createAppComponentLoader(importer);
    return Object.freeze({
        ...descriptor,
        iconPaths: Object.freeze([...iconPaths]),
        load: loader.load,
        resetLoader: loader.reset,
    });
}

const appsById: Readonly<Record<string, XiaobaiOsAppDefinition>> = Object.freeze({
    'agent-api': defineApp(AGENT_API_APP_DESCRIPTOR, [
        'M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z',
        'M19 24h26M19 34h18M19 44h11M45 44h.1',
    ], () => import('../apps/agent-api/ui/AgentApiApp.vue')),
    'fourth-wall': defineApp(FOURTH_WALL_APP_DESCRIPTOR, [
        'M13 15h38v29H32l-12 9 3-9H13z',
        'M22 25h20M22 33h14',
    ], () => import('../apps/fourth-wall/ui/FourthWallApp.vue')),
    wallet: defineApp(WALLET_APP_DESCRIPTOR, [
        'M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27',
        'M54 30H42a6 6 0 0 0 0 12h12M43 36h.1',
    ], () => import('../apps/wallet/ui/WalletApp.vue')),
    shop: defineApp(SHOP_APP_DESCRIPTOR, [
        'M14 19h36l-3 35H17z',
        'M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22',
    ], () => import('../apps/shop/ui/ShopApp.vue')),
    bank: defineApp(BANK_APP_DESCRIPTOR, [
        'M9 24h46L32 9z',
        'M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28',
    ], () => import('../apps/bank/ui/BankApp.vue')),
    game: defineApp(GAME_APP_DESCRIPTOR, [
        'M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z',
        'M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1',
    ], () => import('../apps/game/ui/GameApp.vue')),
    map: defineApp(MAP_APP_DESCRIPTOR, [
        'M11 16l13-6 16 6 13-6v38l-13 6-16-6-13 6z',
        'M24 10v38M40 16v38M18 31l6-3 8 3 8-4 7 3',
    ], () => import('../apps/map/ui/MapApp.vue')),
    tasks: defineApp(TASKS_APP_DESCRIPTOR, [
        'M17 12h30a5 5 0 0 1 5 5v35H12V17a5 5 0 0 1 5-5z',
        'M21 23h22M21 32h22M21 41h14',
        'M18 9h28v8H18z',
    ], () => import('../apps/tasks/ui/TasksApp.vue')),
});

export const xiaobaiOsApps: readonly XiaobaiOsAppDefinition[] = Object.freeze(appIds.map(id => {
    const app = appsById[id];
    if (!app) { throw new Error(`missing_shell_app:${id}`); }
    return app;
}));

export const XIAOBAI_OS_SHELL_APP_IDS = Object.freeze(xiaobaiOsApps.map(app => app.id));
