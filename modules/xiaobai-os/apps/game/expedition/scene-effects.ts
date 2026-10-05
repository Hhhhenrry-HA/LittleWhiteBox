import type { Group, Mesh } from 'three';
import { ENEMIES, isBoss } from './content.js';
import type { Battle } from './types.js';
import type { SceneKit } from './scene-kit.js';

const FX = { danger: '#c34740', warning: '#ec8754', magic: '#8bd9f2', frost: '#addffc', gold: '#fff0bb', heal: '#75dbb0', fire: '#f0ad55' };
/** Reusable effect meshes: no geometry allocation in the combat frame loop. */
export function createBattleEffects(k: SceneKit, root: Group) {
    const pools = new Map<string, { list: Mesh[]; used: number }>();
    function draw(kind: keyof SceneKit['geometries'], color: string, opacity = 1) {
        const alpha = Math.max(.1, Math.min(1, Math.round(opacity * 10) / 10)), key = `${kind}/${color}/${alpha}`;
        let pool = pools.get(key); if (!pool) { pool = { list: [], used: 0 }; pools.set(key, pool); }
        let mesh = pool.list[pool.used++];
        if (!mesh) { mesh = k.mesh(root, kind, color, [1, 1, 1], [0, 0, 0], true, alpha); pool.list.push(mesh); }
        mesh.visible = true; mesh.rotation.set(0, 0, 0); mesh.scale.set(1, 1, 1); return mesh;
    }
    function ground(kind: 'ring' | 'disc' | 'arc', color: string, radius: number, x: number, z: number, opacity = 1, y = .09) {
        const mesh = draw(kind, color, opacity); mesh.position.set(x, y, z); mesh.scale.set(radius, radius, 1); mesh.rotation.x = -Math.PI / 2; return mesh;
    }
    return { update(b: Battle | null, reduced: boolean) {
        for (const pool of pools.values()) { pool.used = 0; pool.list.forEach(m => m.visible = false); }
        if (!b) { return; }
        const p = b.player;
        ground('ring', '#f2f6e2', .64, p.x, p.y, .8);
        if (p.dashTime && !reduced) {
            for (let i = 1; i <= 3; i++) {
                const streak = draw('cone', FX.gold, .7 - i * .15);
                streak.position.set(p.x - Math.cos(p.dashAngle) * i * .43, .45, p.y - Math.sin(p.dashAngle) * i * .43);
                streak.scale.set(.13, p.dashTime / 8 * 1.7, .13); streak.rotation.set(0, -p.dashAngle, -Math.PI / 2);
            }
        }
        if (p.shield) { ground('ring', FX.magic, .9, p.x, p.y); }
        for (const e of b.enemies) {
            if (isBoss(e.kind) && e.phase > 1) {
                const radius = ENEMIES[e.kind].radius + .55;
                ground('ring', e.kind === 'king' ? FX.fire : FX.magic, radius, e.x, e.y, .65);
                if (!reduced) { for (let i = 0; i < e.phase + 2; i++) {
                    const t = b.tick * .025 + i * Math.PI * 2 / (e.phase + 2), mote = draw('rock', e.kind === 'king' ? FX.fire : FX.magic, .8);
                    mote.position.set(e.x + Math.cos(t) * radius, .55 + Math.sin(t * 2) * .2, e.y + Math.sin(t) * radius); mote.scale.set(.08, .19, .08);
                } }
            }
            if (e.windup) {
                const progress = 1 - e.windup / ENEMIES[e.kind].windup;
                ground('ring', FX.warning, ENEMIES[e.kind].radius + .35, e.x, e.y, .8);
                if (e.kind === 'charger') {
                    const length = Math.min(9, Math.hypot(e.target.x - e.x, e.target.y - e.y));
                    const line = draw('box', FX.danger, .3); line.scale.set(.75, .035, length);
                    line.position.set(e.x + Math.cos(e.angle) * length / 2, .09, e.y + Math.sin(e.angle) * length / 2); line.rotation.y = Math.PI / 2 - e.angle;
                    ground('ring', FX.danger, .5, e.target.x, e.target.y, .9);
                } else if (!isBoss(e.kind) && e.kind !== 'archer' && e.kind !== 'priest') {
                    ground('disc', FX.danger, ENEMIES[e.kind].reach, e.target.x, e.target.y, .15 + progress * .2);
                    ground('ring', FX.danger, ENEMIES[e.kind].reach, e.target.x, e.target.y);
                }
            }
            if (e.chill) { ground('ring', FX.frost, ENEMIES[e.kind].radius + .13, e.x, e.y); }
            if (e.burn && !reduced) {
                for (let i = 0; i < 3; i++) { const flame = draw('rock', FX.fire, .8); flame.position.set(e.x + Math.sin(i * 2) * .3, .35 + ((b.tick + i * 7) % 20) / 18, e.y + Math.cos(i * 2) * .3); flame.scale.set(.08, .2, .08); }
            }
            if (e.kind === 'priest') { ground('ring', '#a39aca', 4, e.x, e.y, .4); }
        }
        for (const h of b.hazards) {
            const color = h.friendly ? h.kind === 'fire' ? FX.fire : FX.magic : FX.danger;
            ground('disc', color, h.radius, h.x, h.y, h.wait ? .2 : .4); ground('ring', color, h.radius, h.x, h.y);
            if (h.wait) {
                ground('ring', color, h.radius * (1 - Math.min(1, h.wait / 45)), h.x, h.y, .7);
                const cross = draw('box', color, .7); cross.position.set(h.x, .12, h.y); cross.scale.set(.08, .02, .6);
                const cross2 = draw('box', color, .7); cross2.position.copy(cross.position); cross2.scale.set(.6, .02, .08);
            } else if (!reduced) {
                ground('ring', FX.gold, h.radius * (1.15 - h.life / 60), h.x, h.y, .7, .25);
                for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, shard = draw('cone', color, .7); shard.position.set(h.x + Math.cos(a) * h.radius * .65, .45, h.y + Math.sin(a) * h.radius * .65); shard.scale.set(.15, .9, .15); }
            }
        }
        for (const s of b.shots) {
            const color = s.friendly ? FX.gold : FX.danger;
            const core = draw('sphere', s.friendly ? '#fffbea' : '#fff1c9'); core.position.set(s.x, .6, s.y); core.scale.set(.11, .11, .11);
            const head = draw('sphere', color, .8); head.position.copy(core.position); head.scale.set(.21, .18, .21);
            const tail = draw('cone', color, .5); tail.position.set(s.x - Math.cos(s.angle) * .38, .6, s.y - Math.sin(s.angle) * .38); tail.scale.set(.14, .75, .14); tail.rotation.set(0, -s.angle, -Math.PI / 2);
        }
        for (const e of b.effects) {
            const t = 1 - e.life / (e.kind === 'slash' ? 9 : 15);
            if (e.kind === 'slash') {
                const arc = ground('arc', FX.gold, e.size, e.x, e.y, 1 - t * .6, .42); arc.rotation.z = -e.angle - .9 + t * .4;
                const inner = ground('arc', '#ffffff', e.size * .86, e.x, e.y, 1 - t * .8, .43); inner.rotation.z = arc.rotation.z;
            } else if (e.kind === 'lightning') {
                for (let i = 0; i < 4; i++) {
                    const bolt = draw('box', i % 2 ? '#ffffff' : FX.magic, 1 - t * .6); bolt.scale.set(.09 + (1 - t) * .09, 1.05, .08);
                    bolt.position.set(e.x + (i % 2 ? .14 : -.14), .5 + i * .85, e.y); bolt.rotation.z = i % 2 ? -.35 : .35;
                }
                ground('ring', FX.magic, .4 + t, e.x, e.y, 1 - t);
            } else if (e.kind === 'heal') { ground('ring', FX.heal, .4 + t, e.x, e.y, 1 - t); }
            else {
                const color = e.kind === 'hit' ? FX.danger : FX.gold;
                ground('ring', color, e.size * (.4 + t), e.x, e.y, 1 - t);
                if (!reduced) { for (let i = 0; i < 7; i++) {
                    const a = i * 2.4 + e.id, spark = draw('rock', color, 1 - t * .8);
                    spark.position.set(e.x + Math.cos(a) * t * e.size, .4 + Math.sin(t * Math.PI) * .8, e.y + Math.sin(a) * t * e.size);
                    spark.scale.set(.1 * (1 - t), .28 * (1 - t), .1 * (1 - t)); spark.rotation.z = a;
                } }
            }
        }
    } };
}
