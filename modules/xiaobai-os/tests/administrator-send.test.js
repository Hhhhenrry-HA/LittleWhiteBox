import assert from 'node:assert/strict';
import test from 'node:test';
import { administratorHarness, settled, tick } from './administrator-harness.js';

const image = { name: 'screen.png', dataUrl: 'data:image/png;base64,YQ==' };

test('a first image send resumes initialization, upload, message save and generation exactly once', async () => {
    const h = await administratorHarness({}, { fresh: true });
    h.state.replace = async () => ({ status: 'unconfirmed', observed: null });
    let uploads = 0;
    const save = h.images.save;
    h.images.save = async (...args) => { uploads++; return save(...args); };
    await assert.rejects(h.request('send', { text: '查看图片', image }));
    const turnId = h.runtime.sendTurnId();
    assert.ok(turnId); assert.equal(uploads, 0); assert.equal(h.state.requests.length, 0);
    await h.request('check'); assert.equal(h.conversation.unsaved(), true);
    h.state.replace = null;
    await h.request('confirm'); await settled(h.runtime);
    await h.request('confirm'); await settled(h.runtime);
    assert.equal(uploads, 1); assert.equal(h.state.requests.length, 1);
    assert.deepEqual(h.conversation.read().turns.map(t => t.id), [turnId]);
    assert.ok(h.conversation.read().turns[0].user.image);
    assert.equal(h.conversation.read().turns[0].status, 'finished');
});

for (const method of ['stop', 'cancelAll', 'stopBackground']) {
    for (const stage of ['initialization', 'upload', 'message']) {
        test(`${method} invalidates a send waiting at ${stage}, including late successful saves`, async () => {
            const h = await administratorHarness({}, { fresh: stage === 'initialization' });
            let release;
            const wait = () => new Promise(resolve => { release = resolve; });
            if (stage === 'upload') {
                const save = h.images.save;
                h.images.save = async (...args) => { await wait(); return save(...args); };
            } else {
                h.state.replace = async input => { await wait(); h.state.persisted = structuredClone(input.candidate); return { status: 'confirmed' }; };
            }
            h.state.generate = async () => ({ toolCalls: [{ id: 'write', name: 'WorldEdit', arguments: '{"overview":"unexpected"}' }] });
            const sending = h.request('send', { text: '旧发送', ...(stage === 'message' ? {} : { image }) }).catch(error => error);
            for (let i = 0; !release && i < 100; i++) { await tick(); }
            assert.ok(release);
            if (method === 'stop') { await h.request('stop'); } else { await h.controller[method](); }
            release(); await sending; await settled(h.runtime);
            h.state.replace = null;
            await h.request('check'); await settled(h.runtime);
            assert.equal(h.state.requests.length, 0);
            assert.equal(h.state.persisted?.partitions.world, undefined);
            if (stage === 'upload') { assert.equal(h.state.removed.length, 1); }
        });
    }
}

test('a never-created first sidecar can be abandoned and a fresh send is not blocked', async () => {
    const h = await administratorHarness({}, { fresh: true });
    h.state.replace = async () => ({ status: 'unconfirmed', observed: null });
    await assert.rejects(h.request('send', { text: 'old', image }));
    await h.controller.cancelAll();
    await h.request('adopt');
    assert.equal(h.conversation.unsaved(), false); assert.equal(h.repository.osId(), null);
    assert.equal(h.state.capture.reference, null); assert.equal(h.conversation.read().turns.length, 0);
    h.state.replace = null;
    await h.request('send', { text: 'new', image }); await settled(h.runtime);
    assert.equal(h.conversation.read().turns.length, 1); assert.equal(h.state.requests.length, 1);
});

test('a disappeared existing sidecar is not treated as an abandoned first creation', async () => {
    const h = await administratorHarness();
    h.state.replace = async () => ({ status: 'unconfirmed', observed: h.state.persisted });
    await assert.rejects(h.request('send', { text: 'old' }));
    h.state.persisted = null;
    await assert.rejects(h.request('adopt'));
    assert.equal(h.conversation.unsaved(), true); assert.equal(h.conversation.conflict(), true);
    assert.equal(h.state.capture.reference.osId, 'admin-os');
});

test('reopening the panel during image upload does not continue the same send twice', async () => {
    const h = await administratorHarness(); let release, uploads = 0;
    const save = h.images.save;
    h.images.save = async (...args) => { uploads++; await new Promise(resolve => { release = resolve; }); return save(...args); };
    const sending = h.request('send', { text: 'image', image });
    for (let i = 0; !release && i < 100; i++) { await tick(); }
    assert.ok(release);
    h.controller.deactivate();
    await h.controller.activate({ isCurrent: () => true, activationToken: 'reopened', post: () => true });
    assert.equal(uploads, 1); assert.equal(h.state.requests.length, 0);
    release(); await sending; await settled(h.runtime);
    assert.equal(h.conversation.read().turns.length, 1); assert.equal(h.state.requests.length, 1);
});
