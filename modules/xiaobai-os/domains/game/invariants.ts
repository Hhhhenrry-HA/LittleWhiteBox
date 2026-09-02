import {
    assertGameDiceGameWaitingForPlayer,
    countGameDiceBidMatches,
    GAME_DICE_PAYOUT_DENOMINATOR,
    GAME_DICE_PAYOUT_NUMERATOR,
    getGameDiceDealerResponsePolicy,
    isGameDiceBidHigher,
    normalizeGameDiceBet,
} from './games/dice-bluff.js';
import {
    assertActiveGamePushGame,
    GAME_PUSH_BET,
    GAME_PUSH_COIN_COUNT,
    GAME_PUSH_COIN_VALUE,
} from './games/push-your-luck.js';
import {
    assertActiveGameLadderGame,
    GAME_LADDER_MAX_FLOORS,
    GAME_LADDER_PAYOUT_CAP,
    calculateGameLadderRiskBase,
    calculateGameLadderSuccessAmount,
    normalizeGameLadderBet,
} from './games/risk-ladder.js';
import { GAME_MAX_PAYOUT, multiplyGameAmount } from './money.js';
import {
    GAME_SCHEMA_VERSION,
    throwGameError,
    type GameAction,
    type GameActiveGame,
    type GameActivity,
    type GameActivityDetail,
    type GameChange,
    type GameDiceBid,
    type GameDiceBidValue,
    type GameDiceTuple,
    type GameDomainV1,
    type GameEvent,
    type GameEventResult,
    type GameLadderChoice,
    type GameLadderTerminalStep,
    type GamePrivateDiceGame,
    type GamePrivateLadderGame,
    type GamePrivatePushGame,
    type GameState,
} from './types.js';

const MAX_DATE_MS = 8_640_000_000_000_000;
const MAX_ID_LENGTH = 200;

function invalid(detail: string): never {
    return throwGameError('game_invalid_domain', detail);
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}

function exactRecord(value: unknown, keys: readonly string[], detail: string): Record<string, unknown> {
    if (!isRecord(value)) {return invalid(`${detail}.shape`);}
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {return invalid(`${detail}.prototype`);}
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
        return invalid(`${detail}.keys`);
    }
    return value;
}

function canonicalId(value: unknown, detail: string): string {
    if (typeof value !== 'string' || !value || value !== value.trim()
        || Array.from(value).length > MAX_ID_LENGTH || /[\u0000-\u001f\u007f-\u009f]/u.test(value)) {
        return invalid(detail);
    }
    return value;
}

function safeInteger(value: unknown, minimum: number, detail: string): number {
    if (!Number.isSafeInteger(value) || Number(value) < minimum) {return invalid(detail);}
    return Number(value);
}

function payout(value: unknown, detail: string): number {
    const amount = safeInteger(value, 0, detail);
    if (amount > GAME_MAX_PAYOUT) {return invalid(detail);}
    return amount;
}

function sameJson(left: unknown, right: unknown): boolean {
    return JSON.stringify(left) === JSON.stringify(right);
}

function validateDiceBidValue(value: unknown, detail: string): GameDiceBidValue {
    const bid = exactRecord(value, ['count', 'face'], detail);
    const count = safeInteger(bid.count, 1, `${detail}.count`);
    const face = safeInteger(bid.face, 2, `${detail}.face`);
    if (count > 10 || face > 6) {return invalid(detail);}
    return { count, face: face as GameDiceBidValue['face'] };
}

function validateDiceBid(value: unknown, detail: string): GameDiceBid {
    const bid = exactRecord(value, ['by', 'count', 'face'], detail);
    if (bid.by !== 'player' && bid.by !== 'dealer') {return invalid(`${detail}.by`);}
    return { by: bid.by, ...validateDiceBidValue({ count: bid.count, face: bid.face }, detail) };
}

function validateDiceTuple(value: unknown, detail: string): GameDiceTuple {
    if (!Array.isArray(value) || value.length !== 5 || value.some((face) => (
        !Number.isSafeInteger(face) || Number(face) < 1 || Number(face) > 6
    ))) {
        return invalid(detail);
    }
    return [...value] as GameDiceTuple;
}

