const EMBEDDING_ADVICE = '请打开「剧情总结 → 设置 → 向量」，在「Embedding 模型」下点击「测试」检查连接。';
const VECTOR_REBUILD_ACTION = '「向量数据 → 完整重建」';
const VECTOR_REBUILD_COST = '会调用 Embedding API';
export const VECTOR_REBUILD_ADVICE = `请执行${VECTOR_REBUILD_ACTION}（${VECTOR_REBUILD_COST}，不会重新提取 L0 锚点）。`;

export const SUMMARY_FEEDBACK_COPY = Object.freeze({
    title: '剧情总结',
    embeddingTitle: 'Embedding 异常',
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
    embeddingRecall: detail => `本轮记忆召回已跳过。${detail}`,
    embeddingRecallReasons: Object.freeze({
        timeout: attempts => {
            const limits = attempts.map(({ attempt, timeoutMs }) => `第 ${attempt} 次限时 ${timeoutMs / 1000} 秒`).join('；');
            return `Embedding 请求超时${limits ? `（${limits}）` : ''}。可稍后重发；若反复出现，可尝试${VECTOR_REBUILD_ACTION}（${VECTOR_REBUILD_COST}，不保证解决超时）。`;
        },
        credentials: () => 'Embedding API Key 无效或没有权限，请检查 Key。',
        rate_limit: () => 'Embedding 服务限流（HTTP 429），请稍后重试；若 L0 共用同一限额，可降低 L0 并发。',
        server: status => `Embedding 服务暂时出错（HTTP ${status}），请稍后重试。`,
        request_timeout: () => 'Embedding 服务返回请求超时（HTTP 408），请稍后重试。',
        network: () => 'Embedding 网络请求失败，请检查 API 地址、代理或网络。',
        invalid_response: () => 'Embedding 返回的向量数据无效或与请求不匹配，请检查模型是否为 Embedding 模型及接口兼容性。',
        configuration: () => '未配置 Embedding API Key，请在向量设置中填写 Key。',
        configuration_url: () => 'Embedding API 地址无效，请检查向量设置中的 API 地址。',
        http: status => `Embedding 请求被拒绝（HTTP ${status}），请检查 API 地址、模型配置及召回日志。`,
        unknown: () => 'Embedding 请求失败，请查看召回日志中的错误详情。',
    }),
    recallEmbeddingRequestFailed: 'Embedding query request failed',
    queryActivityLog: '[Query Activity] 查询期间任务时间线：remaining 为本批剩余处理量，deferredUnits 为未纳入本批的待办，均非缓存校验结果；activeUnits 为处理中条目，非 HTTP 并发数；sameOrigin 仅表示同源，不代表共享限额。空 activities 仅表示所记录阶段未运行；dropped > 0 表示记录已截断。',
    recallEmbeddingRetry: delayMs => `Round 1 向量化暂时失败，${delayMs}ms 后重试`,
    recallHostTimeout: seconds => `剧情记忆等待本轮用户消息超过 ${seconds} 秒，尚未开始召回，本轮已跳过。请检查酒馆生成准备流程。`,
    recallComputeTimeout: seconds => `剧情记忆召回计算超过 ${seconds} 秒，本轮已跳过。请查看召回日志中的阶段和错误详情。`,
    recallFailed: '剧情记忆召回失败，本轮已跳过。请查看召回日志中的阶段和错误详情。',
    startupFailed: '剧情总结未能完成启动，请刷新页面重试；若仍失败，请反馈控制台中的错误。',
    vectorMaintenance: Object.freeze({
        started: ({ chatId, floorsText, l0Pending, l0VectorMissing }) => `延迟向量维护开始 chat=${chatId} floors=${floorsText} l0Pending=${l0Pending} l0VectorMissing=${l0VectorMissing}；核对 L1/L2 缺口`,
        l1Failed: 'L1 增量构建或缺口补齐未完成',
        incomplete: ({ chunkResult, eventResult, l0Failed, l0VectorResult }) => `延迟向量维护未完成 l1=${chunkResult.success === false ? (chunkResult.code || 'unknown') : 'ok'} l2=${eventResult?.success === false ? (eventResult.code || 'unknown') : 'ok'} l0Failed=${l0Failed} l0Vector=${l0VectorResult?.code || 'ok'}，保留缺口并恢复完整性检查`,
        completed: ({ l0, l1, l2 }) => `延迟向量维护完成 l0=${l0} l1=${l1} l2=${l2}`,
    }),
    vectorIntegrity: Object.freeze({
        fingerprintMismatch: '向量引擎/模型已变更',
        cacheInconsistent: '已有向量缓存不完整或与当前内容不一致',
        l1Gap: count => `${count} 层片段未向量化`,
        l0Gap: count => `${count} 个楼层的锚点或基础向量未完成`,
        eventsMissing: count => `${count} 个事件未向量化`,
        warning: issues => {
            const rebuild = issues.some(issue => issue.action === 'rebuild');
            const advice = rebuild
                ? VECTOR_REBUILD_ADVICE
                : '请到「向量数据」执行「补齐缺漏」；锚点文本缺失则在「记忆锚点」中生成/补齐。';
            const anchors = rebuild && issues.some(issue => issue.code === 'l0_gap')
                ? '缺失的锚点文本仍需在「记忆锚点」中生成/补齐。' : '';
            return `向量数据异常：${issues.map(issue => issue.message).join('、')}。${advice}${anchors}`;
        },
    }),
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
