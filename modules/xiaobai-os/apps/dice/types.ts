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
    /** Persisted input is preserved, even when invalid; Dice validates it before use. */
    coc7Sheet: unknown;
}

export interface DiceClientState extends Omit<DiceSettings, 'coc7Sheet'> {
    chatIdentity: string;
    coc7Sheet: Coc7SheetState;
}
import type { Coc7SheetState } from './domain/coc7-sheet.js';
