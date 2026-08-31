import type { EconomyRepository } from '../../../domains/economy/repository.js';
import type {
    ShopActivateCommand,
    ShopDeactivateCommand,
    ShopPurchaseCommand,
    ShopService,
} from '../application/service.js';
import type {
    XiaobaiOsAppActivationContext,
    XiaobaiOsAppRuntime,
    XiaobaiOsChatIdentity,
} from '../../../types.js';
import type { XiaobaiOsHostFrameMessage } from '../../../host/frame-bridge.js';
import type { XiaobaiOsChatDataChange } from '../../../host/chat-data-store.js';
import type { ShopClientState } from '../types.js';
import { presentShopState } from './presentation.js';

type UnknownRecord = Record<string, unknown>;

interface ShopActivation {
    chatIdentity: string;
    post: XiaobaiOsAppActivationContext['post'];
}

interface ShopControllerDependencies {
    shop: ShopService;
    economy: EconomyRepository;
    getChatIdentity: () => XiaobaiOsChatIdentity | { key?: unknown } | string | null;
    isMainGenerationActive: () => boolean;
    subscribeGeneration: (listener: () => void) => () => void;
    subscribeData: (listener: (change: XiaobaiOsChatDataChange) => void) => () => void;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity: ReturnType<ShopControllerDependencies['getChatIdentity']>): string {
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

function requireCas(payload: UnknownRecord): { expectedRevision: number; expectedEventId: string } {
    const expectedRevision = payload.expectedRevision;
    const expectedEventId = payload.expectedEventId;
    if (typeof expectedRevision !== 'number' || !Number.isSafeInteger(expectedRevision) || expectedRevision < 0
        || typeof expectedEventId !== 'string' || expectedEventId !== expectedEventId.trim()
        || Array.from(expectedEventId).length > 200 || /[\u0000-\u001f\u007f-\u009f]/u.test(expectedEventId)
        || (expectedRevision === 0) !== (expectedEventId === '')) {
        throw new Error('商店状态版本无效');
    }
    return { expectedRevision, expectedEventId };
}

export function createShopController({
    shop,
    economy,
    getChatIdentity,
    isMainGenerationActive,
    subscribeGeneration,
    subscribeData,
}: ShopControllerDependencies): XiaobaiOsAppRuntime & {
    activate: NonNullable<XiaobaiOsAppRuntime['activate']>;
    handleMessage: NonNullable<XiaobaiOsAppRuntime['handleMessage']>;
} {
    let activation: ShopActivation | null = null;
    let preparation: { activation: ShopActivation; error: string } | null = null;
    let busy = false;
    let unsubscribeGeneration: (() => void) | null = null;
    let unsubscribeData: (() => void) | null = null;

    function currentChatIdentity(): string {
        return identityKey(getChatIdentity());
    }

    function assertActivation(payload: UnknownRecord = {}): ShopActivation {
        if (!activation) {throw new Error('商店 APP 未激活');}
        const current = currentChatIdentity();
        if (!current || current !== activation.chatIdentity || String(payload.chatIdentity || '') !== current) {
            throw new Error('聊天已切换，请重新打开商店');
        }
        return activation;
    }

    function assertSameActivation(expected: ShopActivation, payload: UnknownRecord = {}): void {
        if (assertActivation(payload) !== expected) {throw new Error('商店页面已切换，请重试');}
    }

    function buildState(chatIdentity: string): ShopClientState {
        const next = presentShopState({
            chatIdentity,
            serviceView: shop.readCurrent(),
            generationActive: isMainGenerationActive(),
        });
        if (!preparation || preparation.activation !== activation) {return next;}
        if (preparation.error) {
            return { ...next, status: 'blocked', message: preparation.error };
        }
        if (next.status === 'unconfirmed' || next.status === 'conflict') {return next;}
        return { ...next, status: 'loading', message: '' };
    }

    function emitState(current = activation): ShopClientState {
        if (!current) {throw new Error('商店 APP 未激活');}
        const state = buildState(current.chatIdentity);
        current.post('shop/state', { state });
        return state;
    }

    async function prepare(): Promise<void> {
        if (economy.hasCurrent()) {return;}
        try {
            await economy.ensureCurrent();
        } catch (error) {
            if (!isUnconfirmedSave(error)) {throw error;}
        }
    }

    function schedulePreparation(current: ShopActivation): void {
        const pending = { activation: current, error: '' };
        preparation = pending;
        globalThis.setTimeout(() => {
            if (preparation !== pending || activation !== current || currentChatIdentity() !== current.chatIdentity) {return;}
            void prepare().then(() => {
                if (preparation !== pending || activation !== current || currentChatIdentity() !== current.chatIdentity) {return;}
                preparation = null;
                emitState(current);
            }).catch((error) => {
                if (preparation !== pending || activation !== current || currentChatIdentity() !== current.chatIdentity) {return;}
                console.error('[LittleWhiteBox] 商店数据准备失败', error);
                preparation = { activation: current, error: '商店数据暂时无法读取，请稍后重试。' };
                emitState(current);
            });
        }, 0);
    }

    function activate(context: XiaobaiOsAppActivationContext): ShopClientState {
        cancelForeground();
        const chatIdentity = currentChatIdentity();
        if (!chatIdentity) {throw new Error('请先打开一个聊天');}
        const current = { chatIdentity, post: context.post };
        activation = current;
        if (!economy.hasCurrent()) {schedulePreparation(current);}
        return buildState(chatIdentity);
    }

    function cancelForeground(): void {
        activation = null;
        preparation = null;
        busy = false;
    }

    async function runWrite<T>(
        current: ShopActivation,
        payload: UnknownRecord,
        command: () => Promise<T>,
    ): Promise<T> {
        if (busy) {throw new Error('已有商店操作正在处理');}
        busy = true;
        try {
            const result = await command();
            assertSameActivation(current, payload);
            emitState(current);
            return result;
        } catch (error) {
            if (activation === current && currentChatIdentity() === current.chatIdentity && isUnconfirmedSave(error)) {
                emitState(current);
            }
            throw error;
        } finally {
            if (activation === current) {busy = false;}
        }
    }

    async function handleMessage(message: XiaobaiOsHostFrameMessage): Promise<unknown> {
        const payload = isRecord(message.payload) ? message.payload : {};
        const current = assertActivation(payload);
        if (message.type === 'shop/refresh') {
            preparation = null;
            await prepare();
            assertSameActivation(current, payload);
            return emitState(current);
        }
        if (message.type === 'shop/confirm-save') {
            preparation = null;
            if (busy) {throw new Error('已有商店操作正在处理');}
            const confirmation = await shop.confirmPending();
            assertSameActivation(current, payload);
            return { confirmation: confirmation.status, state: emitState(current) };
        }
        const base = {
            ...requireCas(payload),
            actionId: requireString(payload.actionId, '操作标识'),
        };
        if (message.type === 'shop/purchase') {
            const input: ShopPurchaseCommand = {
                ...base,
                itemId: requireString(payload.itemId, '商品'),
            };
            return runWrite(current, payload, async () => presentShopState({
                chatIdentity: current.chatIdentity,
                serviceView: await shop.purchaseCurrent(input),
                generationActive: isMainGenerationActive(),
            }));
        }
        if (message.type === 'shop/activate') {
            const input: ShopActivateCommand = {
                ...base,
                itemId: requireString(payload.itemId, '商品'),
                parameters: isRecord(payload.parameters) ? payload.parameters : {},
            };
            return runWrite(current, payload, async () => presentShopState({
                chatIdentity: current.chatIdentity,
                serviceView: await shop.activateCurrent(input),
                generationActive: isMainGenerationActive(),
            }));
        }
        if (message.type === 'shop/deactivate') {
            const input: ShopDeactivateCommand = {
                ...base,
                itemId: requireString(payload.itemId, '商品'),
                activationId: requireString(payload.activationId, '生效实例'),
            };
            return runWrite(current, payload, async () => presentShopState({
                chatIdentity: current.chatIdentity,
                serviceView: await shop.deactivateCurrent(input),
                generationActive: isMainGenerationActive(),
            }));
        }
        throw new Error('未知的商店操作');
    }

    function handleExternalState(change?: XiaobaiOsChatDataChange): void {
        const current = activation;
        if (
            !current
            || (change && change.identityKey !== current.chatIdentity)
            || currentChatIdentity() !== current.chatIdentity
        ) {return;}
        try {
            emitState(current);
        } catch (error) {
            current.post('shop/error', { message: error instanceof Error ? error.message : String(error) });
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
            if (!unsubscribeGeneration) {unsubscribeGeneration = subscribeGeneration(() => handleExternalState());}
            if (!unsubscribeData) {unsubscribeData = subscribeData(handleExternalState);}
        },
        stopBackground() {
            unsubscribeGeneration?.();
            unsubscribeGeneration = null;
            unsubscribeData?.();
            unsubscribeData = null;
            cancelForeground();
        },
    });
}
