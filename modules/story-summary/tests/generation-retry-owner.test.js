import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getGenerationRetryOwner, runOwnedGeneration } from '../../../shared/common/generation-retry-owner.js';

const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };

for (const outcome of ['success', 'failure', 'cancelled']) {
    test(`a ${outcome} generation owner settles late replay without launching another attempt`, async () => {
        const logical = new AbortController();
        let owner, requestSignal, attempts = 0;
        const failure = new Error('native generation failed');
        const running = runOwnedGeneration(logical.signal, async bind => {
            attempts++;
            requestSignal = new AbortController().signal;
            bind(requestSignal);
            owner = getGenerationRetryOwner(requestSignal);
            if (outcome === 'failure') throw failure;
            if (outcome === 'cancelled') owner.requestRetry();
            return 'reply';
        }, () => logical.abort());
        if (outcome === 'failure') await assert.rejects(running, error => error === failure);
        else {
            await flush();
            if (outcome === 'cancelled') logical.abort();
            await running;
        }
        let settled = false;
        owner.requestRetry(); // A stale recovery callback cannot revive this owner.
        void owner.replay().then(() => { settled = true; });
        await flush();
        assert.equal(settled, true);
        assert.equal(owner.retryPending, false);
        assert.equal(attempts, 1);
        assert.equal(getGenerationRetryOwner(requestSignal), null);
    });
}

test('cancellation after a replay wakeup settles its promise even if no next attempt starts', async () => {
    const logical = new AbortController();
    let owner, attempts = 0;
    const running = runOwnedGeneration(logical.signal, async bind => {
        attempts++;
        const request = new AbortController();
        bind(request.signal);
        owner = getGenerationRetryOwner(request.signal);
        owner.requestRetry();
    }, () => logical.abort());
    await flush();
    let replaySettled = false;
    void owner.replay().then(() => { replaySettled = true; });
    logical.abort();
    await running;
    await flush();
    assert.equal(replaySettled, true);
    assert.equal(attempts, 1);
});
