import type { EconomyRepository } from '../../../domains/economy/repository.js';
import type { EconomyTransaction, EconomyTransactionPage } from '../../../domains/economy/types.js';
import type {
    StoryReconciliationRuntime,
    StoryReconciliationState,
} from '../../../host/story-reconciliation-runtime.js';
import type {
    XiaobaiOsAppActivationContext,
    XiaobaiOsAppRuntime,
    XiaobaiOsChatIdentity,
} from '../../../types.js';
import type { XiaobaiOsHostFrameMessage } from '../../../host/frame-bridge.js';
import type {
    WalletClientState,
    WalletStatus,
    WalletTransactionDirection,
    WalletTransactionPageView,
    WalletTransactionView,
} from '../types.js';

type UnknownRecord = Record<string, unknown>;
const WALLET_PAGE_SIZE = 18;

interface WalletActivation {
    generation: number;
    chatIdentity: string;
    post: XiaobaiOsAppActivationContext['post'];
}

interface WalletControllerDependencies {
    economy: EconomyRepository;
    storyRuntime: StoryReconciliationRuntime;
    getChatIdentity: () => XiaobaiOsChatIdentity | { key?: unknown } | string | null;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity: ReturnType<WalletControllerDependencies['getChatIdentity']>): string {
    return typeof identity === 'string' ? identity : String(identity?.key || '');
}

function isUnconfirmedSave(error: unknown): boolean {
    return isRecord(error) && (error.code === 'SAVE_UNCONFIRMED' || error.uncertain === true);
}

function transactionDirection(transaction: EconomyTransaction): WalletTransactionDirection {
    if (transaction.toAccountId === 'player') {return 'income';}
    if (transaction.fromAccountId === 'player') {return 'expense';}
    return 'transfer';
}

function sourceLabel(transaction: EconomyTransaction): string {
    if (transaction.kind === 'opening_grant') {return '小白 OS';}
    return transaction.sourceDomain;
}

function projectTransaction(transaction: EconomyTransaction): WalletTransactionView {
    return {
        id: transaction.id,
        sequence: transaction.sequence,
        title: transaction.title,
        note: transaction.note,
        source: sourceLabel(transaction),
        sourceDomain: transaction.sourceDomain,
        amount: transaction.amount,
        direction: transactionDirection(transaction),
        createdAt: transaction.createdAt,
        anchorFloor: transaction.anchor.floor,
    };
}

function projectPage(page: EconomyTransactionPage): WalletTransactionPageView {
    return {
        transactions: page.transactions.map(projectTransaction),
        nextCursor: page.nextCursor,
        hasMore: page.hasMore,
    };
}

function resolveStatus(
    writeState: ReturnType<EconomyRepository['getWriteState']>,
    storyState: StoryReconciliationState,
    chatIdentity: string,
    hasLedger: boolean,
): { status: WalletStatus; message: string } {
    if (writeState === 'conflict') {
        return { status: 'conflict', message: '服务端账本与当前候选不一致。请刷新酒馆后再继续。' };
    }
    if (writeState === 'unconfirmed') {
        return { status: 'unconfirmed', message: '账本保存结果尚未确认，资金写入已经冻结。' };
    }
    if (writeState === 'saving') {
        return { status: 'saving', message: '正在确认账本保存结果…' };
    }
    if (storyState.identityKey === chatIdentity && storyState.status !== 'ready') {
        return { status: storyState.status, message: storyState.message };
    }
    if (!hasLedger) {
        return { status: 'blocked', message: '钱包尚未完成开户，请重新读取。' };
    }
    return { status: 'ready', message: '' };
}

