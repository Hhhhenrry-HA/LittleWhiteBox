import assert from 'node:assert/strict';
import test from 'node:test';

import { toPostInputs } from '../apps/game/application/action-policy.js';
import { createGameService } from '../apps/game/application/service.js';
import {
    readGameDomain,
    validateGameEconomyConsistency,
} from '../apps/game/application/root-protocol.js';
import { ensureEconomy, postAction, projectBalances } from '../domains/economy/ledger.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { appendGameEvent, createEmptyGameDomain, getGameCasToken } from '../domains/game/timeline.js';
import { createChatDataStore } from '../host/chat-data-store.js';

function command(view, actionId, extra = {}) {
    return {
        actionId,
        expectedRevision: view.revision,
        expectedEventId: view.eventId,
        ...extra,
    };
}

function createHarness(randomValues = [], options = {}) {
    const identity = {
        key: 'character:game:chat-a',
        kind: 'character',
        ownerId: 'game',
        chatId: 'chat-a',
    };
    const chat = {
        metadata: {},
        persisted: undefined,
        messages: [{ role: 'user', name: 'Player', text: 'Open the game app' }],
    };
    const state = {
        saveCount: 0,
        saves: [],
        randomCalls: 0,
        gameIds: 0,
        eventIds: 0,
        activityIds: 0,
        transactionIds: 0,
        generationActive: false,
        persist(transaction) {
            chat.persisted = structuredClone(transaction.xiaobaiOs);
        },
        saveImpl: null,
    };
    state.saveImpl = async transaction => { state.persist(transaction); };

    const store = createChatDataStore({
        getChatIdentity: () => identity,
        getChatMetadata: () => chat.metadata,
        async saveChatMetadata(transaction) {
            state.saveCount += 1;
            state.saves.push(structuredClone(transaction));
            await state.saveImpl(transaction);
        },
        readPersistedXiaobaiOs: async () => structuredClone(chat.persisted),
    });
    let clock = 1_000;
    const now = () => ++clock;
    const createTransactionId = () => `tx-${++state.transactionIds}`;
    const values = [...randomValues];
    const random = {
        nextInt(maxExclusive) {
            state.randomCalls += 1;
            const value = values.shift();
            if (!Number.isSafeInteger(value) || value < 0 || value >= maxExclusive) {
                throw new Error(`test_random_invalid:${String(value)}/${maxExclusive}`);
            }
            return value;
        },
    };
    const economy = createEconomyRepository(store, {
        now,
        createId: createTransactionId,
    });
    const game = createGameService(store, {
        now,
        random,
        createGameId: kind => `game-${kind}-${++state.gameIds}`,
        createEventId: () => `game-event-${++state.eventIds}`,
        createActivityId: () => `game-activity-${++state.activityIds}`,
        createTransactionId,
        isMainGenerationActive: () => state.generationActive,
        ...options,
    });
    return { game, chat, economy, state, store };
}

async function openEconomy(harness) {
    await harness.economy.ensureCurrent();
    harness.state.saveCount = 0;
    harness.state.saves.length = 0;
}

function gameTransactions(harness) {
    return harness.economy.readCurrent().transactions.filter(transaction => transaction.sourceDomain === 'game');
}

function escrowBalance(harness, gameId) {
    return projectBalances(harness.economy.readCurrent())[`escrow:game:${gameId}`] || 0;
}

test('read-only Game view uses Economy balance without creating a Game domain', async () => {
    const harness = createHarness();
    await openEconomy(harness);

    const view = harness.game.readCurrent();

    assert.equal(view.balance, 100);
    assert.equal(view.writeState, 'ready');
    assert.equal(view.revision, 0);
    assert.equal(view.eventId, '');
    assert.equal(view.lockedAmount, 0);
    assert.equal(Object.hasOwn(view, 'domain'), false);
    assert.equal(Object.hasOwn(harness.store.readCurrent().domains, 'game'), false);
    assert.equal(harness.state.saveCount, 0);
});

test('corrupt Game data is contained to Game and does not block Economy consumers', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    harness.chat.metadata.extensions.LittleWhiteBox.xiaobaiOs.domains.game = 'corrupt-game-data';

    assert.equal(harness.economy.getPlayerBalance(), 100);
    assert.throws(() => harness.game.readCurrent(), error => error.code === 'game_invalid_domain');
});

