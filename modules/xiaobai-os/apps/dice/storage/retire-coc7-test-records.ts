import { DICE_MESSAGE_KEY, parseDiceRecords } from '../domain/check-records.js';
import { stripCheckMarkers } from '../domain/check-marker.js';
import type { DiceHostMessage } from '../host/message-records.js';

// One-time removal of testing-line 9bded7e1 CoC records on chat load.
// Delete this boundary after those testing artifacts have been cleared. It never translates old stats.
function retirement(value: unknown) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) { return null; }
    const raw = value as { schemaVersion?: unknown; checks?: unknown };
    if (raw.schemaVersion !== 2 || !Array.isArray(raw.checks)) { return null; }
    const ids = new Set<string>();
    const checks = raw.checks.filter(item => {
        if (!item || typeof item !== 'object' || item.rule !== 'coc7' || !Object.hasOwn(item.request ?? {}, 'kind')) { return true; }
        if (!['skill', 'opposed', 'melee_dodge', 'melee_fight_back'].includes(item.request.kind)
            || typeof item.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(item.id) || ids.has(item.id)) {
            throw new TypeError('dice_coc7_retirement_invalid');
        }
        ids.add(item.id);
        return false;
    });
    if (!ids.size) { return null; }
    const records = parseDiceRecords({ ...raw, checks });
    if (records.checks.some(item => ids.has(item.id))) { throw new TypeError('dice_coc7_retirement_invalid'); }
    return { ids, records: records.checks.length ? records : undefined };
}

/** Null defers a busy chat without mutation. Invalid data still throws. Native save owns persistence. */
export function retireCoc7TestRecords(messages: DiceHostMessage[], canApply: (message: DiceHostMessage) => boolean = () => true): Set<DiceHostMessage> | null {
    const changes: (() => void)[] = [];
    const changed = new Set<DiceHostMessage>();
    for (const message of messages) {
        const current = retirement(message.extra?.[DICE_MESSAGE_KEY]);
        const swipes = (message.swipe_info ?? []).map(info => retirement(info?.extra?.[DICE_MESSAGE_KEY]));
        if (!current && !swipes.some(Boolean)) { continue; }
        if (!canApply(message)) { return null; }
        const update = (extra: Record<string, unknown> | undefined, plan: NonNullable<ReturnType<typeof retirement>>) => {
            if (!extra) { return; }
            if (plan.records) { extra[DICE_MESSAGE_KEY] = plan.records; } else { delete extra[DICE_MESSAGE_KEY]; }
            if (typeof extra.display_text === 'string') { extra.display_text = stripCheckMarkers(extra.display_text, plan.ids); }
        };
        changes.push(() => {
            if (current) { message.mes = stripCheckMarkers(message.mes, current.ids); update(message.extra, current); }
            for (const [index, plan] of swipes.entries()) {
                const selected = plan ?? (index === (message.swipe_id ?? 0) ? current : null);
                if (!selected) { continue; }
                if (typeof message.swipes?.[index] === 'string') { message.swipes[index] = stripCheckMarkers(message.swipes[index], selected.ids); }
                update(message.swipe_info?.[index]?.extra, selected);
            }
            // Some host files have swipe text but no swipe_info for the active candidate.
            const active = message.swipe_id ?? 0;
            if (current && typeof message.swipes?.[active] === 'string') { message.swipes[active] = stripCheckMarkers(message.swipes[active], current.ids); }
            changed.add(message);
        });
    }
    changes.forEach(apply => apply());
    return changed;
}
