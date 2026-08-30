import type { XiaobaiOsChatData, XiaobaiOsChatIdentityInput } from '../types.js';
import { jsonValuesEqual } from './json-values-equal.js';
import { cloneXiaobaiOsData, validateXiaobaiOsChatData, XiaobaiOsDataError } from './legacy-migration.js';

type UnknownRecord = Record<string, unknown>;

export type XiaobaiOsWriteState = 'ready' | 'saving' | 'unconfirmed' | 'conflict';

export interface XiaobaiOsChatSaveTransaction {
    identity: XiaobaiOsChatIdentityInput;
    metadata: UnknownRecord;
    xiaobaiOs: XiaobaiOsChatData | undefined;
}

export interface XiaobaiOsChatAdapter {
    getChatIdentity: () => XiaobaiOsChatIdentityInput | null;
    getChatMetadata: (identity: XiaobaiOsChatIdentityInput) => UnknownRecord | null;
    saveChatMetadata: (transaction: XiaobaiOsChatSaveTransaction) => Promise<void> | void;
    readPersistedXiaobaiOs: (identity: XiaobaiOsChatIdentityInput) => Promise<unknown>;
}

export type XiaobaiOsBranchValidator = (value: unknown, path: string) => void;

export interface XiaobaiOsChatDataValidators {
    apps?: Readonly<Record<string, XiaobaiOsBranchValidator>>;
    domains?: Readonly<Record<string, XiaobaiOsBranchValidator>>;
    root?: XiaobaiOsBranchValidator;
}

export interface RootMutationMetadataEffect {
    apply: () => void;
    rollback: () => void;
}

export interface RootMutationContext {
    identity: XiaobaiOsChatIdentityInput;
    identityKey: string;
    chatId: string;
    metadata: UnknownRecord;
}

export interface RootMutationPlan<T> {
    next: XiaobaiOsChatData | null;
    result: T;
    metadataEffect?: RootMutationMetadataEffect;
}

export interface RootMutationOptions {
    beforeCommit?: () => Promise<void> | void;
}

export interface ConfirmResult {
    status: 'none' | 'confirmed' | 'rejected' | 'conflict' | 'unconfirmed';
}

export interface XiaobaiOsChatDataStore {
    readCurrent: () => XiaobaiOsChatData | null;
    mutateCurrent: <T>(
        command: (
            current: XiaobaiOsChatData | null,
            context: RootMutationContext,
        ) => Promise<RootMutationPlan<T>> | RootMutationPlan<T>,
        options?: RootMutationOptions,
    ) => Promise<T>;
    confirmPending: () => Promise<ConfirmResult>;
    getWriteState: () => XiaobaiOsWriteState;
}

interface CapturedChat extends RootMutationContext {}

interface PendingSave {
    identity: XiaobaiOsChatIdentityInput;
    metadata: UnknownRecord;
    previous: XiaobaiOsChatData | undefined;
    candidate: XiaobaiOsChatData | undefined;
    metadataEffect?: RootMutationMetadataEffect;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity: XiaobaiOsChatIdentityInput): string {
    if (typeof identity === 'string' && identity) {
        return identity;
    }
    if (isRecord(identity) && typeof identity.key === 'string' && identity.key) {
        return identity.key;
    }
    throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat has no stable identity');
}

function identityChatId(identity: XiaobaiOsChatIdentityInput): string {
    if (typeof identity === 'string' && identity) {
        return identity;
    }
    if (isRecord(identity) && typeof identity.chatId === 'string' && identity.chatId) {
        return identity.chatId;
    }
    throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat has no chat id');
}

function isUnconfirmedSave(error: unknown): boolean {
    return isRecord(error) && (error.code === 'SAVE_UNCONFIRMED' || error.uncertain === true);
}

function validateBranches(
    branches: Record<string, unknown>,
    validators: Readonly<Record<string, XiaobaiOsBranchValidator>> | undefined,
    path: string,
): void {
    for (const [branchId, validate] of Object.entries(validators || {})) {
        if (Object.hasOwn(branches, branchId)) {
            validate(branches[branchId], `${path}.${branchId}`);
        }
    }
}

function assertValidRoot(
    value: unknown,
    validators: XiaobaiOsChatDataValidators,
): asserts value is XiaobaiOsChatData {
    if (!validateXiaobaiOsChatData(value)) {
        throw new XiaobaiOsDataError('INVALID_CURRENT_DATA', 'Xiaobai OS chat data is invalid');
    }
    validateBranches(value.apps, validators.apps, 'xiaobaiOs.apps');
    validateBranches(value.domains, validators.domains, 'xiaobaiOs.domains');
    validators.root?.(value, 'xiaobaiOs');
}

function createWriteQueue() {
    let tail: Promise<unknown> = Promise.resolve();
    return <T>(task: () => Promise<T> | T): Promise<T> => {
        const result = tail.then(task);
        tail = result.catch(() => {});
        return result;
    };
}

