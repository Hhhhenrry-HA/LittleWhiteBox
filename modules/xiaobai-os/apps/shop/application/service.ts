import type {
    ConfirmResult,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../../host/chat-data-store.js';
import type { StoryActionRunner, StoryBoundActionContext } from '../../../host/story-action-runner.js';
import type { StoryFingerprint } from '../../../host/story-fingerprint.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import { postAction } from '../../../domains/economy/ledger.js';
import type { EconomyLedgerV1 } from '../../../domains/economy/types.js';
import { getShopItem } from '../../../domains/shop/catalog.js';
import {
    activateShopItem,
    createEmptyShopState,
    deactivateShopItem,
    projectShopState,
    purchaseShopItem,
} from '../../../domains/shop/timeline.js';
import type {
    ShopCasToken,
    ShopDomainV1,
    ShopStateProjection,
} from '../../../domains/shop/types.js';
import {
    emptyShopRoot,
    readEconomyLedger,
    readPlayerBalance,
    readShopDomain,
    reconcileShopRootWithStory,
    validateShopEconomyConsistency,
} from './root-protocol.js';

export interface ShopServiceView {
    domain: ShopDomainV1 | null;
    projection: ShopStateProjection;
    balance: number;
    writeState: XiaobaiOsWriteState;
}

export interface ShopServiceCommand extends ShopCasToken {
    actionId: string;
}

export interface ShopPurchaseCommand extends ShopServiceCommand {
    itemId: string;
}

export interface ShopActivateCommand extends ShopServiceCommand {
    itemId: string;
    parameters?: Record<string, unknown>;
}

export interface ShopDeactivateCommand extends ShopServiceCommand {
    itemId: string;
    activationId: string;
}

export interface ShopService {
    readCurrent: () => ShopServiceView;
    purchaseCurrent: (input: ShopPurchaseCommand) => Promise<ShopServiceView>;
    activateCurrent: (input: ShopActivateCommand) => Promise<ShopServiceView>;
    deactivateCurrent: (input: ShopDeactivateCommand) => Promise<ShopServiceView>;
    confirmPending: () => Promise<ConfirmResult>;
    getWriteState: () => XiaobaiOsWriteState;
}

interface ShopServiceDependencies {
    now?: () => number;
    createEventId?: () => string;
    createTransactionId?: () => string;
    createActivationId?: () => string;
    isMainGenerationActive?: () => boolean;
}

function assistantTurn(fingerprint: StoryFingerprint): number {
    return fingerprint.messages.reduce((count, message) => count + Number(message.role === 'assistant'), 0);
}

export function createShopService(
    store: XiaobaiOsChatDataStore,
    runner: StoryActionRunner,
    {
        now = Date.now,
        createEventId,
        createTransactionId,
        createActivationId = () => `shop-activation-${globalThis.crypto.randomUUID()}`,
        isMainGenerationActive = () => false,
    }: ShopServiceDependencies = {},
): ShopService {
    const shopDependencies = { now, ...(createEventId ? { createEventId } : {}) };
    const economyDependencies = { now, ...(createTransactionId ? { createId: createTransactionId } : {}) };

    function buildView(root: XiaobaiOsChatData | null): ShopServiceView {
        const domain = readShopDomain(root);
        return {
            domain,
            projection: projectShopState(domain || createEmptyShopState()),
            balance: readPlayerBalance(root),
            writeState: store.getWriteState(),
        };
    }

    function readCurrent(): ShopServiceView {
        const root = store.readCurrent();
        if (root) {validateShopEconomyConsistency(root);}
        return buildView(root);
    }

    function prepareRoot(
        current: XiaobaiOsChatData | null,
        storyContext: StoryBoundActionContext,
    ): { root: XiaobaiOsChatData; ledger: EconomyLedgerV1; shop: ShopDomainV1; assistantTurn: number } {
        const base = current ? reconcileShopRootWithStory(current, storyContext.fingerprint) : emptyShopRoot();
        const ledger = readEconomyLedger(base);
        if (!ledger) {throw new Error('economy_not_opened');}
        return {
            root: base,
            ledger,
            shop: readShopDomain(base) || createEmptyShopState(),
            assistantTurn: assistantTurn(storyContext.fingerprint),
        };
    }

    function assertGenerationIdle(): void {
        if (isMainGenerationActive()) {throw new Error('shop_main_generation_active');}
    }

    async function purchaseCurrent(input: ShopPurchaseCommand): Promise<ShopServiceView> {
        return runner.run((current, _rootContext, storyContext) => {
            const prepared = prepareRoot(current, storyContext);
            const existing = prepared.shop.events.find((event) => event.actionId === input.actionId);
            const anchor = existing?.anchor || storyContext.anchor;
            const shopResult = purchaseShopItem(prepared.shop, {
                ...input,
                anchor,
                assistantTurn: existing?.assistantTurn ?? prepared.assistantTurn,
            }, shopDependencies);
            const item = getShopItem(input.itemId);
            const economyResult = postAction(prepared.ledger, [{
                idempotencyKey: `shop:purchase:${input.actionId}`,
                actionId: input.actionId,
                fromAccountId: 'player',
                toAccountId: 'system:sink',
                amount: item.price,
                kind: 'shop_purchase',
                title: `购买${item.name}`,
                sourceDomain: 'shop',
                sourceId: item.id,
                anchor,
            }], economyDependencies);
            prepared.root.domains.economy = economyResult.ledger;
            prepared.root.domains.shop = shopResult.domain;
            validateShopEconomyConsistency(prepared.root);
            return { next: prepared.root, result: buildView(prepared.root) };
        });
    }

    async function activateCurrent(input: ShopActivateCommand): Promise<ShopServiceView> {
        assertGenerationIdle();
        return runner.run((current, _rootContext, storyContext) => {
            assertGenerationIdle();
            const prepared = prepareRoot(current, storyContext);
            const existing = prepared.shop.events.find((event) => event.actionId === input.actionId);
            const activationId = existing?.action.kind === 'activate'
                ? existing.action.activationId
                : String(createActivationId() || '').trim();
            const result = activateShopItem(prepared.shop, {
                ...input,
                activationId,
                anchor: existing?.anchor || storyContext.anchor,
                assistantTurn: existing?.assistantTurn ?? prepared.assistantTurn,
            }, shopDependencies);
            prepared.root.domains.shop = result.domain;
            validateShopEconomyConsistency(prepared.root);
            return { next: prepared.root, result: buildView(prepared.root) };
        }, { beforeCommit: assertGenerationIdle });
    }

    async function deactivateCurrent(input: ShopDeactivateCommand): Promise<ShopServiceView> {
        assertGenerationIdle();
        return runner.run((current, _rootContext, storyContext) => {
            assertGenerationIdle();
            const prepared = prepareRoot(current, storyContext);
            const existing = prepared.shop.events.find((event) => event.actionId === input.actionId);
            const result = deactivateShopItem(prepared.shop, {
                ...input,
                anchor: existing?.anchor || storyContext.anchor,
                assistantTurn: existing?.assistantTurn ?? prepared.assistantTurn,
            }, shopDependencies);
            prepared.root.domains.shop = result.domain;
            validateShopEconomyConsistency(prepared.root);
            return { next: prepared.root, result: buildView(prepared.root) };
        }, { beforeCommit: assertGenerationIdle });
    }

    return Object.freeze({
        readCurrent,
        purchaseCurrent,
        activateCurrent,
        deactivateCurrent,
        confirmPending: store.confirmPending,
        getWriteState: store.getWriteState,
    });
}
