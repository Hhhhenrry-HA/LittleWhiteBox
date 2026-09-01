import type {
    MapActorPosition,
    MapAtlas,
    MapElement,
    MapElementCategory,
    MapElementKind,
    MapIconToken,
    MapLink,
    MapLinkKind,
    MapLocation,
    MapLocationScale,
    MapMaterial,
    MapSceneMood,
} from '../../../domains/map/types.js';

export interface MapElementRecipe {
    stroke: string;
    fill: string;
    width: number;
    dash?: string;
}

export interface MapElementPresentation extends MapElementRecipe {
    fill: string;
    opacity: number;
    dash?: string;
    icon: string;
    fallback: string;
    z: number;
}

export interface MapMoodRecipe {
    background: string;
    glow: string;
    accent: string;
}

export interface AtlasLayoutNode {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
}

export interface AtlasLayoutEdge {
    id: string;
    from: string;
    to: string;
    path: string;
    labelX: number;
    labelY: number;
    bounds: [number, number, number, number];
}

export interface AtlasHierarchyEdge {
    id: string;
    path: string;
}

export interface AtlasLayout {
    nodes: AtlasLayoutNode[];
    hierarchy: AtlasHierarchyEdge[];
    routes: AtlasLayoutEdge[];
    viewBox: [number, number, number, number];
}

const CATEGORY_RECIPES: Readonly<Record<MapElementCategory, MapElementRecipe>> = Object.freeze({
    wall: { stroke: '#b7d8f7', fill: 'rgba(120, 168, 209, .12)', width: 3 },
    road: { stroke: '#e0aa63', fill: 'rgba(199, 139, 65, .18)', width: 5 },
    water: { stroke: '#46c7ef', fill: 'rgba(36, 154, 207, .30)', width: 2.4 },
    terrain: { stroke: '#8ebd86', fill: 'rgba(89, 139, 90, .25)', width: 2.2 },
    furniture: { stroke: '#d5a86d', fill: 'rgba(160, 105, 51, .28)', width: 2.1 },
    decoration: { stroke: '#c7a6e8', fill: 'rgba(141, 98, 184, .22)', width: 2 },
    door: { stroke: '#ffbe69', fill: 'rgba(229, 144, 53, .20)', width: 3.2 },
    danger: { stroke: '#ff6d7a', fill: 'rgba(218, 52, 72, .24)', width: 2.6, dash: '7 4' },
    marker: { stroke: '#66d9ff', fill: 'rgba(48, 166, 222, .22)', width: 2.2 },
    actor: { stroke: '#f4f8ff', fill: '#167fc3', width: 2.2 },
    label: { stroke: 'none', fill: '#e9f4ff', width: 0 },
    grid: { stroke: '#54738d', fill: 'none', width: 1, dash: '2 5' },
    magic: { stroke: '#c18cff', fill: 'rgba(139, 83, 213, .25)', width: 2.5 },
    secret: { stroke: '#8198aa', fill: 'rgba(74, 96, 113, .20)', width: 2, dash: '3 6' },
    light: { stroke: '#ffe49a', fill: 'rgba(255, 210, 91, .22)', width: 1.5 },
});

export const MAP_CATEGORY_LABELS: Readonly<Record<MapElementCategory, string>> = Object.freeze({
    wall: '墙体',
    road: '道路',
    water: '水域',
    terrain: '地形',
    furniture: '家具',
    decoration: '陈设',
    door: '出入口',
    danger: '危险',
    marker: '标记',
    actor: '人物',
    label: '标注',
    grid: '网格',
    magic: '魔法',
    secret: '未知',
    light: '光源',
});

const KIND_ICONS: Readonly<Record<MapElementKind, string>> = Object.freeze({
    door: 'door_open',
    stairs: 'stairs',
    elevator: 'elevator',
    portal: 'captive_portal',
    passage: 'conversion_path',
    entrance: 'login',
    exit: 'exit_to_app',
    north: 'north',
    south: 'south',
    east: 'east',
    west: 'west',
    up: 'arrow_upward',
    down: 'arrow_downward',
    trap: 'warning',
    chest: 'inventory_2',
    marker: 'location_on',
    player: 'person_pin_circle',
    actor: 'person',
});

