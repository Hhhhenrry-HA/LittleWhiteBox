import { advanceExpedition, emptyExpedition } from '../../apps/game/expedition/domain.ts';
import { createBattle } from '../../apps/game/expedition/combat.ts';
import { shot, spawn } from '../../apps/game/expedition/combat/events.ts';
import { validateExpedition } from '../../apps/game/expedition/partition.ts';

/** Isolated visual scenarios; these fabricated checkpoints never touch the user's files. */
export function feedbackFixture(scenario) {
    if (!['ward', 'block', 'siege', 'resonance'].includes(scenario)) throw new Error('unknown_feedback_scenario');
    const data = advanceExpedition(emptyExpedition(), { type: 'start', weapon: scenario === 'ward' ? 'bow' : 'blade', outfit: 'traveler', oaths: [] }, 'feedback-preview', 34762);
    const r = data.active;
    if (scenario === 'resonance') { r.weapon = 'grimoire'; }
    r.routes = []; r.phase = 'battle'; r.hp = 50;
    if (scenario === 'ward') { r.relics = [{ id: 'aegis', rank: 1 }]; r.relicPool = ['aegis']; }
    const b = r.battle = createBattle({ seed: 7, zone: r.regions[0], chapter: 0, elite: false, boss: false, bossKind: r.bosses[0], encounter: scenario === 'siege' ? 'siege' : 'skirmish', hp: r.hp }, r);
    b.player.invulnerable = 0;
    if (scenario === 'resonance') {
        r.relics = []; r.relicPool = ['pack-bond', 'covenant', 'frenzy'];
        b.player.resource = 100; b.player.hp = r.hp = 100; b.enemies = [];
        const enemy = spawn(b, 'soldier', { x: -1.5, y: 3 });
        enemy.hp = enemy.maxHp = 10000; enemy.stun = 1000;
    }
    else if (scenario === 'siege') { b.player.x = 8; b.player.y = 8; }
    else {
        b.player.ward = scenario === 'ward' ? 24 : 0;
        b.player.attack = 300; b.enemies = [];
        const enemy = spawn(b, scenario === 'block' ? 'archer' : 'soldier', { x: 0, y: scenario === 'block' ? -3 : 3.7 });
        enemy.windup = scenario === 'block' ? 0 : 90; enemy.cooldown = 300;
        enemy.target = { x: b.player.x, y: b.player.y }; enemy.hp = enemy.maxHp = 1000;
        if (scenario === 'block') { shot(b, { x: 0, y: 1.8 }, Math.PI / 2, 18, false, { speed: .16 }); }
    }
    validateExpedition(data); return { expedition: data };
}
