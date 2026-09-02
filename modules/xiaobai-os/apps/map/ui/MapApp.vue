<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue';
import type { MapLocation } from '../../../domains/map/types.js';
import type { XiaobaiOsAppProps } from '../../../shell/app-src/app-registry.js';
import type { MapClientState, MapClientStatus } from '../types.js';
import MapAtlas from './MapAtlas.vue';
import MapScene from './MapScene.vue';
import MapSettings from './MapSettings.vue';
import { MAP_CATEGORY_LABELS, MAP_MOOD_RECIPES } from './map-presentation.js';
import './map.css';

type MapPage = 'scene' | 'atlas';
type MapRequestAction = 'refresh' | 'settings' | 'maintain' | 'rebuild' | 'confirm' | 'adopt';

interface RequestOutcome {
    response: unknown;
    stateApplied: boolean;
    newerStateReceived: boolean;
}

const REQUEST_TIMEOUT_MS = 35_000;
const MAINTENANCE_TIMEOUT_MS = 180_000;
const REBUILD_TIMEOUT_MS = 240_000;
const MATERIAL_SYMBOL_FONT_FAMILY = 'Xiaobai Map Symbols';
let materialSymbolFontPromise: Promise<FontFace> | null = null;
const props = defineProps<XiaobaiOsAppProps>();

function loadMaterialSymbolFont(): Promise<FontFace> {
    if (!materialSymbolFontPromise) {
        const relativePath = ['..', '..', '..', 'libs', 'material-symbols', 'material-symbols-rounded.woff2'].join('/');
        const fontUrl = new URL(relativePath, import.meta.url).href;
        const font = new FontFace(MATERIAL_SYMBOL_FONT_FAMILY, `url("${fontUrl}")`, {
            display: 'block',
            style: 'normal',
            weight: '400',
        });
        materialSymbolFontPromise = font.load().catch((error) => {
            materialSymbolFontPromise = null;
            throw error;
        });
    }
    return materialSymbolFontPromise;
}

function fallbackState(): MapClientState {
    return {
        chatIdentity: '',
        map: null,
        writeState: 'ready',
        status: 'error',
        message: '地图状态未能载入。',
        autoMaintenance: false,
        maintenanceStatus: 'idle',
        maintenanceMessage: '',
    };
}

function cloneInitialState(value: unknown): MapClientState {
    if (!value || typeof value !== 'object') {return fallbackState();}
    return structuredClone(toRaw(value as MapClientState));
}

function preferredSceneLocation(clientState: MapClientState): string {
    const map = clientState.map;
    if (!map) {return '';}
    const locationByKey = new Map(map.atlas.locations.map(location => [location.key, location]));
    let playerLocation = locationByKey.get(map.atlas.actors.find(actor => actor.actorKey === 'player')?.locationKey || '');
    const visited = new Set<string>();
    while (playerLocation && !visited.has(playerLocation.key)) {
        visited.add(playerLocation.key);
        if (playerLocation.sceneKey && map.scenes[playerLocation.sceneKey]) {return playerLocation.key;}
        playerLocation = playerLocation.parent ? locationByKey.get(playerLocation.parent) : undefined;
    }
    return map.atlas.locations.find(location => location.sceneKey && map.scenes[location.sceneKey])?.key || '';
}

const state = ref<MapClientState>(cloneInitialState(props.initialState));
const page = ref<MapPage>('scene');
const selectedLocationKey = ref(preferredSceneLocation(state.value));
const settingsOpen = ref(false);
const rebuildConfirmationOpen = ref(false);
const activeRequest = ref<MapRequestAction | null>(null);
const errorMessage = ref('');
const actionMessage = ref('');
const symbolsReady = ref(false);
let unsubscribe = () => {};
let requestSequence = 0;
let pushedStateVersion = 0;
let mounted = false;

