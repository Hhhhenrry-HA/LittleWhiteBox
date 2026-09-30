import assert from 'node:assert/strict';
import test from 'node:test';
import { createRenderer } from 'vue';
import { useLearningState } from '../apps/learning/ui/use-learning-state.js';
import { createClassroomFixture } from './fixtures/learning-classroom.js';

test('each language selection reaches the mounted UI on its first request, without calling a model', async t => {
    const classroom = await createClassroomFixture();
    t.after(classroom.dispose);
    let ui;
    const renderer = createRenderer({
        createComment: () => ({}), insert() {}, remove() {}, parentNode: () => null, nextSibling: () => null,
    });
    const app = renderer.createApp({ setup() {
        ui = useLearningState({ initialState: classroom.state(), bridge: classroom.bridge });
        return () => null;
    } });
    app.mount({});
    t.after(() => app.unmount());
    const calls = classroom.counts.provider;
    for (const language of ['ja', 'de', 'fr', 'en', 'ja']) {
        await ui.request('language', { language });
        assert.equal(ui.state.value.language, language);
        assert.equal(ui.pending.value, false);
    }
    assert.equal(classroom.counts.provider, calls);
});
