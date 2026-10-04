import { createModuleEvents, event_types } from '../../../../../core/event-manager.js';
import { extensionFolderPath } from '../../../../../core/constants.js';
import { getSillyTavernChatSurface, getSillyTavernShellSnapshot } from '../../../host/sillytavern-context.js';
import type { XiaobaiOsAppRuntime } from '../../../types.js';
import type { XiaobaiOsSettingsRepository } from '../../../host/settings-repository.js';
import type { MapService } from '../application/service.js';
import type { MapClientState } from '../types.js';
import type { MaintenanceRunner } from '../../../capabilities/maintenance/runner.js';
import { createMapProjectionDisplay } from './projection-display.js';

export function createMapProjectionRuntime(map: MapService, settings: XiaobaiOsSettingsRepository,
    maintenance: MaintenanceRunner, readState: () => MapClientState): XiaobaiOsAppRuntime {
    const display = createMapProjectionDisplay({
        enabled: () => {
            const current = settings.read();
            return current?.enabled === true && current.apps.map.projectToChat;
        },
        readState,
        captureChat: getSillyTavernChatSurface,
        readTheme: () => getSillyTavernShellSnapshot().theme,
        frameSrc: `/${extensionFolderPath}/modules/xiaobai-os/apps/map/ui/projection.html`,
        subscribe({ stateChanged, messagesChanged, chatChanged }) {
            const events = createModuleEvents('xiaobaiOsMapProjection');
            events.on(event_types.CHAT_CHANGED, chatChanged);
            // MESSAGE_EDITED precedes the host DOM update; MESSAGE_UPDATED is its completion boundary.
            for (const event of [event_types.CHARACTER_MESSAGE_RENDERED,
                event_types.MESSAGE_DELETED, event_types.MESSAGE_UPDATED, event_types.MESSAGE_SWIPED]) {
                events.on(event, messagesChanged);
            }
            const unsubscribers = [map.subscribe(stateChanged), settings.subscribe(stateChanged),
                maintenance.subscribeStatus(participant => { if (participant === 'map') { stateChanged(); } })];
            return () => { events.cleanup(); unsubscribers.forEach(unsubscribe => unsubscribe()); };
        },
    });
    return { startBackground: display.start, stopBackground: display.stop };
}