function validateBidSequence(value: unknown, detail: string, requireWaiting: boolean): GameDiceBid[] {
    if (!Array.isArray(value) || (requireWaiting && value.length % 2 !== 0)) {return invalid(detail);}
    const bids = value.map((entry, index) => validateDiceBid(entry, `${detail}.${index}`));
    for (let index = 0; index < bids.length; index += 1) {
        const current = bids[index];
        const previous = bids[index - 1];
        if (!current || current.by !== (index % 2 === 0 ? 'player' : 'dealer')
            || (previous && !isGameDiceBidHigher(current, previous))) {
            return invalid(detail);
        }
    }
    return bids;
}

function validateDiceGame(value: unknown, detail: string): GamePrivateDiceGame {
    const game = exactRecord(value, ['id', 'bet', 'playerDice', 'dealerDice', 'bids'], detail);
    const result: GamePrivateDiceGame = {
        id: canonicalId(game.id, `${detail}.id`),
        bet: safeInteger(game.bet, 1, `${detail}.bet`),
        playerDice: validateDiceTuple(game.playerDice, `${detail}.playerDice`),
        dealerDice: validateDiceTuple(game.dealerDice, `${detail}.dealerDice`),
        bids: validateBidSequence(game.bids, `${detail}.bids`, true),
    };
    try {
        normalizeGameDiceBet(result.bet);
        assertGameDiceGameWaitingForPlayer(result);
    } catch {
        return invalid(detail);
    }
    return result;
}

function validatePushGame(value: unknown, detail: string): GamePrivatePushGame {
    const game = exactRecord(value, ['id', 'bet', 'deck', 'drawIndex', 'revealedCoins', 'cashoutAmount'], detail);
    if (!Array.isArray(game.deck) || game.deck.some((card) => card !== 'coin' && card !== 'bomb')) {
        return invalid(`${detail}.deck`);
    }
    const result: GamePrivatePushGame = {
        id: canonicalId(game.id, `${detail}.id`),
        bet: game.bet === GAME_PUSH_BET ? GAME_PUSH_BET : invalid(`${detail}.bet`),
        deck: [...game.deck],
        drawIndex: safeInteger(game.drawIndex, 0, `${detail}.drawIndex`),
        revealedCoins: safeInteger(game.revealedCoins, 0, `${detail}.revealedCoins`),
        cashoutAmount: safeInteger(game.cashoutAmount, 0, `${detail}.cashoutAmount`),
    };
    try {
        assertActiveGamePushGame(result);
    } catch {
        return invalid(detail);
    }
    return result;
}

function ladderChoice(value: unknown, detail: string): GameLadderChoice {
    if (value !== 'safe' && value !== 'medium' && value !== 'risky') {return invalid(detail);}
    return value;
}

function validateLadderGame(value: unknown, detail: string): GamePrivateLadderGame {
    const game = exactRecord(value, ['id', 'bet', 'riskBase', 'steps'], detail);
    if (!Array.isArray(game.steps)) {return invalid(`${detail}.steps`);}
    const result: GamePrivateLadderGame = {
        id: canonicalId(game.id, `${detail}.id`),
        bet: safeInteger(game.bet, 1, `${detail}.bet`),
        riskBase: safeInteger(game.riskBase, 1, `${detail}.riskBase`),
        steps: game.steps.map((entry, index) => {
            const step = exactRecord(entry, ['floor', 'choice', 'amountAfterSuccess'], `${detail}.steps.${index}`);
            return {
                floor: safeInteger(step.floor, 1, `${detail}.steps.${index}.floor`),
                choice: ladderChoice(step.choice, `${detail}.steps.${index}.choice`),
                amountAfterSuccess: payout(step.amountAfterSuccess, `${detail}.steps.${index}.amountAfterSuccess`),
            };
        }),
    };
    try {
        normalizeGameLadderBet(result.bet);
        assertActiveGameLadderGame(result);
    } catch {
        return invalid(detail);
    }
    return result;
}

function validateActiveGame(value: unknown, detail: string): GameActiveGame {
    const active = exactRecord(value, ['kind', 'game'], detail);
    if (active.kind === 'dice') {return { kind: 'dice', game: validateDiceGame(active.game, `${detail}.game`) };}
    if (active.kind === 'push') {return { kind: 'push', game: validatePushGame(active.game, `${detail}.game`) };}
    if (active.kind === 'ladder') {return { kind: 'ladder', game: validateLadderGame(active.game, `${detail}.game`) };}
    return invalid(`${detail}.kind`);
}