function getLittleWhiteBoxRoot(metadata: UnknownRecord): UnknownRecord | null {
    const extensions = metadata.extensions;
    if (extensions === undefined) {
        return null;
    }
    if (!isRecord(extensions)) {
        throw new XiaobaiOsDataError('INVALID_CHAT_METADATA', 'chat_metadata.extensions must be an object');
    }
    const root = extensions.LittleWhiteBox;
    if (root === undefined) {
        return null;
    }
    if (!isRecord(root)) {
        throw new XiaobaiOsDataError(
            'INVALID_CHAT_METADATA',
            'chat_metadata.extensions.LittleWhiteBox must be an object',
        );
    }
    return root;
}

function getCurrentRoot(metadata: UnknownRecord): unknown {
    return getLittleWhiteBoxRoot(metadata)?.xiaobaiOs;
}

function ensureRecordContainer(parent: UnknownRecord, key: string, path: string): UnknownRecord {
    if (parent[key] === undefined) {
        parent[key] = {};
    }
    if (!isRecord(parent[key])) {
        throw new XiaobaiOsDataError('INVALID_CHAT_METADATA', `${path} must be an object`, path);
    }
    return parent[key];
}

function installCurrentRoot(metadata: UnknownRecord, value: XiaobaiOsChatData): void {
    const extensions = ensureRecordContainer(metadata, 'extensions', 'chat_metadata.extensions');
    const littleWhiteBox = ensureRecordContainer(
        extensions,
        'LittleWhiteBox',
        'chat_metadata.extensions.LittleWhiteBox',
    );
    littleWhiteBox.xiaobaiOs = value;
}

function deleteCurrentRoot(metadata: UnknownRecord): void {
    const extensions = metadata.extensions;
    if (!isRecord(extensions)) {return;}
    const littleWhiteBox = extensions.LittleWhiteBox;
    if (!isRecord(littleWhiteBox)) {return;}
    delete littleWhiteBox.xiaobaiOs;
    if (Object.keys(littleWhiteBox).length === 0) {delete extensions.LittleWhiteBox;}
    if (Object.keys(extensions).length === 0) {delete metadata.extensions;}
}

function installOptionalRoot(metadata: UnknownRecord, value: XiaobaiOsChatData | undefined): void {
    if (value === undefined) {
        deleteCurrentRoot(metadata);
    } else {
        installCurrentRoot(metadata, value);
    }
}

