<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-src/app-registry.js';
import type {
    GameActiveGameView,
    GameClientState,
    GameDiceBidView,
    GameDiceRecordDetailView,
    GameKind,
    GameLadderChoice,
    GameLadderGameView,
    GamePushGameView,
    GameRecordPageView,
    GameRecordView,
} from '../types.js';
import GameActionDialog from './GameActionDialog.vue';
import GameDiceGame from './GameDiceGame.vue';
import GameDiceReveal from './GameDiceReveal.vue';
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

/**
 * A finished hand the table still has to play out. The server has already
 * settled it, but the last card, die or step has not been shown yet, so the
 * table is kept mounted on a snapshot of its final frame.
 */
type GameEnding =
    | { kind: 'dice'; record: GameRecordView; detail: GameDiceRecordDetailView }
    | { kind: 'push'; record: GameRecordView; game: GamePushGameView }
    | { kind: 'ladder'; record: GameRecordView; game: GameLadderGameView };

/**
 * Outcomes whose last move still has to be shown. `cashed-out` is absent on
 * purpose: the player chose to stop, so nothing is left to find out.
 */
const OUTCOMES_NEEDING_PLAYOUT: ReadonlySet<string> = new Set(['busted', 'failed', 'cleared', 'capped']);

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
const ending = ref<GameEnding | null>(null);
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

// While a hand is being played out the table runs on the ending snapshot, so it
// stays mounted after the server has already cleared the active game.
const pushTable = computed<GamePushGameView | null>(() => {
    if (ending.value?.kind === 'push') {return ending.value.game;}
    return state.value.activeGame?.kind === 'push' ? state.value.activeGame : null;
});
const ladderTable = computed<GameLadderGameView | null>(() => {
    if (ending.value?.kind === 'ladder') {return ending.value.game;}
    return state.value.activeGame?.kind === 'ladder' ? state.value.activeGame : null;
});

function createActionId(): string {
    if (typeof globalThis.crypto?.randomUUID === 'function') {return `game-ui:${globalThis.crypto.randomUUID()}`;}
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

function captureEnding(previous: GameActiveGameView, record: GameRecordView): GameEnding | null {
    // A hand that ended on the player's own terms has nothing left to show.
    if (!OUTCOMES_NEEDING_PLAYOUT.has(record.outcome) && record.detail.kind !== 'dice') {return null;}
    if (previous.kind === 'dice' && record.detail.kind === 'dice') {
        return { kind: 'dice', record, detail: record.detail };
    }
    if (previous.kind === 'push' && record.detail.kind === 'push') {
        return { kind: 'push', record, game: previous };
    }
    if (previous.kind === 'ladder' && record.detail.kind === 'ladder') {
        return { kind: 'ladder', record, game: previous };
    }
    return null;
}

function dismissReveal(): void {
    ending.value = null;
}

function leaveTo(target: GamePage): void {
    dismissReveal();
    page.value = target;
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
        const captured = result ? captureEnding(previousGame, result) : null;
        if (captured) {
            ending.value = captured;
            latestResultId.value = '';
            page.value = captured.kind;
        } else {
            latestResultId.value = result?.id || '';
            page.value = 'lobby';
        }
    } else if (next.activeGame && page.value !== 'records' && page.value !== 'lobby') {
        page.value = next.activeGame.kind;
    } else if (!next.activeGame && page.value !== 'records' && !ending.value) {
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
        ? { heading: '确认入席秘骰对决', summary: `托管 ¤ ${bet}，胜出返还下注的 1.8 倍。`, confirmLabel: '确认入席' }
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
        heading: '现在开骰？',
        summary: '双方骰盅将同时揭开，按桌面最终叫牌直接判定输赢。',
        confirmLabel: '确认开骰',
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

function confirmPendingAction(): void {
    const action = pending.value;
    if (!action) {return;}
    // The dialog only confirms intent. Persistence continues without covering
    // the table, and the transient candidate state starts the playout.
    pending.value = null;
    void performAction(action.request, action.actionId);
}

function closeDialog(): void {
    pending.value = null;
    actionError.value = '';
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
            const next = (message.payload as { state: GameClientState }).state;
            if (!actionBusy.value) {requestGeneration += 1;}
            actionError.value = '';
            failedAction.value = null;
            applyState(next);
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
            <div class="game-brand"><h1>游戏</h1></div>
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
            <button type="button" :class="{ 'is-active': page === 'lobby' }" @click="leaveTo('lobby')">大厅</button>
            <button
                v-if="state.activeGame"
                type="button"
                :class="{ 'is-active': page === state.activeGame.kind }"
                @click="page = state.activeGame?.kind || 'lobby'"
            >
                当前牌桌<i />
            </button>
            <button type="button" :class="{ 'is-active': page === 'records' }" @click="leaveTo('records')">记录</button>
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
                @lobby="leaveTo('lobby')"
            />
            <GameDiceReveal
                v-else-if="page === 'dice' && ending?.kind === 'dice'"
                :record="ending.record"
                :detail="ending.detail"
                @done="leaveTo('lobby')"
            />
            <GamePushGame
                v-else-if="page === 'push' && pushTable"
                :game="pushTable"
                :write-disabled-reason="writeDisabledReason"
                :ending="ending?.kind === 'push' ? ending.record : null"
                @draw="performAction({ endpoint: 'game/push/draw', gameId: state.activeGame?.id || '' })"
                @cash-out="openCashOut('push')"
                @lobby="leaveTo('lobby')"
                @finished="leaveTo('lobby')"
            />
            <GameLadderGame
                v-else-if="page === 'ladder' && ladderTable"
                :game="ladderTable"
                :write-disabled-reason="writeDisabledReason"
                :ending="ending?.kind === 'ladder' ? ending.record : null"
                @step="choice => performAction({ endpoint: 'game/ladder/step', gameId: state.activeGame?.id || '', choice })"
                @cash-out="openCashOut('ladder')"
                @lobby="leaveTo('lobby')"
                @finished="leaveTo('lobby')"
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
            :danger="pending.danger"
            @cancel="closeDialog"
            @confirm="confirmPendingAction"
        />
    </main>
</template>
