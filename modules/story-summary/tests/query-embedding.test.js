/* global Buffer */
import assert from 'node:assert/strict';
import { after, beforeEach, test } from 'node:test';
import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Protect the foreground request contract: failures retry once per host round,
// cancellation stays silent, and diagnostics
// classify real transport failures rather than guessing from elapsed time.
// Real request policy, transport, validation and presentation; only host config,
// diagnostics and HTTP are replaced. No provider requests or paid API calls.
const root = fileURLToPath(new URL('../../../', import.meta.url));
const shims = {
    'config.js': 'export const getVectorConfig=()=>({});',
    'debug-core.js': 'export const xbLog={isEnabled:()=>false,warn(){}};',
};
const bundle = await build({
    stdin: { resolveDir: root, contents: `
        export * from './modules/story-summary/vector/retrieval/query-embedding.js';
        export * from './modules/story-summary/generate/recall-failure.js';
        export * from './modules/story-summary/vector/runtime/vector-activity.js';
    ` },
    bundle: true, write: false, format: 'esm', platform: 'node',
    plugins: [{ name: 'query-host-boundaries', setup(api) {
        api.onResolve({ filter: /.*/ }, args => {
            const name = path.basename(args.path);
            return Object.hasOwn(shims, name) ? { path: name, namespace: 'host' } : null;
        });
        api.onLoad({ filter: /.*/, namespace: 'host' }, args => ({ contents: shims[args.path] }));
    } }],
});
// eslint-disable-next-line no-unsanitized/method -- locally bundled production modules and fixed host shims only
const mod = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const originalFetch = globalThis.fetch;
const flush = async () => { for (let i = 0; i < 40; i++) await Promise.resolve(); };
const success = () => new Response(JSON.stringify({ data: [{ index: 0, embedding: [1, 0] }] }));
const stalled = signal => new Promise((_, reject) => {
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
});
let config, requests, failures, waits, respond;
const query = options => mod.embedRecallQuery(['fixture query'], config, {
    onFailure: failure => failures.push(failure), onRetryWait: duration => waits.push(duration), ...options,
}).then(vectors => ({ vectors }), error => ({ error }));

beforeEach(() => {
    config = { embeddingApi: { provider: 'custom', url: 'https://embedding.invalid/v1', key: 'fixture-key', model: 'fixture' } };
    requests = []; failures = []; waits = [];
    respond = () => success();
    globalThis.fetch = (url, options) => {
        requests.push({ url, options });
        return respond(options.signal);
    };
});
after(() => { globalThis.fetch = originalFetch; });

test('successful query makes one request and preserves validated vectors', async () => {
    assert.deepEqual(await query(), { vectors: [[1, 0]] });
    assert.equal(requests.length, 1);
    assert.equal(failures.length, 0);
    assert.equal(waits.length, 0);
});

test('a query timeout keeps overlapping floor work even when that work failed before the timeout', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    let finishBackground;
    const background = mod.trackVectorActivity({ chatId: 'fixture', phase: 'l0-extraction', api: config.embeddingApi, unit: 'floors' }, async activity => {
        activity.update({ total: 1, activeUnits: 1, activeFloors: [30] });
        await new Promise(resolve => { finishBackground = resolve; });
        return { failed: 1 };
    });
    let trace;
    respond = signal => stalled(signal);
    const pending = query({ onActivity: value => { trace = value; } });
    await flush();
    finishBackground();
    await background;
    t.mock.timers.tick(3000);
    await flush();
    t.mock.timers.tick(1000);
    await flush();
    t.mock.timers.tick(3000);
    assert.equal((await pending).error.code, 'RECALL_EMBEDDING_FAILED');
    assert.ok(trace.timeline.some(entry => entry.activities.some(activity => activity.activeFloors.includes(30))));
    assert.ok(trace.timeline.some(entry => entry.activities.some(activity => activity.outcome?.failed === 1)));
    assert.deepEqual(trace.timeline.at(-1).activities, []);
    const before = structuredClone(trace);
    await mod.trackVectorActivity({ phase: 'later', unit: 'floors' }, async () => {});
    assert.deepEqual(trace, before);
});