const sceneLocations = computed(() => {
    const map = state.value.map;
    if (!map) {return [];}
    return map.atlas.locations.filter(location => location.sceneKey && map.scenes[location.sceneKey]);
});
const player = computed(() => state.value.map?.atlas.actors.find(actor => actor.actorKey === 'player') || null);
const playerLocation = computed(() => (
    state.value.map?.atlas.locations.find(location => location.key === player.value?.locationKey) || null
));
const selectedLocation = computed(() => (
    state.value.map?.atlas.locations.find(location => location.key === selectedLocationKey.value) || null
));
const selectedScene = computed(() => {
    const sceneKey = selectedLocation.value?.sceneKey;
    return sceneKey ? state.value.map?.scenes[sceneKey] || null : null;
});
const breadcrumb = computed(() => {
    const map = state.value.map;
    let location = selectedLocation.value;
    if (!map || !location) {return '';}
    const locationByKey = new Map(map.atlas.locations.map(entry => [entry.key, entry]));
    const names: string[] = [];
    const visited = new Set<string>();
    while (location && !visited.has(location.key)) {
        visited.add(location.key);
        names.unshift(location.name);
        location = location.parent ? locationByKey.get(location.parent) || null : null;
    }
    return names.join(' / ');
});
const remoteBusy = computed(() => (
    state.value.status === 'loading'
    || state.value.status === 'saving'
    || state.value.maintenanceStatus === 'maintaining'
    || state.value.maintenanceStatus === 'rebuilding'
));
const busy = computed(() => activeRequest.value !== null || remoteBusy.value);
const requiresConfirmation = computed(() => (
    state.value.status === 'unconfirmed' || state.value.writeState === 'unconfirmed'
));
const refreshDisabled = computed(() => busy.value || requiresConfirmation.value);
const operationDisabledReason = computed(() => {
    if (activeRequest.value) {return '正在处理上一项地图操作';}
    if (state.value.maintenanceStatus === 'maintaining') {return '地图正在维护，请等待本次维护完成';}
    if (state.value.maintenanceStatus === 'rebuilding') {return '地图正在重建，请等待本次重建完成';}
    if (state.value.status === 'loading') {return '地图状态正在载入';}
    if (state.value.status === 'saving') {return '地图正在保存';}
    if (requiresConfirmation.value) {return '请先核实上一次保存结果';}
    if (state.value.status === 'conflict') {return '地图版本发生冲突，请先采用服务端数据';}
    if (state.value.status === 'blocked') {return state.value.message || '当前地图不可维护';}
    if (state.value.status === 'error') {return state.value.message || '地图状态异常，请先重新读取';}
    if (!state.value.chatIdentity) {return '当前聊天不可用';}
    return '';
});

const STATUS_COPY: Readonly<Record<MapClientStatus, string>> = Object.freeze({
    ready: '地图就绪',
    loading: '正在载入',
    saving: '正在保存',
    unconfirmed: '保存待核实',
    conflict: '版本冲突',
    blocked: '暂时不可用',
    error: '状态异常',
});

const statusText = computed(() => {
    if (state.value.maintenanceStatus === 'maintaining') {return '正在维护地图';}
    if (state.value.maintenanceStatus === 'rebuilding') {return '正在重建地图';}
    if (activeRequest.value === 'refresh') {return '正在重新读取';}
    if (activeRequest.value === 'settings') {return '正在保存设置';}
    if (activeRequest.value === 'confirm') {return '正在核实保存';}
    if (activeRequest.value === 'adopt') {return '正在采用服务端数据';}
    if (activeRequest.value === 'maintain') {return '正在维护地图';}
    if (activeRequest.value === 'rebuild') {return '正在重建地图';}
    return STATUS_COPY[state.value.status];
});
const noticeVisible = computed(() => (
    Boolean(errorMessage.value || state.value.message || state.value.maintenanceMessage || actionMessage.value)
    || busy.value
    || state.value.status !== 'ready'
    || state.value.maintenanceStatus === 'error'
));
const noticeTone = computed(() => {
    if (errorMessage.value || ['error', 'blocked', 'conflict'].includes(state.value.status) || state.value.maintenanceStatus === 'error') {
        return 'danger';
    }
    if (requiresConfirmation.value) {return 'warning';}
    if (busy.value) {return 'busy';}
    return 'info';
});
const noticeTitle = computed(() => {
    if (requiresConfirmation.value) {return '保存结果尚未确认';}
    if (state.value.status === 'conflict') {return '地图版本发生冲突';}
    if (state.value.maintenanceStatus === 'error') {return '地图维护未完成';}
    if (errorMessage.value || state.value.status === 'error') {return '地图操作未完成';}
    if (state.value.status === 'blocked') {return '地图暂时不可用';}
    return statusText.value;
});
const noticeMessage = computed(() => (
    errorMessage.value || state.value.maintenanceMessage || state.value.message || actionMessage.value
));
const sceneMood = computed(() => MAP_MOOD_RECIPES[selectedScene.value?.mood || 'neutral']);
const mapCounts = computed(() => ({
    locations: state.value.map?.atlas.locations.length || 0,
    routes: state.value.map?.atlas.links.length || 0,
    actors: state.value.map?.atlas.actors.length || 0,
}));

function isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stateFromResponse(response: unknown): MapClientState | null {
    if (!isRecord(response)) {return null;}
    const result = response.result;
    const candidate = isRecord(result) && isRecord(result.state) ? result.state : result;
    return isRecord(candidate)
        && typeof candidate.chatIdentity === 'string'
        && typeof candidate.status === 'string'
        ? candidate as unknown as MapClientState
        : null;
}

function normalizeSelection(next: MapClientState, preserve: string): string {
    const map = next.map;
    if (map) {
        const existing = map.atlas.locations.find(location => location.key === preserve);
        if (existing?.sceneKey && map.scenes[existing.sceneKey]) {return preserve;}
    }
    return preferredSceneLocation(next);
}

function applyState(next: MapClientState): void {
    const clone = structuredClone(next);
    const preserve = clone.chatIdentity === state.value.chatIdentity ? selectedLocationKey.value : '';
    selectedLocationKey.value = normalizeSelection(clone, preserve);
    state.value = clone;
    errorMessage.value = '';
    actionMessage.value = '';
}

function readableError(error: unknown, action: MapRequestAction): string {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('聊天已切换')) {return '聊天已切换，请重新打开地图。';}
    if (message.includes('map_revision_conflict')) {return '地图已被另一项操作更新，请重新读取后再试。';}
    if (message === 'host_request_timeout') {
        return action === 'maintain' || action === 'rebuild'
            ? '等待 AI 处理超时；后台结果仍可能稍后送达，请勿立即重复操作。'
            : '等待地图服务响应超时，请稍后重试。';
    }
    if (message.includes('已有') && message.includes('维护')) {return '已有地图维护正在进行，请等待完成。';}
    if (action === 'settings') {return '自动维护设置未能保存，请重试。';}
    if (action === 'refresh') {return '地图状态未能重新读取，请稍后重试。';}
    if (action === 'confirm') {return '保存结果仍无法确认，请稍后再次核实。';}
    if (action === 'adopt') {return '暂时无法采用服务端数据，冲突仍保持冻结。';}
    return action === 'rebuild' ? '地图建立/重建未完成，请检查模型配置后重试。' : '地图维护未完成，请检查模型配置后重试。';
}

async function requestMap(
    endpoint: string,
    action: MapRequestAction,
    timeout = REQUEST_TIMEOUT_MS,
    extra: Record<string, unknown> = {},
): Promise<RequestOutcome | null> {
    if (activeRequest.value) {return null;}
    const sequence = ++requestSequence;
    const versionAtStart = pushedStateVersion;
    const chatIdentity = state.value.chatIdentity;
    activeRequest.value = action;
    errorMessage.value = '';
    actionMessage.value = '';
    try {
        const response = await props.bridge.request(endpoint, { chatIdentity, ...extra }, timeout);
        if (!mounted || sequence !== requestSequence || state.value.chatIdentity !== chatIdentity) {return null;}
        const newerStateReceived = pushedStateVersion !== versionAtStart;
        const next = stateFromResponse(response);
        let stateApplied = false;
        if (!newerStateReceived && next?.chatIdentity === chatIdentity) {
            applyState(next);
            stateApplied = true;
        }
        return { response, stateApplied, newerStateReceived };
    } catch (error) {
        if (mounted && sequence === requestSequence) {errorMessage.value = readableError(error, action);}
        return null;
    } finally {
        if (mounted && sequence === requestSequence) {activeRequest.value = null;}
    }
}

async function refresh(): Promise<void> {
    if (refreshDisabled.value) {return;}
    const outcome = await requestMap('map/refresh', 'refresh');
    if (outcome) {actionMessage.value = '已读取当前聊天的最新地图状态。';}
}

async function confirmSave(): Promise<void> {
    if (busy.value) {return;}
    const outcome = await requestMap('map/confirm-save', 'confirm');
    if (outcome) {actionMessage.value = '保存结果已重新核实。';}
}