export function validateGameAction(value: unknown): GameAction {
    const source = isRecord(value) ? value : {};
    const kind = source.kind;
    const keys: Record<GameAction['kind'], readonly string[]> = {
        'dice-start': ['kind', 'gameId', 'bet'],
        'dice-bid': ['kind', 'gameId', 'bid'],
        'dice-challenge': ['kind', 'gameId'],
        'push-start': ['kind', 'gameId'],
        'push-draw': ['kind', 'gameId'],
        'push-cash-out': ['kind', 'gameId'],
        'ladder-start': ['kind', 'gameId', 'bet'],
        'ladder-step': ['kind', 'gameId', 'choice'],
        'ladder-cash-out': ['kind', 'gameId'],
    };
    if (typeof kind !== 'string' || !(kind in keys)) {return invalid('command.kind');}
    const commandKind = kind as GameAction['kind'];
    const command = exactRecord(value, keys[commandKind], 'command');
    const gameId = canonicalId(command.gameId, 'command.gameId');
    if (commandKind === 'dice-start') {
        const bet = safeInteger(command.bet, 1, 'command.bet');
        try {normalizeGameDiceBet(bet);} catch {return invalid('command.bet');}
        return { kind: commandKind, gameId, bet };
    }
    if (commandKind === 'dice-bid') {
        return { kind: commandKind, gameId, bid: validateDiceBidValue(command.bid, 'command.bid') };
    }
    if (commandKind === 'ladder-start') {
        const bet = safeInteger(command.bet, 1, 'command.bet');
        try {normalizeGameLadderBet(bet);} catch {return invalid('command.bet');}
        return { kind: commandKind, gameId, bet };
    }
    if (commandKind === 'ladder-step') {
        return { kind: commandKind, gameId, choice: ladderChoice(command.choice, 'command.choice') };
    }
    if (commandKind === 'dice-challenge') {return { kind: commandKind, gameId };}
    if (commandKind === 'push-start') {return { kind: commandKind, gameId };}
    if (commandKind === 'push-draw') {return { kind: commandKind, gameId };}
    if (commandKind === 'push-cash-out') {return { kind: commandKind, gameId };}
    return { kind: 'ladder-cash-out', gameId };
}

function validateLadderTerminalSteps(value: unknown, detail: string): GameLadderTerminalStep[] {
    if (!Array.isArray(value) || value.length > GAME_LADDER_MAX_FLOORS) {return invalid(detail);}
    return value.map((entry, index) => {
        const step = exactRecord(entry, ['floor', 'choice', 'success', 'amountAfterStep'], `${detail}.${index}`);
        if (typeof step.success !== 'boolean') {return invalid(`${detail}.${index}.success`);}
        return {
            floor: safeInteger(step.floor, 1, `${detail}.${index}.floor`),
            choice: ladderChoice(step.choice, `${detail}.${index}.choice`),
            success: step.success,
            amountAfterStep: payout(step.amountAfterStep, `${detail}.${index}.amountAfterStep`),
        };
    });
}

