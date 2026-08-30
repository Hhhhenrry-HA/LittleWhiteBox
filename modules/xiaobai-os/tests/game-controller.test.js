import assert from 'node:assert/strict';
import test from 'node:test';

import { createGameController } from '../apps/game/host/controller.js';

function deferred() {
    let resolve;
    const promise = new Promise(resolvePromise => { resolve = resolvePromise; });
    return { promise, resolve };
}

function activity(index = 1) {
    return {
        id: `activity-${index}`,
        sourceId: `game-${index}`,
        detail: {
            kind: 'dice',
            outcome: 'player-win',
            challenger: 'dealer',
            finalBid: { count: 3, face: 4, by: 'player' },
            bids: [{ count: 3, face: 4, by: 'player' }],
            playerDice: [1, 2, 3, 4, 5],
            matchingDiceCount: 3,
            dealerDice: ['hidden-die'],
            privateState: 'hidden-record-state',
        },
        amountIn: 50,
        payout: 95,
        net: 45,
        revision: index,
        eventId: `event-${index}`,
        actionId: `action-${index}`,
        assistantTurn: 0,
        createdAt: 1_000 + index,
        deck: ['hidden-card'],
    };
}

function baseView(writeState = 'ready') {
    return {
        revision: 2,
        eventId: 'event-2',
        lockedAmount: 50,
        activeGame: {
            kind: 'dice',
            id: 'dice-1',
            bet: 50,
            playerDice: [1, 2, 3, 4, 5],
            bids: [{ count: 2, face: 3, by: 'player' }, { count: 2, face: 4, by: 'dealer' }],
            legalActions: ['bid', 'challenge'],
            legalBids: [{ count: 2, face: 5 }],
            dealerDice: ['hidden-die'],
            deck: ['hidden-card'],
            random: 'hidden-random',
            privateState: 'hidden-game-state',
        },
        activities: [activity(2)],
        activityPage: { offset: 0, limit: 50, total: 1, hasMore: false },
        balance: 150,
        writeState,
        privateState: 'hidden-root-state',
    };
}

function createHarness({ economyOpened = true, writeState = 'ready', records = null } = {}) {
    const host = {
        identity: { key: 'character:game:chat-a', chatId: 'chat-a' },
        posts: [],
    };
    let opened = economyOpened;
    let view = baseView(writeState);
    const allRecords = records || view.activities;
    const commands = [];
    const storyListeners = new Set();
    const generationListeners = new Set();
    let generationActive = false;
    let storyState = { identityKey: host.identity.key, status: 'ready', message: '' };
    let reconciliations = 0;
    const record = method => async (input) => {
        commands.push({ method, input: structuredClone(input) });
        return structuredClone(view);
    };
    const game = {
        readCurrent(input = {}) {
            const offset = input.activityOffset || 0;
            const limit = input.activityLimit || 50;
            const selected = allRecords.slice(offset, offset + limit);
            return structuredClone({
                ...view,
                activities: selected,
                activityPage: {
                    offset,
                    limit,
                    total: allRecords.length,
                    hasMore: offset + selected.length < allRecords.length,
                },
            });
        },
        startDice: record('startDice'),
        bidDice: record('bidDice'),
        challengeDice: record('challengeDice'),
        startPush: record('startPush'),
        drawPush: record('drawPush'),
        cashOutPush: record('cashOutPush'),
        startLadder: record('startLadder'),
        stepLadder: record('stepLadder'),
        cashOutLadder: record('cashOutLadder'),
        async confirmPending() {
            view = { ...view, writeState: 'ready' };
            return { status: 'confirmed' };
        },
        getWriteState: () => view.writeState,
    };
    const economy = {
        hasCurrent: () => opened,
        async ensureCurrent() {opened = true;},
    };
    const storyRuntime = {
        async reconcileNow() {reconciliations += 1; return storyState;},
        getState: () => storyState,
        subscribe(listener) {
            storyListeners.add(listener);
            return () => storyListeners.delete(listener);
        },
    };
    const controller = createGameController({
        game,
        economy,
        storyRuntime,
        getChatIdentity: () => host.identity,
        isMainGenerationActive: () => generationActive,
        subscribeGeneration(listener) {
            generationListeners.add(listener);
            return () => generationListeners.delete(listener);
        },
    });
    controller.startBackground();
    return {
        game,
        commands,
        controller,
        host,
        get reconciliations() {return reconciliations;},
        setGeneration(active) {
            generationActive = active;
            generationListeners.forEach(listener => listener(active));
        },
        publishStory(next) {
            storyState = next;
            storyListeners.forEach(listener => listener(next));
        },
    };
}

async function activate(harness) {
    return harness.controller.activate({
        post(type, payload) {
            harness.host.posts.push({ type, payload });
            return true;
        },
    });
}

function assertNoHiddenFields(value) {
    const forbidden = new Set(['dealerDice', 'deck', 'random', 'privateState']);
    const visit = current => {
        if (!current || typeof current !== 'object') {return;}
        for (const [key, child] of Object.entries(current)) {
            assert.equal(forbidden.has(key), false, `public state included ${key}`);
            visit(child);
        }
    };
    visit(value);
}

