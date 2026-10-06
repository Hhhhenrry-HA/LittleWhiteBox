import { type Camera, Vector3 } from 'three';
import { COPY } from './copy.js';
import type { Battle } from './types.js';
import { BEACON_CRITICAL_HP } from './visuals.js';

/** World-anchored readouts. All feedback timers die with the scene, never enter a save. */
export function createWorldStatus(host: HTMLElement) {
    const beacon = document.createElement('div'); beacon.className = 'exp-world-beacon';
    const title = document.createElement('strong'), track = document.createElement('div'), fill = document.createElement('i'), value = document.createElement('b');
    track.className = 'exp-objective-track'; track.dataset.objective = 'beacon';
    track.setAttribute('role', 'progressbar'); track.setAttribute('aria-label', COPY.beaconName); track.setAttribute('aria-valuemin', '0'); track.setAttribute('aria-valuemax', '100');
    track.append(fill, value); beacon.append(title, track);
    const defense = document.createElement('div'); defense.className = 'exp-world-defense';
    host.append(beacon, defense); beacon.hidden = true; defense.hidden = true;
    const position = new Vector3();
    let battle: Battle | null = null, lastEffect = 0, beaconHp = 100, hitUntil = 0, feedbackUntil = 0;
    let feedback: keyof typeof COPY.defenseFeedback | null = null;
    function place(element: HTMLElement, x: number, y: number, z: number, camera: Camera, width: number, height: number) {
        position.set(x, y, z).project(camera);
        element.style.left = `${(position.x * .5 + .5) * width}px`;
        element.style.top = `${(-position.y * .5 + .5) * height}px`;
    }
    return { update(b: Battle | null, camera: Camera, width: number, height: number) {
        if (b !== battle) { battle = b; lastEffect = 0; beaconHp = b?.objective.hp ?? 100; hitUntil = 0; feedback = null; feedbackUntil = 0; }
        beacon.hidden = !b || b.boss || b.encounter !== 'siege';
        defense.hidden = !b;
        if (!b) { return; }
        if (!beacon.hidden) {
            if (b.objective.hp < beaconHp) { hitUntil = b.tick + 24; }
            beaconHp = b.objective.hp;
            const critical = beaconHp <= BEACON_CRITICAL_HP, hit = b.tick < hitUntil;
            beacon.classList.toggle('is-critical', critical); beacon.classList.toggle('is-hit', hit);
            title.textContent = critical ? COPY.beaconDanger : hit ? COPY.beaconHit : COPY.beaconName;
            fill.style.width = `${beaconHp}%`; value.textContent = `${Math.ceil(beaconHp)} / 100`; track.setAttribute('aria-valuenow', String(Math.ceil(beaconHp)));
            place(beacon, b.objective.x, 2.5, b.objective.y, camera, width, height);
        }
        const notices = b.effects.filter(e => e.id > lastEffect && e.kind in COPY.defenseFeedback);
        const notice = notices.find(e => e.kind === 'parry' || e.kind === 'ward-break') ?? notices.at(-1);
        if (notice) { feedback = notice.kind as keyof typeof COPY.defenseFeedback; feedbackUntil = b.tick + 27; }
        lastEffect = b.serial;
        if (b.tick >= feedbackUntil) { feedback = null; }
        const p = b.player;
        defense.hidden = !feedback && !p.shield && !p.ward;
        defense.dataset.state = feedback ?? (p.shield ? 'blocking' : 'ward');
        defense.textContent = feedback ? COPY.defenseFeedback[feedback] : p.shield ? COPY.guardActive : COPY.wardValue(p.ward);
        place(defense, p.x, p.shield ? 3.65 : 3.05, p.y, camera, width, height);
    }, dispose() { beacon.remove(); defense.remove(); } };
}
