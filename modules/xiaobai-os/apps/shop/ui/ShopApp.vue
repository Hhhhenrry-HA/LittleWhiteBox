<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, toRaw } from 'vue';
import type { XiaobaiOsAppProps } from '../../../shell/app-src/app-registry.js';
import type { ShopActivationView, ShopCatalogItemView, ShopClientState } from '../types.js';
import ShopActionDialog from './ShopActionDialog.vue';
import ShopInventory from './ShopInventory.vue';
import ShopShelf from './ShopShelf.vue';
import './shop.css';

interface PendingAction {
    mode: 'purchase' | 'use' | 'deactivate';
    item: ShopCatalogItemView;
    activation?: ShopActivationView;
    actionId: string;
}

const REQUEST_TIMEOUT_MS = 35_000;
const props = defineProps<XiaobaiOsAppProps>();
const state = ref(structuredClone(toRaw(props.initialState as ShopClientState)));
const page = ref<'shelf' | 'inventory'>('shelf');
const pending = ref<PendingAction | null>(null);
const refreshing = ref(false);
const actionBusy = ref(false);
const errorMessage = ref('');
const dialogError = ref('');
let unsubscribe = () => {};
let requestGeneration = 0;

const requiresConfirmation = computed(() => state.value.status === 'unconfirmed');
const writeDisabledReason = computed(() => {
    if (actionBusy.value) {return '正在处理上一项操作';}
    if (refreshing.value) {return '正在刷新商店状态';}
    if (state.value.status !== 'ready') {return state.value.message || '商店暂时不可写入';}
    if (state.value.generationActive) {return '主剧情正在生成，请等待回复完成';}
    return '';
});
const refreshDisabled = computed(() => refreshing.value || actionBusy.value || requiresConfirmation.value);

