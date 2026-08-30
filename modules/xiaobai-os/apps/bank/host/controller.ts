import type {
    BankOpenDepositCommand,
    BankOpenFundCommand,
    BankService,
    BankServiceView,
    BankSettleDueCommand,
    BankWithdrawDepositCommand,
} from '../application/service.js';
import type { EconomyRepository } from '../../../domains/economy/repository.js';
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
import type { BankActivityPageView, BankClientState } from '../types.js';
import { presentBankActivityPage, presentBankState } from './presentation.js';

type UnknownRecord = Record<string, unknown>;
const BANK_ACTIVITY_PAGE_SIZE = 50;

interface BankActivation {
    generation: number;
    chatIdentity: string;
    post: XiaobaiOsAppActivationContext['post'];
}

interface BankControllerDependencies {
    bank: BankService;
    economy: EconomyRepository;
    storyRuntime: StoryReconciliationRuntime;
    getChatIdentity: () => XiaobaiOsChatIdentity | { key?: unknown } | string | null;
    isMainGenerationActive: () => boolean;
    subscribeGeneration: (listener: () => void) => () => void;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity: ReturnType<BankControllerDependencies['getChatIdentity']>): string {
    return typeof identity === 'string' ? identity : String(identity?.key || '');
}

function isUnconfirmedSave(error: unknown): boolean {
    return isRecord(error) && (error.code === 'SAVE_UNCONFIRMED' || error.uncertain === true);
}

function requireString(value: unknown, name: string): string {
    const result = typeof value === 'string' ? value.trim() : '';
    if (!result || Array.from(result).length > 200) {throw new Error(`${name}无效`);}
    return result;
}

function requireAmount(value: unknown): number {
    if (typeof value !== 'number' || !Number.isSafeInteger(value) || value <= 0) {
        throw new Error('开户金额无效');
    }
    return value;
}

function requireCas(payload: UnknownRecord): { expectedRevision: number; expectedEventId: string } {
    const expectedRevision = payload.expectedRevision;
    const expectedEventId = payload.expectedEventId;
    if (typeof expectedRevision !== 'number' || !Number.isSafeInteger(expectedRevision) || expectedRevision < 0
        || typeof expectedEventId !== 'string' || expectedEventId !== expectedEventId.trim()
        || Array.from(expectedEventId).length > 200
        || (expectedRevision === 0) !== (expectedEventId === '')) {
        throw new Error('银行状态版本无效');
    }
    return { expectedRevision, expectedEventId };
}