const KIND_FALLBACKS: Readonly<Record<MapElementKind, string>> = Object.freeze({
    door: 'D',
    stairs: 'S',
    elevator: 'E',
    portal: 'O',
    passage: 'P',
    entrance: 'I',
    exit: 'O',
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'W',
    up: '↑',
    down: '↓',
    trap: '!',
    chest: 'X',
    marker: '+',
    player: 'P',
    actor: 'A',
});

const ICON_TOKENS: Readonly<Record<MapIconToken, string>> = Object.freeze({
    'door-open': 'door_open',
    stairs: 'stairs',
    elevator: 'elevator',
    portal: 'captive_portal',
    passage: 'conversion_path',
    entrance: 'login',
    exit: 'exit_to_app',
    north: 'north',
    south: 'south',
    east: 'east',
    west: 'west',
    up: 'arrow_upward',
    down: 'arrow_downward',
    trap: 'warning',
    chest: 'inventory_2',
    marker: 'location_on',
    player: 'person_pin_circle',
    actor: 'person',
    chair: 'chair',
    table: 'table_restaurant',
    bed: 'bed',
    counter: 'countertops',
    shelf: 'shelves',
    tree: 'park',
    rock: 'landscape',
    building: 'apartment',
    fire: 'local_fire_department',
    light: 'lightbulb',
    water: 'water_drop',
});

const CATEGORY_ICONS: Readonly<Record<MapElementCategory, string>> = Object.freeze({
    wall: 'architecture',
    road: 'route',
    water: 'water_drop',
    terrain: 'terrain',
    furniture: 'chair',
    decoration: 'category',
    door: 'door_open',
    danger: 'warning',
    marker: 'location_on',
    actor: 'person',
    label: 'label',
    grid: 'grid_on',
    magic: 'auto_awesome',
    secret: 'visibility_off',
    light: 'lightbulb',
});

const CATEGORY_Z: Readonly<Record<MapElementCategory, number>> = Object.freeze({
    terrain: 10,
    water: 20,
    grid: 25,
    road: 30,
    wall: 40,
    furniture: 50,
    decoration: 52,
    door: 55,
    danger: 60,
    secret: 62,
    magic: 65,
    light: 70,
    marker: 80,
    actor: 85,
    label: 90,
});

export const MAP_MATERIAL_COLORS: Readonly<Record<MapMaterial, string>> = Object.freeze({
    unknown: '#52616d',
    wood: '#7c5938',
    stone: '#687988',
    tile: '#637783',
    carpet: '#76576f',
    'bed-sheet': '#8a7b91',
    fabric: '#85679c',
    tatami: '#7f7a4f',
    sand: '#9d8050',
    marble: '#88939d',
    blood: '#792f38',
    water: '#176f9b',
    grass: '#47784e',
    dirt: '#75583d',
    snow: '#b9d5df',
    metal: '#788c9e',
    rune: '#744ab5',
    'warm-light': '#bd7a32',
    'cold-light': '#3f83a4',
    shadow: '#17202a',
});

export const MAP_MOOD_RECIPES: Readonly<Record<MapSceneMood, MapMoodRecipe>> = Object.freeze({
    neutral: { background: '#071019', glow: 'rgba(59, 157, 219, .13)', accent: '#55baff' },
    warm: { background: '#130e0b', glow: 'rgba(235, 142, 65, .14)', accent: '#f2ad68' },
    cold: { background: '#07121b', glow: 'rgba(88, 190, 231, .14)', accent: '#73d2f4' },
    dark: { background: '#05070a', glow: 'rgba(92, 114, 137, .10)', accent: '#8aa6bd' },
    mystic: { background: '#0d0a17', glow: 'rgba(156, 94, 231, .16)', accent: '#c89aff' },
    danger: { background: '#16090d', glow: 'rgba(239, 66, 85, .15)', accent: '#ff7180' },
    calm: { background: '#071411', glow: 'rgba(61, 189, 158, .13)', accent: '#69d8b8' },
});

export const MAP_SCALE_ICONS: Readonly<Record<MapLocationScale, string>> = Object.freeze({
    city: 'location_city',
    district: 'apartment',
    building: 'home_work',
    floor: 'stairs',
    room: 'meeting_room',
    outdoor: 'park',
});

