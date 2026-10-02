import assert from 'node:assert/strict';
import test from 'node:test';
import { createClassroomFixture, fixtureLesson } from './fixtures/learning-classroom.js';
import { createLearningResearch, createLearningResearchCache } from '../apps/learning/materials/research.js';
import { createLearningSourceRegistry } from '../apps/learning/materials/lesson-sources.js';
import { createLearningSession } from '../apps/learning/agent/session.js';
import { learningMessageView } from '../apps/learning/application/message-view.js';
import { learningProcessRounds } from '../apps/learning/ui/learning-process.js';
import { checkLearningReadingContent } from '../apps/learning/materials/reading-content.js';

const config = { tavilyApiKey: 'offline-fixture', tavilyBaseUrl: 'https://fixture.invalid' };
const article = fixtureLesson.materials[0].text;
const fragment = 'A small town planted trees beside its busiest roads. In summer, the new shade made walking more pleasant. Residents also noticed more birds near their homes. The project encouraged people to care for shared spaces and think differently about their local environment today.';
const accessNotice = 'This page requires cookies to read further.';
const call = (name, args) => ({ id: name, name, arguments: JSON.stringify(args) });
const input = request => JSON.parse(request.messages.findLast(entry => entry.role === 'user' && entry.content.includes('<learning_request>'))
    .content.split('<learning_request>\n')[1].split('\n</learning_request>')[0]);

test('insufficient page text cannot become a reading source; another search and source remain usable without re-fetching a failed candidate', async t => {
    const sources = createLearningSourceRegistry();
    const cache = createLearningResearchCache();
    let searches = 0, extracts = 0;
    t.mock.method(globalThis, 'fetch', async (url, options) => {
        if (url.endsWith('/search')) {
            searches++;
            return Response.json({ results: [{ url: `https://example.com/${searches}`, title: 'Fixture', content: 'A search summary' }] });
        }
        assert.ok(url.endsWith('/extract'));
        extracts++;
        const [page] = JSON.parse(options.body).urls;
        return Response.json({ results: [{ url: page, raw_content: page.endsWith('/1') ? accessNotice : article }] });
    });
    const research = createLearningResearch(config, { sources, cache, signal: new AbortController().signal, articleLanguage: 'en' });
    const first = await research.executeTool('LearningSearch', { query: 'trees' });
    const args = { candidateIds: [first.results[0].id] };
    const failed = await research.executeTool('LearningExtract', args);
    assert.equal(failed.ok, false);
    assert.deepEqual(failed.results, []);
    assert.equal(failed.failed[0].error, 'learning_source_incomplete');
    assert.equal(sources.list().length, 0);
    assert.deepEqual(await research.executeTool('LearningExtract', args), failed);
    assert.equal(extracts, 1);
    const second = await research.executeTool('LearningSearch', { query: 'trees and urban heat article' });
    const good = await research.executeTool('LearningExtract', { candidateIds: [second.results[0].id] });
    assert.equal(good.ok, true);
    assert.equal(sources.list().length, 1);
    assert.equal(sources.get(good.results[0].sourceId).paragraphs.map(p => p.text).join('\n\n'), article);
    assert.equal(searches, 2);
    // The same web tool is also used for factual references, where a short text is legitimate.
    const reference = createLearningResearch(config, { sources, cache, signal: new AbortController().signal });
    assert.equal((await reference.executeTool('LearningExtract', args)).ok, true);
    assert.equal(extracts, 2);
});

test('publication rejects a 43-word article and a padded adaptation of an insufficient source, without changing saved work', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    await h.command('settings', { value: {} });
    const sources = createLearningSourceRegistry();
    sources.add({ id: 'too-small', url: 'https://example.com/small', title: 'Fixture', retrievedAt: '2026-10-02T00:00:00.000Z', paragraphs: [{ id: 'p1', text: accessNotice }] });
    sources.add({ id: 'usable', url: 'https://example.com/full', title: 'Fixture', retrievedAt: '2026-10-02T00:00:00.000Z', paragraphs: [{ id: 'p1', text: article }] });
    const before = structuredClone(h.repository.snapshot().document);
    const run = createLearningSession(h.repository, { language: 'en', osId: 'reading-fixture', inputScope: { kind: 'public' },
        action: { kind: 'reading-article', source: 'web', replaceCurrent: true }, sources });
    const proposal = { title: 'Urban trees', goal: 'Explain the benefits of shade.', tier: 'regular', kind: 'adapted', text: article };
    assert.equal(run.executeTool('LearningArticle', { ...proposal, sourceId: 'too-small' }).error, 'learning_source_incomplete');
    assert.equal(run.executeTool('LearningArticle', { ...proposal, sourceId: 'usable', text: fragment }).error, 'learning_article_incomplete');
    assert.deepEqual(h.repository.snapshot().document, before);
    assert.deepEqual(run.appliedTools(), []);
    assert.equal(run.executeTool('LearningArticle', { ...proposal, sourceId: 'usable' }).ok, true);
    assert.equal((await run.commit(() => true)).status, 'confirmed');
    assert.equal(h.profile().unit.materials[0].provenance.url, 'https://example.com/full');
});

