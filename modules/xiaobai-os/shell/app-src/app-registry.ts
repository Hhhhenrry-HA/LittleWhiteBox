import type { Component } from 'vue';
import { FOURTH_WALL_APP_DESCRIPTOR } from '../../apps/fourth-wall/descriptor.js';
import FourthWallApp from '../../apps/fourth-wall/ui/FourthWallApp.vue';
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
    icon: 'conversation' | 'wallet';
    component: Component;
}

export const xiaobaiOsApps: readonly XiaobaiOsAppDefinition[] = Object.freeze([
    {
        ...FOURTH_WALL_APP_DESCRIPTOR,
        icon: 'conversation',
        component: FourthWallApp,
    },
    {
        ...WALLET_APP_DESCRIPTOR,
        icon: 'wallet',
        component: WalletApp,
    },
]);
