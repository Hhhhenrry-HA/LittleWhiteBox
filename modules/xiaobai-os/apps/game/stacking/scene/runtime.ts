import { Scene, WebGLRenderer, HemisphereLight, DirectionalLight, Group, Mesh, BoxGeometry, MeshBasicMaterial,
    SRGBColorSpace, PCFSoftShadowMap, NeutralToneMapping } from 'three';
import { createResources } from './resources.js';
import { withSceneLifetime } from './lifetime.js';
import { createHouse, type HouseModel } from './houses.js';
import { createEnvironment } from './environment.js';
import { createCompanion } from './companion.js';
import { createStackingCamera } from './camera.js';
import { createRevealTimeline, REVEAL_TIMING, type SceneCue } from './timeline.js';
import { createQualityController, pixelRatio, RENDER_BUDGET } from './quality.js';
import { PALETTE as C, SUPPORT_WARNING_RATIO } from './palette.js';
import { craneX, HOUSES } from '../policy.js';
import { sequence, topSurface, type Tower } from '../rules.js';
import { replay, outcome, type Run } from '../domain.js';

export interface SceneInput { run: Run | null; direction: 1 | -1; overview: boolean; enabled: boolean }
const LIFT_HEIGHT = 1.2;

export function createStackingScene(host: HTMLElement, onError: (error: unknown) => void,
    onAnimation: (active: boolean) => void, onCue: (cue: SceneCue) => void) {
    return withSceneLifetime(lifetime => {
        const renderer = new WebGLRenderer({ alpha: false, antialias: true, powerPreference: 'low-power' });
        lifetime.defer(() => renderer.domElement.remove());
        lifetime.defer(() => renderer.forceContextLoss());
        lifetime.own(renderer);
        renderer.outputColorSpace = SRGBColorSpace; renderer.toneMapping = NeutralToneMapping; renderer.toneMappingExposure = 1;
        renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFSoftShadowMap;
        host.append(renderer.domElement);
        const scene = new Scene(), cameraRig = createStackingCamera(), camera = cameraRig.camera;
        const resources = lifetime.own(createResources());
        const environment = lifetime.own(createEnvironment(resources)), companion = lifetime.own(createCompanion(resources));
        const houses = new Group(), support = new Group();
        scene.background = environment.sky;
        scene.add(environment.world, environment.clouds, environment.farClouds, environment.crane, houses, support, companion.root);
        scene.add(new HemisphereLight(C.porcelain, C.mint, 1.85));
        const sun = new DirectionalLight(C.milk, 2.6); sun.position.set(-4, 12, 8); sun.castShadow = true;
        lifetime.own(sun.shadow);
        sun.shadow.mapSize.setScalar(RENDER_BUDGET.shadow); sun.shadow.camera.left = -6; sun.shadow.camera.right = 6;
        sun.shadow.camera.top = 7; sun.shadow.camera.bottom = -7; sun.shadow.normalBias = 0.025;
        sun.shadow.bias = -0.0001; scene.add(sun, sun.target);
        const fill = new DirectionalLight(C.sky, 0.55); fill.position.set(5, 5, -4); scene.add(fill);
        const ghostGeometry = lifetime.own(new BoxGeometry(1, 0.012, 1.2));
        const ghostMaterial = lifetime.own(new MeshBasicMaterial({ color: C.steel, transparent: true, opacity: 0.2, depthWrite: false }));
        const ghost = new Mesh(ghostGeometry, ghostMaterial); scene.add(ghost);
        const line = resources.mesh(support, 'box', C.safe, [1, 0.036, 0.025], [0, 0, 0.655], 'enamel');
        const dot = resources.mesh(support, 'sphere', C.safe, [0.055, 0.055, 0.035], [0, 0, 0.68], 'enamel');
        const quality = createQualityController(), reduced = matchMedia('(prefers-reduced-motion: reduce)');
        let input: SceneInput = { run: null, direction: 1, overview: true, enabled: false };
        let board: Tower | null = null, models: HouseModel[] = [], cargo: HouseModel | null = null, cargoKey = '';
        let disposed = false, initialized = false, visible = true, failed = false, frame = 0, lastTime = 0, elapsed = 0, sceneryTime = 0;
        let cameraSettling = false, performing = false, turnElapsed = REVEAL_TIMING.acknowledgement as number;
        let locked: { x: number; age: number } | null = null;
        let dragging = false, pointerX = 0;
        lifetime.defer(() => { disposed = true; stop(); clearModels(); cargo?.dispose(); });
        const timeline = createRevealTimeline(cue => {
            if (cue === 'land') {
                onCue(cue);
                if (!board?.failure) {
                    models.at(-1)?.lightWindows(true);
                    if (board && board.supports[board.weak]?.ratio < SUPPORT_WARNING_RATIO) { onCue('danger'); }
                }
            } else { onCue(cue); }
        });

        function resize() {
            if (disposed) { return; }
            const { width, height } = host.getBoundingClientRect();
            renderer.setPixelRatio(pixelRatio(width, height, window.devicePixelRatio || 1, quality.current()));
            renderer.setSize(Math.max(1, width), Math.max(1, height), false); cameraRig.resize(width, height);
        }
        function active() { return !disposed && !failed && visible && !document.hidden; }
        function playing() { return !!input.run && outcome(input.run) === 'playing' && !input.overview; }
        function clock(now: number) {
            const delta = lastTime ? Math.max(0, now - lastTime) : 0; lastTime = now;
            if (active() && input.enabled && playing() && !performing && !locked) { elapsed += delta / 1000; }
            return delta;
        }
        function animation(value: boolean) {
            if (performing === value) { return; }
            performing = value; onAnimation(value);
        }
        function resetPose() {
            if (!board) { return; }
            models.forEach((model, i) => {
                const placement = board!.placed[i];
                model.root.position.set(placement.x / 1000, placement.y / 1000, 0);
                model.root.rotation.set(0, 0, 0); model.root.scale.setScalar(1);
                model.root.visible = !(board!.failure && i === models.length - 1);
            });
        }
        function clearModels() { models.forEach(model => { houses.remove(model.root); model.dispose(); }); models = []; }
        function syncTower(rebuild: boolean, landing: boolean) {
            if (rebuild) { clearModels(); }
            if (!board) {
                if (!models.length) {
                    let y = 0;
                    (['wide', 'wide', 'loft'] as const).forEach((kind, i) => {
                        const model = createHouse(resources, kind, 1, i);
                        model.root.position.set([0, 0.08, -0.04][i], y, 0); y += HOUSES[kind].height / 1000;
                        models.push(model); houses.add(model.root);
                    });
                }
                return;
            }
            while (models.length > board.placed.length) { const model = models.pop()!; houses.remove(model.root); model.dispose(); }
            for (let i = models.length; i < board.placed.length; i++) {
                const p = board.placed[i], model = createHouse(resources, p.kind, p.direction, i, !(landing && i === board.placed.length - 1));
                models.push(model); houses.add(model.root);
            }
            resetPose();
        }
        function syncCargo() {
            const kind = input.run && playing() ? sequence(input.run.seed)[input.run.moves.length] : null;
            const key = kind ? [input.run!.id, input.run!.moves.length, input.direction].join(':') : '';
            if (key === cargoKey) { return; }
            if (cargo) { scene.remove(cargo.root); cargo.dispose(); cargo = null; }
            cargoKey = key;
            if (kind) { cargo = createHouse(resources, kind, input.direction, input.run!.moves.length, false); scene.add(cargo.root); }
        }
        function drawSupport(show: boolean) {
            support.visible = show && !!board?.supports.length;
            if (!support.visible || !board) { return; }
            const joint = board.placed[board.weak], state = board.supports[board.weak];
            support.position.y = joint.y / 1000 + 0.03;
            line.position.x = (joint.left + joint.right) / 2000; line.scale.x = Math.max(0.01, (joint.right - joint.left) / 1000);
            dot.position.x = state.center / 1000;
            line.material = dot.material = resources.material(state.ratio < SUPPORT_WARNING_RATIO ? C.risk : C.safe, 'enamel');
        }
        function collapse(progress: number) {
            if (!board?.failure || !board.placed.length) { return; }
            const index = board.failure === 'balance' ? board.weak : board.placed.length - 1;
            const joint = board.placed[index], state = board.supports[index];
            const direction = state.center >= (joint.left + joint.right) / 2 ? 1 : -1;
            const pivotX = (direction > 0 ? joint.right : joint.left) / 1000, pivotY = joint.y / 1000;
            const angle = -direction * progress * progress * 0.8;
            models.forEach((model, i) => {
                if (i < index) { return; }
                const p = board!.placed[i], dx = p.x / 1000 - pivotX, dy = p.y / 1000 - pivotY;
                model.root.visible = true;
                model.root.position.set(pivotX + Math.cos(angle) * dx - Math.sin(angle) * dy + direction * progress ** 2 * 0.6,
                    pivotY + Math.sin(angle) * dx + Math.cos(angle) * dy - progress ** 2 * 2.3 - (board!.failure === 'miss' ? progress * 1.6 : 0), 0);
                model.root.rotation.z = angle;
            });
        }
        function render(now: number, immediate = false) {
            const delta = clock(now);
            if (locked) { locked.age += delta; }
            turnElapsed += delta;
            const before = timeline.sample();
            if (performing) { timeline.advance(delta, reduced.matches); }
            const reveal = timeline.sample();
            if (before.active && !reveal.active && performing) {
                resetPose(); animation(false); locked = null; elapsed = 0;
                quality.boundary(); renderer.shadowMap.enabled = quality.current() > 0; resize();
            }
            const falling = performing && reveal.kind !== 'cashed';
            const last = board?.placed.at(-1);
            const overview = input.overview && !performing;
            const actualTop = board ? topSurface(board).y / 1000 : HOUSES.wide.height / 500 + HOUSES.loft.height / 1000;
            const displayTop = falling && last ? last.y / 1000 : actualTop;
            const { center, settling } = cameraRig.update(displayTop, overview || !input.run, delta, immediate || reduced.matches);
            cameraSettling = settling;
            sun.position.set(-4, center + 10, 8); sun.target.position.set(0, center, 0);
            const x = locked ? locked.x / 1000 : input.run ? craneX(input.run.seed, input.run.moves.length, elapsed) / 1000 : 0;
            const kind = falling && last ? last.kind : input.run && playing() ? sequence(input.run.seed)[input.run.moves.length] : 'wide';
            const railY = displayTop + HOUSES[kind].height / 1000 + LIFT_HEIGHT + 0.66;
            const acknowledgement = locked ? Math.min(1, locked.age / REVEAL_TIMING.acknowledgement) : 0;
            environment.crane.visible = !!input.run && (!overview || performing);
            environment.crane.position.y = railY; environment.carriage.position.x = falling && last ? last.x / 1000 : x;
            environment.hoist(0.61 + acknowledgement * 0.045, falling ? reveal.fall : acknowledgement * 0.3);
            if (cargo) {
                cargo.root.visible = playing() && !performing;
                cargo.root.position.set(x, displayTop + LIFT_HEIGHT - acknowledgement * 0.045, 0);
                cargo.root.scale.y = 1 - Math.sin(Math.min(1, turnElapsed / REVEAL_TIMING.acknowledgement) * Math.PI) * 0.035;
            }
            ghost.visible = playing() && !performing;
            ghost.position.set(x, displayTop + 0.015, 0); ghost.scale.x = HOUSES[kind].foot / 1000;
            if (falling && last && models.length) {
                const model = models.at(-1)!;
                model.root.visible = true;
                model.root.position.y = last.y / 1000 + (1 - reveal.fall ** 2) * LIFT_HEIGHT;
                model.root.scale.y = 1 - Math.sin(reveal.settle * Math.PI) * 0.035;
                if (board?.failure && reveal.collapse > 0) { collapse(reveal.collapse); }
            }
            drawSupport(playing() && !performing);
            const danger = !!board?.supports.length && board.supports[board.weak].ratio < SUPPORT_WARNING_RATIO;
            const reaction = performing ? reveal.kind === 'lost' ? 'sad' : reveal.fall >= 1 ? 'happy' : 'watch'
                : input.run && ['lost', 'abandoned'].includes(outcome(input.run)) ? 'sad' : danger && playing() ? 'careful' : 'watch';
            const suspended = !overview && !!input.run;
            companion.update(reaction, reveal.celebration, x, railY, suspended);
            if (input.enabled && !reduced.matches) { sceneryTime += Math.min(delta, 60) / 1000; }
            environment.clouds.position.x = reduced.matches ? 0 : Math.sin(sceneryTime * 0.1) * 0.14;
            environment.farClouds.position.y = center * 0.06;
            renderer.render(scene, camera);
            if (playing() && input.enabled && !performing && delta) { quality.sample(delta); }
        }
        function fail(error: unknown) { failed = true; stop(); onError(error); }
        function tick(now: number) {
            frame = 0; if (!active()) { lastTime = 0; return; }
            try { render(now); } catch (error) { fail(error); return; }
            if (playing() && input.enabled || performing || cameraSettling || locked && locked.age < REVEAL_TIMING.acknowledgement) { frame = requestAnimationFrame(tick); }
            else { lastTime = 0; }
        }
        function invalidate() { if (!frame && active()) { frame = requestAnimationFrame(tick); } }
        function stop() { if (frame) { cancelAnimationFrame(frame); frame = 0; } lastTime = 0; }
        function set(next: SceneInput) {
            clock(performance.now());
            const replaced = input.run?.id !== next.run?.id;
            const moved = !!next.run && next.run.id === input.run?.id && next.run.moves.length === input.run.moves.length + 1;
            const ended = !!next.run && next.run.id === input.run?.id && next.run.end !== input.run.end;
            const changed = replaced || input.run?.moves.length !== next.run?.moves.length;
            const switchedView = input.overview !== next.overview;
            if (next.direction !== input.direction) { turnElapsed = 0; if (playing() && next.enabled) { onCue('turn'); } }
            input = next;
            if (changed || !initialized) {
                initialized = true;
                board = next.run ? replay(next.run) : null; elapsed = 0;
                timeline.clear(); syncTower(replaced || !next.run || !board || models.length > board.placed.length, moved);
                if (moved) {
                    const result = outcome(next.run!);
                    timeline.start(result === 'lost' ? 'lost' : result === 'won' ? 'won' : 'placed', board?.failure !== 'miss');
                    locked = null;
                } else { locked = null; }
            } else if (ended && next.run?.end === 'cashout') { timeline.start('cashed'); }
            else if (switchedView && !performing) { resetPose(); }
            animation(timeline.sample().active);
            syncCargo();
            if (!input.enabled) { lastTime = 0; }
            invalidate();
        }
        function visibility() { stop(); invalidate(); }
        function lost(event: Event) { event.preventDefault(); fail(new Error('stacking_webgl_context_lost')); }
        function pointerDown(event: PointerEvent) { if (!input.overview || performing) { return; } dragging = true; pointerX = event.clientX; host.setPointerCapture(event.pointerId); }
        function pointerMove(event: PointerEvent) { if (!dragging) { return; } cameraRig.rotate((event.clientX - pointerX) * 0.008); pointerX = event.clientX; invalidate(); }
        function pointerUp() { dragging = false; }
        function wheel(event: WheelEvent) { if (!input.overview || performing) { return; } event.preventDefault(); cameraRig.zoom(event.deltaY * 0.001); invalidate(); }
        const observer = new ResizeObserver(() => { resize(); invalidate(); });
        lifetime.defer(() => observer.disconnect()); observer.observe(host);
        const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; visibility(); });
        lifetime.defer(() => intersection.disconnect()); intersection.observe(host);
        lifetime.defer(() => {
            document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', invalidate);
            renderer.domElement.removeEventListener('webglcontextlost', lost);
            host.removeEventListener('pointerdown', pointerDown); host.removeEventListener('pointermove', pointerMove);
            host.removeEventListener('pointerup', pointerUp); host.removeEventListener('pointercancel', pointerUp); host.removeEventListener('wheel', wheel);
        });
        document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', invalidate);
        renderer.domElement.addEventListener('webglcontextlost', lost);
        host.addEventListener('pointerdown', pointerDown); host.addEventListener('pointermove', pointerMove);
        host.addEventListener('pointerup', pointerUp); host.addEventListener('pointercancel', pointerUp); host.addEventListener('wheel', wheel, { passive: false });
        set(input); resize(); invalidate();
        return {
            set,
            release() {
                clock(performance.now());
                const x = input.run ? craneX(input.run.seed, input.run.moves.length, elapsed) : 0;
                locked = { x, age: 0 }; onCue('release'); invalidate(); return x;
            },
            cancelRelease() { locked = null; invalidate(); },
            suspend() { visible = false; stop(); }, resume() { visible = true; lastTime = 0; invalidate(); },
            replayFailure() {
                if (!board?.failure || performing) { return; }
                resetPose(); timeline.start('lost', board.failure !== 'miss'); animation(true); invalidate();
            },
            rotate(delta: number) { if (!performing) { cameraRig.rotate(delta); invalidate(); } },
            zoom(delta: number) { if (!performing) { cameraRig.zoom(delta); invalidate(); } },
            async snapshot(): Promise<Blob> {
                const size = host.getBoundingClientRect();
                render(performance.now(), true);
                renderer.setPixelRatio(pixelRatio(size.width, size.height, 2, 2)); renderer.render(scene, camera);
                try { return await new Promise<Blob>((resolve, reject) => renderer.domElement.toBlob(blob => blob ? resolve(blob) : reject(new Error('stacking_export')), 'image/png')); }
                finally { resize(); invalidate(); }
            },
            stats: () => ({ ...renderer.info.memory, calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, quality: quality.current() }),
            dispose: lifetime.dispose,
        };
    });
}
export type StackingScene = ReturnType<typeof createStackingScene>;
