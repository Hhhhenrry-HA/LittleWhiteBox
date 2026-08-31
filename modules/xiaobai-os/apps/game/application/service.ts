import type {
    ConfirmResult,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../../host/chat-data-store.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import { postAction, projectBalances } from '../../../domains/economy/ledger.js';
import type { EconomyLedgerV1 } from '../../../domains/economy/types.js';
import { gameRandomSource } from '../../../domains/game/random.js';
import {
    appendGameEvent,
    createEmptyGameDomain,
    replayGameEvents,
} from '../../../domains/game/timeline.js';
import {
    throwGameError,
    type GameCasToken,
    type GameClientView,
    type GameDiceBidValue,
    type GameDomainV1,
    type GameLadderChoice,
    type GameRandomSource,
    type GameState,
} from '../../../domains/game/types.js';
import { createGameView, type CreateGameViewInput } from '../../../domains/game/view.js';
import {
    assertCas,
    replayExistingAction,
    requireActionId,
    requireGeneratedId,
    toPostInputs,
    type GameExplicitIntent,
    type PreparedGameAction,
} from './action-policy.js';
import { createGameCommands } from './commands.js';
import {
    emptyGameRoot,
    readEconomyLedger,
    readGameDomain,
    validateGameEconomyConsistency,
} from './root-protocol.js';

export interface GameServiceView extends GameClientView {
    balance: number;
    writeState: XiaobaiOsWriteState;
}

export interface GameServiceCommand extends GameCasToken {
    actionId: string;
}

export interface GameStartDiceCommand extends GameServiceCommand {
    bet: number;
}

export interface GameBidDiceCommand extends GameServiceCommand {
    gameId: string;
    bid: GameDiceBidValue;
}

export interface GameCommand extends GameServiceCommand {
    gameId: string;
}

export interface GameStartLadderCommand extends GameServiceCommand {
    bet: number;
}

export interface GameStepLadderCommand extends GameCommand {
    choice: GameLadderChoice;
}

export interface GameService {
    readCurrent: (input?: Pick<CreateGameViewInput, 'activityOffset' | 'activityLimit'>) => GameServiceView;
    startDice: (input: GameStartDiceCommand) => Promise<GameServiceView>;
    bidDice: (input: GameBidDiceCommand) => Promise<GameServiceView>;
    challengeDice: (input: GameCommand) => Promise<GameServiceView>;
    startPush: (input: GameServiceCommand) => Promise<GameServiceView>;
    drawPush: (input: GameCommand) => Promise<GameServiceView>;
    cashOutPush: (input: GameCommand) => Promise<GameServiceView>;
    startLadder: (input: GameStartLadderCommand) => Promise<GameServiceView>;
    stepLadder: (input: GameStepLadderCommand) => Promise<GameServiceView>;
    cashOutLadder: (input: GameCommand) => Promise<GameServiceView>;
    confirmPending: () => Promise<ConfirmResult>;
    getWriteState: () => XiaobaiOsWriteState;
}

interface GameServiceDependencies {
    now?: () => number;
    createGameId?: (kind: 'dice' | 'push' | 'ladder') => string;
    createEventId?: () => string;
    createActivityId?: () => string;
    createTransactionId?: () => string;
    random?: GameRandomSource;
    isMainGenerationActive?: () => boolean;
}

export interface PreparedRoot {
    root: XiaobaiOsChatData;
    ledger: EconomyLedgerV1;
    game: GameDomainV1;
    state: GameState;
}

export type RunGameAction = (
    input: GameServiceCommand,
    intent: GameExplicitIntent,
    createAction: (prepared: PreparedRoot, activityId: string) => PreparedGameAction,
) => Promise<GameServiceView>;

let fallbackId = 0;

function defaultId(prefix: string): string {
    const suffix = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${++fallbackId}`;
    return `${prefix}-${suffix}`;
}

export function createGameService(
    store: XiaobaiOsChatDataStore,
    {
        now = Date.now,
        createGameId = kind => defaultId(`game-${kind}`),
        createEventId = () => defaultId('game-event'),
        createActivityId = () => defaultId('game-activity'),
        createTransactionId,
        random = gameRandomSource,
        isMainGenerationActive = () => false,
    }: GameServiceDependencies = {},
): GameService {
    const economyDependencies = { now, ...(createTransactionId ? { createId: createTransactionId } : {}) };

    function buildView(
        root: XiaobaiOsChatData | null,
        paging: Pick<CreateGameViewInput, 'activityOffset' | 'activityLimit'> = {},
    ): GameServiceView {
        const ledger = readEconomyLedger(root);
        return {
            ...createGameView({ domain: readGameDomain(root), ...paging }),
            balance: ledger ? projectBalances(ledger).player || 0 : 0,
            writeState: store.getWriteState(),
        };
    }

    function readCurrent(
        input: Pick<CreateGameViewInput, 'activityOffset' | 'activityLimit'> = {},
    ): GameServiceView {
        const root = store.readCurrent();
        if (root) {validateGameEconomyConsistency(root);}
        return buildView(root, input);
    }

    function prepareRoot(current: XiaobaiOsChatData | null): PreparedRoot {
        const root = current ? structuredClone(current) : emptyGameRoot();
        const ledger = readEconomyLedger(root);
        if (!ledger) {throw new Error('economy_not_opened');}
        const game = readGameDomain(root) || createEmptyGameDomain();
        return {
            root,
            ledger,
            game,
            state: replayGameEvents(game),
        };
    }

    function unusedGameId(prepared: PreparedRoot, kind: 'dice' | 'push' | 'ladder'): string {
        const gameId = requireGeneratedId(createGameId(kind), 'game-id', true);
        if (prepared.game.events.some((event) => event.command.gameId === gameId)) {
            throwGameError('game_invalid', 'game-id-conflict');
        }
        return gameId;
    }

    const runAction: RunGameAction = async (
        input: GameServiceCommand,
        intent: GameExplicitIntent,
        createAction: (prepared: PreparedRoot, activityId: string) => PreparedGameAction,
    ): Promise<GameServiceView> => {
        let replayed = false;
        const assertGenerationIdle = () => {
            if (isMainGenerationActive()) {throw new Error('game_main_generation_active');}
        };
        return store.mutateCurrent((current) => {
            const prepared = prepareRoot(current);
            if (replayExistingAction(prepared.game, input.actionId, intent)) {
                replayed = true;
                return { next: prepared.root, result: buildView(prepared.root) };
            }
            assertGenerationIdle();
            const actionId = requireActionId(input.actionId);
            assertCas(prepared.game, input);
            if (prepared.ledger.transactions.some((transaction) => transaction.actionId === actionId)) {
                throwGameError('game_action_conflict');
            }
            const eventId = requireGeneratedId(createEventId(), 'event-id');
            if (prepared.game.events.some((event) => event.eventId === eventId)) {
                throwGameError('game_invalid_context', 'event-id-conflict');
            }
            const activityId = requireGeneratedId(createActivityId(), 'activity-id');
            if (prepared.game.events.some((event) => (
                event.result.activities.some((activity) => activity.id === activityId)
            ))) {
                throwGameError('game_invalid_context', 'activity-id-conflict');
            }
            const action = createAction(prepared, activityId);
            const appended = appendGameEvent(prepared.game, {
                ...input,
                eventId,
                actionId,
                command: action.command,
                result: action.result,
                createdAt: now(),
            });
            let ledger = prepared.ledger;
            if (action.economyLegs.length > 0) {
                ledger = postAction(ledger, toPostInputs(
                    action.economyLegs,
                    actionId,
                    action.command.gameId,
                ), economyDependencies).ledger;
            }
            prepared.root.domains.economy = ledger;
            prepared.root.domains.game = appended.domain;
            validateGameEconomyConsistency(prepared.root);
            return { next: prepared.root, result: buildView(prepared.root) };
        }, {
            beforeCommit() {
                if (!replayed) {assertGenerationIdle();}
            },
        });
    };

    const commands = createGameCommands({ random, runAction, unusedGameId });

    return Object.freeze({
        readCurrent,
        ...commands,
        confirmPending: store.confirmPending,
        getWriteState: store.getWriteState,
    });
}
