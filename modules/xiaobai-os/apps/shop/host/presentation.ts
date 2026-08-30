import { listShopCatalog } from '../../../domains/shop/catalog.js';
import { isShopActivationActive, shopRemainingAssistantTurns } from '../../../domains/shop/timeline.js';
import type { ShopServiceView } from '../application/service.js';
import type { StoryReconciliationState } from '../../../host/story-reconciliation-runtime.js';
import type { ShopActivationView, ShopClientState, ShopClientStatus } from '../types.js';

const CATEGORY_LABELS: Readonly<Record<string, string>> = Object.freeze({
    emotion: '情绪',
    memory: '记忆',
    information: '知悉',
    behavior: '行为',
    scene: '场景',
    ultimate: '至高',
    'world-cognition': '认知',
    physics: '现实',
});

function durationLabel(duration: ReturnType<typeof listShopCatalog>[number]['duration']): string {
    if (duration.kind === 'manual') {return '持续至手动关闭';}
    if (duration.kind === 'permanent') {return '永久生效';}
    return duration.rounds === 1 ? '作用于下一回合' : `持续 ${duration.rounds} 回合`;
}

function resolveStatus(
    view: ShopServiceView,
    storyState: StoryReconciliationState,
    chatIdentity: string,
): { status: ShopClientStatus; message: string } {
    if (view.writeState === 'conflict') {
        return { status: 'conflict', message: '服务端数据与当前候选不一致，请刷新酒馆后再继续。' };
    }
    if (view.writeState === 'unconfirmed') {
        return { status: 'unconfirmed', message: '上一次保存结果尚未确认，商店与资金写入已冻结。' };
    }
    if (view.writeState === 'saving') {
        return { status: 'saving', message: '正在确认商店与账本保存结果…' };
    }
    if (storyState.identityKey === chatIdentity && storyState.status !== 'ready') {
        return { status: storyState.status, message: storyState.message };
    }
    return { status: 'ready', message: '' };
}

function activationView(
    activation: ShopServiceView['projection']['activations'][number],
    targetAssistantTurn: number,
): ShopActivationView {
    const item = listShopCatalog().find((candidate) => candidate.id === activation.itemId);
    if (!item) {throw new Error(`shop_item_missing:${activation.itemId}`);}
    const active = isShopActivationActive(activation, item, targetAssistantTurn);
    const closed = activation.transitionAtAssistantTurn !== undefined
        && targetAssistantTurn >= activation.transitionAtAssistantTurn;
    const remaining = shopRemainingAssistantTurns(activation, item, targetAssistantTurn);
    const state = active ? 'active' : closed ? 'closed' : 'expired';
    const stateLabel = active
        ? remaining === null
            ? item.duration.kind === 'manual' ? '持续生效中' : '永久生效'
            : `剩余 ${remaining} 回合`
        : closed ? '已关闭' : '已结束';
    return {
        activationId: activation.activationId,
        itemId: item.id,
        name: item.name,
        icon: item.icon,
        parameters: item.inputs.map((input) => ({
            label: input.label,
            value: activation.parameters[input.key] || '',
        })),
        durationLabel: durationLabel(item.duration),
        state,
        stateLabel,
        canDeactivate: active && item.duration.kind === 'manual',
    };
}

export function presentShopState({
    chatIdentity,
    serviceView,
    storyState,
    completedAssistantTurns,
    generationActive,
}: {
    chatIdentity: string;
    serviceView: ShopServiceView;
    storyState: StoryReconciliationState;
    completedAssistantTurns: number;
    generationActive: boolean;
}): ShopClientState {
    const status = resolveStatus(serviceView, storyState, chatIdentity);
    return {
        chatIdentity,
        currency: '小白币',
        balance: serviceView.balance,
        revision: serviceView.projection.revision,
        eventId: serviceView.projection.eventId,
        ...status,
        generationActive,
        catalog: listShopCatalog().map((item) => {
            const inventory = serviceView.projection.inventory[item.id];
            return {
                id: item.id,
                name: item.name,
                icon: item.icon,
                category: item.category,
                categoryLabel: CATEGORY_LABELS[item.category] || item.category,
                price: item.price,
                description: item.description,
                duration: item.duration.kind,
                durationLabel: durationLabel(item.duration),
                inputs: item.inputs.map((input) => ({
                    key: input.key,
                    label: input.label,
                    placeholder: input.placeholder,
                    maxLength: input.maxLength,
                })),
                purchaseLimit: item.purchaseLimit ?? null,
                purchasedCount: inventory?.purchasedCount || 0,
                quantity: inventory?.quantity || 0,
            };
        }),
        activations: serviceView.projection.activations.map((activation) => (
            activationView(activation, completedAssistantTurns + 1)
        )),
    };
}
