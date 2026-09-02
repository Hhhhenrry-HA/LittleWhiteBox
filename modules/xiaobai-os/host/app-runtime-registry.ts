import type {
    XiaobaiOsAppActivationContext,
    XiaobaiOsAppRuntime,
    XiaobaiOsAppRuntimeRegistration,
    XiaobaiOsAppRuntimeRouter,
} from '../types.js';
import type { XiaobaiOsHostFrameMessage } from './frame-bridge.js';

interface ActiveRuntime {
    appId: string;
    runtime: XiaobaiOsAppRuntime;
    generation: number;
}

export interface XiaobaiOsRuntimeServiceRegistration {
    id: string;
    runtime: XiaobaiOsAppRuntime;
}

export interface XiaobaiOsRuntimeFailure {
    runtimeId: string;
    operation: keyof XiaobaiOsAppRuntime;
    error: unknown;
}

export interface XiaobaiOsAppRuntimeRegistryOptions {
    onError?: (failure: XiaobaiOsRuntimeFailure) => void;
}

function invokeAll(
    runtimes: readonly XiaobaiOsRuntimeServiceRegistration[],
    operationName: keyof XiaobaiOsAppRuntime,
    operation: (runtime: XiaobaiOsAppRuntime) => void,
    onError: (failure: XiaobaiOsRuntimeFailure) => void,
): void {
    for (const { id, runtime } of runtimes) {
        try {
            operation(runtime);
        } catch (error) {
            onError({ runtimeId: id, operation: operationName, error });
        }
    }
}

export function createAppRuntimeRegistry(
    registrations: readonly XiaobaiOsAppRuntimeRegistration[],
    services: readonly XiaobaiOsRuntimeServiceRegistration[] = [],
    {
        onError = ({ runtimeId, operation, error }) => {
            console.error(`[LittleWhiteBox] 小白 OS 运行单元失败 (${runtimeId}.${operation})`, error);
        },
    }: XiaobaiOsAppRuntimeRegistryOptions = {},
): XiaobaiOsAppRuntimeRouter {
    const byId = new Map<string, XiaobaiOsAppRuntime>();
    const appRuntimes: XiaobaiOsRuntimeServiceRegistration[] = [];
    const descriptors = Object.freeze(registrations.map(({ descriptor, runtime }) => {
        if (!descriptor.id || byId.has(descriptor.id)) {
            throw new Error(`duplicate_or_empty_xiaobai_os_app_id:${descriptor.id}`);
        }
        byId.set(descriptor.id, runtime);
        appRuntimes.push({ id: `app:${descriptor.id}`, runtime });
        return Object.freeze({ ...descriptor });
    }));
    const runtimeIds = new Set(appRuntimes.map(({ id }) => id));
    for (const service of services) {
        if (!service.id || runtimeIds.has(service.id)) {
            throw new Error(`duplicate_or_empty_xiaobai_os_runtime_id:${service.id}`);
        }
        runtimeIds.add(service.id);
    }
    const runtimes = [...appRuntimes, ...services];
    let active: ActiveRuntime | null = null;
    let generation = 0;

    function requireRuntime(appId: string): XiaobaiOsAppRuntime {
        const runtime = byId.get(appId);
        if (!runtime) {
            throw new Error('app_unavailable');
        }
        return runtime;
    }

    async function activate(appId: string, context: XiaobaiOsAppActivationContext): Promise<unknown> {
        const runtime = requireRuntime(appId);
        const activationGeneration = ++generation;
        active = { appId, runtime, generation: activationGeneration };
        try {
            const result = await runtime.activate?.(context);
            if (active?.generation !== activationGeneration) {
                throw new Error('activation_cancelled');
            }
            return result;
        } catch (error) {
            if (active?.generation === activationGeneration) {
                active = null;
            }
            throw error;
        }
    }

    function deactivate(appId: string, reason: string): void {
        const runtime = requireRuntime(appId);
        generation += 1;
        if (active?.runtime === runtime) {
            active = null;
        }
        try {
            runtime.deactivate?.(reason);
        } catch (error) {
            onError({ runtimeId: `app:${appId}`, operation: 'deactivate', error });
        }
    }

    function cancelForeground(reason: string): void {
        generation += 1;
        const current = active;
        active = null;
        if (!current) {return;}
        try {
            current.runtime.cancelForeground?.(reason);
        } catch (error) {
            onError({ runtimeId: `app:${current.appId}`, operation: 'cancelForeground', error });
        }
    }

    return Object.freeze({
        getDescriptors: () => descriptors,
        activate,
        deactivate,
        handleMessage(appId: string, message: XiaobaiOsHostFrameMessage) {
            return requireRuntime(appId).handleMessage?.(message);
        },
        cancelForeground,
        cancelAll(reason: string) {
            generation += 1;
            active = null;
            invokeAll(runtimes, 'cancelAll', runtime => runtime.cancelAll?.(reason), onError);
        },
        handleWindowOpened() {
            invokeAll(runtimes, 'handleWindowOpened', runtime => runtime.handleWindowOpened?.(), onError);
        },
        handleWindowClosed(reason: string) {
            invokeAll(runtimes, 'handleWindowClosed', runtime => runtime.handleWindowClosed?.(reason), onError);
        },
        handleChatChanged() {
            invokeAll(runtimes, 'handleChatChanged', runtime => runtime.handleChatChanged?.(), onError);
        },
        startBackground() {
            invokeAll(runtimes, 'startBackground', runtime => runtime.startBackground?.(), onError);
        },
        stopBackground() {
            invokeAll(runtimes, 'stopBackground', runtime => runtime.stopBackground?.(), onError);
        },
    });
}
