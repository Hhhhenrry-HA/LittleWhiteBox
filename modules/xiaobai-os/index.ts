import { createDefaultXiaobaiOsSettings } from './host/settings-normalization.js';
import type { XiaobaiOsLifecycle } from './host/lifecycle.js';
import { createProductionLifecycle } from './host/production-composition.js';
import { createSettingsRepository } from './host/settings-repository.js';
import { createSillyTavernSettingsAdapter } from './host/sillytavern-context.js';

let runtime: XiaobaiOsLifecycle | null = null;
let initPromise: Promise<boolean> | null = null;
let lifecycleGeneration = 0;
const settingsRepository = createSettingsRepository(createSillyTavernSettingsAdapter());

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
