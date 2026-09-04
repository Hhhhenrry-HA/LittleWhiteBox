import { xbLog } from '../../../core/debug-core.js';

const MAX_TRACKED_RUNS = 100;
const loggedFailureSignatures = new Map();

function failureSignature(failure = {}) {
    return [
        Number(failure.attempt) || 0,
        String(failure.errorCode || ''),
        String(failure.errorPath || ''),
        String(failure.modelOutput || ''),
    ].join('\0');
}

function seenFailuresForRun(runId) {
    let signatures = loggedFailureSignatures.get(runId);
    if (!signatures) {
        signatures = new Set();
        loggedFailureSignatures.set(runId, signatures);
        if (loggedFailureSignatures.size > MAX_TRACKED_RUNS) {
            loggedFailureSignatures.delete(loggedFailureSignatures.keys().next().value);
        }
    }
    return signatures;
}

function formatDebugValue(value) {
    if (value === undefined) return '(未提供)';
    try {
        return JSON.stringify(value, null, 2);
    } catch {
        return String(value);
    }
}

function formatPlannerFailure(runId, failure) {
    return [
        '[scene_planner_tool_validation_failed]',
        `Run: ${runId}`,
        `第 ${Number(failure.attempt) || 0} 次返回`,
        `错误码: ${String(failure.errorCode || '')}`,
        `错误: ${String(failure.errorMessage || '')}`,
        `错误位置: ${String(failure.errorPath || '(无)')}`,
        `违反规则: ${String(failure.errorRule || '(无)')}`,
        `收到值: ${formatDebugValue(failure.received)}`,
        `期望值: ${formatDebugValue(failure.expected)}`,
        `模型返回${failure.modelOutputTruncated === true ? '（已截断至 16 KiB）' : ''}:`,
        String(failure.modelOutput || ''),
    ].join('\n');
}

export function logDrawRunPlannerFailures(run, logger = xbLog) {
    if (!run?.id || !Array.isArray(run?.progress?.validationFailures)) return 0;
    if (typeof logger?.isEnabled === 'function' && !logger.isEnabled()) return 0;
    const runId = String(run.id);
    const seen = seenFailuresForRun(runId);
    let logged = 0;
    for (const failure of run.progress.validationFailures) {
        if (!failure || typeof failure !== 'object') continue;
        const signature = failureSignature(failure);
        if (seen.has(signature)) continue;
        try {
            logger.warn('drawScenePlanner', formatPlannerFailure(runId, failure));
            seen.add(signature);
            logged += 1;
        } catch {
            // Debug logging must never affect Draw Run recovery.
        }
    }
    return logged;
}

export function resetDrawRunPlannerFailureLogsForTests() {
    loggedFailureSignatures.clear();
}
