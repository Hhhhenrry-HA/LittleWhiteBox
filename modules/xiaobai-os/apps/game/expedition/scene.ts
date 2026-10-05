import { Color, DirectionalLight, Fog, Group, HemisphereLight, NeutralToneMapping, OrthographicCamera, PCFSoftShadowMap, Scene,
    SRGBColorSpace, Vector3, WebGLRenderer } from 'three';
import type { Battle, Run } from './types.js';
import { createSceneKit } from './scene-kit.js';
import { buildWorld } from './scene-world.js';
import { createEnemyActor, createHero } from './scene-actors.js';
import { createBattleEffects } from './scene-effects.js';
import { CAMERA_EIGHTH_TURNS, PALETTES } from './visuals.js';
import { RULES, isBoss } from './content.js';

export type SceneMode = 'camp' | 'battle' | 'between';
/** Owns presentation lifetime only: camera, meshes and transient damage labels. */
export function createExpeditionScene(host: HTMLElement, onError: () => void) {
    const renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.outputColorSpace = SRGBColorSpace; renderer.toneMapping = NeutralToneMapping; renderer.toneMappingExposure = 1;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.8)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFSoftShadowMap;
    host.append(renderer.domElement);
    const labels = document.createElement('div'); labels.className = 'exp-world-labels'; labels.setAttribute('aria-hidden', 'true'); host.append(labels);
    const scene = new Scene(), camera = new OrthographicCamera(-10, 10, 10, -10, .1, 180), k = createSceneKit();
    scene.add(new HemisphereLight('#effbff', '#74918a', 1.7));
    const sun = new DirectionalLight('#fff1d6', 2.2); sun.position.set(-12, 25, 13); sun.castShadow = true;
    sun.shadow.mapSize.set(1536, 1536); Object.assign(sun.shadow.camera, { left: -23, right: 23, top: 24, bottom: -24, far: 80 });
    sun.shadow.bias = -.0004; sun.shadow.normalBias = .035; sun.shadow.radius = 3; scene.add(sun);
    const rim = new DirectionalLight('#c3edff', 1.1); rim.position.set(7, 8, -15); scene.add(rim);
    const environment = new Group(), actors = new Group(), effects = new Group(); scene.add(environment, actors, effects);
    const hero = createHero(k, actors), fx = createBattleEffects(k, effects);
    const enemies = new Map<number, { actor: ReturnType<typeof createEnemyActor>; hp: number; death: number | null; marker: HTMLElement }>();
    const floaters: { element: HTMLElement; position: Vector3; born: number }[] = [];
    const reduced = matchMedia('(prefers-reduced-motion: reduce)'), target = new Vector3(), projection = new Vector3();
    let disposeWorld: (() => void) | null = null, worldKey = '', lastMode = '', lastAppearance = '', lastBattle: Battle | null = null;
    let width = 1, height = 1, dirty = true, disposed = false, failed = false, lastFrame = 0, lastTick = -1, lastHp = 0, cameraReady = false;
    function resize() {
        const rect = host.getBoundingClientRect(); width = Math.max(1, rect.width); height = Math.max(1, rect.height);
        renderer.setSize(width, height, false); dirty = true; cameraReady = false;
    }
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    function contextLost(event: Event) { event.preventDefault(); failed = true; onError(); }
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    function label(amount: number, x: number, z: number, tick: number, hurt = false) {
        if (Math.abs(amount) < 1) { return; }
        const element = document.createElement('span'); element.className = hurt ? 'exp-damage is-player' : amount < 0 ? 'exp-damage is-heal' : 'exp-damage';
        element.textContent = `${amount < 0 ? '+' : ''}${Math.ceil(Math.abs(amount))}`; labels.append(element);
        floaters.push({ element, position: new Vector3(x, 2, z), born: tick });
    }
    function clearActors() { for (const entry of enemies.values()) { actors.remove(entry.actor.root); entry.marker.remove(); } enemies.clear(); floaters.splice(0).forEach(f => f.element.remove()); }
    return {
        draw(battle: Battle | null, loadout: Pick<Run, 'weapon' | 'outfit'>, zone: number, mode: SceneMode = 'battle', now = 0) {
            if (disposed || failed) { return; }
            const b = mode === 'battle' ? battle : null, time = b?.tick ?? (reduced.matches ? 0 : now * .025), tickChanged = b?.tick !== lastTick;
            const appearance = `${loadout.weapon}/${loadout.outfit}/${zone}`;
            if (!dirty && mode === lastMode && appearance === lastAppearance && b === lastBattle
                && (!tickChanged && b || !b && (mode === 'between' || reduced.matches || now - lastFrame < 40))) { return; }
            lastFrame = now; const c = PALETTES[zone];
            const nextWorld = `${zone}:${b?.boss ?? false}:${!!b}`;
            if (nextWorld !== worldKey) {
                disposeWorld?.(); disposeWorld = buildWorld(k, environment, zone, b); worldKey = nextWorld;
                scene.background = new Color(c.sky); scene.fog = new Fog(c.haze, 42, 95);
            }
            if (b !== lastBattle) { clearActors(); lastHp = b?.player.hp ?? 0; cameraReady = false; }
            const portrait = mode !== 'battle', mobile = width < 600, compact = mobile || height < 400, aspect = width / height;
            const horizontal = portrait ? mobile ? 13 : 28 : mobile ? 18.5 : Math.max(27, aspect * (height < 400 ? 14 : 23));
            const pan = Math.max(0, RULES.arena - horizontal / 2 + .5);
            const desiredX = b ? compact ? b.player.x * .62 : Math.max(-pan, Math.min(pan, b.player.x * .62)) : mobile ? 0 : 5.5;
            const desiredZ = b ? b.player.y * (compact ? .62 : .2) - .4 : mobile ? -4.2 : -11.8;
            if (!cameraReady || reduced.matches) { target.set(desiredX, 0, desiredZ); cameraReady = true; }
            else { target.x += (desiredX - target.x) * .14; target.z += (desiredZ - target.z) * .14; }
            camera.left = -horizontal / 2; camera.right = horizontal / 2; camera.top = horizontal / aspect / 2; camera.bottom = -camera.top;
            const bearing = portrait ? 0 : CAMERA_EIGHTH_TURNS * Math.PI / 4;
            camera.position.set(target.x + Math.sin(bearing) * 25, 28, target.z + Math.cos(bearing) * 25); camera.lookAt(target.x, 0, target.z); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
            hero.update(b?.player ?? null, loadout.weapon, loadout.outfit, time, reduced.matches, portrait);
            for (const e of b?.enemies ?? []) {
                let entry = enemies.get(e.id);
                if (!entry) {
                    const marker = document.createElement('i'); marker.className = isBoss(e.kind) ? 'exp-threat is-boss' : 'exp-threat'; labels.append(marker);
                    entry = { actor: createEnemyActor(k, actors, e.kind, c), hp: e.hp, death: null, marker }; enemies.set(e.id, entry);
                }
                if (entry.hp > e.hp && tickChanged) { label(entry.hp - e.hp, e.x, e.y, b!.tick); }
                entry.hp = e.hp; entry.actor.update(e, b!.tick, reduced.matches); entry.actor.bar.quaternion.copy(camera.quaternion);
                projection.set(e.x, 1.2, e.y).project(camera);
                const sx = (projection.x * .5 + .5) * width, sy = (-projection.y * .5 + .5) * height;
                const mx = Math.max(18, Math.min(width - 18, sx)), my = Math.max(mobile ? 132 : 95, Math.min(height - 130, sy));
                entry.marker.hidden = Math.abs(sx - mx) + Math.abs(sy - my) < 10;
                entry.marker.style.transform = `translate(${mx}px,${my}px) rotate(${Math.atan2(sy - my, sx - mx) + Math.PI / 2}rad)`;
            }
            for (const [id, entry] of enemies) {
                if (b?.enemies.some(e => e.id === id)) { continue; }
                if (entry.death === null) { entry.death = b?.tick ?? 0; if (b && entry.hp > 0) { label(entry.hp, entry.actor.root.position.x, entry.actor.root.position.z, b.tick); } }
                const t = ((b?.tick ?? 0) - entry.death) / 12; entry.actor.bar.visible = false; entry.marker.hidden = true; entry.actor.root.scale.setScalar(Math.max(0, 1 - t));
                if (t >= 1 || !b || reduced.matches) { actors.remove(entry.actor.root); entry.marker.remove(); enemies.delete(id); }
            }
            if (b && tickChanged) { if (lastHp !== b.player.hp) { label(lastHp - b.player.hp, b.player.x, b.player.y, b.tick, lastHp > b.player.hp); } lastHp = b.player.hp; }
            fx.update(b, reduced.matches);
            for (let i = floaters.length - 1; i >= 0; i--) {
                const f = floaters[i], age = ((b?.tick ?? 0) - f.born) / 27;
                if (age >= 1 || !b) { f.element.remove(); floaters.splice(i, 1); continue; }
                projection.copy(f.position); projection.y += reduced.matches ? 0 : age * .9; projection.project(camera);
                f.element.style.transform = `translate(${(projection.x * .5 + .5) * width}px,${(-projection.y * .5 + .5) * height}px)`;
                f.element.style.opacity = String(Math.min(1, (1 - age) * 3));
            }
            renderer.render(scene, camera); dirty = false; lastMode = mode; lastAppearance = appearance; lastBattle = b; lastTick = b?.tick ?? -1;
        },
        dispose() {
            disposed = true; observer.disconnect(); renderer.domElement.removeEventListener('webglcontextlost', contextLost);
            clearActors(); disposeWorld?.(); sun.shadow.dispose(); k.dispose(); scene.clear(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); labels.remove();
        },
    };
}
