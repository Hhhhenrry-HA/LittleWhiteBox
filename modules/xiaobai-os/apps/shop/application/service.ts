import type {
    ConfirmResult,
    XiaobaiOsChatDataStore,
    XiaobaiOsWriteState,
} from '../../../host/chat-data-store.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import { postAction } from '../../../domains/economy/ledger.js';
import type { EconomyLedgerV1 } from '../../../domains/economy/types.js';
import { getShopContract } from '../../../domains/shop/catalog.js';
import { parseShopEffectReceipt } from '../../../domains/shop/invariants.js';
import {
    activateShopItem,
    createEmptyShopState,
    deactivateShopItem,
    deliverShopEffects,
    getShopCasToken,
    projectShopState,
    purchaseShopItem,
} from '../../../domains/shop/timeline.js';
import type {
    ShopCasToken,
    ShopDomainV2,
    ShopEffectReceipt,
    ShopStateProjection,
} from '../../../domains/shop/types.js';
import {
    emptyShopRoot,
    readEconomyLedger,
    readPlayerBalance,
    readShopDomain,
    validateShopEconomyConsistency,
} from './root-protocol.js';

export interface ShopServiceView {
    domain: ShopDomainV2 | null;
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

export interface ShopCommitDeliveryCommand {
    chatIdentity: string;
    actionId: string;
    receipt: ShopEffectReceipt;
}

export interface ShopService {
    readCurrent: () => ShopServiceView;
    purchaseCurrent: (input: ShopPurchaseCommand) => Promise<ShopServiceView>;
    activateCurrent: (input: ShopActivateCommand) => Promise<ShopServiceView>;
    deactivateCurrent: (input: ShopDeactivateCommand) => Promise<ShopServiceView>;
    commitDeliveryCurrent: (input: ShopCommitDeliveryCommand) => Promise<ShopServiceView>;
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

export function createShopService(
    store: XiaobaiOsChatDataStore,
    {
        now = Date.now,
        createEventId,
        createTransactionId,
        createActivationId = () => `shop-activation-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`}`,
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
    ): { root: XiaobaiOsChatData; ledger: EconomyLedgerV1; shop: ShopDomainV2 } {
        const base = current ? structuredClone(current) : emptyShopRoot();
        const ledger = readEconomyLedger(base);
        if (!ledger) {throw new Error('economy_not_opened');}
        return {
            root: base,
            ledger,
            shop: readShopDomain(base) || createEmptyShopState(),
        };
    }

    function assertGenerationIdle(): void {
        if (isMainGenerationActive()) {throw new Error('shop_main_generation_active');}
    }

    async function purchaseCurrent(input: ShopPurchaseCommand): Promise<ShopServiceView> {
        return store.mutateCurrent((current) => {
            const prepared = prepareRoot(current);
            const shopResult = purchaseShopItem(prepared.shop, {
                ...input,
            }, shopDependencies);
            const item = getShopContract(input.itemId);
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
            }], economyDependencies);
            prepared.root.domains.economy = economyResult.ledger;
            prepared.root.domains.shop = shopResult.domain;
            validateShopEconomyConsistency(prepared.root);
            return { next: prepared.root, result: buildView(prepared.root) };
        });
    }

    async function activateCurrent(input: ShopActivateCommand): Promise<ShopServiceView> {
        assertGenerationIdle();
        return store.mutateCurrent((current) => {
            assertGenerationIdle();
            const prepared = prepareRoot(current);
            const existing = prepared.shop.events.find((event) => event.actionId === input.actionId);
            const activationId = existing?.action.kind === 'activate'
                ? existing.action.activationId
                : String(createActivationId() || '').trim();
            const result = activateShopItem(prepared.shop, {
                ...input,
                activationId,
            }, shopDependencies);
            prepared.root.domains.shop = result.domain;
            validateShopEconomyConsistency(prepared.root);
            return { next: prepared.root, result: buildView(prepared.root) };
        }, { beforeCommit: assertGenerationIdle });
    }

    async function deactivateCurrent(input: ShopDeactivateCommand): Promise<ShopServiceView> {
        assertGenerationIdle();
        return store.mutateCurrent((current) => {
            assertGenerationIdle();
            const prepared = prepareRoot(current);
            const result = deactivateShopItem(prepared.shop, {
                ...input,
            }, shopDependencies);
            prepared.root.domains.shop = result.domain;
            validateShopEconomyConsistency(prepared.root);
            return { next: prepared.root, result: buildView(prepared.root) };
        }, { beforeCommit: assertGenerationIdle });
    }

    async function commitDeliveryCurrent(input: ShopCommitDeliveryCommand): Promise<ShopServiceView> {
        const receipt = parseShopEffectReceipt(input.receipt);
        return store.mutateCurrent((current, rootContext) => {
            if (!input.chatIdentity || input.chatIdentity !== rootContext.identityKey) {
                throw new Error('shop_generation_chat_changed');
            }
            const prepared = prepareRoot(current);
            const result = deliverShopEffects(prepared.shop, {
                ...getShopCasToken(prepared.shop),
                actionId: input.actionId,
                receipt,
            }, shopDependencies);
            prepared.root.domains.shop = result.domain;
            validateShopEconomyConsistency(prepared.root);
            return {
                next: prepared.root,
                result: buildView(prepared.root),
            };
        });
    }

    return Object.freeze({
        readCurrent,
        purchaseCurrent,
        activateCurrent,
        deactivateCurrent,
        commitDeliveryCurrent,
        confirmPending: store.confirmPending,
        getWriteState: store.getWriteState,
    });
}
