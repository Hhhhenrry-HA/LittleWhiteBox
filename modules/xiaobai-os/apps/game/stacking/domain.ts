import { STACKING_POLICY as P, cashout } from './policy.js';
import { emptyTower, place, sequence, type Placement, type Tower } from './rules.js';
export type Command = { type: 'start' } | { type: 'drop'; x: number; direction: 1 | -1 } | { type: 'cashout' } | { type: 'abandon' };
export type Outcome = 'playing' | 'lost' | 'won' | 'cashed' | 'abandoned';
export interface Run { id: string; seed: number; moves: Placement[]; end: 'cashout' | 'abandon' | null }
export interface Receipt { runId: string; admission: string; settlement: { actionId: string; outcome: Exclude<Outcome, 'playing'>; count: number } | null }
export interface StackingData { revision: number; last: { id: string; command: Command } | null; active: Run | null; best: Run | null; receipts: Receipt[] }
export function fault(code: string): never { throw Object.assign(new Error(`stacking_${code}`), { code: `stacking_${code}` }); }
export function emptyStacking(): StackingData { return { revision: 0, last: null, active: null, best: null, receipts: [] }; }
export function replay(run: Run): Tower {
    let tower = emptyTower(); const kinds = sequence(run.seed);
    for (const move of run.moves) { tower = place(tower, kinds[tower.placed.length], move); }
    return tower;
}
export function count(run: Run): number { const tower = replay(run); return tower.placed.length - Number(!!tower.failure); }
export function outcome(run: Run): Outcome {
    if (run.end) { return run.end === 'cashout' ? 'cashed' : 'abandoned'; }
    const tower = replay(run);
    return tower.failure ? 'lost' : tower.placed.length === P.houses ? 'won' : 'playing';
}
export function payout(receipt: Receipt): number {
    return receipt.settlement && ['won', 'cashed'].includes(receipt.settlement.outcome) ? cashout(receipt.settlement.count) : 0;
}
export function bestRun(data: StackingData): Run | null {
    return data.active && count(data.active) > (data.best ? count(data.best) : 0) ? data.active : data.best;
}
export function advance(previous: StackingData, command: Command, actionId: string, prepared?: { id: string; seed: number }): StackingData {
    const data = structuredClone(previous);
    if (command.type === 'start') {
        if (data.active && outcome(data.active) === 'playing') { fault('active'); }
        if (!prepared) { fault('invalid'); }
        if (data.receipts.some(r => r.runId === prepared.id || r.admission === actionId || r.settlement?.actionId === actionId)) { fault('identity'); }
        data.best = bestRun(data);
        data.active = { ...prepared, moves: [], end: null };
        data.receipts.push({ runId: prepared.id, admission: actionId, settlement: null });
    } else {
        const run = data.active;
        if (!run || outcome(run) !== 'playing') { fault('finished'); }
        if (command.type === 'drop') { run.moves.push({ x: command.x, direction: command.direction }); replay(run); }
        else {
            if (command.type === 'cashout' && !cashout(count(run))) { fault('locked'); }
            run.end = command.type;
        }
        const status = outcome(run);
        if (status !== 'playing') {
            data.receipts.find(r => r.runId === run.id)!.settlement = { actionId, outcome: status, count: count(run) };
        }
    }
    data.revision++; data.last = { id: actionId, command: structuredClone(command) };
    return data;
}
