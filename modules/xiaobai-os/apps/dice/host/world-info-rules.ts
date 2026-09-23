import { newWorldInfoEntryTemplate, world_info_position } from '../../../../../../../../world-info.js';

/** Adds a rule to the current native scan, without creating or saving a lorebook. */
export function appendDiceWorldInfoRules(payload: { globalLore: unknown[] }, content: string): void {
    if (!content) { return; }
    payload.globalLore.push({
        ...newWorldInfoEntryTemplate,
        uid: -1,
        world: 'littlewhitebox-dice-runtime',
        content,
        constant: true,
        position: world_info_position.after,
        order: 999,
        preventRecursion: true,
        ignoreBudget: false,
    });
}
