export const MEMORY_DATA_COPY = Object.freeze({
    unconfirmed: '保存结果未确认，已暂停使用和修改这份记忆；请重新加载当前聊天后核对。',
    saving: '正在确认上一项修改，请稍后重试。',
    sourceInvalid: '原文已变化，旧记忆暂不可用；请重试回退，或重新导入／清空总结。',
    historyInvalid: '总结历史无法安全回滚，已停止使用旧总结；请导出核对后重新导入，或清空总结。',
    failed: detail => `修改未能保存：${detail}`,
});

export function memorySaveError(error) {
    if (error?.uncertain || error?.code === 'metadata_unconfirmed') return MEMORY_DATA_COPY.unconfirmed;
    if (error?.code === 'metadata_saving') return MEMORY_DATA_COPY.saving;
    if (error?.code === 'source_boundary_invalid') return MEMORY_DATA_COPY.sourceInvalid;
    if (['history_discontinuous', 'summary_history_invalid'].includes(error?.code)) return MEMORY_DATA_COPY.historyInvalid;
    return MEMORY_DATA_COPY.failed(error?.message || error?.code || 'unknown');
}
