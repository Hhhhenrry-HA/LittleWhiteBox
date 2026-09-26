// Stable error identifiers are the contract; their explanation lives here.
const explanations = {
    invalid_operation: 'The operation does not match the editable record fields.',
    record_missing: 'The selected memory record does not exist.',
    read_first: 'Read the selected record before editing or reviewing it.',
    evidence_required: 'Cite source passages returned by ReadSource before changing memory.',
    invalid_record: 'The edited record has invalid or missing business fields.',
    invalid_reference: 'Event causes must reference existing events, without self references or cycles.',
    invalid_alias: 'Identity aliases must have distinct names, unique sources and no cycles.',
    cause_limit: 'The merge would exceed three direct causes. Read and resolve the causal relationships first.',
    source_boundary: 'Source floors must be within this run’s fixed evidence boundary.',
    keep_oldest: 'Keep the oldest event identity when joining episodes.',
    conflict: 'Source or memory changed after review began. This draft was not saved.',
    budget: 'The review reached its execution budget. Its unfinished draft was not saved.',
    cancelled: 'The uncommitted review was cancelled.',
    not_configured: 'The shared Agent main preset needs a model and a provider endpoint.',
    no_boundary: 'There is no valid summary boundary to review.',
    incomplete_finish: 'Finish requires an explicit review result; tool success alone is not completion.',
    finish_after_error: 'A tool in this response failed. Read its result, correct it or report the unresolved work, then call FinishReview again.',
    invalid_history: 'The maintenance history cannot be safely restored.',
};

export class MemoryMaintenanceError extends Error {
    constructor(code, detail = '') {
        super([explanations[code] || code, detail].filter(Boolean).join(' '));
        this.name = 'MemoryMaintenanceError';
        this.code = code;
    }
}

export function requireMemory(condition, code, detail) {
    if (!condition) throw new MemoryMaintenanceError(code, detail);
}

export function memoryFailureCode(error) {
    if (error?.status === 401) return 'agent_auth';
    if (['insufficient_user_quota', 'insufficient_quota'].includes(error?.code)) return 'agent_balance';
    if (error?.status === 429) return 'agent_rate';
    if (error?.code === 'model_not_found') return 'agent_model';
    return error?.code || 'agent_failed';
}
