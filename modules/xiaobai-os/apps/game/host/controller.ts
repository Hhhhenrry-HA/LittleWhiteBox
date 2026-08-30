import type { EconomyRepository } from '../../../domains/economy/repository.js';
import type {
    GameBidDiceCommand,
    GameCommand,
    GameService,
    GameServiceCommand,
    GameStartDiceCommand,
    GameStartLadderCommand,
    GameStepLadderCommand,
} from '../application/service.js';
import type { GameDiceBidFace, GameLadderChoice } from '../../../domains/game/types.js';
import type { XiaobaiOsHostFrameMessage } from '../../../host/frame-bridge.js';
import type {
    StoryReconciliationRuntime,
    StoryReconciliationState,
} from '../../../host/story-reconciliation-runtime.js';
import type {
    XiaobaiOsAppActivationContext,
    XiaobaiOsAppRuntime,
    XiaobaiOsChatIdentity,
} from '../../../types.js';
import type { GameClientState } from '../types.js';
import { presentGameRecords, presentGameState } from './presentation.js';

type UnknownRecord = Record<string, unknown>;
const RECORD_PAGE_SIZE = 50;

interface GameActivation {
    generation: number;
    chatIdentity: string;
    post: XiaobaiOsAppActivationContext['post'];
}

interface GameControllerDependencies {
    game: GameService;
    economy: EconomyRepository;
    storyRuntime: StoryReconciliationRuntime;
    getChatIdentity: () => XiaobaiOsChatIdentity | { key?: unknown } | string | null;
    isMainGenerationActive: () => boolean;
    subscribeGeneration: (listener: () => void) => () => void;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity: ReturnType<GameControllerDependencies['getChatIdentity']>): string {
    return typeof identity === 'string' ? identity : String(identity?.key || '');
}

function isUnconfirmedSave(error: unknown): boolean {
    return isRecord(error) && (error.code === 'SAVE_UNCONFIRMED' || error.uncertain === true);
}

function requireString(value: unknown, name: string): string {
    if (typeof value !== 'string' || !value || value !== value.trim()
        || Array.from(value).length > 200 || /[\u0000-\u001f\u007f-\u009f]/u.test(value)) {
        throw new Error(`${name}无效`);
    }
    return value;
}

function requireInteger(value: unknown, name: string, minimum = 0): number {
    if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < minimum) {
        throw new Error(`${name}无效`);
    }
    return value;
}

function requireCas(payload: UnknownRecord): { expectedRevision: number; expectedEventId: string } {
    const expectedRevision = requireInteger(payload.expectedRevision, '游戏状态版本');
    if (typeof payload.expectedEventId !== 'string') {throw new Error('游戏状态版本无效');}
    const expectedEventId = payload.expectedEventId;
    if ((expectedRevision === 0) !== (expectedEventId === '')) {throw new Error('游戏状态版本无效');}
    if (expectedEventId) {requireString(expectedEventId, '游戏事件标识');}
    return { expectedRevision, expectedEventId };
}

function requireDiceBid(value: unknown): GameBidDiceCommand['bid'] {
    if (!isRecord(value)) {throw new Error('骰局叫数无效');}
    const count = requireInteger(value.count, '骰子数量', 1);
    const face = requireInteger(value.face, '骰子点数', 2);
    if (count > 10 || face > 6) {throw new Error('骰局叫数无效');}
    return { count, face: face as GameDiceBidFace };
}

function requireLadderChoice(value: unknown): GameLadderChoice {
    if (value !== 'safe' && value !== 'medium' && value !== 'risky') {throw new Error('阶梯选择无效');}
    return value;
}

