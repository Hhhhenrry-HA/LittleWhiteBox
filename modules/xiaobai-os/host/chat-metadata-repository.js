import {
    cloneXiaobaiOsData,
    createDefaultXiaobaiOsChatData,
    getLegacyFourthWallChat,
    migrateLegacyFourthWallChat,
    validateXiaobaiOsChatData,
    XiaobaiOsDataError,
} from './legacy-migration.js';

function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function identityKey(identity) {
    if (typeof identity === 'string' && identity) return identity;
    if (isRecord(identity) && typeof identity.key === 'string' && identity.key) return identity.key;
    throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat has no stable identity');
}

function identityChatId(identity) {
    if (typeof identity === 'string' && identity) return identity;
    if (isRecord(identity) && typeof identity.chatId === 'string' && identity.chatId) return identity.chatId;
    throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat has no legacy chat id');
}

function sameIdentity(left, right) {
    if (left == null || right == null) return false;
    return identityKey(left) === identityKey(right);
}

function createWriteQueue() {
    let tail = Promise.resolve();
    return (task) => {
        const result = tail.then(task);
        tail = result.catch(() => {});
        return result;
    };
}

function getLittleWhiteBoxRoot(metadata) {
    const extensions = metadata?.extensions;
    if (extensions === undefined) return null;
    if (!isRecord(extensions)) {
        throw new XiaobaiOsDataError('INVALID_CHAT_METADATA', 'chat_metadata.extensions must be an object');
    }
    const root = extensions.LittleWhiteBox;
    if (root === undefined) return null;
    if (!isRecord(root)) {
        throw new XiaobaiOsDataError('INVALID_CHAT_METADATA', 'chat_metadata.extensions.LittleWhiteBox must be an object');
    }
    return root;
}

function getCurrentRoot(metadata) {
    return getLittleWhiteBoxRoot(metadata)?.xiaobaiOs;
}

function ensureRecordContainer(parent, key, path) {
    if (parent[key] === undefined) parent[key] = {};
    if (!isRecord(parent[key])) {
        throw new XiaobaiOsDataError('INVALID_CHAT_METADATA', `${path} must be an object`, path);
    }
    return parent[key];
}

function installCurrentRoot(metadata, value) {
    const extensions = ensureRecordContainer(metadata, 'extensions', 'chat_metadata.extensions');
    const littleWhiteBox = ensureRecordContainer(extensions, 'LittleWhiteBox', 'chat_metadata.extensions.LittleWhiteBox');
    littleWhiteBox.xiaobaiOs = value;
}

function deleteCurrentRoot(metadata, expected) {
    const extensions = metadata.extensions;
    const littleWhiteBox = extensions?.LittleWhiteBox;
    if (!isRecord(littleWhiteBox)) return;
    if (expected !== undefined && littleWhiteBox.xiaobaiOs !== expected) return;
    delete littleWhiteBox.xiaobaiOs;
    if (Object.keys(littleWhiteBox).length === 0) delete extensions.LittleWhiteBox;
    if (isRecord(extensions) && Object.keys(extensions).length === 0) delete metadata.extensions;
}

function deleteLegacyRoot(metadata, chatId, expected) {
    const chatRoot = metadata[chatId];
    const extensions = chatRoot?.extensions;
    const littleWhiteBox = extensions?.LittleWhiteBox;
    if (!isRecord(chatRoot) || !isRecord(extensions) || !isRecord(littleWhiteBox)) return;
    if (expected !== undefined && littleWhiteBox.fw !== expected) return;
    delete littleWhiteBox.fw;
    if (Object.keys(littleWhiteBox).length === 0) delete extensions.LittleWhiteBox;
    if (Object.keys(extensions).length === 0) delete chatRoot.extensions;
    if (Object.keys(chatRoot).length === 0) delete metadata[chatId];
}

function restoreLegacyRoot(metadata, chatId, value) {
    const chatRoot = ensureRecordContainer(metadata, chatId, `chat_metadata.${chatId}`);
    const extensions = ensureRecordContainer(chatRoot, 'extensions', `chat_metadata.${chatId}.extensions`);
    const littleWhiteBox = ensureRecordContainer(extensions, 'LittleWhiteBox', `chat_metadata.${chatId}.extensions.LittleWhiteBox`);
    if (!Object.hasOwn(littleWhiteBox, 'fw')) littleWhiteBox.fw = value;
}

function currentFourthWall(metadata) {
    const root = getCurrentRoot(metadata);
    if (root === undefined) return null;
    validateXiaobaiOsChatData(root);
    return root.apps.fourthWall ?? null;
}

/**
 * Creates the sole repository for current-chat Xiaobai OS data.
 *
 * @param {{getChatIdentity: () => ({key: string, chatId: string}|string|null), getChatMetadata: (identity: object|string) => object|null, saveChatMetadata: (transaction: object) => Promise<void>|void}} adapter
 * @param {{now?: () => number}} options
 */
