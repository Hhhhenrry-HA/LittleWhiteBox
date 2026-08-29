import type { Component } from 'vue';
import FourthWallApp from '../../apps/fourth-wall/ui/FourthWallApp.vue';
import type { XiaobaiOsFrameBridge } from './frame-bridge.js';

export interface XiaobaiOsAppProps {
    bridge: XiaobaiOsFrameBridge;
    initialState: unknown;
}

export interface XiaobaiOsAppDefinition {
    id: string;
    name: string;
    accent: string;
    component: Component;
}

export const xiaobaiOsApps: readonly XiaobaiOsAppDefinition[] = Object.freeze([{
    id: 'fourth-wall',
    name: '四次元壁',
    accent: '#7567d8',
    component: FourthWallApp,
}]);
