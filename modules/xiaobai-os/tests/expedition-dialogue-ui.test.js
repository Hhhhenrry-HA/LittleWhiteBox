import assert from 'node:assert/strict';
import test from 'node:test';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setImmediate } from 'node:timers/promises';
import { parseHTML } from 'linkedom';
import { parse, compileScript } from 'vue/compiler-sfc';
import { build } from 'esbuild';
import { createCampaign } from '../apps/game/expedition/campaign/rules.ts';
import { advanceExpedition, emptyExpedition } from '../apps/game/expedition/domain.ts';
import { DIALOGUE_COPY } from '../apps/game/expedition/content/dialogue-copy.ts';

// Production dialogue and meters; only the WebGL field and unused panels are replaced.
// Protects the UI boundary: optional meter loading must not unmount dialogue or offline quest controls.
test('failed meter data stays local, retries only on request and never removes quest controls', async t => {
    const { window } = parseHTML('<html><body><div id="app"></div></body></html>'), previous = new Map();
    let app;
    for (const key of ['window', 'document', 'Node', 'Element', 'HTMLElement', 'SVGElement', 'getComputedStyle']) {
        previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
        Object.defineProperty(globalThis, key, { value: key === 'window' ? window : key === 'getComputedStyle' ? () => ({ visibility: 'visible' }) : window[key], configurable: true });
    }
    window.Element.prototype.getClientRects = () => [{}];
    t.after(async () => { app?.unmount(); await setImmediate(); for (const [key, descriptor] of previous) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key];
    } });
    const { createApp, nextTick } = await import('vue');
    const compiled = await build({ entryPoints: [fileURLToPath(new URL('../apps/game/expedition/ExpeditionRoom.vue', import.meta.url))],
        bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent', loader: { '.css': 'empty' },
        plugins: [{ name: 'dialogue-components', setup(b) {
            b.onResolve({ filter: /^vue$/ }, () => ({ path: import.meta.resolve('vue'), external: true }));
            b.onLoad({ filter: /\.vue$/ }, args => {
                if (args.path.endsWith('ExplorationField.vue')) return { contents: `import {h} from 'vue'; export default {emits:['interact'],setup(_,ctx){return()=>h('button',{'data-interact':'sanniang',onClick:()=>ctx.emit('interact','sanniang')})}}`, loader: 'js' };
                if (!args.path.endsWith('ExpeditionRoom.vue') && !args.path.endsWith('ConversationMeters.vue')) return { contents: 'export default {render(){return null}}', loader: 'js' };
                const { descriptor } = parse(readFileSync(args.path, 'utf8'), { filename: args.path });
                return { contents: compileScript(descriptor, { id: args.path, inlineTemplate: true }).content, loader: 'ts' };
            });
        } }],
    });
    // eslint-disable-next-line no-unsanitized/method -- Compiled repository components, not external input.
    const { default: Room } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);
    let fail = true, fetches = 0;
    t.mock.method(globalThis, 'fetch', async url => {
        fetches++;
        if (fail) return { ok: false, status: 503 };
        const name = String(url).split('/').at(-1);
        return { ok: true, text: async () => readFileSync(new URL(`../docs/expedition-cards/${name}`, import.meta.url), 'utf8') };
    });
    const campaign = createCampaign('fixture', 7, 'blade', 'traveler'); campaign.location.position = { ...campaign.people.sanniang.position };
    const state = { data: { ...emptyExpedition(), active: campaign }, balance: 0, ready: true, pending: false, writeState: 'ready', conversation: null, replyFailure: null };
    const bridge = { subscribe() { return () => {}; }, async request(type, payload) {
        if (type === 'game/expedition/act') state.data = advanceExpedition(state.data, payload.command, payload.actionId, 7);
        return { result: structuredClone(state) };
    } };
    app = createApp(Room, { bridge, chatIdentity: 'fixture', generationActive: false });
    app.mount(document.getElementById('app'));
    const settle = async () => { await setImmediate(); await nextTick(); };
    await settle(); document.querySelector('[data-interact=sanniang]').click(); await settle();
    assert.ok(document.querySelector('[role=dialog]')); assert.equal(document.querySelector('[role=alertdialog]'), null);
    assert.equal(document.querySelector('[data-choice=briefing]').disabled, false);
    const requestsAfterFailure = fetches;
    for (let i = 0; i < 3; i++) await settle();
    assert.equal(fetches, requestsAfterFailure);
    document.querySelector(`[aria-label="${DIALOGUE_COPY.context}"]`).click(); await settle();
    assert.ok(document.querySelector('[role=status]'));
    fail = false; [...document.querySelectorAll('button')].find(b => b.textContent === DIALOGUE_COPY.retry).click(); await settle();
    assert.equal(fetches, requestsAfterFailure * 2); assert.equal(document.querySelector('[role=status]'), null);
    document.querySelector('[data-choice=briefing]').click(); await settle();
    assert.ok(state.data.active.facts.includes('briefed'));
});
