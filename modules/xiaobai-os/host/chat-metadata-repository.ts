import {
    cloneXiaobaiOsData,
    createDefaultXiaobaiOsChatData,
    getLegacyFourthWallChat,
    migrateLegacyFourthWallChat,
    validateXiaobaiOsChatData,
    XiaobaiOsDataError,
} from './legacy-migration.js';
import type { FourthWallChatState, XiaobaiOsChatData, XiaobaiOsChatIdentityInput } from '../apps/fourth-wall/types.js';

type UnknownRecord = Record<string, unknown>;

export interface XiaobaiOsChatSaveTransaction {
    identity: XiaobaiOsChatIdentityInput;
    metadata: UnknownRecord;
    xiaobaiOs: XiaobaiOsChatData | undefined;
}

export interface XiaobaiOsChatAdapter {
    getChatIdentity: () => XiaobaiOsChatIdentityInput | null;
    getChatMetadata: (identity: XiaobaiOsChatIdentityInput) => UnknownRecord | null;
    saveChatMetadata: (transaction: XiaobaiOsChatSaveTransaction) => Promise<void> | void;
}

export interface XiaobaiOsChatRepository {
    prepareCurrentChatFourthWall: () => Promise<FourthWallChatState>;
    readCurrentChatFourthWall: () => FourthWallChatState | null;
    mutateCurrentChatFourthWall: (
        action: (current: FourthWallChatState) => FourthWallChatState,
    ) => Promise<FourthWallChatState>;
    deleteCurrentChatFourthWall: () => Promise<boolean>;
}

