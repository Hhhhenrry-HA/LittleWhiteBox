import { appendInput, tickBattle } from '../../apps/game/expedition/combat.ts';
import { isFinished } from '../../apps/game/expedition/domain.ts';
import { RULES } from '../../apps/game/expedition/content.ts';
import { chooseRelic, pilot, routeChoice } from './expedition-pilot.mjs';

export async function driveExpedition(service, stop = () => false) {
    let lastRequest = null;
    for (let count = 0; count < 3000; count++) {
        const view = service.view(), r = view.data.active;
        if (!r || stop(r) || isFinished(r)) return { view, lastRequest };
        let command;
        if (r.phase === 'route') command = { type: 'route', id: routeChoice(r).id };
        else if (r.phase === 'battle') {
            const b = structuredClone(r.battle), spans = [];
            for (let i = 0; i < RULES.maxInputTicks && b.status === 'fighting'; i++) { const input = pilot(b, r.weapon); appendInput(spans, input); tickBattle(b, input, r); }
            command = { type: 'input', spans };
        } else if (r.phase === 'reward') command = chooseRelic(r);
        else if (r.phase === 'camp') command = { type: 'rest' };
        else if (r.phase === 'shrine') command = { type: r.hp > 65 ? 'sacrifice' : 'leave' };
        else if (r.phase === 'merchant') command = r.shards >= RULES.shopCost ? chooseRelic(r) : { type: 'leave' };
        else throw new Error('unknown_expedition_phase');
        lastRequest = { actionId: crypto.randomUUID(), revision: view.data.revision, command };
        await service.act(lastRequest, () => true);
    }
    throw new Error('expedition_driver_budget');
}
