import type { ProviderFailureReason } from '../../../capabilities/agent/provider-failure.js';
import { LearningValidationError } from '../../../domains/learning/profile.js';

export const LEARNING_STORAGE_COPY = {
    unconfirmed: '还没确认保存是否成功，请先查看保存结果，不要重复提交。',
    conflict: '发现另一份学习记录，请先核对再继续。', unloaded: '暂时打不开学习记录。',
    failed: '这次没能保存，之前保存的内容都还在，请重试。',
};

export const LEARNING_REWARD_COPY = {
    paid: '奖励已到账', retired: '钱包已重置，这份奖励不再补发', saving: '正在保存学习成果…',
    pending: '学习已完成，奖励待领取', needsWallet: '开通钱包后即可领取', claim: '领取奖励', openWallet: '开通钱包并领取',
    unknown: '学习已完成，奖励到账情况还没确认。请查看钱包状态，不需要重新做练习。',
};

const providerCopy: Record<ProviderFailureReason, string> = {
    'provider-auth': 'AI 连接未通过验证，请检查连接设置中的密钥是否正确或已过期。',
    'provider-forbidden': '你使用的 AI 服务暂不允许访问，请检查账号权限。',
    'provider-request': 'AI 服务没能接受这次请求，请检查连接设置，或换一个模型再试。',
    'provider-not-found': '找不到所选的 AI 模型，请检查连接地址和模型名称。',
    'provider-too-large': '这次要看的内容太多，请分几次说，或换用能阅读更长内容的模型。',
    'provider-rate-limit': 'AI 服务暂时无法继续，请稍后重试，并检查剩余额度。',
    'provider-timeout': '等了有一会儿，还是没收到回复。请检查连接后重试。',
    'provider-unavailable': 'AI 服务暂时不可用，请稍后重试。',
    'provider-failed': '这次没能收到回复，请检查 AI 连接后重试。',
};

export interface LearningProgress {
    stage: 'context' | 'config' | 'session' | 'summary' | 'provider' | 'tools' | 'save' | 'action';
    round?: number;
    tool?: string;
}

export interface LearningFailureDetails extends LearningProgress {
    cause?: unknown;
    issues?: readonly { path: string; message: string }[];
}

const stages: Record<LearningProgress['stage'], string> = {
    context: '翻看学习资料', config: '连接语伴', session: '准备学习内容',
    summary: '整理之前聊过的内容',
    provider: '回复你', tools: '整理学习内容', save: '保存学习内容', action: '准备学习内容',
};

export function learningProgressMessage(progress: LearningProgress): string {
    return `正在${stages[progress.stage]}…`;
}

export function learningTeachingFailure(reason: string): string {
    const provider = providerCopy[reason as ProviderFailureReason];
    if (provider) { return provider; }
    switch (reason) {
        case 'learning_context_failed': return '没能打开学习资料，请重试。';
        case 'learning_config_failed': return '暂时连不上语伴，请检查 AI 连接设置后重试。';
        case 'learning_session_failed': return '这次没能开始，请重试。';
        case 'learning_protocol_failed': return '这次回复没能整理成学习内容，尚未保存，请重试。';
        case 'learning_tool_failed': return '整理学习内容时出了问题，这次内容没有保存，请重试。';
        case 'learning_save_failed': return '保存学习内容时出了问题。请先重新加载，确认哪些内容已保存。';
        case 'learning_context_full': return '这次要看的内容太多了。已保存的练习和作答不变；可以分几次说，或在 AI 设置中换用能阅读更长内容的模型。';
        case 'learning_summary_failed': return '没能整理之前的聊天，原对话和已保存的学习内容都还在。请重试。';
        case 'learning_empty_response': return '语伴没有返回有效回复，已有内容未改，可以重试。';
        case 'learning_help_undeclared': return '这次讲解没能对应到练习，暂未展示或保存。请再试一次。';
        case 'learning_response_truncated': return '这次回复太长，中途停下了。已显示的文字还在，但新的学习内容尚未保存；可以一次少问一点，或在 AI 设置中调高回复长度。';
        case 'learning_stalled': return '这次回复卡住了，已经停止。已保存的内容不变，可以换个说法再试。';
        case 'learning_file_invalid': return '学习文件暂时无法读取，请检查文件；不会覆盖已有内容。';
        case 'learning_read_failed': return '读取学习记录失败，请检查连接后重试。';
        case 'learning_resolve_pending_first': return LEARNING_STORAGE_COPY.unconfirmed;
        case 'learning_file_full': return '学习文件已达到容量上限，请整理不再需要的记录后重试。';
        case 'learning_write_rejected': return '服务器拒绝保存学习记录，请检查登录状态和存储权限后重试。';
        case 'learning_commit_id_reused': return '这次没能保存，请重试。';
        case 'learning_input_invalid': return '输入内容有误，请检查后重试，或重新加载课程。';
        default: return '这次没能完成。请先重新加载，确认学习记录；不需要清空数据。';
    }
}

function diagnosticToken(value: unknown): string | undefined {
    return typeof value === 'string' && /^[a-zA-Z][\w.[\]-]{0,119}$/.test(value) ? value : undefined;
}

/** Keep local validation rules, not the user/model field values or a provider's response body. */
function diagnosticIssue(issue: { path: string; message: string }) {
    const rule = issue.message.startsWith(`${issue.path}: `) ? issue.message.slice(issue.path.length + 2) : issue.message;
    return { path: diagnosticToken(issue.path) ?? '(non-standard field)', rule: rule.slice(0, 240) };
}

/** One terminal diagnostic; raw errors, requests, tool arguments, settings and story text never enter it. */
export function reportLearningFailure(action: string, reason: string, details: LearningFailureDetails): string {
    const cause = details.cause && typeof details.cause === 'object'
        ? details.cause as { name?: unknown; code?: unknown; status?: unknown; httpStatus?: unknown; message?: unknown; stack?: unknown } : {};
    const status = cause.status ?? cause.httpStatus;
    const localCode = typeof cause.message === 'string' && /^learning_[a-z_]+$/.test(cause.message) ? cause.message : undefined;
    // Only source basenames and line/column positions: omit stack messages, URL queries, hosts and filesystem directories.
    const locations = typeof cause.stack === 'string' ? cause.stack.split('\n').slice(1, 9).flatMap(frame => {
        const location = frame.match(/([^/\\\s():?#]{1,100}\.(?:[cm]?js|ts|vue)):(\d+):(\d+)/);
        return location ? [`${location[1]}:${location[2]}:${location[3]}`] : [];
    }) : [];
    const issues = details.issues ?? (details.cause instanceof LearningValidationError ? [details.cause] : []);
    console.error('[LittleWhiteBox][Learning] 学习操作失败', {
        action: diagnosticToken(action), reason, stage: details.stage, round: details.round,
        tool: diagnosticToken(details.tool),
        httpStatus: typeof status === 'number' && status >= 100 && status <= 599 ? status : undefined,
        errorName: diagnosticToken(cause.name), errorCode: diagnosticToken(cause.code) ?? localCode,
        locations, issues: issues.slice(0, 16).map(diagnosticIssue),
    });
    return learningTeachingFailure(reason);
}