function validateActivityDetail(value: unknown, amountIn: number, paid: number): GameActivityDetail {
    const source = isRecord(value) ? value : {};
    if (source.kind === 'dice') {
        const detail = exactRecord(value, [
            'kind', 'outcome', 'challenger', 'finalBid', 'bids', 'playerDice', 'dealerDice', 'matchingDiceCount',
        ], 'activity.detail');
        if (detail.outcome !== 'player-win' && detail.outcome !== 'dealer-win') {return invalid('activity.detail.outcome');}
        if (detail.challenger !== 'player' && detail.challenger !== 'dealer') {return invalid('activity.detail.challenger');}
        const bids = validateBidSequence(detail.bids, 'activity.detail.bids', false);
        const finalBid = validateDiceBid(detail.finalBid, 'activity.detail.finalBid');
        const playerDice = validateDiceTuple(detail.playerDice, 'activity.detail.playerDice');
        const dealerDice = validateDiceTuple(detail.dealerDice, 'activity.detail.dealerDice');
        const matchingDiceCount = safeInteger(detail.matchingDiceCount, 0, 'activity.detail.matchingDiceCount');
        if (matchingDiceCount > 10 || bids.length === 0 || !sameJson(finalBid, bids.at(-1))
            || finalBid.by === detail.challenger
            || matchingDiceCount !== countGameDiceBidMatches({ playerDice, dealerDice }, finalBid)) {
            return invalid('activity.detail.dice');
        }
        let bet;
        try {bet = normalizeGameDiceBet(amountIn);} catch {return invalid('activity.amountIn');}
        const bidHolds = matchingDiceCount >= finalBid.count;
        const playerWins = bidHolds ? finalBid.by === 'player' : detail.challenger === 'player';
        const expectedPayout = playerWins
            ? multiplyGameAmount(bet, GAME_DICE_PAYOUT_NUMERATOR, GAME_DICE_PAYOUT_DENOMINATOR)
            : 0;
        if ((detail.outcome === 'player-win') !== playerWins || paid !== expectedPayout) {
            return invalid('activity.detail.dice-result');
        }
        return {
            kind: 'dice', outcome: detail.outcome, challenger: detail.challenger,
            finalBid, bids, playerDice, dealerDice, matchingDiceCount,
        };
    }
    if (source.kind === 'push') {
        const detail = exactRecord(value, ['kind', 'outcome', 'revealedCoins'], 'activity.detail');
        const revealedCoins = safeInteger(detail.revealedCoins, 0, 'activity.detail.revealedCoins');
        if (amountIn !== GAME_PUSH_BET || revealedCoins > GAME_PUSH_COIN_COUNT) {
            return invalid('activity.detail.push');
        }
        if (detail.outcome === 'busted') {
            if (revealedCoins >= GAME_PUSH_COIN_COUNT || paid !== 0) {return invalid('activity.detail.push');}
        } else if (detail.outcome === 'cleared') {
            if (revealedCoins !== GAME_PUSH_COIN_COUNT || paid !== GAME_PUSH_COIN_COUNT * GAME_PUSH_COIN_VALUE) {
                return invalid('activity.detail.push');
            }
        } else if (detail.outcome === 'cashed-out') {
            if (revealedCoins < 1 || revealedCoins >= GAME_PUSH_COIN_COUNT
                || paid !== revealedCoins * GAME_PUSH_COIN_VALUE) {
                return invalid('activity.detail.push');
            }
        } else {return invalid('activity.detail.outcome');}
        return { kind: 'push', outcome: detail.outcome, revealedCoins };
    }
    if (source.kind === 'ladder') {
        const detail = exactRecord(value, ['kind', 'outcome', 'steps'], 'activity.detail');
        if (detail.outcome !== 'cashed-out' && detail.outcome !== 'failed'
            && detail.outcome !== 'cleared' && detail.outcome !== 'capped') {
            return invalid('activity.detail.outcome');
        }
        const steps = validateLadderTerminalSteps(detail.steps, 'activity.detail.steps');
        let amount;
        try {amount = calculateGameLadderRiskBase(amountIn);} catch {return invalid('activity.amountIn');}
        for (let index = 0; index < steps.length; index += 1) {
            const step = steps[index];
            if (!step || step.floor !== index + 1) {return invalid('activity.detail.steps');}
            if (!step.success) {
                if (index !== steps.length - 1 || step.amountAfterStep !== 0
                    || detail.outcome !== 'failed' || paid !== 0) {return invalid('activity.detail.steps');}
                return { kind: 'ladder', outcome: detail.outcome, steps };
            }
            amount = calculateGameLadderSuccessAmount(amount, step.choice);
            if (step.amountAfterStep !== amount) {return invalid('activity.detail.steps');}
        }
        if (detail.outcome === 'failed' || steps.length < 1) {return invalid('activity.detail.ladder');}
        if (detail.outcome === 'capped' && (amount !== GAME_LADDER_PAYOUT_CAP || paid !== amount)) {
            return invalid('activity.detail.ladder');
        }
        if (detail.outcome === 'cleared'
            && (steps.length !== GAME_LADDER_MAX_FLOORS || amount >= GAME_LADDER_PAYOUT_CAP || paid !== amount)) {
            return invalid('activity.detail.ladder');
        }
        if (detail.outcome === 'cashed-out'
            && (steps.length >= GAME_LADDER_MAX_FLOORS || amount >= GAME_LADDER_PAYOUT_CAP || paid !== amount)) {
            return invalid('activity.detail.ladder');
        }
        return { kind: 'ladder', outcome: detail.outcome, steps };
    }
    return invalid('activity.detail.kind');
}