test('Game economy replay derives a Push stake from its frozen start result', () => {
    const gameId = 'push-frozen-stake';
    const actionId = 'push-frozen-stake:start';
    const game = appendGameEvent(createEmptyGameDomain(), {
        ...getGameCasToken(createEmptyGameDomain()),
        eventId: 'game-event-frozen-stake',
        actionId,
        command: { kind: 'push-start', gameId },
        result: {
            changes: [{
                kind: 'game-started',
                game: {
                    kind: 'push',
                    game: {
                        id: gameId, bet: 75, deck: ['bomb', 'coin'],
                        drawIndex: 0, revealedCoins: 0, cashoutAmount: 0,
                    },
                },
            }],
            activities: [],
        },
        createdAt: 1_001,
    }).domain;
    const opening = ensureEconomy(undefined, { now: () => 1_000, createId: () => 'tx-opening' });
    const ledger = postAction(
        opening,
        toPostInputs([{
            idempotencyKey: `game:${gameId}:stake`,
            fromAccountId: 'player',
            toAccountId: `escrow:game:${gameId}`,
            amount: 75,
            kind: 'game_stake',
            title: 'Game stake escrow',
        }], actionId, gameId),
        { now: () => 1_001, createId: () => 'tx-stake' },
    ).ledger;

    assert.doesNotThrow(() => validateGameEconomyConsistency({
        schemaVersion: 2,
        apps: {},
        domains: { economy: ledger, game },
    }));
});

test('all three starts atomically escrow their bet in one root save', async t => {
    const cases = [
        {
            name: 'dice',
            random: Array(10).fill(0),
            expectedRandomCalls: 10,
            bet: 50,
            start: (game, view) => game.startDice(command(view, 'start-dice', { bet: 50 })),
        },
        {
            name: 'push',
            random: Array(9).fill(0),
            expectedRandomCalls: 9,
            bet: 50,
            start: (game, view) => game.startPush(command(view, 'start-push')),
        },
        {
            name: 'ladder',
            random: [],
            expectedRandomCalls: 0,
            bet: 80,
            start: (game, view) => game.startLadder(command(view, 'start-ladder', { bet: 80 })),
        },
    ];

    for (const scenario of cases) {
        await t.test(scenario.name, async () => {
            const harness = createHarness(scenario.random);
            await openEconomy(harness);

            const started = await scenario.start(harness.game, harness.game.readCurrent());
            const [stake] = gameTransactions(harness);

            assert.equal(harness.state.saveCount, 1);
            assert.equal(started.activeGame.kind, scenario.name);
            assert.equal(started.balance, 100 - scenario.bet);
            assert.equal(started.lockedAmount, scenario.bet);
            assert.equal(stake.fromAccountId, 'player');
            assert.equal(stake.toAccountId, `escrow:game:${started.activeGame.id}`);
            assert.equal(stake.amount, scenario.bet);
            assert.equal(escrowBalance(harness, started.activeGame.id), scenario.bet);
            assert.equal(harness.state.randomCalls, scenario.expectedRandomCalls);
            assert.equal(harness.state.saves[0].xiaobaiOs.domains.game.events.length, 1);
            assert.equal(harness.state.saves[0].xiaobaiOs.domains.economy.transactions.length, 2);
        });
    }
});

test('dice profit is funded from reserve and paid from an emptied escrow', async () => {
    const harness = createHarness(Array(10).fill(0));
    await openEconomy(harness);
    const started = await harness.game.startDice(command(harness.game.readCurrent(), 'dice-start', { bet: 50 }));

    const settled = await harness.game.bidDice(command(started, 'dice-max-bid', {
        gameId: started.activeGame.id,
        bid: { count: 10, face: 6 },
    }));

    assert.equal(settled.balance, 140);
    assert.equal(settled.activeGame, undefined);
    assert.deepEqual(gameTransactions(harness).map(transaction => ({
        from: transaction.fromAccountId,
        to: transaction.toAccountId,
        amount: transaction.amount,
    })), [
        { from: 'player', to: `escrow:game:${started.activeGame.id}`, amount: 50 },
        { from: 'counterparty:game:reserve', to: `escrow:game:${started.activeGame.id}`, amount: 40 },
        { from: `escrow:game:${started.activeGame.id}`, to: 'player', amount: 90 },
    ]);
    assert.equal(escrowBalance(harness, started.activeGame.id), 0);
    assert.deepEqual({
        amountIn: settled.activities[0].amountIn,
        payout: settled.activities[0].payout,
        net: settled.activities[0].net,
    }, { amountIn: 50, payout: 90, net: 40 });
    assert.equal(harness.state.randomCalls, 10);
});

