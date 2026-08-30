import type { Component } from 'vue';
import { BANK_APP_DESCRIPTOR } from '../../apps/bank/descriptor.js';
import BankApp from '../../apps/bank/ui/BankApp.vue';
import { GAME_APP_DESCRIPTOR } from '../../apps/game/descriptor.js';
import GameApp from '../../apps/game/ui/GameApp.vue';
import { FOURTH_WALL_APP_DESCRIPTOR } from '../../apps/fourth-wall/descriptor.js';
import FourthWallApp from '../../apps/fourth-wall/ui/FourthWallApp.vue';
import { SHOP_APP_DESCRIPTOR } from '../../apps/shop/descriptor.js';
import ShopApp from '../../apps/shop/ui/ShopApp.vue';
import { WALLET_APP_DESCRIPTOR } from '../../apps/wallet/descriptor.js';
import WalletApp from '../../apps/wallet/ui/WalletApp.vue';
import type { XiaobaiOsFrameBridge } from './frame-bridge.js';

export interface XiaobaiOsAppProps {
    bridge: XiaobaiOsFrameBridge;
    initialState: unknown;
}

export interface XiaobaiOsAppDefinition {
    id: string;
    name: string;
    accent: string;
    iconPaths: readonly string[];
    component: Component;
}

export const xiaobaiOsApps: readonly XiaobaiOsAppDefinition[] = Object.freeze([
    {
        ...FOURTH_WALL_APP_DESCRIPTOR,
        iconPaths: ['M13 15h38v29H32l-12 9 3-9H13z', 'M22 25h20M22 33h14'],
        component: FourthWallApp,
    },
    {
        ...WALLET_APP_DESCRIPTOR,
        iconPaths: ['M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27', 'M54 30H42a6 6 0 0 0 0 12h12M43 36h.1'],
        component: WalletApp,
    },
    {
        ...SHOP_APP_DESCRIPTOR,
        iconPaths: ['M14 19h36l-3 35H17z', 'M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22'],
        component: ShopApp,
    },
    {
        ...BANK_APP_DESCRIPTOR,
        iconPaths: ['M9 24h46L32 9z', 'M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28'],
        component: BankApp,
    },
    {
        ...GAME_APP_DESCRIPTOR,
        iconPaths: ['M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z', 'M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1'],
        component: GameApp,
    },
]);
