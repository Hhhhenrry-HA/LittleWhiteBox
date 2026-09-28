import { Scene, Color, OrthographicCamera, WebGLRenderer, HemisphereLight, DirectionalLight, Group, Vector3, Mesh, BoxGeometry,
    MeshBasicMaterial, SRGBColorSpace, PCFSoftShadowMap, ACESFilmicToneMapping } from 'three';
import { createResources } from './resources.js';
import { createHouse } from './houses.js';
import { createEnvironment } from './environment.js';
import { createQualityController, pixelRatio, RENDER_BUDGET } from './quality.js';
import { craneX, HOUSES } from '../policy.js';
import { sequence, topSurface, type Tower } from '../rules.js';
import { replay, outcome, type Run } from '../domain.js';
export interface SceneInput { run: Run | null; direction: 1 | -1; overview: boolean; enabled: boolean }
export function createStackingScene(host: HTMLElement, onError: (error: unknown) => void, onAnimation: (active: boolean) => void) {
    const renderer = new WebGLRenderer({ alpha: false, antialias: true, powerPreference: 'low-power' });
    renderer.outputColorSpace = SRGBColorSpace; renderer.toneMapping = ACESFilmicToneMapping; renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFSoftShadowMap;
    host.append(renderer.domElement);
    const scene = new Scene(); scene.background = new Color(0xd5ecf1);
    const camera = new OrthographicCamera(-5, 5, 5, -5, 0.1, 160);
    const resources = createResources(), environment = createEnvironment(resources), houses = new Group(), cargo = new Group(), support = new Group();
    scene.add(environment.world, environment.crane, houses, cargo, support);
    scene.add(new HemisphereLight(0xfaffff, 0xb6beb1, 1.7));
    const sun = new DirectionalLight(0xffefd9, 2.8); sun.position.set(-5, 12, 8); sun.castShadow = true;
    sun.shadow.mapSize.setScalar(RENDER_BUDGET.shadow); sun.shadow.camera.left = -6; sun.shadow.camera.right = 6;
    sun.shadow.camera.top = 6; sun.shadow.camera.bottom = -6; sun.shadow.normalBias = 0.035; scene.add(sun, sun.target);
    const ghostGeometry = new BoxGeometry(1, 0.025, 1.24), ghostMaterial = new MeshBasicMaterial({ color: 0x6b9db0, transparent: true, opacity: 0.28 });
    const ghost = new Mesh(ghostGeometry, ghostMaterial); scene.add(ghost);
    const line = resources.mesh(support, 'box', 0xf49b78, [1, 0.055, 0.06], [0, 0, 0.75]);
    const dot = resources.mesh(support, 'sphere', 0xdf7760, [0.075, 0.075, 0.075], [0, 0, 0.79]);
    const quality = createQualityController(), reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let input: SceneInput = { run: null, direction: 1, overview: true, enabled: false };
    let board: Tower | null = null, disposed = false, visible = true, frame = 0, lastTime = 0, elapsed = 0;
    let animationStart = 0, animationHouse: Group | null = null, animationBase = 0, collapsing = false;
    let yaw = 0.3, zoom = 1, centerY = 1.7, halfHeight = 4.5, dragging = false, pointerX = 0;
    let cameraSettling = false;
    const target = new Vector3();
    function resize() {
        if (disposed) { return; }
        const { width, height } = host.getBoundingClientRect();
        renderer.setPixelRatio(pixelRatio(width, height, window.devicePixelRatio || 1, quality.current()));
        renderer.setSize(Math.max(1, width), Math.max(1, height), false);
        const aspect = Math.max(0.2, width / Math.max(1, height));
        camera.left = -halfHeight * aspect; camera.right = halfHeight * aspect; camera.top = halfHeight; camera.bottom = -halfHeight;
        camera.updateProjectionMatrix();
    }
    function active() { return !disposed && visible && !document.hidden; }
    function playing() { return !!input.run && outcome(input.run) === 'playing' && !input.overview; }
    function clock(now: number) {
        const delta = lastTime ? Math.max(0, now - lastTime) : 0; lastTime = now;
        if (active() && input.enabled && playing() && !animationHouse) { elapsed += delta / 1000; }
        return delta;
    }
    function coordinate() { clock(performance.now()); return input.run ? craneX(input.run.seed, input.run.moves.length, elapsed) : 0; }
    function render(now: number, immediate = false) {
        const delta = clock(now);
        const top = board ? topSurface(board).y / 1000 : 3.2;
        const overview = input.overview || !playing();
        const height = overview ? Math.max(5.6, top + 2.7) : 6.7;
        const { width, height: viewportHeight } = host.getBoundingClientRect();
        const aspect = width / Math.max(1, viewportHeight);
        const desiredHalf = Math.max(height / 2, (overview ? 2.4 : 3.7) / Math.max(0.3, aspect)) * zoom;
        const desiredCenter = overview ? top / 2 + 0.4 : Math.max(1.9, top + 0.6);
        cameraSettling = Math.abs(desiredHalf - halfHeight) > 0.01 || Math.abs(desiredCenter - centerY) > 0.01;
        const smooth = immediate || reduced.matches ? 1 : Math.min(1, delta / 160);
        centerY += (desiredCenter - centerY) * smooth;
        if (Math.abs(desiredHalf - halfHeight) > 0.002) { halfHeight += (desiredHalf - halfHeight) * smooth; resize(); }
        target.set(0, centerY, 0); camera.position.set(Math.sin(yaw) * 16, centerY + 6.2, Math.cos(yaw) * 16); camera.lookAt(target);
        sun.position.set(-5, centerY + 10, 8); sun.target.position.set(0, centerY, 0);
        const x = input.run ? craneX(input.run.seed, input.run.moves.length, elapsed) / 1000 : 0;
        const kind = input.run ? sequence(input.run.seed)[input.run.moves.length] : 'wide';
        const spec = HOUSES[kind ?? 'wide'];
        environment.crane.visible = cargo.visible = ghost.visible = playing() && !animationHouse;
        environment.crane.position.y = top + spec.height / 1000 + 2.1;
        environment.carriage.position.x = x; cargo.position.set(x, top + 1.2, 0);
        ghost.position.set(x, top + 0.025, 0); ghost.scale.x = spec.foot / 1000;
        if (animationHouse) {
            const progress = reduced.matches ? 1 : Math.min(1, (now - animationStart) / 550);
            animationHouse.position.y = animationBase + (1 - progress) ** 3 * 1.7;
            animationHouse.scale.y = 1 - Math.sin(progress * Math.PI) * 0.045;
            const resident = animationHouse.userData.resident as Group | undefined;
            if (resident) { resident.position.y = Math.sin(progress * Math.PI * 2) * 0.08; }
            if (progress >= 1) { animationHouse.position.y = animationBase; animationHouse.scale.y = 1; animationHouse = null; onAnimation(false); }
        }
        if (collapsing) {
            const progress = Math.min(1, (now - animationStart) / (reduced.matches ? 1 : 1300));
            houses.children.forEach((house, index) => { house.rotation.z = (index % 2 ? -1 : 1) * progress * 0.3;
                house.position.x = board!.placed[index].x / 1000 + progress * progress * (index % 2 ? -1 : 1) * 2;
                house.position.y = board!.placed[index].y / 1000 - progress * progress * (index + 2); });
            if (progress === 1) { collapsing = false; onAnimation(false); }
        }
        renderer.render(scene, camera);
        if (playing() && input.enabled && !animationHouse && delta) { quality.sample(delta); }
    }
    function tick(now: number) {
        frame = 0; if (!active()) { lastTime = 0; return; }
        try { render(now); } catch (error) { input.enabled = false; onError(error); return; }
        if (playing() && input.enabled || animationHouse || collapsing || cameraSettling) { frame = requestAnimationFrame(tick); }
        else { lastTime = 0; }
    }
    function invalidate() { if (!frame && active()) { frame = requestAnimationFrame(tick); } }
    function stop() { if (frame) { cancelAnimationFrame(frame); frame = 0; } lastTime = 0; }
    function set(next: SceneInput) {
        clock(performance.now());
        const changed = input.run?.id !== next.run?.id || input.run?.moves.length !== next.run?.moves.length || input.overview !== next.overview;
        const landed = next.run && next.run.id === input.run?.id && next.run.moves.length === input.run.moves.length + 1;
        input = next;
        if (changed || !houses.children.length) {
            elapsed = 0; collapsing = false; animationHouse = null; onAnimation(false); houses.clear(); board = next.run ? replay(next.run) : null;
            if (board) {
                const stable = board.placed.slice(0, board.placed.length - Number(!!board.failure));
                stable.forEach((p, i) => { const house = createHouse(resources, p.kind, p.direction, i); house.position.set(p.x / 1000, p.y / 1000, 0); houses.add(house); });
                if (landed && !board.failure && !next.overview) {
                    animationHouse = houses.children.at(-1) as Group; animationBase = animationHouse.position.y;
                    animationStart = performance.now(); onAnimation(true);
                }
                support.visible = !next.overview && outcome(next.run!) === 'playing' && !!board.supports.length;
                if (support.visible) {
                    const joint = board.placed[board.weak], state = board.supports[board.weak];
                    support.position.y = joint.y / 1000 + 0.03;
                    line.position.x = (joint.left + joint.right) / 2000; line.scale.x = Math.max(0.01, (joint.right - joint.left) / 1000);
                    dot.position.x = state.center / 1000;
                    line.material = dot.material = resources.material(state.ratio < 0.25 ? 0xdf7760 : 0x4b9991);
                }
            } else {
                support.visible = false;
                (['wide', 'loft', 'balcony'] as const).forEach((kind, index) => { const house = createHouse(resources, kind, 1, index);
                    house.position.set([0, -0.12, -0.32][index], index === 2 ? 2.2 : index, 0); houses.add(house); });
                centerY = 1.6;
            }
            quality.boundary(); renderer.shadowMap.enabled = quality.current() > 0; resize();
        }
        cargo.clear();
        if (next.run && playing()) { cargo.add(createHouse(resources, sequence(next.run.seed)[next.run.moves.length], next.direction, next.run.moves.length, false)); }
        if (!input.enabled) { lastTime = 0; }
        invalidate();
    }
    function visibility() { stop(); invalidate(); }
    function lost(event: Event) { event.preventDefault(); stop(); onError(new Error('stacking_webgl_context_lost')); }
    function pointerDown(event: PointerEvent) { if (!input.overview && playing()) { return; } dragging = true; pointerX = event.clientX; host.setPointerCapture(event.pointerId); }
    function pointerMove(event: PointerEvent) { if (!dragging) { return; } yaw += (event.clientX - pointerX) * 0.008; pointerX = event.clientX; invalidate(); }
    function pointerUp() { dragging = false; }
    function wheel(event: WheelEvent) { if (!input.overview && playing()) { return; } event.preventDefault(); zoom = Math.max(0.65, Math.min(1.5, zoom + event.deltaY * 0.001)); invalidate(); }
    const observer = new ResizeObserver(() => { resize(); invalidate(); }); observer.observe(host);
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; visibility(); }); intersection.observe(host);
    document.addEventListener('visibilitychange', visibility); renderer.domElement.addEventListener('webglcontextlost', lost);
    host.addEventListener('pointerdown', pointerDown); host.addEventListener('pointermove', pointerMove);
    host.addEventListener('pointerup', pointerUp); host.addEventListener('pointercancel', pointerUp); host.addEventListener('wheel', wheel, { passive: false });
    set(input); resize(); invalidate();
    return { set, coordinate,
        suspend() { visible = false; stop(); }, resume() { visible = true; lastTime = 0; invalidate(); },
        collapse() { if (!board || !board.failure) { return; } animationStart = performance.now(); collapsing = true; onAnimation(true); invalidate(); },
        rotate(delta: number) { yaw += delta; invalidate(); }, zoom(delta: number) { zoom = Math.max(0.65, Math.min(1.5, zoom + delta)); invalidate(); },
        async snapshot(): Promise<Blob> {
            // A photo must fit the complete building even during the overview camera transition.
            const size = host.getBoundingClientRect();
            render(performance.now(), true);
            renderer.setPixelRatio(pixelRatio(size.width, size.height, 2, 2)); renderer.render(scene, camera);
            try { return await new Promise<Blob>((resolve, reject) => renderer.domElement.toBlob(blob => blob ? resolve(blob) : reject(new Error('stacking_export')), 'image/png')); }
            finally { resize(); invalidate(); }
        },
        stats: () => ({ ...renderer.info.memory, calls: renderer.info.render.calls, quality: quality.current(), width: renderer.domElement.width, height: renderer.domElement.height }),
        dispose() {
            disposed = true; stop(); observer.disconnect(); intersection.disconnect(); document.removeEventListener('visibilitychange', visibility);
            renderer.domElement.removeEventListener('webglcontextlost', lost); host.removeEventListener('pointerdown', pointerDown);
            host.removeEventListener('pointermove', pointerMove); host.removeEventListener('pointerup', pointerUp); host.removeEventListener('pointercancel', pointerUp); host.removeEventListener('wheel', wheel);
            ghostGeometry.dispose(); ghostMaterial.dispose(); resources.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
        },
    };
}
export type StackingScene = ReturnType<typeof createStackingScene>;