export function createChatMetadataRepository(adapter, { now = Date.now } = {}) {
    if (typeof adapter?.getChatIdentity !== 'function'
        || typeof adapter?.getChatMetadata !== 'function'
        || typeof adapter?.saveChatMetadata !== 'function') {
        throw new TypeError('chat repository requires getChatIdentity, getChatMetadata and saveChatMetadata');
    }
    const enqueueWrite = createWriteQueue();

    function captureCurrentChat() {
        const identity = adapter.getChatIdentity();
        if (identity == null) throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'No chat is currently open');
        identityKey(identity);
        const metadata = adapter.getChatMetadata(identity);
        if (!isRecord(metadata)) throw new XiaobaiOsDataError('CHAT_UNAVAILABLE', 'Current chat metadata is unavailable');
        return { identity, metadata, chatId: identityChatId(identity) };
    }

    function assertStillCurrent(captured) {
        const currentIdentity = adapter.getChatIdentity();
        if (!sameIdentity(captured.identity, currentIdentity)
            || adapter.getChatMetadata(currentIdentity) !== captured.metadata) {
            throw new XiaobaiOsDataError('CHAT_CHANGED', 'The active chat changed before metadata could be saved');
        }
    }

    async function saveInstalled(captured, installed, previous) {
        try {
            assertStillCurrent(captured);
            await adapter.saveChatMetadata({
                identity: captured.identity,
                metadata: captured.metadata,
                xiaobaiOs: cloneXiaobaiOsData(installed),
            });
        } catch (error) {
            const liveRoot = getCurrentRoot(captured.metadata);
            if (installed === undefined) {
                if (liveRoot === undefined && previous !== undefined) {
                    installCurrentRoot(captured.metadata, previous);
                }
            } else if (liveRoot === installed) {
                if (previous === undefined) deleteCurrentRoot(captured.metadata, installed);
                else installCurrentRoot(captured.metadata, previous);
            }
            throw error;
        }
    }

    function readCurrentChatFourthWall() {
        const captured = captureCurrentChat();
        const fourthWall = currentFourthWall(captured.metadata);
        return fourthWall === null ? null : cloneXiaobaiOsData(fourthWall);
    }

    async function prepareCurrentChatFourthWall() {
        return enqueueWrite(async () => {
            const captured = captureCurrentChat();
            const existingRoot = getCurrentRoot(captured.metadata);
            if (existingRoot !== undefined) {
                validateXiaobaiOsChatData(existingRoot);
                if (existingRoot.apps.fourthWall !== undefined) {
                    return cloneXiaobaiOsData(existingRoot.apps.fourthWall);
                }
            }

            const legacy = getLegacyFourthWallChat(captured.metadata, captured.chatId);
            const legacySnapshot = legacy ? cloneXiaobaiOsData(legacy) : null;
            const nextRoot = legacy
                ? migrateLegacyFourthWallChat(captured.metadata, captured.chatId, now())
                : createDefaultXiaobaiOsChatData(now());
            if (existingRoot !== undefined) {
                nextRoot.apps = {
                    ...cloneXiaobaiOsData(existingRoot.apps),
                    fourthWall: nextRoot.apps.fourthWall,
                };
            }
            validateXiaobaiOsChatData(nextRoot);
            assertStillCurrent(captured);
            const installed = cloneXiaobaiOsData(nextRoot);
            installCurrentRoot(captured.metadata, installed);
            if (legacy) deleteLegacyRoot(captured.metadata, captured.chatId, legacy);

            try {
                await saveInstalled(captured, installed, existingRoot === undefined ? undefined : cloneXiaobaiOsData(existingRoot));
            } catch (error) {
                if (legacySnapshot && !getLegacyFourthWallChat(captured.metadata, captured.chatId)) {
                    restoreLegacyRoot(captured.metadata, captured.chatId, legacySnapshot);
                }
                throw error;
            }
            return cloneXiaobaiOsData(installed.apps.fourthWall);
        });
    }

    async function mutateCurrentChatFourthWall(action) {
        if (typeof action !== 'function') throw new TypeError('chat mutation action must be a function');
        return enqueueWrite(async () => {
            const captured = captureCurrentChat();
            const currentRoot = getCurrentRoot(captured.metadata);
            if (currentRoot === undefined) {
                throw new XiaobaiOsDataError('CHAT_NOT_PREPARED', 'Current chat fourth-wall data has not been prepared');
            }
            validateXiaobaiOsChatData(currentRoot);
            if (currentRoot.apps.fourthWall === undefined) {
                throw new XiaobaiOsDataError('CHAT_NOT_PREPARED', 'Current chat fourth-wall data has not been prepared');
            }
            const previous = cloneXiaobaiOsData(currentRoot);
            const nextFourthWall = action(cloneXiaobaiOsData(previous.apps.fourthWall));
            if (!isRecord(nextFourthWall)) throw new TypeError('chat mutation action must return the complete next state');
            const next = cloneXiaobaiOsData(previous);
            next.apps.fourthWall = nextFourthWall;
            validateXiaobaiOsChatData(next);
            assertStillCurrent(captured);
            const installed = cloneXiaobaiOsData(next);
            installCurrentRoot(captured.metadata, installed);
            await saveInstalled(captured, installed, previous);
            return cloneXiaobaiOsData(installed.apps.fourthWall);
        });
    }

    async function deleteCurrentChatFourthWall() {
        return enqueueWrite(async () => {
            const captured = captureCurrentChat();
            const currentRoot = getCurrentRoot(captured.metadata);
            if (currentRoot === undefined) return false;
            validateXiaobaiOsChatData(currentRoot);
            if (currentRoot.apps.fourthWall === undefined) return false;
            const previous = cloneXiaobaiOsData(currentRoot);
            const next = cloneXiaobaiOsData(currentRoot);
            delete next.apps.fourthWall;
            const installed = Object.keys(next.apps).length === 0 ? undefined : next;
            assertStillCurrent(captured);
            if (installed === undefined) deleteCurrentRoot(captured.metadata, currentRoot);
            else installCurrentRoot(captured.metadata, installed);
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
