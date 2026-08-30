import type { StoryFingerprint } from '../../../host/story-fingerprint.js';
import type { XiaobaiOsChatData, XiaobaiOsStoryAnchor } from '../../../types.js';
import { validateLedger } from '../../../domains/economy/invariants.js';
import { projectBalances } from '../../../domains/economy/ledger.js';
import { reconcileLedgerWithStory } from '../../../domains/economy/timeline.js';
import type { EconomyLedgerV1 } from '../../../domains/economy/types.js';
import { GAME_PUSH_BET } from '../../../domains/game/games/push-your-luck.js';
import { validateGameDomain } from '../../../domains/game/invariants.js';
import { reconcileGameWithStory, replayGameEvents } from '../../../domains/game/timeline.js';
import type {
    GameDomainV1,
    GameEvent,
    GameRestoreImpact,
} from '../../../domains/game/types.js';

export interface GameEconomyLeg {
    idempotencyKey: string;
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    kind: string;
    title: string;
}
const GAME_ESCROW_PREFIX = 'escrow:game:';
const GAME_RESERVE_ACCOUNT = 'counterparty:game:reserve';
const GAME_SOURCE_DOMAIN = 'game';
export function emptyGameRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

export function readEconomyLedger(root: XiaobaiOsChatData | null): EconomyLedgerV1 | null {
    const value = root?.domains.economy;
    if (value === undefined) {return null;}
    validateLedger(value);
    return structuredClone(value);
}

export function readGameDomain(root: XiaobaiOsChatData | null): GameDomainV1 | null {
    const value = root?.domains.game;
    if (value === undefined) {return null;}
    validateGameDomain(value);
    return structuredClone(value);
}

export function countAssistantTurns(fingerprint: StoryFingerprint): number {
    return fingerprint.messages.reduce((count, message) => count + Number(message.role === 'assistant'), 0);
}

function sameAnchor(left: XiaobaiOsStoryAnchor, right: XiaobaiOsStoryAnchor): boolean {
    return left.floor === right.floor && left.prefixHash === right.prefixHash;
}

function escrowAccount(gameId: string): string {
    return `${GAME_ESCROW_PREFIX}${gameId}`;
}

export function startGameStakeLeg(gameId: string, amount: number): GameEconomyLeg {
    return {
        idempotencyKey: `game:${gameId}:stake`,
        fromAccountId: 'player',
        toAccountId: escrowAccount(gameId),
        amount,
        kind: 'game_stake',
        title: 'Game stake escrow',
    };
}

export function gameSettlementLegs(gameId: string, amountIn: number, payout: number): GameEconomyLeg[] {
    const escrow = escrowAccount(gameId);
    const legs: GameEconomyLeg[] = [];
    if (payout > amountIn) {
        legs.push({
            idempotencyKey: `game:${gameId}:reserve`,
            fromAccountId: GAME_RESERVE_ACCOUNT,
            toAccountId: escrow,
            amount: payout - amountIn,
            kind: 'game_reserve',
            title: 'Game reserve funding',
        });
    }
    if (payout > 0) {
        legs.push({
            idempotencyKey: `game:${gameId}:payout`,
            fromAccountId: escrow,
            toAccountId: 'player',
            amount: payout,
            kind: 'game_payout',
            title: 'Game payout',
        });
    }
    if (payout < amountIn) {
        legs.push({
            idempotencyKey: `game:${gameId}:loss`,
            fromAccountId: escrow,
            toAccountId: 'system:sink',
            amount: amountIn - payout,
            kind: 'game_loss',
            title: 'Game loss settlement',
        });
    }
    return legs;
}

function expectedEconomyLegs(event: GameEvent): GameEconomyLeg[] {
    if (event.command.kind === 'dice-start' || event.command.kind === 'ladder-start') {
        return [startGameStakeLeg(event.command.gameId, event.command.bet)];
    }
    if (event.command.kind === 'push-start') {return [startGameStakeLeg(event.command.gameId, GAME_PUSH_BET)];}
    const activity = event.result.activities[0];
    return activity ? gameSettlementLegs(event.command.gameId, activity.amountIn, activity.payout) : [];
}

