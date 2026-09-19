export type DiceFeature = 'actionChecksEnabled' | 'encountersEnabled';
export const ACTION_CHECK_FREQUENCIES = ['standard', 'active'] as const;
export type ActionCheckFrequency = typeof ACTION_CHECK_FREQUENCIES[number];
export const ACTION_CHECK_RULES = ['d20', 'coc7'] as const;
export type ActionCheckRule = typeof ACTION_CHECK_RULES[number];

export interface DiceSettings {
    actionChecksEnabled: boolean;
    actionCheckFrequency: ActionCheckFrequency;
    actionCheckRule: ActionCheckRule;
    encountersEnabled: boolean;
}

export interface DiceClientState extends DiceSettings {
    chatIdentity: string;
    checkBusy: boolean;
}
