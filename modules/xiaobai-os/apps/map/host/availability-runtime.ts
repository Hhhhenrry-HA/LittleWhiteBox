import type { MaintenanceRunner } from '../../../host/maintenance/runner.js';
import type { XiaobaiOsSettingsRepository } from '../../../host/settings-repository.js';
import type { XiaobaiOsAppRuntime } from '../../../types.js';
import type { MapSettings } from '../types.js';
import type { MapPromptRuntime } from './prompt-runtime.js';

interface MapAvailabilityRuntimeDependencies {
    settings: Pick<XiaobaiOsSettingsRepository, 'read' | 'subscribe' | 'subscribeMutationInstalled'>;
    maintenance: Pick<MaintenanceRunner, 'cancelForeground' | 'invalidateAutomatic'>;
    prompt: MapPromptRuntime;
}

export function createMapAvailabilityRuntime({
    settings,
    maintenance,
    prompt,
}: MapAvailabilityRuntimeDependencies): Pick<
    XiaobaiOsAppRuntime,
    'startBackground' | 'stopBackground' | 'handleChatChanged' | 'cancelAll'
> {
    let current: MapSettings | null = null;
    let unsubscribe: (() => void) | null = null;
    let unsubscribeMutationInstalled: (() => void) | null = null;

    function apply(next: MapSettings): void {
        const previous = current;
        current = next;
        if (!previous || (
            previous.enabled === next.enabled
            && previous.autoMaintenance === next.autoMaintenance
        )) {return;}
        if (!previous.enabled && next.enabled) {
            prompt.startBackground?.();
            return;
        }
        if (previous.enabled && !next.enabled) {
            prompt.stopBackground?.();
        }
    }

    function fenceInstalledMutation(
        next: NonNullable<ReturnType<XiaobaiOsSettingsRepository['read']>>,
    ): void {
        if (!next.enabled || !next.apps.map.enabled) {
            const reason = next.enabled ? 'map-disabled' : 'os-disabled';
            maintenance.cancelForeground('map', reason);
            maintenance.invalidateAutomatic('map', reason);
        } else if (current?.autoMaintenance && !next.apps.map.autoMaintenance) {
            maintenance.invalidateAutomatic('map', 'automatic-disabled');
        }
    }

    return Object.freeze({
        startBackground() {
            if (unsubscribe) {return;}
            current = settings.read()?.apps.map || null;
            if (current?.enabled) {prompt.startBackground?.();}
            unsubscribe = settings.subscribe(next => apply(next.apps.map));
            unsubscribeMutationInstalled = settings.subscribeMutationInstalled(fenceInstalledMutation);
        },
        handleChatChanged() {
            prompt.handleChatChanged?.();
        },
        cancelAll(reason: string) {
            prompt.cancelAll?.(reason);
        },
        stopBackground() {
            unsubscribe?.();
            unsubscribeMutationInstalled?.();
            unsubscribe = null;
            unsubscribeMutationInstalled = null;
            current = null;
            prompt.stopBackground?.();
            maintenance.cancelForeground('map', 'stopped');
            maintenance.invalidateAutomatic('map', 'stopped');
        },
    });
}
