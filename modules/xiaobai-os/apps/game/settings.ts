export interface GameSettings {
    movingSoundEnabled: boolean;
    stackingSoundEnabled: boolean;
}

export const DEFAULT_MOVING_SOUND_ENABLED = true;
export const DEFAULT_STACKING_SOUND_ENABLED = true;

export function normalizeGameSettings(value: unknown): GameSettings {
    const input = value !== null && typeof value === 'object' && !Array.isArray(value)
        ? value as Record<string, unknown> : {};
    return { movingSoundEnabled: typeof input.movingSoundEnabled === 'boolean'
        ? input.movingSoundEnabled : DEFAULT_MOVING_SOUND_ENABLED,
    stackingSoundEnabled: typeof input.stackingSoundEnabled === 'boolean' ? input.stackingSoundEnabled : DEFAULT_STACKING_SOUND_ENABLED };
}