function validateActivity(value: unknown, detail: string): GameActivity {
    const activity = exactRecord(value, ['id', 'sourceId', 'detail', 'amountIn', 'payout', 'net'], detail);
    const amountIn = safeInteger(activity.amountIn, 1, `${detail}.amountIn`);
    const paid = payout(activity.payout, `${detail}.payout`);
    if (!Number.isSafeInteger(activity.net) || activity.net !== paid - amountIn) {return invalid(`${detail}.net`);}
    return {
        id: canonicalId(activity.id, `${detail}.id`),
        sourceId: canonicalId(activity.sourceId, `${detail}.sourceId`),
        detail: validateActivityDetail(activity.detail, amountIn, paid),
        amountIn,
        payout: paid,
        net: Number(activity.net),
    };
}

function validateChange(value: unknown, detail: string): GameChange {
    const source = isRecord(value) ? value : {};
    if (source.kind === 'game-started' || source.kind === 'game-advanced') {
        const change = exactRecord(value, ['kind', 'game'], detail);
        return { kind: source.kind, game: validateActiveGame(change.game, `${detail}.game`) };
    }
    if (source.kind === 'game-ended') {
        const change = exactRecord(value, ['kind', 'gameId'], detail);
        return { kind: 'game-ended', gameId: canonicalId(change.gameId, `${detail}.gameId`) };
    }
    return invalid(`${detail}.kind`);
}

export function validateGameEventResult(value: unknown): GameEventResult {
    const result = exactRecord(value, ['changes', 'activities'], 'result');
    if (!Array.isArray(result.changes) || !Array.isArray(result.activities)) {return invalid('result.arrays');}
    return {
        changes: result.changes.map((change, index) => validateChange(change, `result.changes.${index}`)),
        activities: result.activities.map((activity, index) => validateActivity(activity, `result.activities.${index}`)),
    };
}

function validateEvent(value: unknown, expectedRevision: number): GameEvent {
    const event = exactRecord(value, [
        'revision', 'eventId', 'actionId', 'command', 'result', 'createdAt',
    ], 'event');
    if (event.revision !== expectedRevision) {return invalid('event.revision');}
    return {
        revision: expectedRevision,
        eventId: canonicalId(event.eventId, 'event.eventId'),
        actionId: canonicalId(event.actionId, 'event.actionId'),
        command: validateGameAction(event.command),
        result: validateGameEventResult(event.result),
        createdAt: (() => {
            const createdAt = safeInteger(event.createdAt, 0, 'event.createdAt');
            return createdAt <= MAX_DATE_MS ? createdAt : invalid('event.createdAt');
        })(),
    };
}

function gameId(active: GameActiveGame): string {
    return active.game.id;
}

function activeBet(active: GameActiveGame): number {
    return active.game.bet;
}

function assertSameDiceBase(left: GamePrivateDiceGame, right: GamePrivateDiceGame): void {
    if (left.id !== right.id || left.bet !== right.bet || !sameJson(left.playerDice, right.playerDice)
        || !sameJson(left.dealerDice, right.dealerDice)) {invalid('event.dice-transition');}
}

function terminalPrefix(game: GamePrivateLadderGame): GameLadderTerminalStep[] {
    return game.steps.map((step) => ({
        floor: step.floor,
        choice: step.choice,
        success: true,
        amountAfterStep: step.amountAfterSuccess,
    }));
}

