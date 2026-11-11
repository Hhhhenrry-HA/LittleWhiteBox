import type { Diagnostic } from '../types.js';
export class SettlementError extends Error {
    constructor(public code: string, public details: Record<string, unknown> = {}) {
        super(code);
        this.name = 'SettlementError';
    }
}
export function reject(code: string, details?: Record<string, unknown>): never { throw new SettlementError(code, details); }
export function diagnostic(error: unknown): Diagnostic {
    if (error instanceof SettlementError) {return { code: error.code, ...error.details };}
    if (error instanceof Error) {
        const extended = error as Error & { code?: string; details?: Record<string, unknown> };
        const code = extended.code || 'execution';
        return { code, ...extended.details, ...(error.message === code ? {} : { message: error.message }) };
    }
    return { code: 'execution', message: String(error) };
}
