import assert from 'node:assert/strict';
import test from 'node:test';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

test('reply progress loads on the ST 1.14 host surface and reads live generation flags', async t => {
    const compiled = await build({
        stdin: { contents: `export { createReplyProgressHostRuntime } from '../host.js';
            export { host } from 'reply-progress-native-host';`,
            resolveDir: fileURLToPath(new URL('.', import.meta.url)) },
        bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent',
        plugins: [{ name: 'reply-progress-host-boundary', setup(builder) {
            builder.onResolve({ filter: /(?:^reply-progress-native-host$|\/(?:script|group-chats|extensions|events)\.js$)/ },
                () => ({ path: 'native', namespace: 'fixture' }));
            builder.onResolve({ filter: /^\.\/runtime\.js$/ },
                () => ({ path: 'runtime', namespace: 'fixture' }));
            builder.onLoad({ filter: /^runtime$/, namespace: 'fixture' }, () => ({
                contents: 'export const createReplyProgressRuntime = dependencies => dependencies;',
            }));
            builder.onLoad({ filter: /^native$/, namespace: 'fixture' }, () => ({ contents: `
                // Frozen ST 1.14 exports used here: no isGenerating convenience export.
                export let is_send_press = false;
                export let is_group_generating = false;
                export let online_status = 'connected';
                export let streamingProcessor = null;
                export const eventSource = {};
                export const event_types = {};
                export const getContext = () => ({ chat: [], groupId: null });
                export const setSendButtonState = value => { is_send_press = value; };
                export const host = { send: setSendButtonState,
                    group: value => { is_group_generating = value; } };
            ` }));
        } }],
    });
    // eslint-disable-next-line no-unsanitized/method -- Compiled repository modules and fixed native exports only.
    const { createReplyProgressHostRuntime, host } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);
    const previousDocument = globalThis.document;
    const dataset = {};
    globalThis.document = { body: { dataset } };
    t.after(() => {
        if (previousDocument === undefined) delete globalThis.document;
        else globalThis.document = previousDocument;
    });
    const runtime = createReplyProgressHostRuntime();
    assert.equal(runtime.isGenerating(), false);
    host.send(true);
    assert.equal(runtime.isGenerating(), true);
    host.send(false);
    host.group(true);
    assert.equal(runtime.isGenerating(), true);
    host.group(false);
    assert.equal(runtime.isGenerating(), false);
    dataset.generating = 'true';
    assert.equal(runtime.isGenerating(), true);
    delete dataset.generating;
    assert.equal(runtime.isGenerating(), false);
});
