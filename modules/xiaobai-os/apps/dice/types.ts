export type DiceFeature = 'actionChecksEnabled' | 'encountersEnabled';
export const ACTION_CHECK_FREQUENCIES = ['standard', 'active'] as const;
export type ActionCheckFrequency = typeof ACTION_CHECK_FREQUENCIES[number];

export interface DiceSettings {
    actionChecksEnabled: boolean;
    actionCheckFrequency: ActionCheckFrequency;
    encountersEnabled: boolean;
}

export interface DiceClientState extends DiceSettings {
    chatIdentity: string;
}
