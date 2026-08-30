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

function invokeAll(
    runtimes: readonly XiaobaiOsAppRuntime[],
    operation: (runtime: XiaobaiOsAppRuntime) => void,
): void {
    for (const runtime of runtimes) {
        operation(runtime);
    }
}

export function createAppRuntimeRegistry(
    registrations: readonly XiaobaiOsAppRuntimeRegistration[],
    services: readonly XiaobaiOsAppRuntime[] = [],
): XiaobaiOsAppRuntimeRouter {
    const byId = new Map<string, XiaobaiOsAppRuntime>();
    const descriptors = Object.freeze(registrations.map(({ descriptor, runtime }) => {
        if (!descriptor.id || byId.has(descriptor.id)) {
            throw new Error(`duplicate_or_empty_xiaobai_os_app_id:${descriptor.id}`);
        }
        byId.set(descriptor.id, runtime);
        return Object.freeze({ ...descriptor });
    }));
    const runtimes = [...new Set([...byId.values(), ...services])];
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
        runtime.deactivate?.(reason);
    }

    function cancelForeground(reason: string): void {
        generation += 1;
        const current = active;
        active = null;
        current?.runtime.cancelForeground?.(reason);
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
            invokeAll(runtimes, (runtime) => runtime.cancelAll?.(reason));
        },
        handleWindowOpened() {
            invokeAll(runtimes, (runtime) => runtime.handleWindowOpened?.());
        },
        handleWindowClosed(reason: string) {
            invokeAll(runtimes, (runtime) => runtime.handleWindowClosed?.(reason));
        },
        handleChatChanged() {
            invokeAll(runtimes, (runtime) => runtime.handleChatChanged?.());
        },
        startBackground() {
            invokeAll(runtimes, (runtime) => runtime.startBackground?.());
        },
        stopBackground() {
            invokeAll(runtimes, (runtime) => runtime.stopBackground?.());
        },
    });
}