test('dice bid can continue without money and challenge settles the loss', async () => {
    const harness = createHarness(Array(10).fill(0));
    await openEconomy(harness);
    const started = await harness.game.startDice(command(harness.game.readCurrent(), 'challenge-start', { bet: 50 }));

    const bid = await harness.game.bidDice(command(started, 'challenge-bid', {
        gameId: started.activeGame.id,
        bid: { count: 1, face: 2 },
    }));
    assert.equal(bid.activeGame.bids.length, 2);
    assert.equal(gameTransactions(harness).length, 1);

    const settled = await harness.game.challengeDice(command(bid, 'challenge-end', {
        gameId: bid.activeGame.id,
    }));
    assert.equal(settled.activeGame, undefined);
    assert.equal(settled.activities[0].detail.kind, 'dice');
    assert.equal(settled.activities[0].payout, 0);
    assert.equal(gameTransactions(harness).at(-1).kind, 'game_loss');
    assert.equal(escrowBalance(harness, started.activeGame.id), 0);
    assert.equal(harness.state.randomCalls, 10);
});

test('push intermediate draw has no money leg and equal cash-out only returns escrow', async () => {
    const harness = createHarness(Array(9).fill(0));
    await openEconomy(harness);
    const started = await harness.game.startPush(command(harness.game.readCurrent(), 'push-start'));
    const afterStartTransactions = gameTransactions(harness).length;

    const drawn = await harness.game.drawPush(command(started, 'push-draw', {
        gameId: started.activeGame.id,
    }));
    assert.equal(drawn.activeGame.revealedCoins, 1);
    assert.equal(gameTransactions(harness).length, afterStartTransactions);
    assert.equal(drawn.balance, 50);

    const settled = await harness.game.cashOutPush(command(drawn, 'push-cash', {
        gameId: drawn.activeGame.id,
    }));
    const transactions = gameTransactions(harness);
    assert.equal(transactions.length, 2);
    assert.deepEqual({
        from: transactions[1].fromAccountId,
        to: transactions[1].toAccountId,
        amount: transactions[1].amount,
    }, {
        from: `escrow:game:${started.activeGame.id}`,
        to: 'player',
        amount: 50,
    });
    assert.equal(settled.balance, 100);
    assert.equal(escrowBalance(harness, started.activeGame.id), 0);
});

test('a zero-payout push loss writes only the non-zero sink leg', async () => {
    const harness = createHarness([0, 1, 1, 1, 1, 1, 1, 1, 1]);
    await openEconomy(harness);
    const started = await harness.game.startPush(command(harness.game.readCurrent(), 'push-start-loss'));

    const settled = await harness.game.drawPush(command(started, 'push-bust', {
        gameId: started.activeGame.id,
    }));
    const transactions = gameTransactions(harness);

    assert.equal(settled.balance, 50);
    assert.equal(settled.activities[0].payout, 0);
    assert.equal(transactions.length, 2);
    assert.deepEqual({
        from: transactions[1].fromAccountId,
        to: transactions[1].toAccountId,
        amount: transactions[1].amount,
    }, {
        from: `escrow:game:${started.activeGame.id}`,
        to: 'system:sink',
        amount: 50,
    });
    assert.equal(escrowBalance(harness, started.activeGame.id), 0);
});