interface CapturedChat {
    identity: XiaobaiOsChatIdentityInput;
    metadata: UnknownRecord;
    chatId: string;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertValidChatData(value: unknown): asserts value is XiaobaiOsChatData {
    if (!validateXiaobaiOsChatData(value)) {
        throw new XiaobaiOsDataError('INVALID_CURRENT_DATA', 'Xiaobai OS chat data is invalid');
    }
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
    throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat has no legacy chat id');
}

function sameIdentity(left: XiaobaiOsChatIdentityInput | null, right: XiaobaiOsChatIdentityInput | null): boolean {
    if (left === null || right === null) {
        return false;
    }
    return identityKey(left) === identityKey(right);
}

function isUnconfirmedSave(error: unknown): boolean {
    return (
        isRecord(error) &&
        (error.code === 'SAVE_UNCONFIRMED' || error.uncertain === true)
    );
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
    const extensions = metadata?.extensions;
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

function deleteCurrentRoot(metadata: UnknownRecord, expected: XiaobaiOsChatData | undefined): void {
    const extensions = metadata.extensions;
    if (!isRecord(extensions)) {
        return;
    }
    const littleWhiteBox = extensions.LittleWhiteBox;
    if (!isRecord(littleWhiteBox)) {
        return;
    }
    if (expected !== undefined && littleWhiteBox.xiaobaiOs !== expected) {
        return;
    }
    delete littleWhiteBox.xiaobaiOs;
    if (Object.keys(littleWhiteBox).length === 0) {
        delete extensions.LittleWhiteBox;
    }
    if (isRecord(extensions) && Object.keys(extensions).length === 0) {
        delete metadata.extensions;
    }
}

function deleteLegacyRoot(metadata: UnknownRecord, chatId: string, expected: UnknownRecord | undefined): void {
    const chatRoot = metadata[chatId];
    if (!isRecord(chatRoot)) {
        return;
    }
    const extensions = chatRoot.extensions;
    if (!isRecord(extensions)) {
        return;
    }
    const littleWhiteBox = extensions.LittleWhiteBox;
    if (!isRecord(littleWhiteBox)) {
        return;
    }
    if (expected !== undefined && littleWhiteBox.fw !== expected) {
        return;
    }
    delete littleWhiteBox.fw;
    if (Object.keys(littleWhiteBox).length === 0) {
        delete extensions.LittleWhiteBox;
    }
    if (Object.keys(extensions).length === 0) {
        delete chatRoot.extensions;
    }
    if (Object.keys(chatRoot).length === 0) {
        delete metadata[chatId];
    }
}

function restoreLegacyRoot(metadata: UnknownRecord, chatId: string, value: UnknownRecord): void {
    const chatRoot = ensureRecordContainer(metadata, chatId, `chat_metadata.${chatId}`);
    const extensions = ensureRecordContainer(chatRoot, 'extensions', `chat_metadata.${chatId}.extensions`);
    const littleWhiteBox = ensureRecordContainer(
        extensions,
        'LittleWhiteBox',
        `chat_metadata.${chatId}.extensions.LittleWhiteBox`,
    );
    if (!Object.hasOwn(littleWhiteBox, 'fw')) {
        littleWhiteBox.fw = value;
    }
}

function currentFourthWall(metadata: UnknownRecord): FourthWallChatState | null {
    const root = getCurrentRoot(metadata);
    if (root === undefined) {
        return null;
    }
    assertValidChatData(root);
    return root.apps.fourthWall ?? null;
}

/**
 * Creates the sole repository for current-chat Xiaobai OS data.
 *
 */
export function createChatMetadataRepository(
    adapter: XiaobaiOsChatAdapter,
    { now = Date.now }: { now?: () => number } = {},
): XiaobaiOsChatRepository {
    if (
        typeof adapter?.getChatIdentity !== 'function' ||
        typeof adapter?.getChatMetadata !== 'function' ||
        typeof adapter?.saveChatMetadata !== 'function'
    ) {
        throw new TypeError('chat repository requires getChatIdentity, getChatMetadata and saveChatMetadata');
    }
    const enqueueWrite = createWriteQueue();

    function captureCurrentChat(): CapturedChat {
        const identity = adapter.getChatIdentity();
        if (identity === null) {
            throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'No chat is currently open');
        }
        identityKey(identity);
        const metadata = adapter.getChatMetadata(identity);
        if (!isRecord(metadata)) {
            throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat metadata is unavailable');
        }
        return { identity, metadata, chatId: identityChatId(identity) };
    }

    function assertStillCurrent(captured: CapturedChat): void {
        const currentIdentity = adapter.getChatIdentity();
        if (
            currentIdentity === null ||
            !sameIdentity(captured.identity, currentIdentity) ||
            adapter.getChatMetadata(currentIdentity) !== captured.metadata
        ) {
            throw new XiaobaiOsDataError('CHAT_CHANGED', 'The active chat changed before metadata could be saved');
        }
    }

    async function saveInstalled(
        captured: CapturedChat,
        installed: XiaobaiOsChatData | undefined,
        previous: XiaobaiOsChatData | undefined,
    ): Promise<void> {
        try {
            assertStillCurrent(captured);
            await adapter.saveChatMetadata({
                identity: captured.identity,
                metadata: captured.metadata,
                xiaobaiOs: cloneXiaobaiOsData(installed),
            });
        } catch (error) {
            // Once SillyTavern has attempted a save, a failed read-back cannot tell us whether
            // the server accepted it. Keep the candidate in memory so a later write cannot
            // overwrite a possibly successful remote write with the old branch.
            if (!isUnconfirmedSave(error)) {
                const liveRoot = getCurrentRoot(captured.metadata);
                if (installed === undefined) {
                    if (liveRoot === undefined && previous !== undefined) {
                        installCurrentRoot(captured.metadata, previous);
                    }
                } else if (liveRoot === installed) {
                    if (previous === undefined) {
                        deleteCurrentRoot(captured.metadata, installed);
                    } else {
                        installCurrentRoot(captured.metadata, previous);
                    }
                }
            }
            throw error;
        }
    }

    function readCurrentChatFourthWall(): FourthWallChatState | null {
        const captured = captureCurrentChat();
        const fourthWall = currentFourthWall(captured.metadata);
        return fourthWall === null ? null : cloneXiaobaiOsData(fourthWall);
    }

    async function prepareCurrentChatFourthWall(): Promise<FourthWallChatState> {
        const captured = captureCurrentChat();
        return enqueueWrite(async () => {
            assertStillCurrent(captured);
            const existingValue = getCurrentRoot(captured.metadata);
            let existingRoot: XiaobaiOsChatData | undefined;
            if (existingValue !== undefined) {
                assertValidChatData(existingValue);
                existingRoot = existingValue;
                if (existingValue.apps.fourthWall !== undefined) {
                    return cloneXiaobaiOsData(existingValue.apps.fourthWall);
                }
            }

            const legacy = getLegacyFourthWallChat(captured.metadata, captured.chatId);
            const legacySnapshot = legacy ? cloneXiaobaiOsData(legacy) : null;
            const nextRoot = legacy
                ? migrateLegacyFourthWallChat(captured.metadata, captured.chatId, now())
                : createDefaultXiaobaiOsChatData(now());
            if (!nextRoot) {
                throw new XiaobaiOsDataError('INVALID_LEGACY_DATA', 'Legacy fourth-wall data disappeared');
            }
            if (existingRoot !== undefined) {
                nextRoot.apps = {
                    ...cloneXiaobaiOsData(existingRoot.apps),
                    fourthWall: nextRoot.apps.fourthWall,
                };
            }
            assertValidChatData(nextRoot);
            assertStillCurrent(captured);
            const installed = cloneXiaobaiOsData(nextRoot);
            installCurrentRoot(captured.metadata, installed);
            if (legacy) {
                deleteLegacyRoot(captured.metadata, captured.chatId, legacy);
            }

            try {
                await saveInstalled(
                    captured,
                    installed,
                    existingRoot === undefined ? undefined : cloneXiaobaiOsData(existingRoot),
                );
            } catch (error) {
                if (legacySnapshot && !getLegacyFourthWallChat(captured.metadata, captured.chatId)) {
                    restoreLegacyRoot(captured.metadata, captured.chatId, legacySnapshot);
                }
                throw error;
            }
            const fourthWall = installed.apps.fourthWall;
            if (!fourthWall) {
                throw new XiaobaiOsDataError('CHAT_NOT_PREPARED', 'Current chat fourth-wall data was not installed');
            }
            return cloneXiaobaiOsData(fourthWall);
        });
    }

    async function mutateCurrentChatFourthWall(
        action: (current: FourthWallChatState) => FourthWallChatState,
    ): Promise<FourthWallChatState> {
        if (typeof action !== 'function') {
            throw new TypeError('chat mutation action must be a function');
        }
        const captured = captureCurrentChat();
        return enqueueWrite(async () => {
            assertStillCurrent(captured);
            const currentRoot = getCurrentRoot(captured.metadata);
            if (currentRoot === undefined) {
                throw new XiaobaiOsDataError(
                    'CHAT_NOT_PREPARED',
                    'Current chat fourth-wall data has not been prepared',
                );
            }
            assertValidChatData(currentRoot);
            const currentFourthWall = currentRoot.apps.fourthWall;
            if (currentFourthWall === undefined) {
                throw new XiaobaiOsDataError(
                    'CHAT_NOT_PREPARED',
                    'Current chat fourth-wall data has not been prepared',
                );
            }
            const previous = cloneXiaobaiOsData(currentRoot);
            const nextFourthWall = action(cloneXiaobaiOsData(currentFourthWall));
            if (!isRecord(nextFourthWall)) {
                throw new TypeError('chat mutation action must return the complete next state');
            }
            const next = cloneXiaobaiOsData(previous);
            next.apps.fourthWall = nextFourthWall;
            assertValidChatData(next);
            assertStillCurrent(captured);
            const installed = cloneXiaobaiOsData(next);
            installCurrentRoot(captured.metadata, installed);
            await saveInstalled(captured, installed, previous);
            const savedFourthWall = installed.apps.fourthWall;
            if (!savedFourthWall) {
                throw new XiaobaiOsDataError('CHAT_NOT_PREPARED', 'Current chat fourth-wall data was not saved');
            }
            return cloneXiaobaiOsData(savedFourthWall);
        });
    }

    async function deleteCurrentChatFourthWall(): Promise<boolean> {
        const captured = captureCurrentChat();
        return enqueueWrite(async () => {
            assertStillCurrent(captured);
            const currentRoot = getCurrentRoot(captured.metadata);
            if (currentRoot === undefined) {
                return false;
            }
            assertValidChatData(currentRoot);
            if (currentRoot.apps.fourthWall === undefined) {
                return false;
            }
            const previous = cloneXiaobaiOsData(currentRoot);
            const next = cloneXiaobaiOsData(currentRoot);
            delete next.apps.fourthWall;
            const installed = Object.keys(next.apps).length === 0 ? undefined : next;
            assertStillCurrent(captured);
            if (installed === undefined) {
                deleteCurrentRoot(captured.metadata, currentRoot);
            } else {
                installCurrentRoot(captured.metadata, installed);
            }
            await saveInstalled(captured, installed, previous);
            return true;
        });
    }

    return Object.freeze({
        prepareCurrentChatFourthWall,
        readCurrentChatFourthWall,
        mutateCurrentChatFourthWall,
        deleteCurrentChatFourthWall,
    });
}