function assertGameActivity(active: GameActiveGame, command: GameAction, activity: GameActivity): void {
    if (activity.sourceId !== gameId(active) || activity.amountIn !== activeBet(active)) {
        invalid('event.game-activity');
    }
    if (active.kind === 'dice') {
        if (activity.detail.kind !== 'dice' || !sameJson(activity.detail.playerDice, active.game.playerDice)
            || !sameJson(activity.detail.dealerDice, active.game.dealerDice)) {invalid('event.dice-activity');}
        const expectedBids = command.kind === 'dice-bid'
            ? [...active.game.bids, { by: 'player' as const, ...command.bid }]
            : active.game.bids;
        if (!sameJson(activity.detail.bids, expectedBids)) {invalid('event.dice-activity');}
        return;
    }
    if (active.kind === 'push') {
        if (activity.detail.kind !== 'push') {invalid('event.push-activity');}
        if (command.kind === 'push-cash-out') {
            if (activity.detail.outcome !== 'cashed-out' || activity.detail.revealedCoins !== active.game.revealedCoins) {
                invalid('event.push-activity');
            }
            return;
        }
        const nextCard = active.game.deck[active.game.drawIndex];
        const expectedCoins = active.game.revealedCoins + Number(nextCard === 'coin');
        const expectedOutcome = nextCard === 'bomb' ? 'busted' : 'cleared';
        if (activity.detail.outcome !== expectedOutcome || activity.detail.revealedCoins !== expectedCoins) {
            invalid('event.push-activity');
        }
        return;
    }
    if (activity.detail.kind !== 'ladder') {invalid('event.ladder-activity');}
    const prefix = terminalPrefix(active.game);
    if (command.kind === 'ladder-cash-out') {
        if (activity.detail.outcome !== 'cashed-out' || !sameJson(activity.detail.steps, prefix)) {
            invalid('event.ladder-activity');
        }
        return;
    }
    if (command.kind !== 'ladder-step' || activity.detail.steps.length !== prefix.length + 1
        || !sameJson(activity.detail.steps.slice(0, -1), prefix)) {invalid('event.ladder-activity');}
    const final = activity.detail.steps.at(-1);
    if (!final || final.floor !== prefix.length + 1 || final.choice !== command.choice) {
        invalid('event.ladder-activity');
    }
    if (!final.success) {
        if (activity.detail.outcome !== 'failed') {invalid('event.ladder-activity');}
        return;
    }
    if (final.amountAfterStep === GAME_LADDER_PAYOUT_CAP) {
        if (activity.detail.outcome !== 'capped') {invalid('event.ladder-activity');}
        return;
    }
    if (final.floor === GAME_LADDER_MAX_FLOORS) {
        if (activity.detail.outcome !== 'cleared') {invalid('event.ladder-activity');}
        return;
    }
    invalid('event.ladder-activity');
}

function assertGameTransition(active: GameActiveGame, command: GameAction, change: GameChange): void {
    if (change.kind === 'game-ended') {
        if (change.gameId !== gameId(active)) {invalid('event.game-ended');}
        if (active.kind === 'dice' && command.kind === 'dice-bid') {
            const policy = getGameDiceDealerResponsePolicy(active.game.dealerDice, command.bid);
            if (policy.kind === 'raise') {invalid('event.dice-transition');}
        }
        return;
    }
    if (change.kind !== 'game-advanced' || change.game.kind !== active.kind
        || gameId(change.game) !== gameId(active)) {invalid('event.game-advanced');}
    if (active.kind === 'dice' && change.game.kind === 'dice' && command.kind === 'dice-bid') {
        assertSameDiceBase(active.game, change.game.game);
        if (change.game.game.bids.length !== active.game.bids.length + 2
            || !sameJson(change.game.game.bids.slice(0, -2), active.game.bids)
            || !sameJson(change.game.game.bids.at(-2), { by: 'player', ...command.bid })) {
            invalid('event.dice-transition');
        }
        const policy = getGameDiceDealerResponsePolicy(active.game.dealerDice, command.bid);
        if (policy.kind === 'challenge'
            || !sameJson(change.game.game.bids.at(-1), { by: 'dealer', ...policy.dealerBid })) {
            invalid('event.dice-transition');
        }
        return;
    }
    if (active.kind === 'push' && change.game.kind === 'push' && command.kind === 'push-draw') {
        const previous = active.game;
        const next = change.game.game;
        if (!sameJson(previous.deck, next.deck) || next.drawIndex !== previous.drawIndex + 1
            || previous.deck[previous.drawIndex] !== 'coin'
            || next.revealedCoins !== previous.revealedCoins + 1
            || next.cashoutAmount !== previous.cashoutAmount + GAME_PUSH_COIN_VALUE) {
            invalid('event.push-transition');
        }
        return;
    }
    if (active.kind === 'ladder' && change.game.kind === 'ladder' && command.kind === 'ladder-step') {
        const previous = active.game;
        const next = change.game.game;
        const current = previous.steps.at(-1)?.amountAfterSuccess ?? previous.riskBase;
        const expectedAmount = calculateGameLadderSuccessAmount(current, command.choice);
        if (next.bet !== previous.bet || next.riskBase !== previous.riskBase
            || next.steps.length !== previous.steps.length + 1
            || !sameJson(next.steps.slice(0, -1), previous.steps)
            || !sameJson(next.steps.at(-1), {
                floor: previous.steps.length + 1,
                choice: command.choice,
                amountAfterSuccess: expectedAmount,
            })) {
            invalid('event.ladder-transition');
        }
        return;
    }
    invalid('event.game-transition');
}

