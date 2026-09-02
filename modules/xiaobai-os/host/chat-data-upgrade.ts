import { upgradeEconomyLedger } from '../domains/economy/migration.js';
import type { XiaobaiOsChatData } from '../types.js';
import { cloneXiaobaiOsData, validateXiaobaiOsChatData } from './legacy-migration.js';

/** Upgrades owned chat-data branches while leaving unrelated app/domain data untouched. */
export function upgradeXiaobaiOsChatData(value: unknown): XiaobaiOsChatData | null {
    validateXiaobaiOsChatData(value);
    const current = value as XiaobaiOsChatData;
    if (!Object.hasOwn(current.domains, 'economy')) {return null;}
    const economy = upgradeEconomyLedger(current.domains.economy);
    if (economy === null) {return null;}
    const upgraded = cloneXiaobaiOsData(current);
    upgraded.domains.economy = economy;
    return upgraded;
}
