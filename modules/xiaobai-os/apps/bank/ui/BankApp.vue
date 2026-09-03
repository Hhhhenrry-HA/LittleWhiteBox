<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-contract.js';
import type {
    BankActivityPageView,
    BankClientState,
    BankDepositPositionView,
    BankDepositProductView,
    BankFundProductView,
    BankPage,
} from '../types.js';
import BankActionDialog from './BankActionDialog.vue';
import BankDeposits from './BankDeposits.vue';
import BankFunds from './BankFunds.vue';
import BankPositions from './BankPositions.vue';
import BankRecords from './BankRecords.vue';
import BankVault from './BankVault.vue';
import './bank.css';

interface PendingAction {
    mode: 'deposit-open' | 'fund-open' | 'withdraw';
    product?: BankDepositProductView | BankFundProductView;
    position?: BankDepositPositionView;
    actionId: string;
}

const REQUEST_TIMEOUT_MS = 35_000;
const props = defineProps<XiaobaiOsAppProps>();
const state = ref(structuredClone(toRaw(props.initialState as BankClientState)));
const page = ref<BankPage>('vault');
const pending = ref<PendingAction | null>(null);
const refreshing = ref(false);
const actionBusy = ref(false);
const loadingMore = ref(false);
const errorMessage = ref('');
const dialogError = ref('');
const recordsError = ref('');
let claimActionId: string | null = null;
let unsubscribe = () => {};
let requestGeneration = 0;

const requiresConfirmation = computed(() => state.value.status === 'unconfirmed');
const writeDisabledReason = computed(() => {
    if (actionBusy.value) {return '正在处理上一项银行操作';}
    if (refreshing.value) {return '正在刷新金库状态';}
    if (state.value.status !== 'ready') {return state.value.message || '金库暂时不可写入';}
    if (state.value.generationActive) {return '主剧情正在生成，请等待回复完成';}
    return '';
});
const refreshDisabled = computed(() => refreshing.value || actionBusy.value || requiresConfirmation.value);

