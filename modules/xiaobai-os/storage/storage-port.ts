import type { XiaobaiOsStoragePort } from '../kernel/contracts.js';

export type { XiaobaiOsStoragePort };

export class XiaobaiOsStorageError extends Error {
    constructor(
        readonly code: string,
        message: string,
        readonly retryable: boolean,
        options: { cause?: unknown } = {},
    ) {
        super(message, options);
        this.name = 'XiaobaiOsStorageError';
    }
}
