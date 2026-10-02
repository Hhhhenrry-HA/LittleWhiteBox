export const REVEAL_TIMING = { fall: 390, settle: 250, collapse: 980, celebration: 700, acknowledgement: 140 } as const;
export type RevealKind = 'placed' | 'lost' | 'won' | 'cashed';
export type SceneCue = 'release' | 'land' | 'lose' | 'reward' | 'danger' | 'turn';

/** A confirmed-result performance clock. It owns no rule, payout or game state. */
export function createRevealTimeline(emit: (cue: SceneCue) => void) {
    let kind: RevealKind | null = null, elapsed = 0, contact = true;
    const emitted = new Set<SceneCue>();
    const settleDuration = () => contact ? REVEAL_TIMING.settle : 0;
    const duration = () => kind === 'cashed' ? REVEAL_TIMING.celebration
        : REVEAL_TIMING.fall + settleDuration() + (kind === 'lost' ? REVEAL_TIMING.collapse : kind === 'won' ? REVEAL_TIMING.celebration : 0);
    function cue(name: SceneCue, at: number) { if (elapsed >= at && !emitted.has(name)) { emitted.add(name); emit(name); } }
    const fraction = (start: number, length: number) => Math.max(0, Math.min(1, (elapsed - start) / length));
    return {
        start(next: RevealKind, touchesSupport = true) { kind = next; contact = touchesSupport; elapsed = 0; emitted.clear(); },
        clear() { kind = null; elapsed = 0; emitted.clear(); },
        advance(milliseconds: number, reduced: boolean) {
            if (!kind) { return; }
            elapsed = reduced ? duration() : Math.min(duration(), elapsed + milliseconds);
            if (kind !== 'cashed' && contact) { cue('land', REVEAL_TIMING.fall); }
            if (kind === 'lost') { cue('lose', REVEAL_TIMING.fall + settleDuration()); }
            if (kind === 'won' || kind === 'cashed') { cue('reward', kind === 'cashed' ? 0 : REVEAL_TIMING.fall + REVEAL_TIMING.settle); }
        },
        sample() {
            return {
                kind, elapsed, active: kind !== null && elapsed < duration(),
                fall: kind === 'cashed' ? 1 : fraction(0, REVEAL_TIMING.fall),
                settle: contact ? fraction(REVEAL_TIMING.fall, REVEAL_TIMING.settle) : 0,
                collapse: kind === 'lost' ? fraction(REVEAL_TIMING.fall + settleDuration(), REVEAL_TIMING.collapse) : 0,
                celebration: fraction(kind === 'cashed' ? 0 : REVEAL_TIMING.fall, kind === 'won' ? REVEAL_TIMING.settle + REVEAL_TIMING.celebration : REVEAL_TIMING.settle),
            };
        },
    };
}