test('an unexpected failure stops without an invented diagnosis or retry', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const cause = new Error('unexpected fixture failure');
    respond = () => { throw cause; };
    const pending = query();
    await flush();
    t.mock.timers.tick(1000);
    const { error } = await pending;
    assert.equal(error.cause, cause);
    assert.equal(mod.recallFailureNotice(null, error).reason, 'unknown');
    t.mock.timers.runAll();
    await flush();
    assert.equal(requests.length, 1);
});

const permanent = [
    ...[400, 401, 403, 404, 422, 429].map(status => ({
        name: `HTTP ${status}`, reason: status === 429 ? 'rate_limit' : [401, 403].includes(status) ? 'credentials' : 'http', status,
        prepare() { respond = () => new Response('{}', { status }); }, requests: 1,
    })),
    { name: 'missing key', reason: 'configuration', requests: 0, prepare() { config.embeddingApi.key = ''; } },
    { name: 'invalid URL', reason: 'configuration_url', requests: 0, prepare() { config.embeddingApi.url = 'not a URL'; } },
    { name: 'invalid JSON', reason: 'invalid_response', requests: 1, prepare() { respond = () => new Response('{'); } },
    { name: 'wrong vector count', reason: 'invalid_response', requests: 1,
        prepare() { respond = () => new Response(JSON.stringify({ data: [] })); } },
    { name: 'empty vector', reason: 'invalid_response', requests: 1,
        prepare() { respond = () => new Response(JSON.stringify({ data: [{ index: 0, embedding: [] }] })); } },
];
for (const entry of permanent) {
    test(`${entry.name} stops immediately with its actionable diagnosis`, async t => {
        t.mock.timers.enable({ apis: ['setTimeout'] });
        entry.prepare();
        let outcome;
        query().then(value => { outcome = value; });
        await flush();
        assert.ok(outcome?.error);
        assert.equal(outcome.error.code, 'RECALL_EMBEDDING_FAILED');
        assert.equal(outcome.error.errors.length, 1);
        assert.equal(outcome.error.cause, failures[0].error);
        const notice = mod.recallFailureNotice(null, outcome.error);
        assert.equal(notice.issueCode, 'recall_embedding_failed');
        assert.equal(notice.reason, entry.reason);
        assert.equal(notice.httpStatus, entry.status ?? null);
        assert.deepEqual(notice.timeouts, []);
        t.mock.timers.runAll();
        await flush();
        assert.equal(requests.length, entry.requests);
        assert.equal(waits.length, 0);
    });
}

for (const status of [408, 500, 503, 599, null]) {
    test(`${status == null ? 'network failure' : `HTTP ${status}`} can recover with exactly one delayed retry`, async t => {
        t.mock.timers.enable({ apis: ['setTimeout'] });
        respond = () => {
            if (requests.length > 1) return success();
            if (status == null) throw new TypeError('fixture network failure');
            return new Response('{}', { status });
        };
        const pending = query();
        await flush();
        assert.equal(requests.length, 1);
        t.mock.timers.tick(999);
        await flush();
        assert.equal(requests.length, 1);
        t.mock.timers.tick(1);
        assert.deepEqual(await pending, { vectors: [[1, 0]] });
        assert.equal(requests.length, 2);
        assert.equal(failures.length, 1);
        assert.equal(waits.length, 1);
    });
}

