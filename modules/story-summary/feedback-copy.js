const EMBEDDING_ADVICE = '请打开「剧情总结 → 设置 → 向量」，在「Embedding 模型」下点击「测试」检查连接。';

export const SUMMARY_FEEDBACK_COPY = Object.freeze({
    title: '剧情总结',
    embeddingTitle: 'Embedding 连接异常',
    embeddingWarmup: `Embedding 自动预热未成功，记忆召回可能受影响。${EMBEDDING_ADVICE}`,
    vectorInitialization: Object.freeze({
        configuration: `无法读取已保存的配置，向量初始化未完成。${EMBEDDING_ADVICE}`,
        runtime: `本地向量运行态准备失败，初始化未完成。${EMBEDDING_ADVICE}`,
        embedding: 'Embedding 连接测试失败。',
    }),
    connectionCancelled: '测试已取消。',
    configSaveCancelled: '本次保存已取消，配置未保存。请重试。',
    vectorConfigFailed: '向量配置未能保存，任务未开始。请重新保存配置后重试。',
    configLoad: Object.freeze({
        loading: '正在读取已保存的配置…',
        failed: '读取配置失败，请重试。',
        interrupted: '读取被新的配置操作中止。',
        waiting: '等待配置…',
        retry: '重新读取',
    }),
    statsRefreshFailed: '向量统计刷新失败。',
    embeddingRecall: `本轮记忆召回因 Embedding 请求失败而跳过。${EMBEDDING_ADVICE}`,
    startupFailed: '剧情总结未能完成启动，请刷新页面重试；若仍失败，请反馈控制台中的错误。',
    anchors: Object.freeze({
        success: '记忆锚点已清空',
        failed: '记忆锚点未能完全清空，可能已有部分数据被清除。请重试。',
        refreshFailed: '记忆锚点已清空，但面板统计更新失败。请重新打开面板查看。',
    }),
    vectors: Object.freeze({
        success: '向量数据已清除。如需恢复，请点击“补齐缺漏”。',
        failed: '向量数据未能完全清空，可能已有部分数据被清除。请重试；如需恢复向量，请点击“补齐缺漏”。',
        refreshFailed: '向量数据已清空，但面板统计更新失败。请重新打开面板查看。',
    }),
});