test('Game activation ensures Economy, reconciles existing story state, and strips hidden service fields', async () => {
    const unopened = createHarness({ economyOpened: false });
    const openedState = await activate(unopened);
    assert.equal(openedState.balance, 150);
    assert.equal(unopened.reconciliations, 0);
    assertNoHiddenFields(openedState);

    const existing = createHarness();
    const state = await activate(existing);
    assert.equal(existing.reconciliations, 1);
    assert.deepEqual(state.activeGame.playerDice, [1, 2, 3, 4, 5]);
    assert.equal(state.records[0].payout, 95);
    assertNoHiddenFields(state);
});

test('Game protocol forwards only explicit fields for every game action', async () => {
    const scenarios = [
        ['game/dice/start', 'startDice', { bet: 80 }, { bet: 80 }],
        ['game/dice/bid', 'bidDice', { gameId: 'dice-1', bid: { count: 3, face: 4, probability: 1 }, payout: 999 }, {
            gameId: 'dice-1', bid: { count: 3, face: 4 },
        }],
        ['game/dice/challenge', 'challengeDice', { gameId: 'dice-1' }, { gameId: 'dice-1' }],
        ['game/push/start', 'startPush', {}, {}],
        ['game/push/draw', 'drawPush', { gameId: 'push-1', deck: ['coin'] }, { gameId: 'push-1' }],
        ['game/push/cash-out', 'cashOutPush', { gameId: 'push-1', payout: 500 }, { gameId: 'push-1' }],
        ['game/ladder/start', 'startLadder', { bet: 120, probability: 10_000 }, { bet: 120 }],
        ['game/ladder/step', 'stepLadder', { gameId: 'ladder-1', choice: 'risky', random: 0 }, {
            gameId: 'ladder-1', choice: 'risky',
        }],
        ['game/ladder/cash-out', 'cashOutLadder', { gameId: 'ladder-1', privateState: {} }, { gameId: 'ladder-1' }],
    ];

    for (const [type, method, fields, expectedFields] of scenarios) {
        const harness = createHarness();
        await activate(harness);
        await harness.controller.handleMessage({
            type,
            payload: {
                chatIdentity: harness.host.identity.key,
                expectedRevision: 2,
                expectedEventId: 'event-2',
                actionId: `ui-${method}`,
                dealerDice: [6, 6, 6, 6, 6],
                ...fields,
            },
        });
        assert.deepEqual(harness.commands, [{
            method,
            input: {
                expectedRevision: 2,
                expectedEventId: 'event-2',
                actionId: `ui-${method}`,
                ...expectedFields,
            },
        }]);
    }
});

test('Game serializes writes and invalidates a pending result after a chat switch', async () => {
    const harness = createHarness();
    await activate(harness);
    const pending = deferred();
    harness.game.drawPush = () => pending.promise;
    const payload = {
        chatIdentity: harness.host.identity.key,
        expectedRevision: 2,
        expectedEventId: 'event-2',
        actionId: 'pending-draw',
        gameId: 'push-1',
    };
    const first = harness.controller.handleMessage({ type: 'game/push/draw', payload });
    await assert.rejects(
        harness.controller.handleMessage({
            type: 'game/push/cash-out',
            payload: { ...payload, actionId: 'second-action' },
        }),
        /已有游戏操作正在处理/,
    );

    harness.host.identity = { key: 'character:game:chat-b', chatId: 'chat-b' };
    pending.resolve(baseView());
    await assert.rejects(first, /聊天已切换/);
    harness.controller.handleChatChanged();
    await assert.rejects(
        harness.controller.handleMessage({ type: 'game/refresh', payload: { chatIdentity: payload.chatIdentity } }),
        /游戏 APP 未激活/,
    );
});

test('Game pages records explicitly and publishes reconciliation and save recovery states', async () => {
    const records = Array.from({ length: 55 }, (_, index) => activity(55 - index));
    const harness = createHarness({ writeState: 'unconfirmed', records });
    const initial = await activate(harness);
    assert.equal(initial.status, 'unconfirmed');
    assert.equal(initial.records.length, 50);
    assert.equal(initial.hasMore, true);

    const page = await harness.controller.handleMessage({
        type: 'game/records/load-more',
        payload: { chatIdentity: harness.host.identity.key, offset: 50, limit: 1, deck: ['hidden-card'] },
    });
    assert.equal(page.records.length, 5);
    assert.equal(page.offset, 50);
    assert.equal(page.hasMore, false);
    assertNoHiddenFields(page);

    const confirmation = await harness.controller.handleMessage({
        type: 'game/confirm-save',
        payload: { chatIdentity: harness.host.identity.key },
    });
    assert.equal(confirmation.confirmation, 'confirmed');
    assert.equal(confirmation.state.status, 'ready');

    harness.publishStory({
        identityKey: harness.host.identity.key,
        status: 'reconciling',
        message: '剧情已变化，正在核对游戏',
    });
    const pushed = harness.host.posts.findLast(post => post.type === 'game/state').payload.state;
    assert.equal(pushed.status, 'reconciling');
    assert.equal(pushed.message, '剧情已变化，正在核对游戏');
});

test('Game publishes main-generation state without invoking a game command', async () => {
    const harness = createHarness();
    await activate(harness);

    harness.setGeneration(true);

    const pushed = harness.host.posts.findLast(post => post.type === 'game/state').payload.state;
    assert.equal(pushed.generationActive, true);
    assert.deepEqual(harness.commands, []);
});