for (const [status, reason] of [[408, 'request_timeout'], [503, 'server'], [null, 'network']]) {
    test(`repeated ${reason} stops after two attempts and preserves both causes`, async t => {
        t.mock.timers.enable({ apis: ['setTimeout'] });
        respond = () => {
            if (status == null) throw new TypeError('fixture network failure');
            return new Response('{}', { status });
        };
        const pending = query();
        await flush();
        t.mock.timers.tick(1000);
        const { error } = await pending;
        assert.equal(error.errors.length, 2);
        assert.equal(error.cause, failures[1].error);
        assert.deepEqual(error.errors, failures.map(failure => failure.error));
        const notice = mod.recallFailureNotice(null, error);
        assert.equal(notice.reason, reason);
        assert.equal(notice.httpStatus, status);
        t.mock.timers.runAll();
        await flush();
        assert.equal(requests.length, 2);
    });
}

for (const phase of ['headers', 'body']) {
    test(`two ${phase} timeouts retain actual deadlines and attempt numbers`, async t => {
        t.mock.timers.enable({ apis: ['setTimeout'] });
        respond = signal => phase === 'headers' ? stalled(signal) : { ok: true, json: () => stalled(signal) };
        const pending = query();
        await flush();
        t.mock.timers.tick(3000);
        await flush();
        assert.equal(failures.length, 1);
        t.mock.timers.tick(1000);
        await flush();
        assert.equal(requests.length, 2);
        t.mock.timers.tick(3000);
        const { error } = await pending;
        assert.equal(error.errors.length, 2);
        assert.equal(mod.recallFailureNotice(null, error).reason, 'timeout');
        assert.deepEqual(mod.recallFailureNotice(null, error).timeouts, [
            { attempt: 1, timeoutMs: 3000 }, { attempt: 2, timeoutMs: 3000 },
        ]);
    });
}

test('a first timeout can recover without publishing a terminal failure', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    respond = signal => requests.length === 1 ? stalled(signal) : success();
    const pending = query();
    await flush();
    t.mock.timers.tick(3000);
    await flush();
    t.mock.timers.tick(1000);
    assert.deepEqual(await pending, { vectors: [[1, 0]] });
    assert.equal(requests.length, 2);
    assert.equal(failures[0].error.embeddingFailure.kind, 'timeout');
});

test('network failure followed by timeout never reports two timeouts', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    respond = signal => {
        if (requests.length === 1) throw new TypeError('fixture network failure');
        return stalled(signal);
    };
    const pending = query();
    await flush();
    t.mock.timers.tick(1000);
    await flush();
    t.mock.timers.tick(3000);
    const { error } = await pending;
    const notice = mod.recallFailureNotice(null, error);
    assert.equal(notice.reason, 'timeout');
    assert.deepEqual(notice.timeouts, [{ attempt: 2, timeoutMs: 3000 }]);
});

test('timeout followed by an authorization failure reports the final actionable cause', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    respond = signal => requests.length === 1 ? stalled(signal) : new Response('{}', { status: 401 });
    const pending = query();
    await flush();
    t.mock.timers.tick(3000);
    await flush();
    t.mock.timers.tick(1000);
    const { error } = await pending;
    const notice = mod.recallFailureNotice(null, error);
    assert.equal(notice.reason, 'credentials');
    assert.equal(notice.httpStatus, 401);
    assert.deepEqual(notice.timeouts, [{ attempt: 1, timeoutMs: 3000 }]);
});

for (const phase of ['before', 'request', 'retry-wait']) {
    test(`cancellation during ${phase} does not retry or become an Embedding failure`, async t => {
        t.mock.timers.enable({ apis: ['setTimeout'] });
        const controller = new AbortController();
        if (phase === 'before') controller.abort();
        respond = signal => phase === 'retry-wait' ? new Response('{}', { status: 503 }) : stalled(signal);
        const pending = query({ signal: controller.signal });
        await flush();
        controller.abort();
        const { error } = await pending;
        assert.equal(error.name, 'AbortError');
        assert.notEqual(error.code, 'RECALL_EMBEDDING_FAILED');
        assert.equal(mod.recallFailureNotice('generation-stopped', error), null);
        t.mock.timers.runAll();
        await flush();
        assert.equal(requests.length, phase === 'before' ? 0 : 1);
    });
}