export const MAP_SCALE_LABELS: Readonly<Record<MapLocationScale, string>> = Object.freeze({
    city: '城市',
    district: '区域',
    building: '建筑',
    floor: '楼层',
    room: '房间',
    outdoor: '户外',
});

export const MAP_LINK_LABELS: Readonly<Record<MapLinkKind, string>> = Object.freeze({
    door: '门',
    stairs: '楼梯',
    elevator: '电梯',
    path: '小径',
    road: '道路',
    portal: '传送门',
    passage: '通道',
});

const AREA_PATH_CATEGORIES = new Set<MapElementCategory>([
    'water', 'terrain', 'furniture', 'decoration', 'danger', 'magic', 'secret', 'light',
]);

function stableText(left: string, right: string): number {
    return left < right ? -1 : left > right ? 1 : 0;
}

function numberText(value: number): string {
    return Number(value.toFixed(3)).toString();
}

function pointsOf(element: MapElement): Array<[number, number]> {
    const geometry = element.geometry as { points?: Array<[number, number]> };
    return Array.isArray(geometry.points) ? geometry.points : [];
}

export function isAreaElement(element: MapElement): boolean {
    if (element.shape === 'rect' || element.shape === 'circle') {return true;}
    return pointsOf(element).length >= 3 && (element.closed === true || AREA_PATH_CATEGORIES.has(element.category));
}

export function sceneElementPath(element: MapElement): string {
    const points = pointsOf(element);
    if (points.length < 2) {return '';}
    const close = isAreaElement(element) ? ' Z' : '';
    if (element.shape === 'path') {
        return `M ${points.map(([x, y]) => `${numberText(x)} ${numberText(y)}`).join(' L ')}${close}`;
    }
    const commands = [`M ${numberText(points[0][0])} ${numberText(points[0][1])}`];
    for (let index = 0; index < points.length - 1; index += 1) {
        const previous = points[index - 1] || points[index];
        const current = points[index];
        const next = points[index + 1];
        const following = points[index + 2] || next;
        const firstX = current[0] + (next[0] - previous[0]) / 6;
        const firstY = current[1] + (next[1] - previous[1]) / 6;
        const secondX = next[0] - (following[0] - current[0]) / 6;
        const secondY = next[1] - (following[1] - current[1]) / 6;
        commands.push(`C ${numberText(firstX)} ${numberText(firstY)}, ${numberText(secondX)} ${numberText(secondY)}, ${numberText(next[0])} ${numberText(next[1])}`);
    }
    return commands.join(' ') + close;
}

export function sceneElementLabelPoint(element: MapElement): [number, number] {
    const geometry = element.geometry as {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        radius?: number;
        points?: Array<[number, number]>;
    };
    if (typeof geometry.x === 'number' && typeof geometry.y === 'number') {
        if (element.shape === 'rect') {
            return [geometry.x + (geometry.width || 0) / 2, geometry.y + (geometry.height || 0) / 2];
        }
        if (element.shape === 'circle') {
            return [geometry.x, geometry.y - (geometry.radius || 0) - 8];
        }
        return [geometry.x, geometry.y + (element.shape === 'icon' ? 18 : 0)];
    }
    const points = geometry.points || [];
    if (!points.length) {return [0, 0];}
    const [x, y] = points.reduce<[number, number]>((sum, point) => [sum[0] + point[0], sum[1] + point[1]], [0, 0]);
    return [x / points.length, y / points.length];
}

export function elementPresentation(element: MapElement, patternPrefix: string): MapElementPresentation {
    const recipe = CATEGORY_RECIPES[element.category];
    const area = isAreaElement(element);
    const materialFill = area && element.material
        ? `url(#${patternPrefix}-material-${element.material})`
        : '';
    const certaintyDash = element.certainty === 'inferred'
        ? '8 6'
        : element.certainty === 'unknown' ? '3 7' : recipe.dash;
    return {
        ...recipe,
        fill: area ? materialFill || recipe.fill || MAP_MATERIAL_COLORS[element.material as MapMaterial] : 'none',
        opacity: element.certainty === 'unknown' ? 0.48 : element.certainty === 'inferred' ? 0.72 : 1,
        dash: certaintyDash,
        icon: element.icon ? ICON_TOKENS[element.icon] : element.kind ? KIND_ICONS[element.kind] : CATEGORY_ICONS[element.category],
        fallback: element.kind ? KIND_FALLBACKS[element.kind] : MAP_CATEGORY_LABELS[element.category].slice(0, 1),
        z: CATEGORY_Z[element.category],
    };
}

