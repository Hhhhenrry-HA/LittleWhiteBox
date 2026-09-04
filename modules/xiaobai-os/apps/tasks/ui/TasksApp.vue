<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw, watch } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import type {
    TaskDetailPresentation,
    TaskHistoryPage,
    TaskPublishedForm,
    TaskRecord,
    TasksPresentation,
} from '../types.js';
import TaskDetail from './TaskDetail.vue';
import TaskPublishForm from './TaskPublishForm.vue';
import TasksActive from './TasksActive.vue';
import TasksBoard from './TasksBoard.vue';
import TasksHistory from './TasksHistory.vue';
import TasksPublished from './TasksPublished.vue';
import TasksSettings from './TasksSettings.vue';
import { mergeTaskHistoryPage } from './history-pagination.js';
import './tasks.css';

type TasksPage = 'board' | 'active' | 'published' | 'history' | 'settings' | 'publish' | 'detail';
const REQUEST_TIMEOUT_MS = 35_000;
const GENERATION_TIMEOUT_MS = 180_000;
const props = defineProps<XiaobaiOsAppProps>();

function fallbackState(): TasksPresentation {
    return {
        chatIdentity: '',
        status: 'blocked',
        message: '任务状态未能载入。',
        writeState: 'ready',
        settings: { autoMaintenance: false },
        playerBalance: 0,
        generationActive: false,
        board: null,
        active: [],
        recruiting: [],
        history: { items: [], nextCursor: null, hasMore: false },
        maintenance: { state: 'idle', lastOutcome: 'none' },
    };
}

