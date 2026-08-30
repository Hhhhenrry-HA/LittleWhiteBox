export type ShopClientStatus = 'ready' | 'saving' | 'unconfirmed' | 'conflict' | 'reconciling' | 'blocked';

export interface ShopInputView {
    key: string;
    label: string;
    placeholder: string;
    maxLength: number;
}

export interface ShopCatalogItemView {
    id: string;
    name: string;
    icon: string;
    category: string;
    categoryLabel: string;
    price: number;
    description: string;
    duration: 'turns' | 'manual' | 'permanent';
    durationLabel: string;
    inputs: ShopInputView[];
    purchaseLimit: number | null;
    purchasedCount: number;
    quantity: number;
}

export interface ShopActivationView {
    activationId: string;
    itemId: string;
    name: string;
    icon: string;
    parameters: Array<{ label: string; value: string }>;
    durationLabel: string;
    state: 'active' | 'expired' | 'closed';
    stateLabel: string;
    canDeactivate: boolean;
}

export interface ShopClientState {
    chatIdentity: string;
    currency: '小白币';
    balance: number;
    revision: number;
    eventId: string;
    status: ShopClientStatus;
    message: string;
    generationActive: boolean;
    catalog: ShopCatalogItemView[];
    activations: ShopActivationView[];
}