function isGameEconomyTransaction(
    transaction: EconomyLedgerV1['transactions'][number],
    gameActionIds: ReadonlySet<string>,
): boolean {
    return transaction.sourceDomain === GAME_SOURCE_DOMAIN
        || transaction.kind.startsWith('game_')
        || transaction.fromAccountId.startsWith(GAME_ESCROW_PREFIX)
        || transaction.toAccountId.startsWith(GAME_ESCROW_PREFIX)
        || transaction.fromAccountId === GAME_RESERVE_ACCOUNT
        || transaction.toAccountId === GAME_RESERVE_ACCOUNT
        || gameActionIds.has(transaction.actionId);
}

function sameEconomyLeg(
    transaction: EconomyLedgerV1['transactions'][number],
    event: GameEvent,
    expected: GameEconomyLeg,
): boolean {
    return transaction.idempotencyKey === expected.idempotencyKey
        && transaction.actionId === event.actionId
        && transaction.fromAccountId === expected.fromAccountId
        && transaction.toAccountId === expected.toAccountId
        && transaction.amount === expected.amount
        && transaction.kind === expected.kind
        && transaction.title === expected.title
        && transaction.note === ''
        && transaction.sourceDomain === GAME_SOURCE_DOMAIN
        && transaction.sourceId === event.command.gameId
        && sameAnchor(transaction.anchor, event.anchor)
        && transaction.reversalOfTransactionId === undefined;
}

/** Validates the complete Game money protocol without treating Game as a balance source. */
export function validateGameEconomyConsistency(value: unknown, path = 'xiaobaiOs'): void {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${path} must be an object`);
    }
    const root = value as XiaobaiOsChatData;
    const game = readGameDomain(root);
    const ledger = readEconomyLedger(root);
    const events = game?.events ?? [];
    const actionIds = new Set(events.map((event) => event.actionId));
    const actual = ledger?.transactions.filter((transaction) => (
        isGameEconomyTransaction(transaction, actionIds)
    )) ?? [];
    const expected = events.flatMap((event) => expectedEconomyLegs(event).map((leg) => ({ event, leg })));
    if (actual.length !== expected.length) {
        throw new Error(`${path} Game events and Economy transactions are inconsistent`);
    }
    for (let index = 0; index < expected.length; index += 1) {
        const pair = expected[index];
        const transaction = actual[index];
        if (!pair || !transaction || !sameEconomyLeg(transaction, pair.event, pair.leg)) {
            throw new Error(`${path} Game action is inconsistent: ${pair?.event.actionId ?? 'unknown'}`);
        }
    }

    const balances = ledger ? projectBalances(ledger) : {};
    const state = game ? replayGameEvents(game) : {};
    const gameIds = new Set(events.map((event) => event.command.gameId));
    for (const gameId of gameIds) {
        const expectedEscrow = state.activeGame?.game.id === gameId ? state.activeGame.game.bet : 0;
        if ((balances[escrowAccount(gameId)] || 0) !== expectedEscrow) {
            throw new Error(`${path} Game escrow is inconsistent: ${gameId}`);
        }
    }
}

function unchangedGameImpact(): GameRestoreImpact {
    return {
        changed: false,
        firstInvalidRevision: null,
        removedEventIds: [],
        removedActionIds: [],
        removedActivityIds: [],
        affectedGameIds: [],
        previousLockedAmount: 0,
        nextLockedAmount: 0,
        lockedAmountChange: 0,
    };
}

export function reconcileGameDomainInRoot(
    value: XiaobaiOsChatData,
    fingerprint: StoryFingerprint,
): { root: XiaobaiOsChatData; impact: GameRestoreImpact } {
    const root = structuredClone(value);
    const game = readGameDomain(root);
    if (!game) {return { root, impact: unchangedGameImpact() };}
    const reconciled = reconcileGameWithStory(game, fingerprint);
    if (reconciled.impact.changed) {
        if (reconciled.domain.events.length === 0) {
            delete root.domains.game;
        } else {
            root.domains.game = reconciled.domain;
        }
    }
    return { root, impact: reconciled.impact };
}

export function reconcileGameRootWithStory(
    value: XiaobaiOsChatData,
    fingerprint: StoryFingerprint,
): XiaobaiOsChatData {
    let root = structuredClone(value);
    const ledger = readEconomyLedger(root);
    if (ledger) {root.domains.economy = reconcileLedgerWithStory(ledger, fingerprint).ledger;}
    root = reconcileGameDomainInRoot(root, fingerprint).root;
    validateGameEconomyConsistency(root);
    return root;
}
