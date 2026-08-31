import type { XiaobaiOsHostFrameMessage } from './host/frame-bridge.js';

export interface XiaobaiOsSettings<TApps extends object = Record<string, unknown>> {
    schemaVersion: 1;
    enabled: boolean;
    apps: TApps;
}

export interface XiaobaiOsChatData<
    TApps extends object = Record<string, unknown>,
    TDomains extends object = Record<string, unknown>,
> {
    schemaVersion: 2;
    apps: TApps;
    domains: TDomains;
}

export interface XiaobaiOsChatIdentity {
    key: string;
    kind: 'group' | 'character';
    ownerId: string;
    chatId: string;
}

export type XiaobaiOsChatIdentityInput = XiaobaiOsChatIdentity | string;

export interface XiaobaiOsAppDescriptor {
    id: string;
    name: string;
    accent: string;
}

export interface XiaobaiOsAppActivationContext {
    post: (type: string, payload?: unknown, responseId?: string) => boolean;
}

export interface XiaobaiOsAppRuntime {
    activate?: (context: XiaobaiOsAppActivationContext) => unknown | Promise<unknown>;
    deactivate?: (reason: string) => void;
    handleMessage?: (message: XiaobaiOsHostFrameMessage) => unknown | Promise<unknown>;
    cancelForeground?: (reason: string) => void;
    cancelAll?: (reason: string) => void;
    handleWindowOpened?: () => void;
    handleWindowClosed?: (reason: string) => void;
    handleChatChanged?: () => void;
    startBackground?: () => void;
    stopBackground?: () => void;
}

export interface XiaobaiOsAppRuntimeRegistration {
    descriptor: Readonly<XiaobaiOsAppDescriptor>;
    runtime: XiaobaiOsAppRuntime;
}

export interface XiaobaiOsAppRuntimeRouter {
    getDescriptors: () => readonly Readonly<XiaobaiOsAppDescriptor>[];
    activate: (appId: string, context: XiaobaiOsAppActivationContext) => unknown | Promise<unknown>;
    deactivate: (appId: string, reason: string) => void;
    handleMessage: (appId: string, message: XiaobaiOsHostFrameMessage) => unknown | Promise<unknown>;
    cancelForeground: (reason: string) => void;
    cancelAll: (reason: string) => void;
    handleWindowOpened: () => void;
    handleWindowClosed: (reason: string) => void;
    handleChatChanged: () => void;
    startBackground: () => void;
    stopBackground: () => void;
}