test('ladder intermediate step has no money leg and cash-out settles profit', async () => {
    const harness = createHarness([0]);
    await openEconomy(harness);
    const started = await harness.game.startLadder(command(harness.game.readCurrent(), 'ladder-start', { bet: 50 }));

    const stepped = await harness.game.stepLadder(command(started, 'ladder-step', {
        gameId: started.activeGame.id,
        choice: 'safe',
    }));
    assert.equal(stepped.activeGame.cashoutAmount, 56);
    assert.equal(gameTransactions(harness).length, 1);

    const settled = await harness.game.cashOutLadder(command(stepped, 'ladder-cash', {
        gameId: stepped.activeGame.id,
    }));
    assert.equal(settled.balance, 106);
    assert.deepEqual(gameTransactions(harness).slice(1).map(transaction => ({
        from: transaction.fromAccountId,
        to: transaction.toAccountId,
        amount: transaction.amount,
    })), [
        { from: 'counterparty:game:reserve', to: `escrow:game:${started.activeGame.id}`, amount: 6 },
        { from: `escrow:game:${started.activeGame.id}`, to: 'player', amount: 56 },
    ]);
    assert.equal(escrowBalance(harness, started.activeGame.id), 0);
});

test('CAS, one-active-game, game identity and illegal actions fail before random', async () => {
    const harness = createHarness([...Array(9).fill(0), ...Array(20).fill(0)]);
    await openEconomy(harness);
    const empty = harness.game.readCurrent();
    const started = await harness.game.startPush(command(empty, 'first-game'));
    const randomAfterStart = harness.state.randomCalls;
    const savesAfterStart = harness.state.saveCount;

    await assert.rejects(
        harness.game.startDice(command(empty, 'stale-start', { bet: 50 })),
        error => error.code === 'game_revision_conflict',
    );
    await assert.rejects(
        harness.game.startDice(command(started, 'second-game', { bet: 50 })),
        error => error.code === 'game_action_invalid',
    );
    await assert.rejects(
        harness.game.stepLadder(command(started, 'wrong-kind', {
            gameId: started.activeGame.id,
            choice: 'safe',
        })),
        error => error.code === 'game_action_invalid',
    );
    await assert.rejects(
        harness.game.drawPush(command(started, 'wrong-id', { gameId: 'another-game' })),
        error => error.code === 'game_action_invalid',
    );
    await assert.rejects(
        harness.game.cashOutPush(command(started, 'illegal-cash', { gameId: started.activeGame.id })),
        error => error.code === 'game_push_cashout_invalid',
    );

    assert.equal(harness.state.randomCalls, randomAfterStart);
    assert.equal(harness.state.saveCount, savesAfterStart);
    assert.equal(harness.game.readCurrent().balance, 50);
});

test('invalid dice bids and ladder choices are rejected before their random draw', async t => {
    await t.test('dice bid', async () => {
        const harness = createHarness([...Array(10).fill(0), 0]);
        await openEconomy(harness);
        const started = await harness.game.startDice(command(harness.game.readCurrent(), 'invalid-bid-start', { bet: 50 }));

        await assert.rejects(
            harness.game.bidDice(command(started, 'invalid-bid', {
                gameId: started.activeGame.id,
                bid: { count: 0, face: 2 },
            })),
            error => error.code === 'game_dice_bid_invalid',
        );
        assert.equal(harness.state.randomCalls, 10);
        assert.equal(harness.state.saveCount, 1);
    });

    await t.test('ladder choice', async () => {
        const harness = createHarness([0]);
        await openEconomy(harness);
        const started = await harness.game.startLadder(command(harness.game.readCurrent(), 'invalid-step-start', { bet: 50 }));

        await assert.rejects(
            harness.game.stepLadder(command(started, 'invalid-step', {
                gameId: started.activeGame.id,
                choice: 'unknown',
            })),
            error => error.code === 'game_ladder_choice_invalid',
        );
        assert.equal(harness.state.randomCalls, 0);
        assert.equal(harness.state.saveCount, 1);
    });
});

