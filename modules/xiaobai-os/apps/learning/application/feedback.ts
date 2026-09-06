import { providerFailureMessage } from '../../../capabilities/agent/provider-failure.js';
import { LearningValidationError } from '../../../domains/learning/profile.js';

export interface LearningProgress {
    stage: 'context' | 'config' | 'session' | 'provider' | 'tools' | 'save' | 'action';
    round?: number;
    tool?: string;
}

export interface LearningFailureDetails extends LearningProgress {
    cause?: unknown;
    issues?: readonly { path: string; message: string }[];
}

const stages: Record<LearningProgress['stage'], string> = {
    context: '读取教学背景', config: '读取 API 配置', session: '准备教学请求',
    provider: '等待老师回复', tools: '处理教学工具', save: '保存学习内容', action: '处理学习操作',
};

export function learningProgressMessage(progress: LearningProgress): string {
    return `正在${stages[progress.stage]}${progress.round ? `（第 ${progress.round} 轮）` : ''}…`;
}

export function learningTeachingFailure(reason: string): string {
    const provider = providerFailureMessage(reason);
    if (provider) { return provider; }
    switch (reason) {
        case 'learning_context_failed': return '读取角色或剧情背景时发生异常，尚未请求老师。请重试；若仍失败，请提供下方错误码与控制台诊断。';
        case 'learning_config_failed': return '读取教学 API 配置失败，尚未请求老师。请检查 API 设置后重试。';
        case 'learning_session_failed': return '教学请求准备失败。请提供下方错误码与控制台诊断，以便检查程序或接口适配。';
        case 'learning_protocol_failed': return '老师的返回结果无法解析，本次教学未保存。请提供下方错误码与控制台诊断。';
        case 'learning_tool_failed': return '处理教学工具时程序发生异常，本次教学未保存。请提供下方错误码与控制台诊断。';
        case 'learning_unknown_tool': return '老师调用了本次未提供的工具，本次教学未保存。可以重试；若仍失败，请提供控制台中的工具名。';
        case 'learning_tool_limit': return '老师在一轮内调用了过多工具，本次教学未保存，可以重试。';
        case 'learning_save_failed': return '保存学习内容时程序发生异常。请先重新读取保存内容，并提供下方错误码与控制台诊断。';
        case 'learning_context_full': return '这次题目和资料超过了单次上下文容量，已保存的课程与作答保持不变。可以减少本次补充材料后重试。';
        case 'learning_empty_response': return '老师没有返回有效回复，本次修改未发布，可以重试。';
        case 'learning_round_limit': return '本次教学未能在请求上限内完成，未发布半成品，可以重试。';
        case 'learning_unresolved_proposals': return '老师提交的学习内容仍未通过工具校验，本次没有保存。可以重试，具体字段问题已记录到控制台。';
        case 'learning_assessment_missing': return '老师尚未给这条作答提交评估，原答已保留，可以重试评估。';
        case 'learning_file_invalid': return '学习文件暂时无法读取，请检查文件；不会覆盖已有内容。';
        case 'learning_read_failed': return '读取学习记录失败，请检查连接后重试。';
        case 'learning_resolve_pending_first': return '上一次保存尚未核实，请先核实保存状态。';
        case 'learning_file_full': return '学习文件已达到容量上限，请整理不再需要的记录后重试。';
        case 'learning_write_rejected': return '服务器拒绝保存学习记录，请检查登录状态和存储权限后重试。';
        case 'learning_upload_unresolved': return '上次上传尚未确认结束，请先核实保存；暂时不能采用另一版本。';
        case 'learning_commit_id_reused': return '保存标识生成异常，未发起本次保存。请提供下方错误码与控制台诊断。';
        case 'learning_input_invalid': return '输入内容未通过校验，请检查输入或重新读取课程后再操作。具体字段问题已记录到控制台。';
        default: return '这次学习操作发生异常。请提供下方错误码与控制台诊断；不要清空已有学习记录。';
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
    return `${learningTeachingFailure(reason)}（${stages[details.stage]} · ${reason}）`;
}