function createActionId(): string {
    if (typeof globalThis.crypto?.randomUUID === 'function') {return `bank-ui:${globalThis.crypto.randomUUID()}`;}
    return `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
}

function binding(): { chatIdentity: string } {
    return { chatIdentity: state.value.chatIdentity };
}

function applyState(next: BankClientState): void {
    state.value = structuredClone(next);
    refreshing.value = false;
    loadingMore.value = false;
    errorMessage.value = '';
    recordsError.value = '';
    if (next.claimableCount === 0) {claimActionId = null;}
}

function readableError(error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('economy_insufficient_funds') || message.includes('cannot be overdrawn')) {return '可用小白币不足，开户未完成。';}
    if (message.includes('bank_amount_out_of_range')) {return '开户金额不在该产品允许范围内。';}
    if (message.includes('bank_amount_invalid')) {return '开户金额必须是正整数。';}
    if (message.includes('bank_revision_conflict') || message.includes('bank_event_id_conflict')) {return '金库状态已变化，请关闭确认框并刷新后重试。';}
    if (message.includes('bank_position_missing') || message.includes('bank_position_state_changed')) {return '该头寸状态已经变化，请刷新金库。';}
    if (message.includes('bank_no_due_positions')) {return '当前没有可领取的到期头寸。';}
    if (message === 'host_request_timeout') {return '等待保存结果超时，请保留当前页面并重试。';}
    return '银行操作未完成，请稍后重试。';
}

async function refresh(): Promise<void> {
    if (refreshDisabled.value) {return;}
    const generation = ++requestGeneration;
    refreshing.value = true;
    errorMessage.value = '';
    try {
        const response = await props.bridge.request('bank/refresh', binding(), REQUEST_TIMEOUT_MS) as {
            result: BankClientState;
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
        const response = await props.bridge.request('bank/confirm-save', binding(), REQUEST_TIMEOUT_MS) as {
            result: { state: BankClientState };
        };
        if (generation === requestGeneration) {applyState(response.result.state);}
    } catch (error) {
        if (generation === requestGeneration) {errorMessage.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {refreshing.value = false;}
    }
}

function openProduct(product: BankDepositProductView | BankFundProductView, mode: PendingAction['mode']): void {
    if (writeDisabledReason.value) {return;}
    dialogError.value = '';
    pending.value = { mode, product, actionId: createActionId() };
}

function openWithdrawal(position: BankDepositPositionView): void {
    if (writeDisabledReason.value) {return;}
    dialogError.value = '';
    pending.value = { mode: 'withdraw', position, actionId: createActionId() };
}

function closeAction(): void {
    if (actionBusy.value) {return;}
    pending.value = null;
    dialogError.value = '';
}

async function submitAction(amount?: number): Promise<void> {
    const action = pending.value;
    if (!action || actionBusy.value) {return;}
    const generation = requestGeneration;
    actionBusy.value = true;
    dialogError.value = '';
    const endpoint = action.mode === 'deposit-open'
        ? 'bank/deposit/open'
        : action.mode === 'fund-open' ? 'bank/fund/open' : 'bank/deposit/withdraw';
    try {
        const response = await props.bridge.request(endpoint, {
            ...binding(),
            expectedRevision: state.value.revision,
            expectedEventId: state.value.eventId,
            actionId: action.actionId,
            ...(action.product ? { productId: action.product.id, amount } : {}),
            ...(action.position ? { positionId: action.position.id } : {}),
        }, REQUEST_TIMEOUT_MS) as { result: BankClientState };
        if (generation !== requestGeneration || pending.value !== action) {return;}
        applyState(response.result);
        pending.value = null;
    } catch (error) {
        if (generation === requestGeneration && pending.value === action) {dialogError.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {actionBusy.value = false;}
    }
}

async function settleDue(): Promise<void> {
    if (writeDisabledReason.value || state.value.claimableCount === 0) {return;}
    const generation = requestGeneration;
    claimActionId ||= createActionId();
    const actionId = claimActionId;
    actionBusy.value = true;
    errorMessage.value = '';
    try {
        const response = await props.bridge.request('bank/settle-due', {
            ...binding(),
            expectedRevision: state.value.revision,
            expectedEventId: state.value.eventId,
            actionId,
        }, REQUEST_TIMEOUT_MS) as { result: BankClientState };
        if (generation !== requestGeneration) {return;}
        claimActionId = null;
        applyState(response.result);
    } catch (error) {
        if (generation === requestGeneration) {errorMessage.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {actionBusy.value = false;}
    }
}

async function loadMore(): Promise<void> {
    if (!state.value.activityPage.hasMore || loadingMore.value || actionBusy.value) {return;}
    const generation = requestGeneration;
    const offset = state.value.activities.length;
    loadingMore.value = true;
    recordsError.value = '';
    try {
        const response = await props.bridge.request('bank/records/load-more', {
            ...binding(),
            offset,
        }, REQUEST_TIMEOUT_MS) as { result: BankActivityPageView };
        if (generation !== requestGeneration) {return;}
        const known = new Set(state.value.activities.map((activity) => activity.id));
        state.value.activities.push(...response.result.activities.filter((activity) => !known.has(activity.id)));
        state.value.activityPage = response.result.activityPage;
    } catch (error) {
        if (generation === requestGeneration) {recordsError.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {loadingMore.value = false;}
    }
}

onMounted(() => {
    unsubscribe = props.bridge.subscribe((message) => {
        if (message.type === 'bank/state') {
            if (!actionBusy.value) {requestGeneration += 1;}
            applyState((message.payload as { state: BankClientState }).state);
        }
        if (message.type === 'bank/error') {
            errorMessage.value = readableError((message.payload as { message?: string })?.message || '');
        }
    });
});

onBeforeUnmount(() => {
    requestGeneration += 1;
    unsubscribe();
    pending.value = null;
    claimActionId = null;
});
</script>

<template>
    <main class="bank-app">
        <header class="bank-header">
            <div><h1>白银金库</h1></div>
            <div class="bank-header-balance"><small>可用余额</small><strong>¤ {{ state.balance.toLocaleString('zh-CN') }}</strong></div>
            <button type="button" class="bank-refresh" :disabled="refreshDisabled" title="重新读取金库" @click="refresh">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" /></svg>
                <span class="bank-sr-only">重新读取金库</span>
            </button>
        </header>

        <nav class="bank-navigation" aria-label="银行页面">
            <button type="button" :class="{ 'is-active': page === 'vault' }" @click="page = 'vault'"><span>总览</span></button>
            <button type="button" :class="{ 'is-active': page === 'deposits' }" @click="page = 'deposits'"><span>定期</span></button>
            <button type="button" :class="{ 'is-active': page === 'funds' }" @click="page = 'funds'"><span>理财</span></button>
            <button type="button" :class="{ 'is-active': page === 'positions' }" @click="page = 'positions'"><span>头寸</span><i v-if="state.claimableCount">{{ state.claimableCount }}</i></button>
            <button type="button" :class="{ 'is-active': page === 'records' }" @click="page = 'records'"><span>记录</span></button>
        </nav>

        <aside v-if="state.message || errorMessage" class="bank-notice" :class="`is-${state.status}`" role="status">
            <span aria-hidden="true">鉴</span>
            <div>
                <strong>{{ errorMessage && state.status === 'ready' ? '操作未完成' : state.statusLabel }}</strong>
                <p>{{ errorMessage || state.message }}</p>
                <button v-if="requiresConfirmation" type="button" :disabled="refreshing" @click="confirmSave">
                    {{ refreshing ? '正在核实…' : '核实保存结果' }}
                </button>
                <button v-else-if="state.status === 'blocked' || state.status === 'conflict'" type="button" :disabled="refreshing" @click="refresh">
                    {{ refreshing ? '正在读取…' : '重新读取金库' }}
                </button>
            </div>
        </aside>

        <div class="bank-scroll">
            <BankVault
                v-if="page === 'vault'"
                :balance="state.balance"
                :locked-amount="state.lockedAmount"
                :current-turn="state.currentTurn"
                :deposit-count="state.deposits.length"
                :fund-count="state.investments.length"
                :claimable-count="state.claimableCount"
                :write-disabled-reason="writeDisabledReason"
                @navigate="next => page = next"
                @settle="settleDue"
            />
            <BankDeposits
                v-else-if="page === 'deposits'"
                :products="state.products.deposits"
                :balance="state.balance"
                :write-disabled-reason="writeDisabledReason"
                @open="product => openProduct(product, 'deposit-open')"
            />
            <BankFunds
                v-else-if="page === 'funds'"
                :products="state.products.funds"
                :balance="state.balance"
                :write-disabled-reason="writeDisabledReason"
                @open="product => openProduct(product, 'fund-open')"
            />
            <BankPositions
                v-else-if="page === 'positions'"
                :deposits="state.deposits"
                :investments="state.investments"
                :claimable-count="state.claimableCount"
                :write-disabled-reason="writeDisabledReason"
                @withdraw="openWithdrawal"
                @settle="settleDue"
            />
            <BankRecords
                v-else
                :activities="state.activities"
                :total="state.activityPage.total"
                :has-more="state.activityPage.hasMore"
                :loading-more="loadingMore"
                :error="recordsError"
                @load-more="loadMore"
            />
        </div>

        <BankActionDialog
            v-if="pending"
            :mode="pending.mode"
            :product="pending.product"
            :position="pending.position"
            :balance="state.balance"
            :busy="actionBusy"
            :error="dialogError"
            @cancel="closeAction"
            @confirm="submitAction"
        />
    </main>
</template>
