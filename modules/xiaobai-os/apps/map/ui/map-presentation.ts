import type {
    MapElement,
    MapElementCategory,
    MapElementKind,
    MapIconToken,
    MapLinkKind,
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

export const MAP_SCALE_LABELS: Readonly<Record<MapLocationScale, string>> = Object.freeze({
    world: '世界',
    region: '区域',
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