function applyValidatedEvent(
    state: GameState,
    event: GameEvent,
    gameIds: Set<string>,
    activityIds: Set<string>,
    activitySourceIds: Set<string>,
): void {
    const command = event.command;
    const changes = event.result.changes;
    const activities = event.result.activities;
    if (changes.length !== 1) {invalid('event.changes');}
    const change = changes[0] as GameChange;
    let gameEnded = false;
    if (command.kind === 'dice-start' || command.kind === 'push-start' || command.kind === 'ladder-start') {
        if (change.kind !== 'game-started' || state.activeGame) {invalid('event.game-started');}
        const active = change.game;
        const expectedKind = command.kind.slice(0, command.kind.indexOf('-'));
        if (active.kind !== expectedKind || gameId(active) !== command.gameId
            || ('bet' in command && activeBet(active) !== command.bet)
            || (command.kind === 'push-start' && active.game.bet !== GAME_PUSH_BET)
            || (active.kind === 'dice' && active.game.bids.length !== 0)
            || (active.kind === 'push' && active.game.drawIndex !== 0)
            || (active.kind === 'ladder' && (active.game.steps.length !== 0
                || active.game.riskBase !== calculateGameLadderRiskBase(active.game.bet)))) {
            invalid('event.game-started');
        }
        if (gameIds.has(gameId(active))) {invalid('event.game-id');}
        gameIds.add(gameId(active));
        state.activeGame = structuredClone(active);
    } else {
        const active = state.activeGame;
        if (!active || gameId(active) !== command.gameId || command.kind.split('-')[0] !== active.kind) {
            invalid('event.game-action');
        }
        assertGameTransition(active, command, change);
        if (change.kind === 'game-ended') {
            if (activities.length !== 1) {invalid('event.activities');}
            assertGameActivity(active, command, activities[0] as GameActivity);
            delete state.activeGame;
            gameEnded = true;
        } else if (change.kind === 'game-advanced') {
            state.activeGame = structuredClone(change.game);
        }
    }

    if (activities.length !== Number(gameEnded)) {invalid('event.activities');}
    for (const activity of activities) {
        if (activityIds.has(activity.id) || activitySourceIds.has(activity.sourceId)) {
            invalid('event.activity-id');
        }
        if (!gameIds.has(activity.sourceId)) {invalid('event.activity-source');}
        activityIds.add(activity.id);
        activitySourceIds.add(activity.sourceId);
    }
}

export function validateGameState(value: unknown): asserts value is GameState {
    const source = isRecord(value) ? value : {};
    const state = exactRecord(value, source.activeGame === undefined ? [] : ['activeGame'], 'state');
    if (state.activeGame !== undefined) {validateActiveGame(state.activeGame, 'state.activeGame');}
}

/** Accepts only schema v1's exact serialized shape and validates every replay transition. */
export function validateGameDomain(value: unknown): asserts value is GameDomainV1 {
    if (!isRecord(value)) {invalid('domain.shape');}
    if (value.schemaVersion !== GAME_SCHEMA_VERSION) {throwGameError('game_unsupported_version');}
    const domain = exactRecord(value, ['schemaVersion', 'events'], 'domain');
    if (!Array.isArray(domain.events)) {invalid('domain.events');}

    const eventIds = new Set<string>();
    const actionIds = new Set<string>();
    const gameIds = new Set<string>();
    const activityIds = new Set<string>();
    const activitySourceIds = new Set<string>();
    const state: GameState = {};
    for (let index = 0; index < domain.events.length; index += 1) {
        const event = validateEvent(domain.events[index], index + 1);
        if (eventIds.has(event.eventId) || actionIds.has(event.actionId)) {invalid('event.id-duplicate');}
        eventIds.add(event.eventId);
        actionIds.add(event.actionId);
        applyValidatedEvent(state, event, gameIds, activityIds, activitySourceIds);
    }
}
