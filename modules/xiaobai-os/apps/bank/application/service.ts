import type {
    ConfirmResult,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../../host/chat-data-store.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import { postAction, projectBalances } from '../../../domains/economy/ledger.js';
import type { EconomyLedgerV2 } from '../../../domains/economy/types.js';
import { bankRandomSource } from '../../../domains/bank/random.js';
import { appendBankEvent, createEmptyBankDomain, replayBankEvents } from '../../../domains/bank/timeline.js';
import {
    throwBankError,
    type BankAction,
    type BankCasToken,
    type BankClientView,
    type BankDepositProductId,
    type BankDomainV1,
    type BankEventResult,
    type BankFundProductId,
    type BankRandomSource,
    type BankState,
} from '../../../domains/bank/types.js';
import { createBankView, type CreateBankViewInput } from '../../../domains/bank/view.js';
import {
    assertActionId,
    assertCas,
    replayMatches,
    type BankCommandInput,
} from './action-policy.js';
import { createBankCommands } from './commands.js';
import {
    buildBankTransactions,
    emptyBankRoot,
    readBankDomain,
    readEconomyLedger,
    validateBankEconomyConsistency,
} from './root-protocol.js';

export interface BankServiceView extends BankClientView {
    balance: number;
    writeState: XiaobaiOsWriteState;
}

export type BankReadOptions = Pick<CreateBankViewInput, 'activityOffset' | 'activityLimit'>;

export interface BankServiceCommand extends BankCasToken {
    actionId: string;
}

export interface BankOpenDepositCommand extends BankServiceCommand {
    productId: BankDepositProductId;
    amount: number;
}

export interface BankWithdrawDepositCommand extends BankServiceCommand {
    positionId: string;
}

export interface BankOpenFundCommand extends BankServiceCommand {
    productId: BankFundProductId;
    amount: number;
}

export type BankSettleDueCommand = BankServiceCommand;

export interface BankService {
    readCurrent: (options?: BankReadOptions) => BankServiceView;
    openDeposit: (input: BankOpenDepositCommand) => Promise<BankServiceView>;
    withdrawDeposit: (input: BankWithdrawDepositCommand) => Promise<BankServiceView>;
    openFund: (input: BankOpenFundCommand) => Promise<BankServiceView>;
    settleDue: (input: BankSettleDueCommand) => Promise<BankServiceView>;
    confirmPending: () => Promise<ConfirmResult>;
    getWriteState: () => XiaobaiOsWriteState;
}

interface BankServiceDependencies {
    now?: () => number;
    createEventId?: () => string;
    createPositionId?: () => string;
    createActivityId?: () => string;
    createTransactionId?: () => string;
    random?: BankRandomSource;
    getCurrentAssistantTurn?: (identityKey?: string) => number;
    isMainGenerationActive?: () => boolean;
}

export interface PreparedBankRoot {
    root: XiaobaiOsChatData;
    ledger: EconomyLedgerV2;
    domain: BankDomainV1;
    state: BankState;
    assistantTurn: number;
}

export type RunBankAction = (
    kind: BankAction['kind'],
    input: BankCommandInput,
    create: (prepared: PreparedBankRoot) => {
        eventId: string;
        command: BankAction;
        result: BankEventResult;
    },
) => Promise<BankServiceView>;

function defaultId(prefix: string): string {
    const suffix = globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `${prefix}-${suffix}`;
}

export function createBankService(
    store: XiaobaiOsChatDataStore,
    {
        now = Date.now,
        createEventId = () => defaultId('bank-event'),
        createPositionId = () => defaultId('bank-position'),
        createActivityId = () => defaultId('bank-activity'),
        createTransactionId,
        random = bankRandomSource,
        getCurrentAssistantTurn = () => 0,
        isMainGenerationActive = () => false,
    }: BankServiceDependencies = {},
): BankService {
    const economyDependencies = { now, ...(createTransactionId ? { createId: createTransactionId } : {}) };

    function buildView(
        root: XiaobaiOsChatData | null,
        currentTurn: number,
        options: BankReadOptions = {},
    ): BankServiceView {
        const ledger = readEconomyLedger(root);
        return {
            ...createBankView({ domain: readBankDomain(root), currentTurn, ...options }),
            balance: ledger ? projectBalances(ledger).player || 0 : 0,
            writeState: store.getWriteState(),
        };
    }

    function readCurrent(options: BankReadOptions = {}): BankServiceView {
        const root = store.readCurrent();
        if (root) {validateBankEconomyConsistency(root);}
        return buildView(root, getCurrentAssistantTurn(), options);
    }

    function prepareRoot(current: XiaobaiOsChatData | null, identityKey: string): PreparedBankRoot {
        const root = current ? structuredClone(current) : emptyBankRoot();
        const ledger = readEconomyLedger(root);
        if (!ledger) {throw new Error('economy_not_opened');}
        const domain = readBankDomain(root) || createEmptyBankDomain();
        return {
            root,
            ledger,
            domain,
            state: replayBankEvents(domain),
            assistantTurn: getCurrentAssistantTurn(identityKey),
        };
    }

    function commit(
        prepared: PreparedBankRoot,
        input: BankServiceCommand,
        eventId: string,
        command: BankAction,
        result: BankEventResult,
    ): BankServiceView {
        const appended = appendBankEvent(prepared.domain, {
            ...input,
            eventId,
            command,
            result,
            assistantTurn: prepared.assistantTurn,
            createdAt: now(),
        });
        const transactions = buildBankTransactions(appended.event);
        if (transactions.length === 0) {throwBankError('bank_no_due_positions');}
        const economy = postAction(prepared.ledger, transactions, economyDependencies);
        prepared.root.domains.bank = appended.domain;
        prepared.root.domains.economy = economy.ledger;
        validateBankEconomyConsistency(prepared.root);
        return buildView(prepared.root, prepared.assistantTurn);
    }

    const runAction: RunBankAction = (
        kind: BankAction['kind'],
        input: BankCommandInput,
        create: (prepared: PreparedBankRoot) => {
            eventId: string;
            command: BankAction;
            result: BankEventResult;
        },
    ): Promise<BankServiceView> => {
        let replayed = false;
        const assertGenerationIdle = () => {
            if (isMainGenerationActive()) {throw new Error('bank_main_generation_active');}
        };
        return store.mutateCurrent((current, rootContext) => {
            const prepared = prepareRoot(current, rootContext.identityKey);
            const existing = prepared.domain.events.find((event) => event.actionId === input.actionId);
            if (existing) {
                if (!replayMatches(existing, kind, input)) {throwBankError('bank_action_conflict');}
                replayed = true;
                return { next: prepared.root, result: buildView(prepared.root, prepared.assistantTurn) };
            }
            assertGenerationIdle();
            assertActionId(input.actionId);
            assertCas(prepared.domain, input);
            if (prepared.ledger.transactions.some((transaction) => transaction.actionId === input.actionId)) {
                throwBankError('bank_action_conflict');
            }
            const action = create(prepared);
            const view = commit(prepared, input, action.eventId, action.command, action.result);
            return { next: prepared.root, result: view };
        }, {
            beforeCommit() {
                if (!replayed) {assertGenerationIdle();}
            },
        });
    };

    const commands = createBankCommands({
        createActivityId,
        createEventId,
        createPositionId,
        random,
        runAction,
    });

    return Object.freeze({
        readCurrent,
        ...commands,
        confirmPending: store.confirmPending,
        getWriteState: store.getWriteState,
    });
}