export function sortedSceneElements(elements: readonly MapElement[]): MapElement[] {
    return [...elements].sort((left, right) => (
        CATEGORY_Z[left.category] - CATEGORY_Z[right.category] || stableText(left.id, right.id)
    ));
}

const NODE_WIDTH = 156;
const NODE_HEIGHT = 66;
const HORIZONTAL_GAP = 34;
const VERTICAL_GAP = 92;
const ROOT_GAP = 70;

function sortedLocations(locations: readonly MapLocation[]): MapLocation[] {
    return [...locations].sort((left, right) => (
        stableText(left.parent || '', right.parent || '')
        || stableText(left.name, right.name)
        || stableText(left.key, right.key)
    ));
}

function cycleLocationKeys(locationByKey: ReadonlyMap<string, MapLocation>): Set<string> {
    const cycles = new Set<string>();
    locationByKey.forEach((location) => {
        const path: string[] = [];
        const indexes = new Map<string, number>();
        let current: MapLocation | undefined = location;
        while (current?.parent) {
            const index = indexes.get(current.key);
            if (index !== undefined) {
                path.slice(index).forEach(key => cycles.add(key));
                break;
            }
            indexes.set(current.key, path.length);
            path.push(current.key);
            current = locationByKey.get(current.parent);
        }
    });
    return cycles;
}

function edgeBounds(points: Array<[number, number]>): [number, number, number, number] {
    return [
        Math.min(...points.map(point => point[0])),
        Math.min(...points.map(point => point[1])),
        Math.max(...points.map(point => point[0])),
        Math.max(...points.map(point => point[1])),
    ];
}

function routeEdge(link: MapLink, from: AtlasLayoutNode, to: AtlasLayoutNode, lane: number): AtlasLayoutEdge {
    const fromCenter: [number, number] = [from.x + from.width / 2, from.y + from.height / 2];
    const toCenter: [number, number] = [to.x + to.width / 2, to.y + to.height / 2];
    const dx = toCenter[0] - fromCenter[0];
    const dy = toCenter[1] - fromCenter[1];
    const horizontal = Math.abs(dx) >= Math.abs(dy);
    const start: [number, number] = horizontal
        ? [dx >= 0 ? from.x + from.width : from.x, fromCenter[1]]
        : [fromCenter[0], dy >= 0 ? from.y + from.height : from.y];
    const end: [number, number] = horizontal
        ? [dx >= 0 ? to.x : to.x + to.width, toCenter[1]]
        : [toCenter[0], dy >= 0 ? to.y : to.y + to.height];
    const labelX = (start[0] + end[0]) / 2;
    const labelY = (start[1] + end[1]) / 2 + lane;
    const controls: [[number, number], [number, number]] = horizontal
        ? [[labelX, start[1] + lane], [labelX, end[1] + lane]]
        : [[start[0] + lane, labelY], [end[0] + lane, labelY]];
    return {
        id: link.id,
        from: link.from,
        to: link.to,
        path: `M ${numberText(start[0])} ${numberText(start[1])} C ${numberText(controls[0][0])} ${numberText(controls[0][1])}, ${numberText(controls[1][0])} ${numberText(controls[1][1])}, ${numberText(end[0])} ${numberText(end[1])}`,
        labelX,
        labelY: labelY - 7,
        bounds: edgeBounds([start, end, controls[0], controls[1], [labelX, labelY - 7]]),
    };
}

