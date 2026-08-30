import { createDefaultFourthWallChatState } from '../domain/defaults.js';
import type { FourthWallChatState } from '../types.js';
import type { XiaobaiOsChatData } from '../../../types.js';
import type {
    RootMutationContext,
    RootMutationMetadataEffect,
    RootMutationOptions,
    XiaobaiOsChatDataStore,
} from '../../../host/chat-data-store.js';
import {
    cloneXiaobaiOsData,
    getLegacyFourthWallChat,
    migrateLegacyFourthWallChat,
    validateFourthWallChatState,
    XiaobaiOsDataError,
} from '../../../host/legacy-migration.js';

type UnknownRecord = Record<string, unknown>;

export interface FourthWallChatRepository {
    prepareCurrentChatFourthWall: () => Promise<FourthWallChatState>;
    readCurrentChatFourthWall: () => FourthWallChatState | null;
    mutateCurrentChatFourthWall: (
        action: (current: FourthWallChatState) => FourthWallChatState,
        options?: RootMutationOptions,
    ) => Promise<FourthWallChatState>;
    deleteCurrentChatFourthWall: () => Promise<boolean>;
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function ensureRecordContainer(parent: UnknownRecord, key: string, path: string): UnknownRecord {
    if (parent[key] === undefined) {parent[key] = {};}
    if (!isRecord(parent[key])) {
        throw new XiaobaiOsDataError('INVALID_CHAT_METADATA', `${path} must be an object`, path);
    }
    return parent[key];
}

function deleteLegacyRoot(metadata: UnknownRecord, chatId: string, expected: UnknownRecord): void {
    const chatRoot = metadata[chatId];
    if (!isRecord(chatRoot)) {return;}
    const extensions = chatRoot.extensions;
    if (!isRecord(extensions)) {return;}
    const littleWhiteBox = extensions.LittleWhiteBox;
    if (!isRecord(littleWhiteBox) || littleWhiteBox.fw !== expected) {return;}
    delete littleWhiteBox.fw;
    if (Object.keys(littleWhiteBox).length === 0) {delete extensions.LittleWhiteBox;}
    if (Object.keys(extensions).length === 0) {delete chatRoot.extensions;}
    if (Object.keys(chatRoot).length === 0) {delete metadata[chatId];}
}

function restoreLegacyRoot(metadata: UnknownRecord, chatId: string, value: UnknownRecord): void {
    const chatRoot = ensureRecordContainer(metadata, chatId, `chat_metadata.${chatId}`);
    const extensions = ensureRecordContainer(chatRoot, 'extensions', `chat_metadata.${chatId}.extensions`);
    const littleWhiteBox = ensureRecordContainer(
        extensions,
        'LittleWhiteBox',
        `chat_metadata.${chatId}.extensions.LittleWhiteBox`,
    );
    if (!Object.hasOwn(littleWhiteBox, 'fw')) {littleWhiteBox.fw = value;}
}

function createLegacyEffect(
    context: RootMutationContext,
    legacy: UnknownRecord,
): RootMutationMetadataEffect {
    const snapshot = cloneXiaobaiOsData(legacy);
    return {
        apply: () => deleteLegacyRoot(context.metadata, context.chatId, legacy),
        rollback: () => restoreLegacyRoot(context.metadata, context.chatId, snapshot),
    };
}

function readFourthWall(root: XiaobaiOsChatData | null): FourthWallChatState | null {
    const value = root?.apps.fourthWall;
    if (value === undefined) {return null;}
    validateFourthWallChatState(value, 'xiaobaiOs.apps.fourthWall');
    return cloneXiaobaiOsData(value);
}

export function createFourthWallRepository(
    store: XiaobaiOsChatDataStore,
    { now = Date.now }: { now?: () => number } = {},
): FourthWallChatRepository {
    function readCurrentChatFourthWall(): FourthWallChatState | null {
        return readFourthWall(store.readCurrent());
    }

    function prepareCurrentChatFourthWall(): Promise<FourthWallChatState> {
        return store.mutateCurrent((current, context) => {
            const existing = readFourthWall(current);
            if (existing) {return { next: current, result: existing };}

            const legacy = getLegacyFourthWallChat(context.metadata, context.chatId);
            let fourthWall: FourthWallChatState;
            let metadataEffect: RootMutationMetadataEffect | undefined;
            if (legacy) {
                const migrated = migrateLegacyFourthWallChat(context.metadata, context.chatId, now());
                const migratedState = migrated?.apps.fourthWall;
                if (!migratedState) {
                    throw new XiaobaiOsDataError('INVALID_LEGACY_DATA', 'Legacy fourth-wall data disappeared');
                }
                fourthWall = cloneXiaobaiOsData(migratedState);
                metadataEffect = createLegacyEffect(context, legacy);
            } else {
                fourthWall = createDefaultFourthWallChatState(now());
            }
            const next: XiaobaiOsChatData = current
                ? cloneXiaobaiOsData(current)
                : { schemaVersion: 2, apps: {}, domains: {} };
            next.apps.fourthWall = cloneXiaobaiOsData(fourthWall);
            return { next, result: cloneXiaobaiOsData(fourthWall), metadataEffect };
        });
    }

    function mutateCurrentChatFourthWall(
        action: (current: FourthWallChatState) => FourthWallChatState,
        options: RootMutationOptions = {},
    ): Promise<FourthWallChatState> {
        if (typeof action !== 'function') {return Promise.reject(new TypeError('chat mutation action must be a function'));}
        return store.mutateCurrent((current) => {
            const existing = readFourthWall(current);
            if (!current || !existing) {
                throw new XiaobaiOsDataError('CHAT_NOT_PREPARED', 'Current chat fourth-wall data is not prepared');
            }
            const result = action(existing);
            if (!isRecord(result)) {
                throw new TypeError('chat mutation action must return the complete next state');
            }
            const next = cloneXiaobaiOsData(current);
            next.apps.fourthWall = cloneXiaobaiOsData(result);
            return { next, result: cloneXiaobaiOsData(result) };
        }, options);
    }

    function deleteCurrentChatFourthWall(): Promise<boolean> {
        return store.mutateCurrent((current) => {
            if (!current || current.apps.fourthWall === undefined) {
                return { next: current, result: false };
            }
            const next = cloneXiaobaiOsData(current);
            delete next.apps.fourthWall;
            const empty = Object.keys(next.apps).length === 0 && Object.keys(next.domains).length === 0;
            return { next: empty ? null : next, result: true };
        });
    }

    return Object.freeze({
        prepareCurrentChatFourthWall,
        readCurrentChatFourthWall,
        mutateCurrentChatFourthWall,
        deleteCurrentChatFourthWall,
    });
}