async function adoptServerState(): Promise<void> {
    if (busy.value) {return;}
    const outcome = await requestMap('map/adopt-server-state', 'adopt');
    if (!outcome) {return;}
    const response = isRecord(outcome.response) ? outcome.response.result : null;
    const adoption = isRecord(response) ? response.adoption : '';
    actionMessage.value = adoption === 'adopted'
        ? '已采用服务端数据，可以继续维护地图。'
        : '服务端数据仍无法采用，地图继续保持冻结。';
}

function maintenanceMessageFromResponse(outcome: RequestOutcome): string {
    const response = isRecord(outcome.response) ? outcome.response.result : null;
    return isRecord(response) && typeof response.message === 'string'
        ? response.message
        : '地图操作已结束。';
}

async function setAutoMaintenance(enabled: boolean): Promise<void> {
    if (activeRequest.value) {return;}
    const outcome = await requestMap('map/set-auto-maintenance', 'settings', REQUEST_TIMEOUT_MS, { enabled });
    if (!outcome) {return;}
    if (!outcome.stateApplied && !outcome.newerStateReceived) {
        state.value = { ...state.value, autoMaintenance: enabled };
    }
    actionMessage.value = enabled ? '普通聊天自动维护已开启。' : '普通聊天自动维护已关闭。';
}

async function maintainOnce(): Promise<void> {
    if (operationDisabledReason.value || !state.value.map) {return;}
    const outcome = await requestMap('map/maintain-once', 'maintain', MAINTENANCE_TIMEOUT_MS);
    if (outcome) {actionMessage.value = maintenanceMessageFromResponse(outcome);}
}

function openRebuildConfirmation(): void {
    if (operationDisabledReason.value) {return;}
    rebuildConfirmationOpen.value = true;
}

async function rebuild(): Promise<void> {
    if (operationDisabledReason.value) {return;}
    const outcome = await requestMap('map/rebuild', 'rebuild', REBUILD_TIMEOUT_MS);
    if (!outcome) {return;}
    rebuildConfirmationOpen.value = false;
    actionMessage.value = maintenanceMessageFromResponse(outcome);
}

function viewScene(locationKey: string): void {
    const location = state.value.map?.atlas.locations.find(entry => entry.key === locationKey);
    if (!location?.sceneKey || !state.value.map?.scenes[location.sceneKey]) {return;}
    selectedLocationKey.value = locationKey;
    page.value = 'scene';
}

function locationOptionLabel(location: MapLocation): string {
    return location.key === playerLocation.value?.key ? `${location.name}（当前位置）` : location.name;
}

onMounted(() => {
    mounted = true;
    unsubscribe = props.bridge.subscribe((message) => {
        if (message.type === 'map/state') {
            const next = (message.payload as { state?: MapClientState } | undefined)?.state;
            if (next) {
                pushedStateVersion += 1;
                applyState(next);
            }
        }
        if (message.type === 'map/error') {
            pushedStateVersion += 1;
            actionMessage.value = '';
            const hostMessage = (message.payload as { message?: string } | undefined)?.message || '';
            errorMessage.value = hostMessage || '地图服务报告了一个错误，请重新读取。';
        }
    });
    if (typeof FontFace === 'function' && document.fonts?.add) {
        void loadMaterialSymbolFont().then((font) => {
            document.fonts.add(font);
            if (mounted) {symbolsReady.value = true;}
        }).catch(() => {
            symbolsReady.value = false;
        });
    }
});

onBeforeUnmount(() => {
    mounted = false;
    requestSequence += 1;
    unsubscribe();
    rebuildConfirmationOpen.value = false;
});
</script>

