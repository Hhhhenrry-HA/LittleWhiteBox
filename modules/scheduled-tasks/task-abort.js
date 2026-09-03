export function isAbortError(error) {
    return error?.name === 'AbortError';
}

export function createAbortError(reason = '任务运行已取消') {
    try {
        return new DOMException(String(reason), 'AbortError');
    } catch {
        const error = new Error(String(reason));
        error.name = 'AbortError';
        return error;
    }
}

export function throwIfAborted(signal) {
    if (signal?.aborted) throw createAbortError(signal.reason);
}

/**
 * 让调用方在 signal 中止时立即退出等待。
 * 底层 Promise 无法物理取消时仍会自行结束，但它的结果不再被消费。
 */
export function awaitWithAbort(value, signal) {
    throwIfAborted(signal);
    if (!signal) return Promise.resolve(value);
    return new Promise((resolve, reject) => {
        let settled = false;
        const finish = (callback, result) => {
            if (settled) return;
            settled = true;
            signal.removeEventListener('abort', onAbort);
            callback(result);
        };
        const onAbort = () => finish(reject, createAbortError(signal.reason));
        signal.addEventListener('abort', onAbort, { once: true });
        Promise.resolve(value).then(
            result => finish(resolve, result),
            error => finish(reject, error),
        );
    });
}