export function createWalletController({
    economy,
    storyRuntime,
    getChatIdentity,
}: WalletControllerDependencies): XiaobaiOsAppRuntime & {
    activate: NonNullable<XiaobaiOsAppRuntime['activate']>;
    handleMessage: NonNullable<XiaobaiOsAppRuntime['handleMessage']>;
} {
    let activation: WalletActivation | null = null;
    let activationGeneration = 0;
    let unsubscribeStory: (() => void) | null = null;

    function currentChatIdentity(): string {
        return identityKey(getChatIdentity());
    }

    function assertActivation(payload: UnknownRecord = {}): WalletActivation {
        if (!activation) {throw new Error('钱包 APP 未激活');}
        const current = currentChatIdentity();
        if (!current || current !== activation.chatIdentity || String(payload.chatIdentity || '') !== current) {
            throw new Error('聊天已切换，请重新打开钱包');
        }
        return activation;
    }

    function assertSameActivation(expected: WalletActivation, payload: UnknownRecord = {}): void {
        if (assertActivation(payload) !== expected) {throw new Error('钱包页面已切换，请重试');}
    }

    function buildState(chatIdentity: string): WalletClientState {
        const ledger = economy.readCurrent();
        const page = economy.listCurrentTransactions({ limit: WALLET_PAGE_SIZE });
        const status = resolveStatus(
            economy.getWriteState(),
            storyRuntime.getState(),
            chatIdentity,
            ledger !== null,
        );
        return {
            chatIdentity,
            currency: '小白币',
            balance: economy.getPlayerBalance(),
            transactionCount: ledger?.transactions.length || 0,
            ...projectPage(page),
            ...status,
        };
    }

    function emitState(current = activation): WalletClientState {
        if (!current) {throw new Error('钱包 APP 未激活');}
        const state = buildState(current.chatIdentity);
        current.post('wallet/state', { state });
        return state;
    }

    async function prepareLedger(): Promise<void> {
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

    async function activate(context: XiaobaiOsAppActivationContext): Promise<WalletClientState> {
        cancelForeground();
        const chatIdentity = currentChatIdentity();
        if (!chatIdentity) {throw new Error('请先打开一个聊天');}
        const generation = ++activationGeneration;
        await prepareLedger();
        if (generation !== activationGeneration || currentChatIdentity() !== chatIdentity) {
            throw new Error('聊天已切换，请重新打开钱包');
        }
        activation = { generation, chatIdentity, post: context.post };
        return buildState(chatIdentity);
    }

    function cancelForeground(): void {
        activationGeneration += 1;
        activation = null;
    }

    function handleStoryState(next: StoryReconciliationState): void {
        const current = activation;
        if (!current || next.identityKey !== current.chatIdentity || currentChatIdentity() !== current.chatIdentity) {return;}
        try {
            emitState(current);
        } catch (error) {
            current.post('wallet/error', {
                message: error instanceof Error ? error.message : String(error),
            });
        }
    }

    async function handleMessage(message: XiaobaiOsHostFrameMessage): Promise<unknown> {
        const payload = isRecord(message.payload) ? message.payload : {};
        const current = assertActivation(payload);
        if (message.type === 'wallet/refresh') {
            await prepareLedger();
            assertSameActivation(current, payload);
            return emitState(current);
        }
        if (message.type === 'wallet/load-more') {
            const beforeSequence = Number(payload.beforeSequence);
            if (!Number.isSafeInteger(beforeSequence) || beforeSequence < 2) {
                throw new Error('钱包流水游标无效');
            }
            return projectPage(economy.listCurrentTransactions({ beforeSequence, limit: WALLET_PAGE_SIZE }));
        }
        if (message.type === 'wallet/confirm-save') {
            const confirmation = await economy.confirmPending();
            assertSameActivation(current, payload);
            return { confirmation: confirmation.status, state: emitState(current) };
        }
        throw new Error('未知的钱包操作');
    }

    return Object.freeze({
        activate,
        deactivate: cancelForeground,
        cancelForeground,
        cancelAll: cancelForeground,
        handleChatChanged: cancelForeground,
        handleMessage,
        startBackground() {
            if (!unsubscribeStory) {unsubscribeStory = storyRuntime.subscribe(handleStoryState);}
        },
        stopBackground() {
            unsubscribeStory?.();
            unsubscribeStory = null;
            cancelForeground();
        },
    });
}