export function layoutMapAtlas(atlas: MapAtlas): AtlasLayout {
    const locations = sortedLocations(atlas.locations);
    const locationByKey = new Map(locations.map(location => [location.key, location]));
    const cycleKeys = cycleLocationKeys(locationByKey);
    const children = new Map<string, MapLocation[]>();
    const roots: MapLocation[] = [];
    locations.forEach((location) => {
        const parent = location.parent || '';
        if (parent && locationByKey.has(parent) && !cycleKeys.has(parent) && !cycleKeys.has(location.key)) {
            const bucket = children.get(parent) || [];
            bucket.push(location);
            children.set(parent, bucket);
        } else {
            roots.push(location);
        }
    });
    children.forEach((bucket, key) => children.set(key, sortedLocations(bucket)));

    const widths = new Map<string, number>();
    const subtreeWidth = (location: MapLocation): number => {
        const cached = widths.get(location.key);
        if (cached !== undefined) {return cached;}
        const descendants = children.get(location.key) || [];
        const width = descendants.length
            ? Math.max(NODE_WIDTH, descendants.reduce((sum, child, index) => (
                sum + subtreeWidth(child) + (index ? HORIZONTAL_GAP : 0)
            ), 0))
            : NODE_WIDTH;
        widths.set(location.key, width);
        return width;
    };
    const nodes: AtlasLayoutNode[] = [];
    const place = (location: MapLocation, left: number, depth: number): void => {
        const width = subtreeWidth(location);
        nodes.push({
            key: location.key,
            x: left + (width - NODE_WIDTH) / 2,
            y: depth * (NODE_HEIGHT + VERTICAL_GAP),
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            depth,
        });
        let childLeft = left;
        (children.get(location.key) || []).forEach((child) => {
            place(child, childLeft, depth + 1);
            childLeft += subtreeWidth(child) + HORIZONTAL_GAP;
        });
    };
    let left = 0;
    sortedLocations(roots).forEach((root) => {
        place(root, left, 0);
        left += subtreeWidth(root) + ROOT_GAP;
    });

    const nodeByKey = new Map(nodes.map(node => [node.key, node]));
    const hierarchy = locations.flatMap<AtlasHierarchyEdge>((location) => {
        const child = nodeByKey.get(location.key);
        const parent = location.parent ? nodeByKey.get(location.parent) : undefined;
        if (!child || !parent) {return [];}
        const startX = parent.x + parent.width / 2;
        const startY = parent.y + parent.height;
        const endX = child.x + child.width / 2;
        const endY = child.y;
        const midY = (startY + endY) / 2;
        return [{
            id: `${parent.key}:${child.key}`,
            path: `M ${numberText(startX)} ${numberText(startY)} C ${numberText(startX)} ${numberText(midY)}, ${numberText(endX)} ${numberText(midY)}, ${numberText(endX)} ${numberText(endY)}`,
        }];
    });
    const pairLanes = new Map<string, number>();
    const routes = [...atlas.links]
        .sort((leftLink, rightLink) => stableText(leftLink.id, rightLink.id))
        .flatMap<AtlasLayoutEdge>((link) => {
            const from = nodeByKey.get(link.from);
            const to = nodeByKey.get(link.to);
            if (!from || !to) {return [];}
            const pair = [link.from, link.to].sort(stableText).join(':');
            const index = pairLanes.get(pair) || 0;
            pairLanes.set(pair, index + 1);
            const lane = index === 0 ? 0 : (index % 2 ? 1 : -1) * Math.ceil(index / 2) * 24;
            return [routeEdge(link, from, to, lane)];
        });

    if (!nodes.length) {
        return { nodes, hierarchy, routes, viewBox: [0, 0, 640, 420] };
    }
    const routeBounds = routes.flatMap(route => [route.bounds]);
    const minX = Math.min(...nodes.map(node => node.x), ...routeBounds.map(bounds => bounds[0])) - 60;
    const minY = Math.min(...nodes.map(node => node.y), ...routeBounds.map(bounds => bounds[1])) - 60;
    const maxX = Math.max(...nodes.map(node => node.x + node.width), ...routeBounds.map(bounds => bounds[2])) + 60;
    const maxY = Math.max(...nodes.map(node => node.y + node.height), ...routeBounds.map(bounds => bounds[3])) + 60;
    return {
        nodes,
        hierarchy,
        routes,
        viewBox: [minX, minY, Math.max(420, maxX - minX), Math.max(300, maxY - minY)],
    };
}

export function actorsAtLocation(actors: readonly MapActorPosition[], locationKey: string): MapActorPosition[] {
    return actors
        .filter(actor => actor.locationKey === locationKey)
        .sort((left, right) => stableText(left.displayName, right.displayName) || stableText(left.actorKey, right.actorKey));
}