test('action replay precedes stale CAS and intent conflicts without consuming IDs, random or saves', async () => {
    const harness = createHarness(Array(30).fill(0));
    await openEconomy(harness);
    const input = command(harness.game.readCurrent(), 'stable-start', { bet: 50 });

    const [first, replay] = await Promise.all([
        harness.game.startDice(input),
        harness.game.startDice(input),
    ]);
    const counts = {
        random: harness.state.randomCalls,
        game: harness.state.gameIds,
        event: harness.state.eventIds,
        transaction: harness.state.transactionIds,
        save: harness.state.saveCount,
    };

    assert.equal(first.eventId, replay.eventId);
    assert.equal(harness.state.saveCount, 1);
    assert.equal(harness.state.randomCalls, 10);
    const replayAgain = await harness.game.startDice({
        ...input,
        expectedRevision: 999,
        expectedEventId: 'stale-event',
    });
    assert.equal(replayAgain.eventId, first.eventId);
    assert.deepEqual({
        random: harness.state.randomCalls,
        game: harness.state.gameIds,
        event: harness.state.eventIds,
        transaction: harness.state.transactionIds,
        save: harness.state.saveCount,
    }, counts);

    await assert.rejects(
        harness.game.startDice({ ...input, bet: 60 }),
        error => error.code === 'game_action_conflict',
    );
    assert.equal(harness.state.randomCalls, counts.random);
    assert.equal(harness.state.saveCount, counts.save);
});

test('Game rejects new actions throughout a main generation but permits committed replays', async () => {
    const harness = createHarness(Array(9).fill(0));
    await openEconomy(harness);
    const input = command(harness.game.readCurrent(), 'generation-start');
    const started = await harness.game.startPush(input);
    const counts = {
        random: harness.state.randomCalls,
        game: harness.state.gameIds,
        event: harness.state.eventIds,
        activity: harness.state.activityIds,
        transaction: harness.state.transactionIds,
        save: harness.state.saveCount,
    };
    harness.state.generationActive = true;

    const replay = await harness.game.startPush(input);
    assert.equal(replay.eventId, started.eventId);
    await assert.rejects(harness.game.drawPush(command(started, 'generation-draw', {
        gameId: started.activeGame.id,
    })), /game_main_generation_active/);

    assert.deepEqual({
        random: harness.state.randomCalls,
        game: harness.state.gameIds,
        event: harness.state.eventIds,
        activity: harness.state.activityIds,
        transaction: harness.state.transactionIds,
        save: harness.state.saveCount,
    }, counts);
});

test('replaying an earlier action never rewinds committed Game or Economy state', async () => {
    const harness = createHarness(Array(9).fill(0));
    await openEconomy(harness);
    const input = command(harness.game.readCurrent(), 'branch-start');
    const started = await harness.game.startPush(input);
    const drawn = await harness.game.drawPush(command(started, 'branch-draw', {
        gameId: started.activeGame.id,
    }));
    await harness.game.cashOutPush(command(drawn, 'branch-cash', {
        gameId: drawn.activeGame.id,
    }));
    const rootBefore = harness.store.readCurrent();
    const viewBefore = harness.game.readCurrent();
    const counts = {
        random: harness.state.randomCalls,
        game: harness.state.gameIds,
        event: harness.state.eventIds,
        activity: harness.state.activityIds,
        transaction: harness.state.transactionIds,
    };
    const savesBefore = harness.state.saveCount;

    const replay = await harness.game.startPush(input);

    assert.deepEqual(replay, viewBefore);
    assert.deepEqual(harness.store.readCurrent(), rootBefore);
    assert.deepEqual({
        random: harness.state.randomCalls,
        game: harness.state.gameIds,
        event: harness.state.eventIds,
        activity: harness.state.activityIds,
        transaction: harness.state.transactionIds,
    }, counts);
    assert.equal(harness.state.saveCount, savesBefore);
});

test('insufficient funds does not create a game or consume random', async () => {
    const harness = createHarness(Array(10).fill(0));
    await openEconomy(harness);

    await assert.rejects(
        harness.game.startDice(command(harness.game.readCurrent(), 'too-expensive', { bet: 500 })),
        error => error.code === 'economy_insufficient_funds',
    );

    assert.equal(harness.state.randomCalls, 0);
    assert.equal(harness.state.gameIds, 0);
    assert.equal(harness.state.saveCount, 0);
    assert.equal(readGameDomain(harness.store.readCurrent()), null);
});