export function createChatDataStore(
    adapter: XiaobaiOsChatAdapter,
    validators: XiaobaiOsChatDataValidators = {},
): XiaobaiOsChatDataStore {
    if (
        typeof adapter?.getChatIdentity !== 'function' ||
        typeof adapter?.getChatMetadata !== 'function' ||
        typeof adapter?.saveChatMetadata !== 'function' ||
        typeof adapter?.readPersistedXiaobaiOs !== 'function'
    ) {
        throw new TypeError('chat data store requires identity, metadata, save and read-back adapters');
    }

    const enqueueWrite = createWriteQueue();
    const writeStates = new Map<string, XiaobaiOsWriteState>();
    const pendingSaves = new Map<string, PendingSave>();

    function getRequestedIdentity(): XiaobaiOsChatIdentityInput {
        const identity = adapter.getChatIdentity();
        if (identity === null) {
            throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'No chat is currently open');
        }
        identityKey(identity);
        return identity;
    }

    function captureCurrent(expectedIdentity?: XiaobaiOsChatIdentityInput): CapturedChat {
        const identity = getRequestedIdentity();
        if (expectedIdentity && identityKey(identity) !== identityKey(expectedIdentity)) {
            throw new XiaobaiOsDataError('CHAT_CHANGED', 'The active chat changed before queued work started');
        }
        const metadata = adapter.getChatMetadata(identity);
        if (!isRecord(metadata)) {
            throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat metadata is unavailable');
        }
        return {
            identity,
            identityKey: identityKey(identity),
            chatId: identityChatId(identity),
            metadata,
        };
    }

    function assertStillCurrent(captured: CapturedChat): void {
        const identity = adapter.getChatIdentity();
        if (
            identity === null ||
            identityKey(identity) !== captured.identityKey ||
            adapter.getChatMetadata(identity) !== captured.metadata
        ) {
            throw new XiaobaiOsDataError('CHAT_CHANGED', 'The active chat changed before metadata could be saved');
        }
    }

    function readRoot(metadata: UnknownRecord): XiaobaiOsChatData | null {
        const value = getCurrentRoot(metadata);
        if (value === undefined) {return null;}
        assertValidRoot(value, validators);
        return cloneXiaobaiOsData(value);
    }

    function readCurrent(): XiaobaiOsChatData | null {
        return readRoot(captureCurrent().metadata);
    }

    function getWriteState(): XiaobaiOsWriteState {
        const identity = adapter.getChatIdentity();
        return identity === null ? 'ready' : writeStates.get(identityKey(identity)) ?? 'ready';
    }

    function mutateCurrent<T>(
        command: (
            current: XiaobaiOsChatData | null,
            context: RootMutationContext,
        ) => Promise<RootMutationPlan<T>> | RootMutationPlan<T>,
        options: RootMutationOptions = {},
    ): Promise<T> {
        if (typeof command !== 'function') {
            return Promise.reject(new TypeError('root mutation command must be a function'));
        }
        let requestedIdentity: XiaobaiOsChatIdentityInput;
        try {
            requestedIdentity = getRequestedIdentity();
        } catch (error) {
            return Promise.reject(error);
        }
        const requestedKey = identityKey(requestedIdentity);
        return enqueueWrite(async () => {
            const captured = captureCurrent(requestedIdentity);
            const state = writeStates.get(requestedKey) ?? 'ready';
            if (state === 'unconfirmed' || state === 'conflict') {
                throw new XiaobaiOsDataError(
                    state === 'conflict' ? 'SAVE_CONFLICT' : 'SAVE_UNCONFIRMED',
                    state === 'conflict'
                        ? 'Xiaobai OS data conflicts with the server; refresh is required'
                        : 'A previous Xiaobai OS save is still unconfirmed',
                );
            }
            const previous = readRoot(captured.metadata);
            const plan = await command(previous === null ? null : cloneXiaobaiOsData(previous), captured);
            if (!plan || !Object.hasOwn(plan, 'next')) {
                throw new TypeError('root mutation must return a complete mutation plan');
            }
            const candidate = plan.next === null ? undefined : cloneXiaobaiOsData(plan.next);
            if (candidate !== undefined) {assertValidRoot(candidate, validators);}
            await options.beforeCommit?.();
            assertStillCurrent(captured);

            const previousValue = previous === null ? undefined : cloneXiaobaiOsData(previous);
            const changed = !jsonValuesEqual(previousValue, candidate) || plan.metadataEffect !== undefined;
            if (!changed) {return plan.result;}

            let metadataEffectStarted = false;
            try {
                if (plan.metadataEffect) {
                    metadataEffectStarted = true;
                    plan.metadataEffect.apply();
                }
                installOptionalRoot(captured.metadata, candidate);
            } catch (error) {
                try {
                    installOptionalRoot(captured.metadata, previousValue);
                } finally {
                    if (metadataEffectStarted) {plan.metadataEffect?.rollback();}
                }
                throw error;
            }
            writeStates.set(requestedKey, 'saving');
            try {
                await adapter.saveChatMetadata({
                    identity: captured.identity,
                    metadata: captured.metadata,
                    xiaobaiOs: cloneXiaobaiOsData(candidate),
                });
            } catch (error) {
                if (isUnconfirmedSave(error)) {
                    writeStates.set(requestedKey, 'unconfirmed');
                    pendingSaves.set(requestedKey, {
                        identity: captured.identity,
                        metadata: captured.metadata,
                        previous: previousValue,
                        candidate,
                        metadataEffect: plan.metadataEffect,
                    });
                } else {
                    installOptionalRoot(captured.metadata, previousValue);
                    plan.metadataEffect?.rollback();
                    writeStates.set(requestedKey, 'ready');
                }
                throw error;
            }
            writeStates.set(requestedKey, 'ready');
            pendingSaves.delete(requestedKey);
            assertStillCurrent(captured);
            return plan.result;
        });
    }

    function confirmPending(): Promise<ConfirmResult> {
        let requestedIdentity: XiaobaiOsChatIdentityInput;
        try {
            requestedIdentity = getRequestedIdentity();
        } catch (error) {
            return Promise.reject(error);
        }
        const requestedKey = identityKey(requestedIdentity);
        return enqueueWrite(async () => {
            const pending = pendingSaves.get(requestedKey);
            if (!pending) {return { status: 'none' };}
            const captured = captureCurrent(requestedIdentity);
            let persisted: unknown;
            try {
                persisted = await adapter.readPersistedXiaobaiOs(captured.identity);
            } catch {
                assertStillCurrent(captured);
                writeStates.set(requestedKey, 'unconfirmed');
                return { status: 'unconfirmed' };
            }
            assertStillCurrent(captured);
            if (jsonValuesEqual(persisted, pending.candidate)) {
                if (pending.candidate !== undefined) {assertValidRoot(pending.candidate, validators);}
                installOptionalRoot(captured.metadata, cloneXiaobaiOsData(pending.candidate));
                pendingSaves.delete(requestedKey);
                writeStates.set(requestedKey, 'ready');
                return { status: 'confirmed' };
            }
            if (jsonValuesEqual(persisted, pending.previous)) {
                installOptionalRoot(captured.metadata, cloneXiaobaiOsData(pending.previous));
                if (captured.metadata === pending.metadata) {pending.metadataEffect?.rollback();}
                pendingSaves.delete(requestedKey);
                writeStates.set(requestedKey, 'ready');
                return { status: 'rejected' };
            }
            writeStates.set(requestedKey, 'conflict');
            return { status: 'conflict' };
        });
    }

    return Object.freeze({ readCurrent, mutateCurrent, confirmPending, getWriteState });
}
