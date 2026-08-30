<script setup lang="ts">
import { computed, ref } from 'vue';
import type {
    BankDepositPositionView,
    BankDepositProductView,
    BankFundProductView,
} from '../types.js';

const props = defineProps<{
    mode: 'deposit-open' | 'fund-open' | 'withdraw';
    product?: BankDepositProductView | BankFundProductView;
    position?: BankDepositPositionView;
    balance: number;
    busy: boolean;
    error: string;
}>();

const emit = defineEmits<{
    cancel: [];
    confirm: [amount?: number];
}>();

const amount = ref(props.product ? String(props.product.minAmount) : '');
const title = computed(() => props.mode === 'deposit-open' ? '开立定期存单' : props.mode === 'fund-open' ? '申购浮动理财' : '确认提前支取');
const amountValue = computed(() => /^\d+$/.test(amount.value.trim()) ? Number(amount.value) : 0);
const validationMessage = computed(() => {
    if (props.mode === 'withdraw') {return '';}
    if (!props.product || !Number.isSafeInteger(amountValue.value) || amountValue.value <= 0) {return '请输入正整数金额';}
    if (amountValue.value < props.product.minAmount || amountValue.value > props.product.maxAmount) {
        return `金额须在 ${props.product.minAmount} 至 ${props.product.maxAmount} 之间`;
    }
    if (amountValue.value > props.balance) {return '可用余额不足';}
    return '';
});
const depositProduct = computed(() => props.mode === 'deposit-open' ? props.product as BankDepositProductView : null);
const estimatedMaturity = computed(() => depositProduct.value
    ? Math.floor(amountValue.value * (10_000 + depositProduct.value.interestBps) / 10_000)
    : 0);
const canSubmit = computed(() => !props.busy && (props.mode === 'withdraw' || !validationMessage.value));

function submit(): void {
    if (!canSubmit.value) {return;}
    if (props.mode === 'withdraw') {emit('confirm'); return;}
    emit('confirm', amountValue.value);
}
</script>

<template>
    <dialog
        open
        class="bank-dialog"
        :aria-labelledby="`bank-dialog-${mode}`"
        @click.self="!busy && $emit('cancel')"
        @keydown.esc.stop.prevent="!busy && $emit('cancel')"
    >
        <form method="dialog" class="bank-dialog-card" @submit.prevent="submit">
            <span class="bank-dialog-kicker">VAULT AUTHORIZATION</span>
            <h2 :id="`bank-dialog-${mode}`">{{ title }}</h2>

            <div class="bank-dialog-subject">
                <span>{{ mode === 'withdraw' ? '取' : mode === 'deposit-open' ? '定' : '理' }}</span>
                <div>
                    <strong>{{ position?.name || product?.name }}</strong>
                    <small v-if="product">{{ product.lockLabel }}</small>
                    <small v-else>当前本金 ¤ {{ position?.principal.toLocaleString('zh-CN') }}</small>
                </div>
            </div>

            <label v-if="mode !== 'withdraw'" class="bank-dialog-field">
                <span>开户金额</span>
                <div><i>¤</i><input v-model="amount" type="text" inputmode="numeric" autocomplete="off" aria-describedby="bank-amount-help"></div>
                <small id="bank-amount-help">可用 {{ balance.toLocaleString('zh-CN') }} · 范围 {{ product?.minAmount }} - {{ product?.maxAmount }}</small>
            </label>
            <p v-if="validationMessage" class="bank-dialog-validation">{{ validationMessage }}</p>

            <dl v-if="mode === 'deposit-open' && depositProduct && !validationMessage" class="bank-dialog-summary">
                <div><dt>锁定期限</dt><dd>{{ depositProduct.lockLabel }}</dd></div>
                <div><dt>到期兑付</dt><dd>¤ {{ estimatedMaturity.toLocaleString('zh-CN') }}</dd></div>
            </dl>
            <p v-if="mode === 'fund-open'" class="bank-dialog-warning">
                实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。
            </p>
            <p v-if="mode === 'withdraw' && position" class="bank-dialog-warning is-loss">
                将立即收回 <strong>{{ position.earlyWithdrawalAmount.toLocaleString('zh-CN') }} 小白币</strong>，相较本金损失
                {{ (position.principal - position.earlyWithdrawalAmount).toLocaleString('zh-CN') }} 小白币。此操作不可撤销。
            </p>
            <p v-if="error" class="bank-dialog-error" role="alert">{{ error }}</p>

            <div class="bank-dialog-actions">
                <button type="button" :disabled="busy" @click="$emit('cancel')">取消</button>
                <button type="submit" class="is-primary" :disabled="!canSubmit">
                    {{ busy ? '正在封存…' : mode === 'withdraw' ? `确认收回 ${position?.earlyWithdrawalAmount || 0}` : '确认开户' }}
                </button>
            </div>
        </form>
    </dialog>
</template>