test('explicit save failure rolls Game and Economy back together', async () => {
    const harness = createHarness(Array(9).fill(0));
    await openEconomy(harness);
    const before = harness.store.readCurrent();
    harness.state.saveImpl = async () => {
        throw Object.assign(new Error('save unavailable'), { code: 'SAVE_UNAVAILABLE' });
    };

    await assert.rejects(
        harness.game.startPush(command(harness.game.readCurrent(), 'failed-start')),
        error => error.code === 'SAVE_UNAVAILABLE',
    );

    assert.deepEqual(harness.store.readCurrent(), before);
    assert.equal(harness.game.readCurrent().balance, 100);
    assert.equal(harness.game.readCurrent().revision, 0);
    assert.equal(harness.game.getWriteState(), 'ready');
    assert.equal(harness.state.saveCount, 1);
});

test('unconfirmed save retains one candidate and confirmation never redraws', async () => {
    const harness = createHarness(Array(30).fill(0));
    await openEconomy(harness);
    harness.state.saveImpl = async transaction => {
        harness.state.persist(transaction);
        throw Object.assign(new Error('save result unknown'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };
    const input = command(harness.game.readCurrent(), 'pending-dice', { bet: 50 });

    await assert.rejects(
        harness.game.startDice(input),
        error => error.code === 'SAVE_UNCONFIRMED',
    );
    const candidate = harness.game.readCurrent();
    assert.equal(candidate.balance, 50);
    assert.equal(candidate.activeGame.kind, 'dice');
    assert.equal(harness.game.getWriteState(), 'unconfirmed');
    assert.equal(harness.state.randomCalls, 10);

    await assert.rejects(
        harness.game.startDice(input),
        error => error.code === 'SAVE_UNCONFIRMED',
    );
    assert.equal(harness.state.randomCalls, 10);
    assert.equal(harness.state.saveCount, 1);

    assert.deepEqual(await harness.game.confirmPending(), { status: 'confirmed' });
    assert.equal(harness.game.getWriteState(), 'ready');
    assert.equal(harness.state.randomCalls, 10);
    assert.equal(harness.game.readCurrent().eventId, candidate.eventId);
});

test('editing host conversation content never rewinds committed Game or Economy state', async () => {
    const harness = createHarness(Array(9).fill(0));
    await openEconomy(harness);
    const started = await harness.game.startPush(command(harness.game.readCurrent(), 'rollback-start'));
    harness.chat.messages.push({ role: 'assistant', name: 'Character', text: 'Original reply' });
    const drawn = await harness.game.drawPush(command(started, 'rollback-draw', {
        gameId: started.activeGame.id,
    }));
    await harness.game.cashOutPush(command(drawn, 'rollback-cash', {
        gameId: drawn.activeGame.id,
    }));
    const committedRoot = harness.store.readCurrent();
    const committedView = harness.game.readCurrent();
    const savesBefore = harness.state.saveCount;

    harness.chat.messages[0].text = 'Rewritten opening';
    harness.chat.messages[1].text = 'Rewritten reply';

    assert.deepEqual(harness.game.readCurrent(), committedView);
    assert.deepEqual(harness.store.readCurrent(), committedRoot);
    assert.equal(harness.state.saveCount, savesBefore);
});

test('cross-domain invariant rejects forged Game money while service output stays private', async () => {
    const harness = createHarness(Array(10).fill(0));
    await openEconomy(harness);
    const started = await harness.game.startDice(command(harness.game.readCurrent(), 'private-dice', { bet: 50 }));
    const root = harness.store.readCurrent();

    assert.equal(Object.hasOwn(started, 'domain'), false);
    assert.equal(JSON.stringify(started).includes('dealerDice'), false);
    assert.equal(JSON.stringify(started).includes('prefixHash'), false);
    assert.equal(JSON.stringify(started).includes('escrow:game:'), false);
    assert.equal(Object.hasOwn(started.activeGame, 'dealerDice'), false);
    assert.ok(root.domains.game.events[0].result.changes[0].game.game.dealerDice);

    const forged = structuredClone(root);
    forged.domains.economy.transactions[1].sourceId = 'wrong-game';
    assert.throws(
        () => validateGameEconomyConsistency(forged),
        /Game action is inconsistent/,
    );
});