test('the article fragment check measures the target language and does not count punctuation as substance', () => {
    for (const [text, language] of [[fragment, 'en'], [accessNotice, 'en'], ['这是正文。'.repeat(10), 'zh-CN'], ['あ'.repeat(43), 'ja'], ['한'.repeat(43), 'ko'], ['! '.repeat(500), 'en']]) {
        assert.throws(() => checkLearningReadingContent(text, language, 'article', 'text'), { code: 'learning_article_incomplete' });
    }
    for (const [text, language] of [[article, 'en'], ['这是正文。'.repeat(50), 'zh-CN'], ['あ'.repeat(200), 'ja'], ['한'.repeat(200), 'ko']]) {
        assert.doesNotThrow(() => checkLearningReadingContent(text, language, 'article', 'text'));
    }
});

test('a refused search preserves its status for feedback without exposing provider details or automatically repeating the request', async t => {
    let requests = 0;
    t.mock.method(globalThis, 'fetch', async () => { requests++; return new Response('private provider details', { status: 429 }); });
    const research = createLearningResearch(config, { sources: createLearningSourceRegistry(), signal: new AbortController().signal });
    const result = await research.executeTool('LearningSearch', { query: 'trees' });
    assert.deepEqual(result, { ok: false, error: 'learning_search_failed', httpStatus: 429 });
    assert.equal(requests, 1);
    const view = learningMessageView({ role: 'tool', toolName: 'LearningSearch', content: JSON.stringify(result) });
    assert.deepEqual(JSON.parse(view.content), { ok: false, error: 'learning_search_failed', httpStatus: 429 });
});

test('reading preparation recovers from insufficient text with a second search, repairs a short draft and publishes only the complete article', async t => {
    let searches = 0;
    t.mock.method(globalThis, 'fetch', async (url, options) => {
        if (url.endsWith('/search')) {
            searches++;
            return Response.json({ results: [{ url: `https://example.com/${searches}`, title: 'Urban trees', content: 'Search summary' }] });
        }
        assert.ok(url.endsWith('/extract'));
        const [page] = JSON.parse(options.body).urls;
        return Response.json({ results: [{ url: page, raw_content: page.endsWith('/1') ? fragment : article }] });
    });
    const h = await createClassroomFixture({ agentConfig: config }); t.after(h.dispose);
    await h.command('settings', { value: {} });
    const saved = [];
    h.bridge.subscribe(event => { if (event.type === 'learning/state' && event.payload.state.unit) { saved.push(event.payload.state.unit.materials[0].paragraphs.map(p => p.text).join('\n\n')); } });
    let sourceId;
    h.flags.teacherResponse = (request, round) => {
        const { action } = input(request);
        if (action.kind === 'reading-notes') { return { toolCalls: [call('LearningReadingNotes', { explanations: action.paragraphIds.map(paragraphId => ({ paragraphId, explanation: 'Notice the main idea and supporting details.', terms: [] })) })] }; }
        if (action.kind === 'reading-essay') { return { toolCalls: [call('LearningEssayTask', { prompt: 'How could your town care for its trees? Write about 300 words.' })] }; }
        assert.equal(action.kind, 'reading-article');
        const last = request.messages.findLast(message => message.role === 'tool');
        const result = last ? JSON.parse(last.content) : null;
        if (round === 1 || round === 3) {
            if (round === 3) { assert.equal(result.failed[0].error, 'learning_source_incomplete'); assert.equal(h.state().unit, null); }
            return { toolCalls: [call('LearningSearch', { query: round === 1 ? 'city trees' : 'urban trees community article' })] };
        }
        if (round === 2 || round === 4) { return { toolCalls: [call('LearningExtract', { candidateIds: [result.results[0].id] })] }; }
        if (round === 5) { sourceId = result.results[0].sourceId; }
        else { assert.equal(round, 6); assert.equal(result.error, 'learning_article_incomplete'); assert.equal(h.state().unit, null); }
        return { toolCalls: [call('LearningArticle', { title: 'Urban trees', goal: 'Explain the value of shade.', tier: 'regular', kind: 'adapted', sourceId, text: round === 5 ? fragment : article })] };
    };
    await h.command('prepare', { kind: 'reading-writing', message: 'Start reading.' });
    assert.equal(searches, 2);
    assert.ok(saved.length > 0);
    assert.ok(saved.every(text => text === article));
    assert.equal(h.state().unit.preparation.ready, true);
    const turn = h.state().workbenchConversation.turns.find(entry => entry.purpose === 'reading-article');
    assert.equal(turn.status, 'finished');
    assert.deepEqual(learningProcessRounds(turn).flatMap(round => round.tools.map(tool => tool.status)), ['done', 'failed', 'done', 'done', 'failed', 'done']);
});
