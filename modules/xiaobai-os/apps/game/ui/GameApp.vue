<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-src/app-registry.js';
import type {
    GameClientState,
    GameDiceBidView,
    GameKind,
    GameLadderChoice,
    GameRecordPageView,
} from '../types.js';
import GameActionDialog from './GameActionDialog.vue';
import GameDiceGame from './GameDiceGame.vue';
import GameLadderGame from './GameLadderGame.vue';
import GameLobby from './GameLobby.vue';
import GamePushGame from './GamePushGame.vue';
import GameRecords from './GameRecords.vue';
import './game.css';

type GamePage = 'lobby' | 'dice' | 'push' | 'ladder' | 'records';
type GameWriteRequest =
    | { endpoint: 'game/dice/start'; bet: number }
    | { endpoint: 'game/dice/bid'; gameId: string; bid: GameDiceBidView }
    | { endpoint: 'game/dice/challenge'; gameId: string }
    | { endpoint: 'game/push/start' }
    | { endpoint: 'game/push/draw'; gameId: string }
    | { endpoint: 'game/push/cash-out'; gameId: string }
    | { endpoint: 'game/ladder/start'; bet: number }
    | { endpoint: 'game/ladder/step'; gameId: string; choice: GameLadderChoice }
    | { endpoint: 'game/ladder/cash-out'; gameId: string };

interface PendingAction {
    request: GameWriteRequest;
    actionId: string;
    heading: string;
    summary: string;
    confirmLabel: string;
    danger?: boolean;
}

const REQUEST_TIMEOUT_MS = 35_000;
const props = defineProps<XiaobaiOsAppProps>();
const state = ref(structuredClone(toRaw(props.initialState as GameClientState)));
const page = ref<GamePage>(state.value.activeGame?.kind || 'lobby');
const refreshing = ref(false);
const actionBusy = ref(false);
const loadingMore = ref(false);
const errorMessage = ref('');
const actionError = ref('');
const recordsError = ref('');
const pending = ref<PendingAction | null>(null);
const failedAction = ref<{ request: GameWriteRequest; actionId: string } | null>(null);
const latestResultId = ref('');
let unsubscribe = () => {};
let requestGeneration = 0;
let actionSequence = 0;

const requiresConfirmation = computed(() => state.value.status === 'unconfirmed');
const writeDisabledReason = computed(() => {
    if (actionBusy.value) {return '正在处理上一项操作';}
    if (refreshing.value) {return '正在刷新游戏状态';}
    if (state.value.status !== 'ready') {return state.value.message || '游戏暂时不可写入';}
    if (state.value.generationActive) {return '主剧情正在生成，请等待回复完成';}
    return '';
});
const refreshDisabled = computed(() => refreshing.value || actionBusy.value || requiresConfirmation.value || state.value.status === 'conflict');
const latestResult = computed(() => state.value.records.find(record => record.id === latestResultId.value) || null);

function createActionId(): string {
    if (typeof crypto.randomUUID === 'function') {return `game-ui:${crypto.randomUUID()}`;}
    actionSequence += 1;
    return `game-ui:${Date.now()}:${actionSequence}`;
}

function binding(): { chatIdentity: string } {
    return { chatIdentity: state.value.chatIdentity };
}

function readableError(error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('cannot be overdrawn') || message.includes('economy_insufficient_funds')) {return '小白币余额不足，未能入局。';}
    if (message.includes('game_revision_conflict') || message.includes('game_event_id_conflict')) {return '牌局已经变化，请重新读取后再操作。';}
    if (message.includes('game_dice_bid_not_higher')) {return '叫数必须高于桌面当前叫数。';}
    if (message.includes('game_action_invalid')) {return '当前牌局不接受这项操作。';}
    if (message.includes('game_main_generation_active')) {return '主剧情正在生成，请等待回复完成。';}
    if (message.includes('game_push_cashout_invalid') || message.includes('game_ladder_cashout_invalid')) {return '当前还不能收手。';}
    if (message.includes('聊天已切换')) {return '聊天已切换，请重新打开游戏。';}
    if (message === 'host_request_timeout') {return '等待落账结果超时；可用同一操作标识安全重试。';}
    return '游戏操作未完成，请稍后重试。';
}

