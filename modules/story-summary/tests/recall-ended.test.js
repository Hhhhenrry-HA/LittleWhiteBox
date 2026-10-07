import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { EventEmitter } from 'node:events';
import { test } from 'node:test';
import vm from 'node:vm';
import { parse } from 'acorn';
import { usesStoryRecall } from '../generate/recall-policy.js';
import { getRecallPrefetchStartAction } from '../generate/recall-prefetch.js';

// Execute the production entry's registration and quiet hooks, rather than
// duplicating its ENDED handler in a fixture. Only startup/UI/maintenance
// boundaries are replaced; assertions concern prompt data and notifications,
// not source spelling. This keeps the test independent of model/DB requests.
const source = readFileSync(new URL('../story-summary.js', import.meta.url), 'utf8');
const entryFunctions = new Set([
    'registerEvents', 'clearExtensionPrompt',
    'handleGenerationAfterCommands', 'runStorySummaryRecallInterceptor',
]);
const executable = parse(source, { sourceType: 'module', ecmaVersion: 'latest' }).body
    .filter(node => node.type === 'FunctionDeclaration' && entryFunctions.has(node.id.name))
    .map(node => source.slice(node.start, node.end)).join('\n');

async function fixture() {
    const eventSource = new EventEmitter();
    const eventTypes = Object.fromEntries([
        'CHAT_CHANGED', 'MESSAGE_DELETED', 'MESSAGE_RECEIVED', 'MESSAGE_SENT',
        'MESSAGE_SWIPED', 'MESSAGE_EDITED', 'USER_MESSAGE_RENDERED',
        'CHARACTER_MESSAGE_RENDERED', 'GENERATION_AFTER_COMMANDS', 'GENERATION_ENDED', 'GENERATION_STOPPED',
    ].map(type => [type, type]));
    const prompts = {};
    const notifications = [];
    const cancellations = [];
    let interceptor;
    const promptKey = 'fixture-memory';
    const noOp = () => {};
    const context = vm.createContext({
        events: null, storySummaryTeardown: null, activeChatId: null, MODULE_ID: 'fixture',
        EXT_PROMPT_KEY: promptKey, extension_prompts: prompts,
        event_types: eventTypes, createModuleEvents: () => eventSource,
        getContext: () => ({ chatId: 'chat', chat: [] }),
        window: { addEventListener: noOp }, document: { addEventListener: noOp },
        resumeVectorWriteCoordinator: noOp, memoryMaintenance: { start: noOp },
        registerAfterAiGateHandler: noOp, initButtonsForAll: noOp,
        CacheRegistry: { register: noOp },
        handleVisibilityChangeForBackground: noOp, handleViewportChangeForBackground: noOp,
        registerGenerateInterceptor: (_id, handler) => { interceptor = handler; },
        GENERATE_INTERCEPTOR_ORDER: { STORY_SUMMARY: 200 },
        notifyStorySummaryAfterAi: (...args) => notifications.push(args),
        cancelActiveRecall: reason => cancellations.push(reason),
        usesStoryRecall, getRecallPrefetchStartAction,
    });
    vm.runInContext(executable, context);
    await context.registerEvents();
    return {
        prompts, promptKey, notifications, cancellations,
        commit: value => { prompts[promptKey] = value; },
        ended: () => eventSource.emit(eventTypes.GENERATION_ENDED, 12),
        async quiet() {
            eventSource.emit(eventTypes.GENERATION_AFTER_COMMANDS, 'quiet', {}, false);
            await interceptor([], 0, () => assert.fail('quiet must not abort'), 'quiet', {});
        },
        stop: () => eventSource.emit(eventTypes.GENERATION_STOPPED),
    };
}

test('quiet ending after foreground memory commit cannot erase memory before prompt assembly', async () => {
    const host = await fixture();
    const prepared = { value: 'foreground memory', position: 1, depth: 2, role: 0 };
    host.commit(prepared);
    await host.quiet();
    host.ended();

    // The foreground host has not assembled its prompt yet. It must still
    // read exactly the adopted memory, including the injection metadata.
    assert.equal(host.prompts[host.promptKey], prepared);
    const request = { messages: [{ role: 'system', content: host.prompts[host.promptKey].value }] };
    assert.equal(request.messages[0].content, prepared.value);
    assert.equal(host.notifications.length, 1);
    assert.equal(host.notifications[0][0], 12);
    assert.deepEqual(host.cancellations, []);
});

test('an unattributed end leaves explicit Stop responsible for clearing the memory', async () => {
    const host = await fixture();
    host.commit({ value: 'memory' });
    host.ended();
    host.stop();
    assert.equal(host.prompts[host.promptKey], undefined);
    assert.equal(host.cancellations.length, 1);
    assert.equal(host.notifications.length, 1);
});
