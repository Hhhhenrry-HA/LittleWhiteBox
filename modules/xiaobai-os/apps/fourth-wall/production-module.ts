import type { XiaobaiOsSettingsRepository } from '../../host/settings-repository.js';
import { createFourthWallRuntime } from './host/create-runtime.js';
import { createFourthWallModule } from './module.js';

export function createProductionFourthWallModule(settings: XiaobaiOsSettingsRepository) {
    return createFourthWallModule({
        async install({ repository, agent }) {
            return createFourthWallRuntime(repository, settings, agent);
        },
        async dispose(runtime) { await runtime.stopBackground?.(); },
    });
}