function createActionId(): string {
    if (typeof globalThis.crypto?.randomUUID === 'function') {return `shop-ui:${globalThis.crypto.randomUUID()}`;}
    return `shop-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
}

function binding(): { chatIdentity: string } {
    return { chatIdentity: state.value.chatIdentity };
}

function applyState(next: ShopClientState): void {
    state.value = structuredClone(next);
    refreshing.value = false;
    errorMessage.value = '';
}

function readableError(error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('cannot be overdrawn')) {return '小白币余额不足，未完成购买。';}
    if (message.includes('shop_main_generation_active')) {return '主剧情正在生成，请等待回复完成。';}
    if (message.includes('shop_revision_conflict') || message.includes('shop_event_id_conflict')) {
        return '商店状态已变化，请关闭确认框后重试。';
    }
    if (message === 'host_request_timeout') {return '等待保存结果超时，请使用同一确认框重试。';}
    return '商店操作未完成，请稍后重试。';
}

async function refresh(): Promise<void> {
    if (refreshDisabled.value) {return;}
    const generation = ++requestGeneration;
    refreshing.value = true;
    errorMessage.value = '';
    try {
        const response = await props.bridge.request('shop/refresh', binding(), REQUEST_TIMEOUT_MS) as {
            result: ShopClientState;
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
        const response = await props.bridge.request('shop/confirm-save', binding(), REQUEST_TIMEOUT_MS) as {
            result: { state: ShopClientState };
        };
        if (generation === requestGeneration) {applyState(response.result.state);}
    } catch (error) {
        if (generation === requestGeneration) {errorMessage.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {refreshing.value = false;}
    }
}

function openAction(mode: PendingAction['mode'], item: ShopCatalogItemView, activation?: ShopActivationView): void {
    if (writeDisabledReason.value) {return;}
    dialogError.value = '';
    pending.value = { mode, item, activation, actionId: createActionId() };
}

function closeAction(): void {
    if (actionBusy.value) {return;}
    pending.value = null;
    dialogError.value = '';
}

async function submitAction(parameters: Record<string, string>): Promise<void> {
    const action = pending.value;
    if (!action || actionBusy.value) {return;}
    actionBusy.value = true;
    dialogError.value = '';
    const generation = requestGeneration;
    const endpoint = action.mode === 'purchase' ? 'shop/purchase' : action.mode === 'use' ? 'shop/activate' : 'shop/deactivate';
    try {
        const response = await props.bridge.request(endpoint, {
            ...binding(),
            expectedRevision: state.value.revision,
            expectedEventId: state.value.eventId,
            actionId: action.actionId,
            itemId: action.item.id,
            ...(action.mode === 'use' ? { parameters } : {}),
            ...(action.activation ? { activationId: action.activation.activationId } : {}),
        }, REQUEST_TIMEOUT_MS) as { result: ShopClientState };
        if (generation !== requestGeneration || pending.value !== action) {return;}
        applyState(response.result);
        pending.value = null;
    } catch (error) {
        if (generation === requestGeneration && pending.value === action) {dialogError.value = readableError(error);}
    } finally {
        if (generation === requestGeneration) {actionBusy.value = false;}
    }
}

onMounted(() => {
    unsubscribe = props.bridge.subscribe((message) => {
        if (message.type === 'shop/state') {
            if (!actionBusy.value) {requestGeneration += 1;}
            applyState((message.payload as { state: ShopClientState }).state);
        }
        if (message.type === 'shop/error') {
            errorMessage.value = readableError((message.payload as { message?: string })?.message || '');
        }
    });
});

onBeforeUnmount(() => {
    requestGeneration += 1;
    unsubscribe();
    pending.value = null;
});
</script>

<template>
    <main class="shop-app">
        <header class="shop-header">
            <div>
                <h1>奇物商店</h1>
            </div>
            <div class="shop-balance" aria-label="小白币余额"><small>余额</small><strong>¤ {{ state.balance }}</strong></div>
            <button type="button" class="shop-refresh" :disabled="refreshDisabled" title="重新读取商店" @click="refresh">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" /></svg>
                <span class="shop-sr-only">重新读取商店</span>
            </button>
        </header>

        <nav class="shop-root-tabs" aria-label="商店页面">
            <button type="button" :class="{ 'is-active': page === 'shelf' }" @click="page = 'shelf'">货架</button>
            <button type="button" :class="{ 'is-active': page === 'inventory' }" @click="page = 'inventory'">
                背包<span v-if="state.catalog.some(item => item.quantity)">{{ state.catalog.reduce((sum, item) => sum + item.quantity, 0) }}</span>
            </button>
        </nav>

        <aside v-if="state.message || errorMessage" class="shop-notice" :class="`is-${state.status}`" role="status">
            <span aria-hidden="true">印</span>
            <div>
                <strong>{{ state.status === 'unconfirmed' ? '保存待核实' : state.status === 'conflict' ? '状态冲突' : '商店状态' }}</strong>
                <p>{{ errorMessage || state.message }}</p>
                <button v-if="requiresConfirmation" type="button" :disabled="refreshing" @click="confirmSave">
                    {{ refreshing ? '正在核实…' : '核实保存结果' }}
                </button>
                <button v-else-if="state.status === 'blocked'" type="button" :disabled="refreshing" @click="refresh">
                    {{ refreshing ? '正在读取…' : '重新读取' }}
                </button>
            </div>
        </aside>

        <div class="shop-scroll">
            <ShopShelf
                v-if="page === 'shelf'"
                :catalog="state.catalog"
                :balance="state.balance"
                :write-disabled-reason="writeDisabledReason"
                @purchase="item => openAction('purchase', item)"
            />
            <ShopInventory
                v-else
                :catalog="state.catalog"
                :activations="state.activations"
                :write-disabled-reason="writeDisabledReason"
                @use="item => openAction('use', item)"
                @deactivate="activation => {
                    const item = state.catalog.find(candidate => candidate.id === activation.itemId);
                    if (item) openAction('deactivate', item, activation);
                }"
            />
        </div>

        <ShopActionDialog
            v-if="pending"
            :mode="pending.mode"
            :item="pending.item"
            :activation="pending.activation"
            :busy="actionBusy"
            :error="dialogError"
            @cancel="closeAction"
            @confirm="submitAction"
        />
    </main>
</template>
