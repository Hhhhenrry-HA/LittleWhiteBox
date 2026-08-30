<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-src/app-registry.js';
import type { WalletClientState, WalletTransactionPageView } from '../types.js';
import WalletBalanceCard from './WalletBalanceCard.vue';
import WalletTransactionList from './WalletTransactionList.vue';
import './wallet.css';

const REQUEST_TIMEOUT_MS = 35_000;
const props = defineProps<XiaobaiOsAppProps>();
const state = ref(structuredClone(toRaw(props.initialState as WalletClientState)));
const refreshing = ref(false);
const loadingMore = ref(false);
const errorMessage = ref('');
const loadMoreError = ref('');
let unsubscribe = () => {};
let requestGeneration = 0;

const requiresConfirmation = computed(() => state.value.status === 'unconfirmed');
const actionBusy = computed(() => refreshing.value || state.value.status === 'reconciling' || state.value.status === 'saving');
const refreshDisabled = computed(() => actionBusy.value || requiresConfirmation.value || state.value.status === 'conflict');

function binding(): { chatIdentity: string } {
    return { chatIdentity: state.value.chatIdentity };
}

function applyState(next: WalletClientState): void {
    state.value = structuredClone(next);
    refreshing.value = false;
    loadingMore.value = false;
    errorMessage.value = '';
    loadMoreError.value = '';
}

async function refresh(): Promise<void> {
    if (actionBusy.value || requiresConfirmation.value || state.value.status === 'conflict') {return;}
    const generation = ++requestGeneration;
    refreshing.value = true;
    errorMessage.value = '';
    try {
        const response = await props.bridge.request('wallet/refresh', binding(), REQUEST_TIMEOUT_MS) as {
            result: WalletClientState;
        };
        if (generation === requestGeneration) {applyState(response.result);}
    } catch (error) {
        if (generation === requestGeneration) {errorMessage.value = error instanceof Error ? error.message : String(error);}
    } finally {
        if (generation === requestGeneration) {refreshing.value = false;}
    }
}

async function confirmSave(): Promise<void> {
    if (actionBusy.value) {return;}
    const generation = ++requestGeneration;
    refreshing.value = true;
    errorMessage.value = '';
    try {
        const response = await props.bridge.request('wallet/confirm-save', binding(), REQUEST_TIMEOUT_MS) as {
            result: { state: WalletClientState };
        };
        if (generation === requestGeneration) {applyState(response.result.state);}
    } catch (error) {
        if (generation === requestGeneration) {errorMessage.value = error instanceof Error ? error.message : String(error);}
    } finally {
        if (generation === requestGeneration) {refreshing.value = false;}
    }
}

async function loadMore(): Promise<void> {
    const cursor = state.value.nextCursor;
    if (!cursor || loadingMore.value) {return;}
    const generation = requestGeneration;
    loadingMore.value = true;
    loadMoreError.value = '';
    try {
        const response = await props.bridge.request('wallet/load-more', {
            ...binding(),
            beforeSequence: cursor,
        }) as { result: WalletTransactionPageView };
        if (generation !== requestGeneration) {return;}
        const known = new Set(state.value.transactions.map(transaction => transaction.id));
        state.value.transactions.push(...response.result.transactions.filter(transaction => !known.has(transaction.id)));
        state.value.nextCursor = response.result.nextCursor;
        state.value.hasMore = response.result.hasMore;
    } catch (error) {
        if (generation === requestGeneration) {loadMoreError.value = error instanceof Error ? error.message : String(error);}
    } finally {
        if (generation === requestGeneration) {loadingMore.value = false;}
    }
}

onMounted(() => {
    unsubscribe = props.bridge.subscribe((message) => {
        if (message.type === 'wallet/state') {
            requestGeneration += 1;
            applyState((message.payload as { state: WalletClientState }).state);
        }
        if (message.type === 'wallet/error') {
            errorMessage.value = String((message.payload as { message?: string })?.message || '钱包暂时无法读取');
        }
    });
});

onBeforeUnmount(() => {
    requestGeneration += 1;
    unsubscribe();
});
</script>

<template>
    <main class="wallet-app">
        <header class="wallet-header">
            <div>
                <span class="wallet-header-kicker">XIAOBAI LEDGER</span>
                <h1>钱包</h1>
            </div>
            <button type="button" class="wallet-refresh" title="重新读取账本" :disabled="refreshDisabled" @click="refresh">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" /></svg>
                <span class="sr-only">重新读取账本</span>
            </button>
        </header>

        <div class="wallet-scroll">
            <WalletBalanceCard :balance="state.balance" :currency="state.currency" :status="state.status" />

            <aside v-if="state.message || errorMessage" class="wallet-notice" :class="`is-${state.status}`" role="status">
                <span aria-hidden="true">{{ state.status === 'ready' ? '!' : '※' }}</span>
                <div>
                    <strong>{{ state.status === 'conflict' ? '账本发生冲突' : state.status === 'blocked' ? '账本暂停' : '账本状态' }}</strong>
                    <p>{{ errorMessage || state.message }}</p>
                    <button v-if="requiresConfirmation" type="button" :disabled="refreshing" @click="confirmSave">
                        {{ refreshing ? '正在核实…' : '核实保存结果' }}
                    </button>
                    <button v-else-if="state.status === 'blocked'" type="button" :disabled="refreshing" @click="refresh">
                        {{ refreshing ? '正在读取…' : '重新读取' }}
                    </button>
                </div>
            </aside>

            <section class="wallet-ledger" aria-labelledby="wallet-ledger-title">
                <header>
                    <div>
                        <span>收支簿</span>
                        <h2 id="wallet-ledger-title">流水明细</h2>
                    </div>
                    <small>{{ state.transactionCount }} 笔</small>
                </header>
                <WalletTransactionList
                    :transactions="state.transactions"
                    :has-more="state.hasMore"
                    :loading-more="loadingMore"
                    :error="loadMoreError"
                    @load-more="loadMore"
                />
            </section>
        </div>
    </main>
</template>
