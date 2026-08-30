import { shuffleGameValues } from '../random.js';
import {
    throwGameError,
    type GamePrivatePushGame,
    type GamePushAction,
    type GamePushCard,
    type GamePushGameView,
    type GamePushSettlement,
    type GamePushTransition,
    type GameRandomSource,
} from '../types.js';

export const GAME_PUSH_BET = 50 as const;
export const GAME_PUSH_COIN_VALUE = 50 as const;
export const GAME_PUSH_COIN_COUNT = 7 as const;
export const GAME_PUSH_BOMB_COUNT = 3 as const;

export interface CreateGamePushGameInput {
    id: string;
}

function assertGameId(value: unknown): string {
    if (typeof value !== 'string' || !value.trim()) {throwGameError('game_id_required');}
    return value.trim();
}

export function createGamePushGame(
    input: CreateGamePushGameInput,
    random: GameRandomSource,
): GamePrivatePushGame {
    const id = assertGameId(input.id);
    const deck = shuffleGameValues<GamePushCard>([
        ...Array<GamePushCard>(GAME_PUSH_COIN_COUNT).fill('coin'),
        ...Array<GamePushCard>(GAME_PUSH_BOMB_COUNT).fill('bomb'),
    ], random);
    return {
        id,
        bet: GAME_PUSH_BET,
        deck,
        drawIndex: 0,
        revealedCoins: 0,
        cashoutAmount: 0,
    };
}

export function assertActiveGamePushGame(game: GamePrivatePushGame): void {
    if (!game || typeof game !== 'object') {throwGameError('game_invalid', 'push-game');}
    assertGameId(game.id);
    if (game.bet !== GAME_PUSH_BET || !Array.isArray(game.deck)
        || game.deck.length !== GAME_PUSH_COIN_COUNT + GAME_PUSH_BOMB_COUNT
        || game.deck.filter((card) => card === 'coin').length !== GAME_PUSH_COIN_COUNT
        || game.deck.filter((card) => card === 'bomb').length !== GAME_PUSH_BOMB_COUNT
        || game.deck.some((card) => card !== 'coin' && card !== 'bomb')
        || !Number.isSafeInteger(game.drawIndex) || game.drawIndex < 0 || game.drawIndex >= GAME_PUSH_COIN_COUNT
        || !Number.isSafeInteger(game.revealedCoins) || game.revealedCoins !== game.drawIndex
        || !Number.isSafeInteger(game.cashoutAmount)
        || game.cashoutAmount !== game.revealedCoins * GAME_PUSH_COIN_VALUE
        || game.deck.slice(0, game.drawIndex).some((card) => card !== 'coin')) {
        throwGameError('game_invalid', 'push-game');
    }
}

export function getGamePushStatistics(game: GamePrivatePushGame): Pick<
    GamePushGameView,
    'remainingCards' | 'remainingBombs' | 'nextBombProbabilityBps'
> {
    assertActiveGamePushGame(game);
    const remainingCards = game.deck.length - game.drawIndex;
    const remainingBombs = game.deck.slice(game.drawIndex).filter((card) => card === 'bomb').length;
    return {
        remainingCards,
        remainingBombs,
        nextBombProbabilityBps: Math.floor((remainingBombs * 10_000) / remainingCards),
    };
}

function createPushSettlement(
    game: GamePrivatePushGame,
    outcome: GamePushSettlement['outcome'],
    payout: number,
    revealedCoins: number,
): GamePushSettlement {
    return { gameId: game.id, outcome, payout, revealedCoins };
}

export function drawGamePushCard(game: GamePrivatePushGame): GamePushTransition {
    assertActiveGamePushGame(game);
    const card = game.deck[game.drawIndex];
    if (card === 'bomb') {
        return { kind: 'settled', settlement: createPushSettlement(game, 'busted', 0, game.revealedCoins) };
    }
    if (card !== 'coin') {throwGameError('game_invalid', 'push-card');}

    const revealedCoins = game.revealedCoins + 1;
    const cashoutAmount = revealedCoins * GAME_PUSH_COIN_VALUE;
    if (revealedCoins === GAME_PUSH_COIN_COUNT) {
        return { kind: 'settled', settlement: createPushSettlement(game, 'cleared', cashoutAmount, revealedCoins) };
    }
    return {
        kind: 'continued',
        game: {
            id: game.id,
            bet: GAME_PUSH_BET,
            deck: [...game.deck],
            drawIndex: game.drawIndex + 1,
            revealedCoins,
            cashoutAmount,
        },
    };
}

export function cashOutGamePushGame(game: GamePrivatePushGame): GamePushSettlement {
    assertActiveGamePushGame(game);
    if (game.revealedCoins < 1) {throwGameError('game_push_cashout_invalid');}
    return createPushSettlement(game, 'cashed-out', game.cashoutAmount, game.revealedCoins);
}

export function advanceGamePushGame(
    game: GamePrivatePushGame,
    action: GamePushAction,
): GamePushTransition {
    if (!action || typeof action !== 'object') {throwGameError('game_action_invalid', 'push-action');}
    if (action.kind === 'draw') {return drawGamePushCard(game);}
    if (action.kind === 'cash-out') {
        return { kind: 'settled', settlement: cashOutGamePushGame(game) };
    }
    throwGameError('game_action_invalid', 'push-action');
}

export function createGamePushGameView(game: GamePrivatePushGame): GamePushGameView {
    assertActiveGamePushGame(game);
    return {
        kind: 'push',
        id: game.id,
        bet: GAME_PUSH_BET,
        revealedCoins: game.revealedCoins,
        cashoutAmount: game.cashoutAmount,
        ...getGamePushStatistics(game),
        legalActions: game.revealedCoins > 0 ? ['draw', 'cash-out'] : ['draw'],
    };
}
