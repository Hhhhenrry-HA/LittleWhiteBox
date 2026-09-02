<script setup lang="ts">
defineProps<{
    kind: 'deposit' | 'fund' | 'records' | 'withdraw';
}>();
</script>

<template>
    <svg class="bank-product-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <template v-if="kind === 'deposit'">
            <path d="M5 3.5h11l3 3V20.5H5z" />
            <path d="M16 3.5v3h3M8 10h8M8 13h6M8 16h4" />
            <circle cx="16.5" cy="16.5" r="2.5" />
        </template>
        <template v-else-if="kind === 'fund'">
            <path d="M4 19.5h16M5.5 16l4-4 3 2 6-7" />
            <path d="m15.5 7 3-.5-.5 3" />
            <circle cx="5.5" cy="16" r="1" /><circle cx="9.5" cy="12" r="1" /><circle cx="12.5" cy="14" r="1" />
        </template>
        <template v-else-if="kind === 'records'">
            <path d="M5 4.5h12a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2z" />
            <path d="M7 4.5v12.8M9.5 8h6M9.5 11h6M9.5 14h4" />
        </template>
        <template v-else>
            <path d="M4 12h12M12 8l4 4-4 4M19 5v14" />
            <circle cx="7" cy="12" r="5" />
        </template>
    </svg>
</template>
