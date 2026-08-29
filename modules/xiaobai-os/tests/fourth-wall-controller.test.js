import assert from 'node:assert/strict';
import test from 'node:test';

import {
    createDefaultFourthWallChatState,
    createDefaultFourthWallGlobalSettings,
} from '../apps/fourth-wall/domain/defaults.js';
import { createFourthWallController } from '../apps/fourth-wall/host/controller.js';

function flushAsyncWork() {
    return new Promise(resolve => globalThis.setTimeout(resolve, 0));
}

function createHarness({ secondSession = false } = {}) {
    const state = {
        chatIdentity: 'chat:a',
        chat: createDefaultFourthWallChatState(1000),
        mutationAttempts: 0,
        failMutationAt: 0,
    };
    if (secondSession) {
        state.chat.sessions.push({
            id: 'second',
            name: 'Second',
            createdAt: 1001,
            history: [],
        });
    }
    const mutations = [];
    const posts = [];
    const requests = [];
    const globalSettings = createDefaultFourthWallGlobalSettings();
    let timestamp = 2000;

    const controller = createFourthWallController({
        chatRepository: {
            prepareCurrentChatFourthWall: async () => structuredClone(state.chat),
            readCurrentChatFourthWall: () => structuredClone(state.chat),
            async mutateCurrentChatFourthWall(mutator) {
                state.mutationAttempts += 1;
                const next = mutator(structuredClone(state.chat));
                if (state.mutationAttempts === state.failMutationAt) {
                    throw new Error('save failed');
                }
                state.chat = structuredClone(next);
                mutations.push(structuredClone(next));
                return structuredClone(next);
            },
        },
        settingsRepository: {
            read: () => ({ apps: { fourthWall: structuredClone(globalSettings) } }),
            async mutateFourthWall(mutator) {
                return mutator(structuredClone(globalSettings));
            },
        },
        getChatIdentity: () => ({ key: state.chatIdentity }),
        getChatSnapshot: () => ({
            chatIdentity: state.chatIdentity,
            userName: 'User',
            characterName: 'Character',
            messages: [],
        }),
        generateResponse(options) {
            return new Promise((resolve, reject) => {
                requests.push({ ...options, resolve, reject });
            });
        },
        loadAgentConfig: async () => ({ provider: 'test' }),
        now: () => ++timestamp,
    });

    return { controller, mutations, posts, requests, state };
}

async function activateAndSend(harness) {
    await harness.controller.activate('fourth-wall', {
        post: (type, payload) => harness.posts.push({ type, payload }),
    });
    await harness.controller.handleMessage('fourth-wall', {
        type: 'fourth-wall/send',
        requestId: 'request-1',
        payload: {
            chatIdentity: 'chat:a',
            sessionId: 'default',
            content: 'hello',
        },
    });
    await flushAsyncWork();
    assert.equal(harness.requests.length, 1);
    return harness.requests[0];
}

test('streaming is temporary and a final response is persisted exactly once', async () => {
    const harness = createHarness();
    const request = await activateAndSend(harness);

    assert.deepEqual(harness.state.chat.sessions[0].history.map(message => message.content), ['hello']);
    request.onStreamProgress({ text: '<thinking>draft</thinking><msg>partial</msg>' });
    assert.deepEqual(harness.state.chat.sessions[0].history.map(message => message.content), ['hello']);
    assert.equal(harness.posts.at(-1).payload.text, 'partial');

    request.resolve({ text: '<thinking>done</thinking><msg>final answer</msg>' });
    await flushAsyncWork();

    assert.deepEqual(harness.state.chat.sessions[0].history.map(message => message.content), [
        'hello',
        'final answer',
    ]);
    assert.equal(harness.mutations.length, 2);
    assert.equal(harness.posts.filter(item => item.payload.status === 'complete').length, 1);
});

test('a final save failure leaves the generated reply observable but unpersisted', async () => {
    const harness = createHarness();
    harness.state.failMutationAt = 2;
    const request = await activateAndSend(harness);

    request.resolve({ text: '<msg>unsaved answer</msg>' });
    await flushAsyncWork();

    assert.deepEqual(harness.state.chat.sessions[0].history.map(message => message.content), ['hello']);
    const failure = harness.posts.find(item => item.payload.kind === 'save');
    assert.equal(failure.payload.status, 'error');
    assert.equal(failure.payload.draft.text, 'unsaved answer');
    assert.match(failure.payload.message, /未保存/);
});

test('cancelled generation ignores late progress and final results', async () => {
    const harness = createHarness();
    const request = await activateAndSend(harness);

    const result = await harness.controller.handleMessage('fourth-wall', {
        type: 'fourth-wall/cancel',
        payload: { chatIdentity: 'chat:a', sessionId: 'default' },
    });
    const postsAfterCancel = harness.posts.length;
    request.onStreamProgress({ text: '<msg>late progress</msg>' });
    request.resolve({ text: '<msg>late final</msg>' });
    await flushAsyncWork();

    assert.deepEqual(result, { cancelled: true });
    assert.equal(harness.posts.length, postsAfterCancel);
    assert.deepEqual(harness.state.chat.sessions[0].history.map(message => message.content), ['hello']);
});

test('chat switch, session switch, and deactivation invalidate old results', async (context) => {
    const cases = [
        {
            name: 'chat switch',
            setup: () => createHarness(),
            invalidate: async (harness) => { harness.state.chatIdentity = 'chat:b'; },
        },
        {
            name: 'session switch',
            setup: () => createHarness({ secondSession: true }),
            invalidate: async (harness) => {
                await harness.controller.handleMessage('fourth-wall', {
                    type: 'fourth-wall/switch-session',
                    payload: {
                        chatIdentity: 'chat:a',
                        sessionId: 'default',
                        targetSessionId: 'second',
                    },
                });
            },
        },
        {
            name: 'deactivation',
            setup: () => createHarness(),
            invalidate: async (harness) => { harness.controller.deactivate('fourth-wall', 'closed'); },
        },
    ];

    for (const item of cases) {
        await context.test(item.name, async () => {
            const harness = item.setup();
            const request = await activateAndSend(harness);
            await item.invalidate(harness);
            const mutationCount = harness.mutations.length;

            request.onStreamProgress({ text: '<msg>late progress</msg>' });
            request.resolve({ text: '<msg>late final</msg>' });
            await flushAsyncWork();

            assert.equal(harness.mutations.length, mutationCount);
            assert.equal(
                harness.state.chat.sessions.some(session => session.history.some(message => message.role === 'ai')),
                false,
            );
        });
    }
});