function applyState(next: GameClientState): void {
    const previousGame = state.value.activeGame;
    state.value = structuredClone(next);
    refreshing.value = false;
    loadingMore.value = false;
    errorMessage.value = '';
    recordsError.value = '';
    if (previousGame && !next.activeGame) {
        const result = next.records.find(record => record.gameId === previousGame.id);
        latestResultId.value = result?.id || '';
        page.value = 'lobby';
    } else if (next.activeGame && page.value !== 'records' && page.value !== 'lobby') {
        page.value = next.activeGame.kind;
    } else if (!next.activeGame && page.value !== 'records') {
        page.value = 'lobby';
    }
}

function requestPayload(request: GameWriteRequest, actionId: string): Record<string, unknown> {
    const base = {
        ...binding(),
        expectedRevision: state.value.revision,
        expectedEventId: state.value.eventId,
        actionId,
    };
    if (request.endpoint === 'game/dice/start' || request.endpoint === 'game/ladder/start') {
        return { ...base, bet: request.bet };
    }
    if (request.endpoint === 'game/push/start') {return base;}
    if (request.endpoint === 'game/dice/bid') {
        return {
            ...base,
            gameId: request.gameId,
            bid: { count: request.bid.count, face: request.bid.face },
        };
    }
    if (request.endpoint === 'game/ladder/step') {
        return { ...base, gameId: request.gameId, choice: request.choice };
    }
    return { ...base, gameId: request.gameId };
}

async function performAction(request: GameWriteRequest, actionId = createActionId()): Promise<boolean> {
    if (writeDisabledReason.value) {return false;}
    const generation = requestGeneration;
    actionBusy.value = true;
    actionError.value = '';
    failedAction.value = null;
    try {
        const response = await props.bridge.request(
            request.endpoint,
            requestPayload(request, actionId),
            REQUEST_TIMEOUT_MS,
        ) as { result: GameClientState };
        if (generation !== requestGeneration) {return false;}
        applyState(response.result);
        if (response.result.activeGame) {page.value = response.result.activeGame.kind;}
        pending.value = null;
        return true;
    } catch (error) {
        if (generation === requestGeneration) {
            actionError.value = readableError(error);
            if (state.value.status === 'unconfirmed') {
                pending.value = null;
                failedAction.value = null;
            } else {
                failedAction.value = { request, actionId };
            }
        }
        return false;
    } finally {
        if (generation === requestGeneration) {actionBusy.value = false;}
    }
}

function openStart(kind: GameKind, bet: number): void {
    if (writeDisabledReason.value || state.value.activeGame) {return;}
    const copy = kind === 'dice'
        ? { heading: '确认入席秘骰对决', summary: `托管 ¤ ${bet}，胜出返还下注的 1.9 倍。`, confirmLabel: '确认入席' }
        : kind === 'push'
            ? { heading: '确认揭开第一张牌', summary: '托管 ¤ 50。金币可以累积，炸弹会立即结束本局。', confirmLabel: '确认揭牌' }
            : { heading: '确认踏上鎏金阶梯', summary: `托管 ¤ ${bet}，首层成功后才可收手。`, confirmLabel: '确认登阶' };
    const request: GameWriteRequest = kind === 'dice'
        ? { endpoint: 'game/dice/start', bet }
        : kind === 'push'
            ? { endpoint: 'game/push/start' }
            : { endpoint: 'game/ladder/start', bet };
    pending.value = { request, actionId: createActionId(), ...copy };
    actionError.value = '';
}

function openChallenge(): void {
    const game = state.value.activeGame;
    if (game?.kind !== 'dice' || !game.legalActions.includes('challenge')) {return;}
    pending.value = {
        request: { endpoint: 'game/dice/challenge', gameId: game.id },
        actionId: createActionId(),
        heading: '确定质疑庄家？',
        summary: '双方骰子将立即核验，本局随结果结算。',
        confirmLabel: '提出质疑',
        danger: true,
    };
    actionError.value = '';
}