function initialState(value: unknown): TasksPresentation {
    return value && typeof value === 'object'
        ? structuredClone(toRaw(value as TasksPresentation))
        : fallbackState();
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function resultBody(response: unknown): unknown {
    return isRecord(response) ? response.result : null;
}

const state = ref(initialState(props.initialState));
const page = ref<TasksPage>('board');
const previousPage = ref<Exclude<TasksPage, 'detail' | 'publish'>>('board');
const detail = ref<TaskDetailPresentation | null>(null);
const pendingPublish = ref<TaskPublishedForm | null>(null);
const boardBusy = ref(false);
const candidateBusyTaskId = ref('');
const writeBusy = ref(false);
const settingsBusy = ref(false);
const saveBusy = ref(false);
const detailBusy = ref(false);
const historyBusy = ref(false);
const errorMessage = ref('');
const actionMessage = ref('');
let stateVersion = 0;
let mounted = false;
let unsubscribe = () => {};

const requiresConfirmation = computed(() => state.value.status === 'unconfirmed');
const writeDisabledReason = computed(() => {
    if (writeBusy.value) {return '正在处理上一项任务操作';}
    if (state.value.status === 'loading') {return '任务数据正在准备';}
    if (state.value.status === 'saving') {return '任务与资金正在保存';}
    if (state.value.status === 'unconfirmed') {return '请先核实上一次保存结果';}
    if (state.value.status === 'conflict') {return '请先采用服务端数据';}
    if (state.value.status === 'blocked') {return state.value.message || '任务暂时不可用';}
    if (state.value.generationActive) {return '正在生成内容，请稍后';}
    return '';
});
const generationDisabledReason = computed(() => (
    writeDisabledReason.value || (state.value.maintenance.state === 'running' ? '正在更新任务' : '')
));
const maintenanceMessage = computed(() => {
    const outcome = state.value.maintenance.lastOutcome;
    if (outcome === 'updated') {return '任务已更新。';}
    if (outcome === 'unchanged') {return '当前任务无需更新。';}
    if (outcome === 'partial') {return '部分任务状态已保存。';}
    if (outcome === 'failed') {return '任务更新失败，请稍后重试。';}
    if (outcome === 'cancelled') {return '本次任务更新已取消。';}
    if (outcome === 'no-work') {return '当前没有需要更新的任务进展。';}
    return '';
});
function applyState(next: TasksPresentation): void {
    if (!next || typeof next.chatIdentity !== 'string') {return;}
    state.value = structuredClone(next);
    errorMessage.value = '';
}

function stateFromBody(body: unknown): TasksPresentation | null {
    if (!isRecord(body)) {return null;}
    const candidate = isRecord(body.state) ? body.state : body;
    return typeof candidate.chatIdentity === 'string' ? candidate as unknown as TasksPresentation : null;
}

function readableError(error: unknown): string {
    const code = error instanceof Error ? error.message : String(error);
    if (code === 'tasks_insufficient_funds') {return '小白币余额不足，任务没有发布。';}
    if (code === 'tasks_state_changed' || code === 'tasks_listing_already_accepted') {return '任务状态已经变化，请按最新状态重试。';}
    if (code === 'tasks_terminal') {return '该任务已经结束，不能再次操作。';}
    if (code === 'tasks_publish_invalid' || code === 'tasks_request_invalid') {return '任务内容不完整或超出允许范围。';}
    if (code === 'tasks_write_blocked' || code === 'tasks_generation_active') {return '当前有生成或保存正在进行，请稍后重试。';}
    if (code === 'tasks_chat_changed') {return '聊天已经切换，请重新打开任务。';}
    if (code === 'host_request_timeout') {return '操作响应超时，结果可能稍后返回，请勿立即重复。';}
    return '任务操作未完成，请稍后重试。';
}

async function request(endpoint: string, payload: Record<string, unknown> = {}, timeout = REQUEST_TIMEOUT_MS): Promise<unknown> {
    return resultBody(await props.bridge.request(endpoint, {
        chatIdentity: state.value.chatIdentity,
        ...payload,
    }, timeout));
}

function applyResponseState(body: unknown, versionAtStart: number): void {
    if (stateVersion !== versionAtStart) {return;}
    const next = stateFromBody(body);
    if (next?.chatIdentity === state.value.chatIdentity) {applyState(next);}
}

function announce(message: string): void {
    actionMessage.value = message;
    errorMessage.value = '';
}

async function refreshBoard(): Promise<void> {
    if (boardBusy.value || generationDisabledReason.value) {return;}
    boardBusy.value = true;
    errorMessage.value = '';
    const version = stateVersion;
    try {
        const body = await request('tasks/refresh', {}, GENERATION_TIMEOUT_MS);
        if (!mounted) {return;}
        applyResponseState(body, version);
        const outcome = isRecord(body) && isRecord(body.outcome) ? body.outcome : null;
        announce(typeof outcome?.message === 'string' ? outcome.message : '任务已刷新');
    } catch (error) {if (mounted) {errorMessage.value = readableError(error);}}
    finally {if (mounted) {boardBusy.value = false;}}
}

async function acceptListing(boardId: string, listingId: string): Promise<void> {
    if (writeDisabledReason.value) {return;}
    writeBusy.value = true;
    const version = stateVersion;
    try {
        const body = await request('tasks/board/accept', { boardId, listingId });
        applyResponseState(body, version);
        announce('任务已接取，报酬已进入托管。');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {writeBusy.value = false;}
}

async function recruit(task: TaskRecord): Promise<void> {
    if (candidateBusyTaskId.value || generationDisabledReason.value) {return;}
    candidateBusyTaskId.value = task.taskId;
    const version = stateVersion;
    try {
        const body = await request('tasks/candidates/refresh', {
            taskId: task.taskId,
            expectedTaskRevision: task.taskRevision,
            expectedEventId: task.eventId,
        }, GENERATION_TIMEOUT_MS);
        applyResponseState(body, version);
        const outcome = isRecord(body) && isRecord(body.outcome) ? body.outcome : null;
        announce(typeof outcome?.message === 'string' ? outcome.message : '招募请求已结束');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {candidateBusyTaskId.value = '';}
}

async function assign(task: TaskRecord, candidateId: string): Promise<void> {
    if (writeDisabledReason.value) {return;}
    writeBusy.value = true;
    const version = stateVersion;
    try {
        const body = await request('tasks/candidates/assign', {
            taskId: task.taskId,
            expectedTaskRevision: task.taskRevision,
            expectedEventId: task.eventId,
            candidateId,
        });
        applyResponseState(body, version);
        announce('执行者已确认，任务进入进行中。');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {writeBusy.value = false;}
}

async function cancelTask(task: TaskRecord): Promise<void> {
    if (writeDisabledReason.value || !globalThis.confirm(`撤回“${task.title}”并退回 ¤ ${task.reward}？`)) {return;}
    writeBusy.value = true;
    const version = stateVersion;
    try {
        const body = await request('tasks/cancel', {
            taskId: task.taskId,
            expectedTaskRevision: task.taskRevision,
            expectedEventId: task.eventId,
        });
        applyResponseState(body, version);
        announce('任务已撤回，托管报酬已退回钱包。');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {writeBusy.value = false;}
}

function requestPublish(form: TaskPublishedForm): void {
    if (!writeDisabledReason.value) {pendingPublish.value = structuredClone(form);}
}

async function confirmPublish(): Promise<void> {
    const form = pendingPublish.value;
    if (!form || writeDisabledReason.value) {return;}
    writeBusy.value = true;
    const version = stateVersion;
    try {
        const body = await request('tasks/publish', { form });
        applyResponseState(body, version);
        pendingPublish.value = null;
        page.value = 'published';
        announce('任务已发布，报酬已锁入托管。');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {writeBusy.value = false;}
}

async function setAutoMaintenance(enabled: boolean): Promise<void> {
    if (settingsBusy.value) {return;}
    settingsBusy.value = true;
    const version = stateVersion;
    try {
        const body = await request('tasks/settings/update', { autoMaintenance: enabled });
        applyResponseState(body, version);
        announce(enabled ? '已开启任务进展自动更新。' : '已关闭任务进展自动更新。');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {settingsBusy.value = false;}
}

async function maintainOnce(): Promise<void> {
    if (state.value.maintenance.state === 'running' || generationDisabledReason.value) {return;}
    const version = stateVersion;
    try {
        const body = await request('tasks/maintenance/run');
        applyResponseState(body, version);
    } catch (error) {errorMessage.value = readableError(error);}
}

async function openDetail(taskId: string): Promise<void> {
    previousPage.value = page.value === 'detail' || page.value === 'publish' ? 'active' : page.value;
    page.value = 'detail';
    detail.value = null;
    detailBusy.value = true;
    try {
        const body = await request('tasks/detail/read', { taskId });
        if (isRecord(body) && isRecord(body.task) && Array.isArray(body.timeline)) {
            detail.value = structuredClone(body as unknown as TaskDetailPresentation);
        }
    } catch (error) {errorMessage.value = readableError(error);}
    finally {detailBusy.value = false;}
}

async function loadMoreHistory(): Promise<void> {
    const cursor = state.value.history.nextCursor;
    if (!cursor || historyBusy.value) {return;}
    historyBusy.value = true;
    const boundary = { cursor, stateVersion };
    try {
        const body = await request('tasks/history/load-more', { cursor });
        if (mounted && isRecord(body) && Array.isArray(body.items)) {
            const pageResult = body as unknown as TaskHistoryPage;
            const merged = mergeTaskHistoryPage(state.value.history, pageResult, boundary, stateVersion);
            if (merged) {state.value.history = merged;}
        }
    } catch (error) {errorMessage.value = readableError(error);}
    finally {historyBusy.value = false;}
}

async function confirmSave(): Promise<void> {
    if (saveBusy.value) {return;}
    saveBusy.value = true;
    const version = stateVersion;
    try {
        const body = await request('tasks/save/confirm');
        applyResponseState(body, version);
        announce('保存结果已重新核实。');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {saveBusy.value = false;}
}

async function adoptServer(): Promise<void> {
    if (saveBusy.value) {return;}
    saveBusy.value = true;
    const version = stateVersion;
    try {
        const body = await request('tasks/save/adopt-server');
        applyResponseState(body, version);
        announce('已采用服务端数据。');
    } catch (error) {errorMessage.value = readableError(error);}
    finally {saveBusy.value = false;}
}

function go(next: Exclude<TasksPage, 'detail'>): void {
    if (next !== 'publish') {previousPage.value = next;}
    page.value = next;
}

watch(page, (next) => {
    const hostPage = next === 'publish' ? 'published' : next;
    props.bridge.post('tasks/activate', { chatIdentity: state.value.chatIdentity, page: hostPage });
});

onMounted(() => {
    mounted = true;
    unsubscribe = props.bridge.subscribe((message) => {
        if (message.type === 'tasks/state') {
            const next = (message.payload as { state?: TasksPresentation } | undefined)?.state;
            if (next) {stateVersion += 1; applyState(next);}
        }
        if (message.type === 'tasks/error') {
            errorMessage.value = '任务状态暂时无法读取，请重新打开。';
        }
    });
    props.bridge.post('tasks/activate', { chatIdentity: state.value.chatIdentity, page: 'board' });
});

onBeforeUnmount(() => {
    mounted = false;
    unsubscribe();
    pendingPublish.value = null;
});
</script>

<template>
    <main class="tasks-app">
        <header class="tasks-app-header">
            <div class="tasks-brand"><span aria-hidden="true"><i /><i /><i /></span><div><h1>任务</h1></div></div>
            <div class="tasks-balance"><small>可用余额</small><strong>¤ {{ state.playerBalance }}</strong></div>
        </header>

        <aside v-if="state.message || errorMessage || actionMessage" class="tasks-notice" :class="{ 'is-error': Boolean(errorMessage) || state.status === 'conflict' || state.status === 'blocked', 'is-warning': requiresConfirmation }" role="status">
            <span>{{ errorMessage ? '!' : requiresConfirmation ? '?' : 'i' }}</span>
            <p>{{ errorMessage || state.message || actionMessage }}</p>
            <button v-if="requiresConfirmation" type="button" :disabled="saveBusy" @click="confirmSave">{{ saveBusy ? '正在核实…' : '核实保存结果' }}</button>
            <button v-else-if="state.status === 'conflict'" type="button" :disabled="saveBusy" @click="adoptServer">{{ saveBusy ? '正在采用…' : '采用服务端数据' }}</button>
        </aside>

        <div class="tasks-content">
            <TasksBoard v-if="page === 'board'" :board="state.board" :busy="boardBusy" :disabled-reason="generationDisabledReason" @refresh="refreshBoard" @accept="acceptListing" />
            <TasksActive v-else-if="page === 'active'" :records="state.active" @detail="openDetail" />
            <TasksPublished v-else-if="page === 'published'" :records="state.recruiting" :candidate-busy-task-id="candidateBusyTaskId" :write-busy="writeBusy" :disabled-reason="writeDisabledReason" @recruit="recruit" @assign="assign" @cancel="cancelTask" @detail="openDetail" @publish="go('publish')" />
            <TasksHistory v-else-if="page === 'history'" :history="state.history" :loading="historyBusy" @detail="openDetail" @load-more="loadMoreHistory" />
            <TasksSettings v-else-if="page === 'settings'" :auto-maintenance="state.settings.autoMaintenance" :settings-busy="settingsBusy" :maintenance-busy="state.maintenance.state === 'running'" :maintenance-message="maintenanceMessage" :disabled-reason="generationDisabledReason" @update="setAutoMaintenance" @maintain="maintainOnce" />
            <TaskPublishForm v-else-if="page === 'publish'" :balance="state.playerBalance" :busy="writeBusy" :disabled-reason="writeDisabledReason" @submit="requestPublish" @cancel="go('published')" />
            <TaskDetail v-else :detail="detail" :loading="detailBusy" @back="go(previousPage)" />
        </div>

        <nav class="tasks-nav" aria-label="任务页面">
            <button type="button" :class="{ 'is-active': page === 'board' }" @click="go('board')"><span>⌁</span>大厅</button>
            <button type="button" :class="{ 'is-active': page === 'active' }" @click="go('active')"><span>▶</span>进行中<b v-if="state.active.length">{{ state.active.length }}</b></button>
            <button type="button" :class="{ 'is-active': page === 'published' || page === 'publish' }" @click="go('published')"><span>◇</span>我发布的<b v-if="state.recruiting.length">{{ state.recruiting.length }}</b></button>
            <button type="button" :class="{ 'is-active': page === 'history' }" @click="go('history')"><span>▤</span>历史</button>
            <button type="button" :class="{ 'is-active': page === 'settings' }" @click="go('settings')"><span>⚙</span>设置</button>
        </nav>

        <div v-if="pendingPublish" class="tasks-dialog-backdrop" @click.self="!writeBusy && (pendingPublish = null)">
            <section class="tasks-dialog" role="alertdialog" aria-modal="true" aria-labelledby="tasks-publish-confirm-title">
                <h2 id="tasks-publish-confirm-title">确认发布任务？</h2>
                <p>“{{ pendingPublish.title }}”将立即从钱包锁定 <strong>¤ {{ pendingPublish.reward }}</strong>。招募期间可以撤回；选定执行者后不能撤回。</p>
                <div><button type="button" :disabled="writeBusy" @click="pendingPublish = null">返回修改</button><button type="button" class="tasks-primary-button" :disabled="Boolean(writeDisabledReason)" :title="writeDisabledReason || undefined" @click="confirmPublish">{{ writeBusy ? '正在保存…' : '确认发布' }}</button></div>
            </section>
        </div>
    </main>
</template>
