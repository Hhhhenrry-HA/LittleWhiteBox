import { parseLearningData } from '../../../domains/learning/data.js';
import type { LearningData } from '../../../domains/learning/types.js';
import type { JsonUserFilePort } from '../../../storage/sidecar-index.js';
import { XiaobaiOsStorageError } from '../../../storage/storage-port.js';
import { createLearningId } from '../application/identity.js';
import { LEARNING_FILENAME, MAX_LEARNING_WRITE_BYTES, parseLearningDocument, sameLearningDocument, type LearningDocument } from './document.js';

export class LearningStorageError extends Error {
    constructor(readonly code: string) { super(code); }
}

type SaveResult =
    | { status: 'confirmed' | 'unchanged'; document: LearningDocument | null }
    | { status: 'cancelled' | 'unconfirmed' | 'conflict' };

interface PendingWrite {
    expected: LearningDocument | null;
    candidate: LearningDocument;
    acknowledged: boolean;
}

/** One instance per host session; closing the OS must not discard an uncertain upload. */
export function createLearningRepository(files: JsonUserFilePort, options: {
    createId?: () => string;
    locks?: Pick<LockManager, 'request'> | null;
} = {}) {
    const createId = options.createId ?? createLearningId;
    const locks = options.locks === undefined ? globalThis.navigator?.locks : options.locks;
    let confirmed: LearningDocument | null | undefined;
    let pending: PendingWrite | null = null;
    let conflict = false;
    let queue: Promise<unknown> = Promise.resolve();

    function enqueue<T>(work: () => Promise<T>): Promise<T> {
        const run = () => locks ? locks.request(LEARNING_FILENAME, work) : work();
        const result = queue.then(run, run);
        queue = result.catch(() => undefined);
        return result;
    }

    async function readFile(): Promise<LearningDocument | null> {
        let raw;
        try { raw = await files.read(LEARNING_FILENAME); }
        catch { throw new LearningStorageError('learning_read_failed'); }
        if (raw === null) { return null; }
        try { return parseLearningDocument(raw); }
        catch { throw new LearningStorageError('learning_file_invalid'); }
    }

    function snapshot() {
        return { document: structuredClone(confirmed),
            status: conflict ? 'conflict' as const : pending ? 'unconfirmed' as const : confirmed === undefined ? 'unloaded' as const : 'ready' as const };
    }

    async function verifyWrite(): Promise<SaveResult> {
        if (!pending) { return { status: conflict ? 'conflict' : 'unchanged', document: structuredClone(confirmed ?? null) }; }
        let observed;
        try { observed = await readFile(); }
        catch { return { status: 'unconfirmed' }; }
        if (sameLearningDocument(observed, pending.candidate)) {
            confirmed = observed;
            pending = null;
            conflict = false;
            return { status: 'confirmed', document: structuredClone(confirmed) };
        }
        conflict = !sameLearningDocument(observed, pending.expected);
        return { status: conflict ? 'conflict' : 'unconfirmed' };
    }

    async function upload(entry: PendingWrite): Promise<SaveResult> {
        pending = entry;
        try {
            await files.replace(LEARNING_FILENAME, structuredClone(entry.candidate));
            entry.acknowledged = true;
        } catch (error) {
            const status = error instanceof XiaobaiOsStorageError ? error.httpStatus : undefined;
            if (status !== undefined && status >= 400 && status < 500 && status !== 408 && status !== 429) {
                pending = null;
                throw new LearningStorageError('learning_write_rejected');
            }
            // A rejected fetch may still complete on the server. Never resend it on this evidence alone.
        }
        return verifyWrite();
    }

    function save(expected: LearningDocument | null, data: LearningData, isCurrent: () => boolean): Promise<SaveResult> {
        // Freeze caller inputs before entering the queue; queued changes cannot mutate this intent.
        const baseline = expected === null ? null : parseLearningDocument(expected);
        const next = parseLearningData(data);
        return enqueue(async () => {
            if (!isCurrent()) { return { status: 'cancelled' }; }
            if (pending || conflict) { throw new LearningStorageError('learning_resolve_pending_first'); }
            const observed = await readFile();
            if (!isCurrent()) { return { status: 'cancelled' }; }
            if (!sameLearningDocument(baseline, observed)) {
                conflict = true;
                return { status: 'conflict' };
            }
            confirmed = observed;
            if (JSON.stringify(observed?.data ?? { profiles: [] }) === JSON.stringify(next)) {
                return { status: 'unchanged', document: structuredClone(observed) };
            }
            const candidate = parseLearningDocument({ schemaVersion: 1, revision: (observed?.revision ?? 0) + 1,
                commitId: createId(), data: next });
            if (candidate.commitId === observed?.commitId) { throw new LearningStorageError('learning_commit_id_reused'); }
            if (new TextEncoder().encode(JSON.stringify(candidate)).byteLength > MAX_LEARNING_WRITE_BYTES) {
                throw new LearningStorageError('learning_file_full');
            }
            if (!isCurrent()) { return { status: 'cancelled' }; }
            return upload({ expected: observed, candidate, acknowledged: false });
        });
    }

    return Object.freeze({
        snapshot,
        save,
        read: () => enqueue(async () => {
            if (pending) { await verifyWrite(); }
            else if (!conflict) { confirmed = await readFile(); }
            return snapshot();
        }),
        verify: () => enqueue(verifyWrite),
        retry: (isCurrent: () => boolean) => enqueue(async (): Promise<SaveResult> => {
            const result = await verifyWrite();
            if (!pending || result.status === 'conflict' || result.status === 'confirmed') { return result; }
            if (!pending.acknowledged) { return { status: 'unconfirmed' }; }
            if (!isCurrent()) { return { status: 'cancelled' }; }
            // Only a completed upload plus an unchanged server baseline permits an explicit resend.
            const observed = await readFile();
            if (!sameLearningDocument(observed, pending.expected)) { return verifyWrite(); }
            if (!isCurrent()) { return { status: 'cancelled' }; }
            return upload({ ...pending, acknowledged: false });
        }),
        adoptServer: () => enqueue(async () => {
            if (pending && !pending.acknowledged) {
                await verifyWrite();
                if (pending) { throw new LearningStorageError('learning_upload_unresolved'); }
            }
            const observed = await readFile();
            confirmed = observed;
            pending = null;
            conflict = false;
            return snapshot();
        }),
        clear: (expected: LearningDocument | null, isCurrent: () => boolean) => save(expected, { profiles: [] }, isCurrent),
    });
}