export function createGameController({
    game,
    economy,
    storyRuntime,
    getChatIdentity,
    isMainGenerationActive,
    subscribeGeneration,
}: GameControllerDependencies): XiaobaiOsAppRuntime & {
    activate: NonNullable<XiaobaiOsAppRuntime['activate']>;
    handleMessage: NonNullable<XiaobaiOsAppRuntime['handleMessage']>;
} {
    let activation: GameActivation | null = null;
    let activationGeneration = 0;
    let busy = false;
    let unsubscribeStory: (() => void) | null = null;
    let unsubscribeGeneration: (() => void) | null = null;

    function currentChatIdentity(): string {
        return identityKey(getChatIdentity());
    }

    function assertActivation(payload: UnknownRecord = {}): GameActivation {
        if (!activation) {throw new Error('游戏 APP 未激活');}
        const current = currentChatIdentity();
        if (!current || current !== activation.chatIdentity
            || typeof payload.chatIdentity !== 'string' || payload.chatIdentity !== current) {
            throw new Error('聊天已切换，请重新打开游戏');
        }
        return activation;
    }

    function assertSameActivation(expected: GameActivation, payload: UnknownRecord): void {
        if (assertActivation(payload) !== expected) {throw new Error('游戏页面已切换，请重试');}
    }

    function buildState(chatIdentity: string): GameClientState {
        return presentGameState({
            chatIdentity,
            serviceView: game.readCurrent({ activityOffset: 0, activityLimit: RECORD_PAGE_SIZE }),
            storyState: storyRuntime.getState(),
            economyReady: economy.hasCurrent(),
            generationActive: isMainGenerationActive(),
        });
    }

    function emitState(current = activation): GameClientState {
        if (!current) {throw new Error('游戏 APP 未激活');}
        const state = buildState(current.chatIdentity);
        current.post('game/state', { state });
        return state;
    }

    async function prepare(): Promise<void> {
        if (economy.hasCurrent()) {
            await storyRuntime.reconcileNow();
            return;
        }
        try {
            await economy.ensureCurrent();
        } catch (error) {
            if (!isUnconfirmedSave(error)) {throw error;}
        }
    }

    async function activate(context: XiaobaiOsAppActivationContext): Promise<GameClientState> {
        cancelForeground();
        const chatIdentity = currentChatIdentity();
        if (!chatIdentity) {throw new Error('请先打开一个聊天');}
        const generation = ++activationGeneration;
        await prepare();
        if (generation !== activationGeneration || currentChatIdentity() !== chatIdentity) {
            throw new Error('聊天已切换，请重新打开游戏');
        }
        activation = { generation, chatIdentity, post: context.post };
        return buildState(chatIdentity);
    }

    function cancelForeground(): void {
        activationGeneration += 1;
        activation = null;
        busy = false;
    }

    async function runExclusive<T>(
        current: GameActivation,
        payload: UnknownRecord,
        task: () => Promise<T>,
    ): Promise<{ value: T; state: GameClientState }> {
        if (busy) {throw new Error('已有游戏操作正在处理');}
        busy = true;
        try {
            const value = await task();
            assertSameActivation(current, payload);
            return { value, state: emitState(current) };
        } catch (error) {
            if (activation === current && currentChatIdentity() === current.chatIdentity && isUnconfirmedSave(error)) {
                emitState(current);
            }
            throw error;
        } finally {
            if (activation === current) {busy = false;}
        }
    }

    function serviceCommand(payload: UnknownRecord): GameServiceCommand {
        return {
            ...requireCas(payload),
            actionId: requireString(payload.actionId, '操作标识'),
        };
    }

    function gameCommand(payload: UnknownRecord): GameCommand {
        return {
            ...serviceCommand(payload),
            gameId: requireString(payload.gameId, '赌局'),
        };
    }

    async function handleMessage(message: XiaobaiOsHostFrameMessage): Promise<unknown> {
        const payload = isRecord(message.payload) ? message.payload : {};
        const current = assertActivation(payload);
        if (message.type === 'game/refresh') {
            const result = await runExclusive(current, payload, prepare);
            return result.state;
        }
        if (message.type === 'game/confirm-save') {
            const result = await runExclusive(current, payload, game.confirmPending);
            return { confirmation: result.value.status, state: result.state };
        }
        if (message.type === 'game/records/load-more') {
            if (busy) {throw new Error('已有游戏操作正在处理');}
            const offset = requireInteger(payload.offset, '记录页码', 1);
            return presentGameRecords(game.readCurrent({ activityOffset: offset, activityLimit: RECORD_PAGE_SIZE }));
        }
        if (message.type === 'game/dice/start') {
            const input: GameStartDiceCommand = {
                ...serviceCommand(payload),
                bet: requireInteger(payload.bet, '下注', 1),
            };
            return (await runExclusive(current, payload, () => game.startDice(input))).state;
        }
        if (message.type === 'game/dice/bid') {
            const input: GameBidDiceCommand = {
                ...gameCommand(payload),
                bid: requireDiceBid(payload.bid),
            };
            return (await runExclusive(current, payload, () => game.bidDice(input))).state;
        }
        if (message.type === 'game/dice/challenge') {
            const input = gameCommand(payload);
            return (await runExclusive(current, payload, () => game.challengeDice(input))).state;
        }
        if (message.type === 'game/push/start') {
            const input = serviceCommand(payload);
            return (await runExclusive(current, payload, () => game.startPush(input))).state;
        }
        if (message.type === 'game/push/draw') {
            const input = gameCommand(payload);
            return (await runExclusive(current, payload, () => game.drawPush(input))).state;
        }
        if (message.type === 'game/push/cash-out') {
            const input = gameCommand(payload);
            return (await runExclusive(current, payload, () => game.cashOutPush(input))).state;
        }
        if (message.type === 'game/ladder/start') {
            const input: GameStartLadderCommand = {
                ...serviceCommand(payload),
                bet: requireInteger(payload.bet, '下注', 1),
            };
            return (await runExclusive(current, payload, () => game.startLadder(input))).state;
        }
        if (message.type === 'game/ladder/step') {
            const input: GameStepLadderCommand = {
                ...gameCommand(payload),
                choice: requireLadderChoice(payload.choice),
            };
            return (await runExclusive(current, payload, () => game.stepLadder(input))).state;
        }
        if (message.type === 'game/ladder/cash-out') {
            const input = gameCommand(payload);
            return (await runExclusive(current, payload, () => game.cashOutLadder(input))).state;
        }
        throw new Error('未知的游戏操作');
    }

    function handleExternalState(next?: StoryReconciliationState): void {
        const current = activation;
        if (!current || currentChatIdentity() !== current.chatIdentity) {return;}
        if (next && next.identityKey !== current.chatIdentity) {return;}
        try {
            emitState(current);
        } catch {
            current.post('game/error', { message: '游戏状态暂时无法读取，请重新打开。' });
        }
    }

    return Object.freeze({
        activate,
        deactivate: cancelForeground,
        cancelForeground,
        cancelAll: cancelForeground,
        handleChatChanged: cancelForeground,
        handleMessage,
        startBackground() {
            if (!unsubscribeStory) {unsubscribeStory = storyRuntime.subscribe(handleExternalState);}
            if (!unsubscribeGeneration) {unsubscribeGeneration = subscribeGeneration(() => handleExternalState());}
        },
        stopBackground() {
            unsubscribeStory?.();
            unsubscribeStory = null;
            unsubscribeGeneration?.();
            unsubscribeGeneration = null;
            cancelForeground();
        },
    });
}