<template>
    <main class="map-app">
        <header class="map-header">
            <div class="map-brand">
                <span class="map-brand-mark" aria-hidden="true"><i /><i /><i /></span>
                <div><small>XIAOBAI CARTOGRAPHY / 01</small><h1>地图</h1></div>
            </div>
            <div class="map-header-actions">
                <span class="map-status-chip" :class="`is-${noticeTone}`"><i />{{ statusText }}</span>
                <button type="button" class="map-icon-button" :disabled="refreshDisabled" title="重新读取地图" aria-label="重新读取地图" @click="refresh">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" /></svg>
                </button>
                <button type="button" class="map-icon-button" :class="{ 'is-active': settingsOpen }" title="地图设置" aria-label="地图设置" @click="settingsOpen = !settingsOpen">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4L15 4l-2 1h-2L9 4 7.6 6.3l-2.5.4.4 2.5L5 10.5 3 12l2 1.5.5 1.3-.4 2.5 2.5.4L9 20l2-1h2l2 1 1.4-2.3 2.5-.4-.4-2.5z" /></svg>
                </button>
            </div>
        </header>

        <div class="map-command-bar">
            <nav class="map-tabs" aria-label="地图视图">
                <button type="button" :class="{ 'is-active': page === 'scene' }" @click="page = 'scene'">场景</button>
                <button type="button" :class="{ 'is-active': page === 'atlas' }" @click="page = 'atlas'">世界</button>
            </nav>
            <label v-if="page === 'scene'" class="map-location-select">
                <span>观察地点</span>
                <select v-model="selectedLocationKey" :disabled="sceneLocations.length === 0">
                    <option v-if="sceneLocations.length === 0" value="">暂无可查看场景</option>
                    <option v-for="location in sceneLocations" :key="location.key" :value="location.key">
                        {{ locationOptionLabel(location) }}
                    </option>
                </select>
            </label>
            <div v-else class="map-atlas-summary" aria-label="世界地图统计">
                <span>{{ mapCounts.locations }} 地点</span><i />
                <span>{{ mapCounts.routes }} 路线</span><i />
                <span>{{ mapCounts.actors }} 人物</span>
            </div>
        </div>

        <aside v-if="noticeVisible" class="map-notice" :class="`is-${noticeTone}`" role="status">
            <span class="map-notice-code">{{ noticeTone === 'danger' ? '!' : noticeTone === 'warning' ? '?' : 'i' }}</span>
            <div><strong>{{ noticeTitle }}</strong><p v-if="noticeMessage">{{ noticeMessage }}</p></div>
            <button v-if="requiresConfirmation" type="button" :disabled="busy" @click="confirmSave">
                {{ activeRequest === 'confirm' ? '正在核实…' : '确认保存结果' }}
            </button>
            <button v-else-if="state.status === 'conflict'" type="button" :disabled="busy" @click="adoptServerState">
                {{ activeRequest === 'adopt' ? '正在采用…' : '采用服务端数据' }}
            </button>
            <button v-else-if="state.status === 'blocked' || state.status === 'error' || errorMessage" type="button" :disabled="refreshDisabled" @click="refresh">
                {{ activeRequest === 'refresh' ? '正在读取…' : '重新读取' }}
            </button>
        </aside>

        <section class="map-workspace" :class="{ 'has-notice': noticeVisible }">
            <template v-if="page === 'scene'">
                <div v-if="!state.map" class="map-empty-state">
                    <span class="map-empty-radar" aria-hidden="true"><i /></span>
                    <small>NO CARTOGRAPHIC DATA</small>
                    <h2>当前聊天还没有地图</h2>
                    <p>从当前聊天中识别地点、路线与场景。只有确认后才会开始调用 AI。</p>
                    <button type="button" :disabled="Boolean(operationDisabledReason)" @click="openRebuildConfirmation">从当前聊天建立地图</button>
                </div>
                <div v-else-if="!selectedScene" class="map-empty-state">
                    <span class="map-empty-radar" aria-hidden="true"><i /></span>
                    <small>SCENE NOT AVAILABLE</small>
                    <h2>暂无可绘制的场景</h2>
                    <p>世界地点已经存在，但还没有地点具备场景图。可维护一次地图来补充。</p>
                    <button type="button" :disabled="Boolean(operationDisabledReason)" @click="settingsOpen = true">打开维护设置</button>
                </div>
                <div v-else-if="selectedScene.status === 'uninitialized'" class="map-empty-state">
                    <span class="map-empty-radar" aria-hidden="true"><i /></span>
                    <small>SCENE PENDING</small>
                    <h2>{{ selectedScene.name }} 尚未绘制</h2>
                    <p>地点已记录，场景几何仍待地图维护补全。</p>
                    <button type="button" :disabled="Boolean(operationDisabledReason)" @click="settingsOpen = true">打开维护设置</button>
                </div>
                <template v-else>
                    <MapScene :scene="selectedScene" :symbols-ready="symbolsReady" />
                    <div class="map-canvas-heading">
                        <small>{{ breadcrumb || selectedScene.name }}</small>
                        <h2>{{ selectedScene.name }}</h2>
                        <span><i :style="{ background: sceneMood.accent }" />{{ selectedScene.mood || 'neutral' }}</span>
                    </div>
                    <aside class="map-legend is-scene" aria-label="场景地图图例">
                        <strong>图例</strong>
                        <span><i class="is-wall" />{{ MAP_CATEGORY_LABELS.wall }}</span>
                        <span><i class="is-road" />{{ MAP_CATEGORY_LABELS.road }}</span>
                        <span><i class="is-water" />{{ MAP_CATEGORY_LABELS.water }}</span>
                        <span><i class="is-danger" />{{ MAP_CATEGORY_LABELS.danger }}</span>
                        <span><i class="is-actor" />{{ MAP_CATEGORY_LABELS.actor }}</span>
                        <span><i class="is-inferred" />推断</span>
                    </aside>
                    <div v-if="selectedLocation?.brief" class="map-location-brief">{{ selectedLocation.brief }}</div>
                </template>
            </template>

            <template v-else>
                <div v-if="!state.map || state.map.atlas.locations.length === 0" class="map-empty-state">
                    <span class="map-empty-radar" aria-hidden="true"><i /></span>
                    <small>ATLAS IS EMPTY</small>
                    <h2>世界地图尚未建立</h2>
                    <p>建立地图后，这里会显示地点层级、通行路线和人物所在位置。</p>
                    <button type="button" :disabled="Boolean(operationDisabledReason)" @click="openRebuildConfirmation">从当前聊天建立地图</button>
                </div>
                <template v-else>
                    <MapAtlas
                        :atlas="state.map.atlas"
                        :revision="state.map.revision"
                        :current-location-key="playerLocation?.key || ''"
                        :selected-location-key="selectedLocationKey"
                        :symbols-ready="symbolsReady"
                        @view-scene="viewScene"
                    />
                    <div class="map-canvas-heading is-atlas">
                        <small>DETERMINISTIC WORLD GRAPH</small>
                        <h2>地点网络</h2>
                        <span v-if="playerLocation"><i />当前位置 · {{ playerLocation.name }}</span>
                    </div>
                    <aside class="map-legend is-atlas" aria-label="世界地图图例">
                        <strong>图例</strong>
                        <span><i class="is-current" />当前位置</span>
                        <span><i class="is-visited" />已到访</span>
                        <span><i class="is-route" />通行路线</span>
                        <span><i class="is-hierarchy" />隶属层级</span>
                        <small>点击有场景的地点可查看</small>
                    </aside>
                </template>
            </template>

            <div v-if="state.status === 'loading'" class="map-loading-scrim" role="status">
                <span /><p>正在校准地图坐标</p>
            </div>
        </section>

        <Transition name="map-panel">
            <MapSettings
                v-if="settingsOpen"
                :auto-maintenance="state.autoMaintenance"
                :busy="busy"
                :auto-toggle-busy="activeRequest !== null"
                :disabled-reason="operationDisabledReason"
                :has-map="Boolean(state.map)"
                :maintenance-status="state.maintenanceStatus || 'idle'"
                :maintenance-message="state.maintenanceMessage || ''"
                @close="settingsOpen = false"
                @set-auto-maintenance="setAutoMaintenance"
                @maintain-once="maintainOnce"
                @request-rebuild="openRebuildConfirmation"
            />
        </Transition>

        <div v-if="rebuildConfirmationOpen" class="map-dialog-backdrop" @click.self="!busy && (rebuildConfirmationOpen = false)">
            <section class="map-dialog" role="alertdialog" aria-modal="true" aria-labelledby="map-rebuild-title">
                <small>AI CARTOGRAPHY REQUEST</small>
                <h2 id="map-rebuild-title">{{ state.map ? '从当前聊天重建地图？' : '从当前聊天建立地图？' }}</h2>
                <p>此操作会调用已配置的 AI 模型并消耗 token / API 额度。{{ state.map ? '现有地图将在新地图成功保存后被替换。' : '模型会读取当前聊天并生成第一版地图。' }}</p>
                <p v-if="errorMessage" class="map-dialog-error" role="alert">{{ errorMessage }}</p>
                <div>
                    <button type="button" :disabled="busy" @click="rebuildConfirmationOpen = false">取消</button>
                    <button type="button" class="is-confirm" :disabled="busy || Boolean(operationDisabledReason)" :title="operationDisabledReason" @click="rebuild">
                        {{ activeRequest === 'rebuild' || state.maintenanceStatus === 'rebuilding' ? '正在建立地图…' : '确认并开始' }}
                    </button>
                </div>
            </section>
        </div>
    </main>
</template>
