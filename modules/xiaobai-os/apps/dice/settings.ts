import { ACTION_CHECK_FREQUENCIES, type ActionCheckFrequency, type DiceSettings } from './types.js';

export function isActionCheckFrequency(value: unknown): value is ActionCheckFrequency {
    return ACTION_CHECK_FREQUENCIES.some(frequency => value === frequency);
}

export function normalizeDiceSettings(value: unknown): DiceSettings {
    const input = value !== null && typeof value === 'object' && !Array.isArray(value)
        ? value as Record<string, unknown> : {};
    return {
        actionChecksEnabled: typeof input.actionChecksEnabled === 'boolean' ? input.actionChecksEnabled : false,
        // Upstream 32a314b8–a32c28d0 saved `light`; the standard default absorbs it at settings load.
        // Retain this conversion while those installed settings are supported; runtime writes accept only current choices.
        actionCheckFrequency: isActionCheckFrequency(input.actionCheckFrequency) ? input.actionCheckFrequency : 'standard',
        encountersEnabled: typeof input.encountersEnabled === 'boolean' ? input.encountersEnabled : false,
    };
}