function openCashOut(kind: 'push' | 'ladder'): void {
    const game = state.value.activeGame;
    if (!game || game.kind !== kind || !game.legalActions.includes('cash-out')) {return;}
    const amount = game.cashoutAmount;
    pending.value = {
        request: kind === 'push'
            ? { endpoint: 'game/push/cash-out', gameId: game.id }
            : { endpoint: 'game/ladder/cash-out', gameId: game.id },
        actionId: createActionId(),
        heading: '现在收手？',
        summary: `本局将结束，并返还 ¤ ${amount}。`,
        confirmLabel: '收手入账',
    };
    actionError.value = '';
}

async function confirmPendingAction(): Promise<void> {
    const action = pending.value;
    if (action) {await performAction(action.request, action.actionId);}
}

function closeDialog(): void {
    if (!actionBusy.value) {
        pending.value = null;
        actionError.value = '';
    }
}

async function refresh(): Promise<void> {
    if (refreshDisabled.value) {return;}
    const generation = ++requestGeneration;
    refreshing.value = true;
    errorMessage.value = '';
    try {
        const response = await props.bridge.request('game/refresh', binding(), REQUEST_TIMEOUT_MS) as {
            result: GameClientState;
        };
        if (generation === requestGeneration) {applyState(response.result);}
    } catch (error) {
        if (generation === requestGeneration) {errorMessage.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {refreshing.value = false;}
    }
}

async function confirmSave(): Promise<void> {
    if (refreshing.value || actionBusy.value) {return;}
    const generation = ++requestGeneration;
    refreshing.value = true;
    errorMessage.value = '';
    try {
        const response = await props.bridge.request('game/confirm-save', binding(), REQUEST_TIMEOUT_MS) as {
            result: { state: GameClientState };
        };
        if (generation === requestGeneration) {applyState(response.result.state);}
    } catch (error) {
        if (generation === requestGeneration) {errorMessage.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {refreshing.value = false;}
    }
}

async function loadMore(): Promise<void> {
    if (!state.value.hasMore || loadingMore.value || actionBusy.value) {return;}
    const generation = requestGeneration;
    loadingMore.value = true;
    recordsError.value = '';
    try {
        const response = await props.bridge.request('game/records/load-more', {
            ...binding(),
            offset: state.value.records.length,
        }, REQUEST_TIMEOUT_MS) as { result: GameRecordPageView };
        if (generation !== requestGeneration) {return;}
        const known = new Set(state.value.records.map(record => record.id));
        state.value.records.push(...response.result.records.filter(record => !known.has(record.id)));
        state.value.total = response.result.total;
        state.value.hasMore = response.result.hasMore;
    } catch (error) {
        if (generation === requestGeneration) {recordsError.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {loadingMore.value = false;}
    }
}

function retryFailedAction(): void {
    const failed = failedAction.value;
    if (failed) {void performAction(failed.request, failed.actionId);}
}

onMounted(() => {
    unsubscribe = props.bridge.subscribe((message) => {
        if (message.type === 'game/state') {
            if (!actionBusy.value) {requestGeneration += 1;}
            actionError.value = '';
            failedAction.value = null;
            applyState((message.payload as { state: GameClientState }).state);
        }
        if (message.type === 'game/error') {
            errorMessage.value = '游戏状态暂时无法读取，请重新打开。';
        }
    });
});

onBeforeUnmount(() => {
    requestGeneration += 1;
    unsubscribe();
    pending.value = null;
    failedAction.value = null;
});
</script>

<template>
    <main class="game-app">
        <header class="game-header">
            <div class="game-brand"><span>GAME CENTER</span><h1>游戏</h1></div>
            <div class="game-funds">
                <span><small>可用</small><strong>¤ {{ state.balance }}</strong></span>
                <span><small>托管</small><strong>¤ {{ state.lockedAmount }}</strong></span>
            </div>
            <button type="button" class="game-refresh" :disabled="refreshDisabled" title="重新读取游戏" @click="refresh">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" /></svg>
                <span class="game-sr-only">重新读取游戏</span>
            </button>
        </header>

        <nav class="game-nav" aria-label="游戏页面">
            <button type="button" :class="{ 'is-active': page === 'lobby' }" @click="page = 'lobby'">大厅</button>
            <button
                v-if="state.activeGame"
                type="button"
                :class="{ 'is-active': page === state.activeGame.kind }"
                @click="page = state.activeGame?.kind || 'lobby'"
            >
                当前牌桌<i />
            </button>
            <button type="button" :class="{ 'is-active': page === 'records' }" @click="page = 'records'">记录</button>
        </nav>

        <aside v-if="state.message || errorMessage" class="game-notice" :class="`is-${state.status}`" role="status">
            <span aria-hidden="true">!</span>
            <div>
                <strong>{{ state.status === 'unconfirmed' ? '落账待核实' : state.status === 'conflict' ? '牌局状态冲突' : '游戏状态' }}</strong>
                <p>{{ errorMessage || state.message }}</p>
                <button v-if="requiresConfirmation" type="button" :disabled="refreshing" @click="confirmSave">
                    {{ refreshing ? '正在核实…' : '核实保存结果' }}
                </button>
                <button v-else-if="state.status === 'blocked'" type="button" :disabled="refreshing" @click="refresh">
                    {{ refreshing ? '正在读取…' : '重新读取' }}
                </button>
            </div>
        </aside>

        <aside v-if="actionError && !pending" class="game-action-error" role="status">
            <span>{{ actionError }}</span>
            <button v-if="failedAction && state.status === 'ready'" type="button" :disabled="actionBusy" @click="retryFailedAction">重试同一操作</button>
        </aside>

        <div class="game-scroll">
            <div v-if="latestResult && page === 'lobby'" class="game-result-banner" :class="`is-${latestResult.outcomeTone}`" role="status">
                <span>{{ latestResult.gameLabel }}</span>
                <strong>{{ latestResult.outcomeLabel }}</strong>
                <em>{{ latestResult.net > 0 ? '+' : '' }}{{ latestResult.net }} 小白币</em>
                <button type="button" @click="latestResultId = ''">关闭</button>
            </div>

            <GameLobby
                v-if="page === 'lobby'"
                :active-game="state.activeGame"
                :balance="state.balance"
                :locked-amount="state.lockedAmount"
                :write-disabled-reason="writeDisabledReason"
                @start="openStart"
                @continue="kind => page = kind"
            />
            <GameDiceGame
                v-else-if="page === 'dice' && state.activeGame?.kind === 'dice'"
                :game="state.activeGame"
                :write-disabled-reason="writeDisabledReason"
                @bid="bid => performAction({ endpoint: 'game/dice/bid', gameId: state.activeGame?.id || '', bid })"
                @challenge="openChallenge"
                @lobby="page = 'lobby'"
            />
            <GamePushGame
                v-else-if="page === 'push' && state.activeGame?.kind === 'push'"
                :game="state.activeGame"
                :write-disabled-reason="writeDisabledReason"
                @draw="performAction({ endpoint: 'game/push/draw', gameId: state.activeGame?.id || '' })"
                @cash-out="openCashOut('push')"
                @lobby="page = 'lobby'"
            />
            <GameLadderGame
                v-else-if="page === 'ladder' && state.activeGame?.kind === 'ladder'"
                :game="state.activeGame"
                :write-disabled-reason="writeDisabledReason"
                @step="choice => performAction({ endpoint: 'game/ladder/step', gameId: state.activeGame?.id || '', choice })"
                @cash-out="openCashOut('ladder')"
                @lobby="page = 'lobby'"
            />
            <GameRecords
                v-else-if="page === 'records'"
                :records="state.records"
                :total="state.total"
                :has-more="state.hasMore"
                :loading-more="loadingMore"
                :error="recordsError"
                @load-more="loadMore"
            />
        </div>

        <GameActionDialog
            v-if="pending"
            :heading="pending.heading"
            :summary="pending.summary"
            :confirm-label="pending.confirmLabel"
            :busy="actionBusy"
            :error="actionError"
            :danger="pending.danger"
            @cancel="closeDialog"
            @confirm="confirmPendingAction"
        />
    </main>
</template>