export function createBankController({
    bank,
    economy,
    storyRuntime,
    getChatIdentity,
    isMainGenerationActive,
    subscribeGeneration,
}: BankControllerDependencies): XiaobaiOsAppRuntime & {
    activate: NonNullable<XiaobaiOsAppRuntime['activate']>;
    handleMessage: NonNullable<XiaobaiOsAppRuntime['handleMessage']>;
} {
    let activation: BankActivation | null = null;
    let activationGeneration = 0;
    let busy = false;
    let unsubscribeStory: (() => void) | null = null;
    let unsubscribeGeneration: (() => void) | null = null;

    function currentChatIdentity(): string {
        return identityKey(getChatIdentity());
    }

    function assertActivation(payload: UnknownRecord = {}): BankActivation {
        if (!activation) {throw new Error('银行 APP 未激活');}
        const current = currentChatIdentity();
        if (!current || current !== activation.chatIdentity || String(payload.chatIdentity || '') !== current) {
            throw new Error('聊天已切换，请重新打开银行');
        }
        return activation;
    }

    function assertSameActivation(expected: BankActivation, payload: UnknownRecord = {}): void {
        if (assertActivation(payload) !== expected) {throw new Error('银行页面已切换，请重试');}
    }

    function present(chatIdentity: string, serviceView: BankServiceView): BankClientState {
        return presentBankState({
            chatIdentity,
            serviceView,
            storyState: storyRuntime.getState(),
            generationActive: isMainGenerationActive(),
        });
    }

    function buildState(chatIdentity: string): BankClientState {
        return present(chatIdentity, bank.readCurrent({ activityOffset: 0, activityLimit: BANK_ACTIVITY_PAGE_SIZE }));
    }

    function postState(current: BankActivation, state: BankClientState): BankClientState {
        current.post('bank/state', { state });
        return state;
    }

    function emitState(current = activation): BankClientState {
        if (!current) {throw new Error('银行 APP 未激活');}
        return postState(current, buildState(current.chatIdentity));
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

    async function activate(context: XiaobaiOsAppActivationContext): Promise<BankClientState> {
        cancelForeground();
        const chatIdentity = currentChatIdentity();
        if (!chatIdentity) {throw new Error('请先打开一个聊天');}
        const generation = ++activationGeneration;
        await prepare();
        if (generation !== activationGeneration || currentChatIdentity() !== chatIdentity) {
            throw new Error('聊天已切换，请重新打开银行');
        }
        activation = { generation, chatIdentity, post: context.post };
        return buildState(chatIdentity);
    }

    function cancelForeground(): void {
        activationGeneration += 1;
        activation = null;
        busy = false;
    }

    async function serializeWrite<T, R>(
        current: BankActivation,
        payload: UnknownRecord,
        command: () => Promise<T>,
        completed: (result: T) => R,
    ): Promise<R> {
        if (busy) {throw new Error('已有银行操作正在处理');}
        busy = true;
        try {
            const result = await command();
            assertSameActivation(current, payload);
            return completed(result);
        } catch (error) {
            if (activation === current && currentChatIdentity() === current.chatIdentity && isUnconfirmedSave(error)) {
                emitState(current);
            }
            throw error;
        } finally {
            if (activation === current) {busy = false;}
        }
    }

    function writeState(
        current: BankActivation,
        payload: UnknownRecord,
        command: () => Promise<BankServiceView>,
    ): Promise<BankClientState> {
        return serializeWrite(current, payload, command, (serviceView) => (
            postState(current, present(current.chatIdentity, serviceView))
        ));
    }

    async function handleMessage(message: XiaobaiOsHostFrameMessage): Promise<unknown> {
        const payload = isRecord(message.payload) ? message.payload : {};
        const current = assertActivation(payload);
        if (message.type === 'bank/refresh') {
            if (busy) {throw new Error('已有银行操作正在处理');}
            await prepare();
            assertSameActivation(current, payload);
            return emitState(current);
        }
        if (message.type === 'bank/records/load-more') {
            if (busy) {throw new Error('已有银行操作正在处理');}
            const offset = payload.offset;
            if (typeof offset !== 'number' || !Number.isSafeInteger(offset) || offset < 1) {
                throw new Error('银行记录游标无效');
            }
            const page: BankActivityPageView = presentBankActivityPage(bank.readCurrent({
                activityOffset: offset,
                activityLimit: BANK_ACTIVITY_PAGE_SIZE,
            }));
            assertSameActivation(current, payload);
            return page;
        }
        if (message.type === 'bank/confirm-save') {
            return serializeWrite(current, payload, () => bank.confirmPending(), (confirmation) => ({
                confirmation: confirmation.status,
                state: emitState(current),
            }));
        }
        const base = {
            ...requireCas(payload),
            actionId: requireString(payload.actionId, '操作标识'),
        };
        if (message.type === 'bank/deposit/open') {
            const input: BankOpenDepositCommand = {
                ...base,
                productId: requireString(payload.productId, '存单产品') as BankOpenDepositCommand['productId'],
                amount: requireAmount(payload.amount),
            };
            return writeState(current, payload, () => bank.openDeposit(input));
        }
        if (message.type === 'bank/deposit/withdraw') {
            const input: BankWithdrawDepositCommand = {
                ...base,
                positionId: requireString(payload.positionId, '存单头寸'),
            };
            return writeState(current, payload, () => bank.withdrawDeposit(input));
        }
        if (message.type === 'bank/fund/open') {
            const input: BankOpenFundCommand = {
                ...base,
                productId: requireString(payload.productId, '理财产品') as BankOpenFundCommand['productId'],
                amount: requireAmount(payload.amount),
            };
            return writeState(current, payload, () => bank.openFund(input));
        }
        if (message.type === 'bank/settle-due') {
            const input: BankSettleDueCommand = base;
            return writeState(current, payload, () => bank.settleDue(input));
        }
        throw new Error('未知的银行操作');
    }

    function handleExternalState(next?: StoryReconciliationState): void {
        const current = activation;
        if (!current || currentChatIdentity() !== current.chatIdentity) {return;}
        if (next && next.identityKey !== current.chatIdentity) {return;}
        try {
            emitState(current);
        } catch (error) {
            current.post('bank/error', { message: error instanceof Error ? error.message : String(error) });
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
