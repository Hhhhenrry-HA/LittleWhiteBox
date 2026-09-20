import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import type { ManagementRegistry } from '../../../capabilities/management/index.js';
import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';
import { createAdministratorToolExecutor, type AdministratorToolExecutor } from '../agent/tool-executor.js';
import { createAdministratorCheckpoint, runAdministratorLoop, type AdministratorLoopCheckpoint } from '../agent/provider-loop.js';
import { administratorTurnMessages, contextUsage, historyBefore, referenceSummary } from '../agent/history.js';
import { ADMINISTRATOR_PROMPT, ADMINISTRATOR_READ_ONLY_PROMPT, ADMINISTRATOR_RETRY_PROMPT } from '../agent/prompt.js';
import { ADMINISTRATOR_POLICY as POLICY } from '../domain/policy.js';
import { invalidateSummary, settledOperations } from '../domain/data.js';
import type { AdministratorContextUsage, AdministratorLive, AdministratorOperation, AdministratorTurn } from '../domain/types.js';
import { createAdministratorChatReader, type AdministratorChatSurface } from '../host/chat-reader.js';
import type { AdministratorRepository } from '../storage/repository.js';
import { parseAdministratorUpload, type AdministratorImages, type AdministratorUpload } from '../storage/images.js';
import type { AdministratorConversation } from './conversation.js';
import { administratorError, ADMINISTRATOR_COPY } from '../ui/copy.js';

interface ActiveRun {
    current(): boolean;
    identity: string; sourceIdentity: string; turn: AdministratorTurn; readOnly: boolean; retrying: boolean;
    abort: AbortController; checkpoint: AdministratorLoopCheckpoint; executor: AdministratorToolExecutor | null;
    reader: ReturnType<typeof createAdministratorChatReader>; config: unknown; text: string;
    phase: AdministratorLive['phase']; promise: Promise<void> | null;
    preview: AdministratorOperation[];
    failed: boolean;
}
interface PendingSend {
    turn: AdministratorTurn;
    input: AdministratorUpload | null;
    current(): boolean;
    stopped: boolean;
}
export function createAdministratorRuntime(deps: {
    conversation: AdministratorConversation; repository: AdministratorRepository; images: AdministratorImages;
    gateway: XiaobaiOsAgentGateway; management: ManagementRegistry; capture(): AdministratorChatSurface | null;
    changed(): void;
}) {
    const { conversation, repository } = deps;
    let run: ActiveRun | null = null;
    let pendingSend: PendingSend | null = null;
    let error = '';
    let usage: AdministratorContextUsage = { used: 0, limit: POLICY.inputBudget, trigger: POLICY.summaryTrigger, rules: 0, tools: 0, history: 0, images: 0, runtime: 0 };
    let streamTimer: ReturnType<typeof setTimeout> | null = null;
    const sameChat = (active: ActiveRun) => active.current() && repository.identity() === active.identity && deps.capture()?.identityKey === active.sourceIdentity;
    function changed(immediate = false) {
        if (immediate) { if (streamTimer) { clearTimeout(streamTimer); streamTimer = null; } deps.changed(); }
        else if (!streamTimer) { streamTimer = setTimeout(() => { streamTimer = null; deps.changed(); }, POLICY.streamInterval); }
    }
    async function persistTurn(active: ActiveRun, final = false, receiptsOnly = false) {
        if (active.readOnly && !final) { return; }
        if (!sameChat(active)) { throw new Error('administrator_context_changed'); }
        const candidate = structuredClone(conversation.read());
        const index = candidate.turns.findIndex(turn => turn.id === active.turn.id);
        if (index < 0) { throw new Error('administrator_message_missing'); }
        if (receiptsOnly) {
            candidate.turns[index].operations = candidate.turns[index].operations.map(previous => {
                const confirmed = active.turn.operations.find(operation => operation.id === previous.id);
                return confirmed && ['saved', 'partial', 'unchanged'].includes(confirmed.status) ? { ...confirmed } : previous;
            });
            if (JSON.stringify(candidate.turns[index].operations) === JSON.stringify(conversation.read().turns[index].operations)) { return; }
            await conversation.save(candidate, () => sameChat(active)); return;
        }
        if (active.readOnly) { invalidateSummary(candidate, active.turn.id); }
        if (active.readOnly) { Object.assign(candidate.turns[index], { assistant: active.turn.assistant, status: active.turn.status, error: active.turn.error }); }
        else { candidate.turns[index] = { ...structuredClone(active.turn), operations: settledOperations(active.turn.operations) }; }
        if (!active.readOnly && active.checkpoint.compactedThrough) {
            candidate.summary = { text: active.checkpoint.summary, throughId: active.checkpoint.compactedThrough };
        }
        await conversation.save(candidate, () => sameChat(active));
    }
    async function perform(active: ActiveRun) {
        try {
            if (!active.executor) {
                active.config = await deps.gateway.loadConfig();
                active.executor = await createAdministratorToolExecutor({ registry: deps.management, reader: active.reader, readOnly: active.readOnly,
                    operations: active.readOnly ? [] : active.turn.operations,
                    guard: () => sameChat(active) && active.reader.isCurrent(), onChange: () => { if (sameChat(active)) { changed(true); } },
                    saveReceipts: confirmed => persistTurn(active, false, confirmed),
                });
            }
            active.abort.signal.throwIfAborted();
            const image = active.turn.user?.image;
            const dataUrl = image ? await deps.images.load(repository.osId()!, image, active.abort.signal) : null;
            const userText = active.turn.user?.text ?? '';
            const text = await runAdministratorLoop({ gateway: deps.gateway, config: active.config, checkpoint: active.checkpoint,
                system: [ADMINISTRATOR_PROMPT, active.executor.prompt, active.readOnly ? ADMINISTRATOR_READ_ONLY_PROMPT : active.retrying ? ADMINISTRATOR_RETRY_PROMPT : ''].filter(Boolean).join('\n\n'),
                prefix: [{ role: 'system', content: `Current reference data:\n${safePromptJson({ ...active.executor.data,
                    ...(active.readOnly || active.retrying ? { previousAttempt: { operations: active.turn.operations, status: active.turn.status, error: active.turn.error } } : {}) })}` }],
                request: { role: 'user', content: dataUrl ? [{ type: 'text', text: userText || ADMINISTRATOR_COPY.imageRequest }, { type: 'image_url', image_url: { url: dataUrl } }] : userText },
                requestForCounting: { role: 'user', content: userText }, imageCount: dataUrl ? 1 : 0,
                tools: active.executor.tools, signal: active.abort.signal, execute: active.executor.execute,
                onText: value => { active.text = value; if (sameChat(active)) { changed(); } },
                onPhase: value => { active.phase = value; if (sameChat(active)) { changed(true); } },
                onContext: value => { if (sameChat(active)) { usage = value; changed(); } },
                onToolPreview: names => { active.preview = active.executor!.preview(names); if (sameChat(active)) { changed(); } },
            });
            active.turn.assistant = text; active.turn.status = 'finished'; active.turn.error = '';
            active.phase = 'saving'; changed(true);
            await persistTurn(active, true);
            active.failed = false;
            active.checkpoint = createAdministratorCheckpoint([], '');
            active.executor.releaseCheckpoint(); active.reader.releaseEvidence(); active.config = null;
            if (run === active) { error = ''; }
        } catch (cause) {
            active.failed = true;
            const reason = active.abort.signal.aborted ? ADMINISTRATOR_COPY.stopped : administratorError(cause);
            if (run === active) { error = reason; }
            if (!active.readOnly && sameChat(active)) {
                active.turn.status = active.abort.signal.aborted ? 'interrupted' : 'failed';
                active.turn.error = reason;
                // Partial prose is visible as interrupted, never as a completed reply.
                active.turn.assistant = active.text || null;
                if (!conversation.unsaved()) {
                    try { await persistTurn(active); }
                    catch (saveError) { if (run === active) { error = `${reason}\n${administratorError(saveError)}`; } }
                }
            }
        } finally {
            active.promise = null;
            if (run === active && sameChat(active)) { changed(true); }
        }
    }
    async function launch(turnId: string, readOnly: boolean, retrying: boolean) {
        if (run?.promise) { throw new Error('administrator_busy'); }
        const turn = conversation.read().turns.find(t => t.id === turnId);
        if (!turn?.user) { throw new Error('administrator_message_missing'); }
        const source = deps.capture();
        if (!source) { throw new Error('administrator_chat_unavailable'); }
        const history = historyBefore(conversation.read(), turn.id);
        const active: ActiveRun = { current: conversation.capture(), identity: repository.identity(), sourceIdentity: source.identityKey, turn: structuredClone(turn), readOnly, retrying,
            abort: new AbortController(), checkpoint: createAdministratorCheckpoint(history.turns, history.summary), executor: null, config: null,
            text: '', phase: 'preparing', promise: null, preview: [], failed: false, reader: createAdministratorChatReader(deps.capture, () => active.abort.signal) };
        run = active; error = '';
        active.promise = perform(active); changed(true);
    }
    async function continueSend(sending: PendingSend) {
        const guard = () => !sending.stopped && sending.current() && pendingSend === sending;
        const assertCurrent = () => { if (!guard()) { throw new Error('administrator_context_changed'); } };
        try {
            assertCurrent();
            if (sending.input && !repository.osId()) { await conversation.save(conversation.read(), guard); }
            assertCurrent();
            if (sending.input && !sending.turn.user!.image) {
                const osId = repository.osId()!;
                const image = await deps.images.save(osId, sending.input);
                if (!guard()) { await deps.images.remove(osId, image); assertCurrent(); }
                sending.turn.user!.image = image;
                sending.input = null;
            }
            assertCurrent();
            if (!conversation.read().turns.some(turn => turn.id === sending.turn.id)) {
                const candidate = structuredClone(conversation.read()); candidate.turns.push(sending.turn);
                await conversation.save(candidate, guard);
            }
            assertCurrent();
            pendingSend = null;
            await launch(sending.turn.id, false, false);
        } catch (cause) {
            // Only an unconfirmed save needs a live continuation. Upload failure leaves the UI draft resendable.
            if (pendingSend === sending && !conversation.unsaved()) { pendingSend = null; }
            throw cause;
        }
        return sending.turn.id;
    }
    return {
        busy: () => !!run?.promise,
        sendTurnId: () => pendingSend?.current() ? pendingSend.turn.id : run && !run.readOnly && sameChat(run) ? run.turn.id : null,
        error: () => error,
        context: () => usage,
        async prepareContext() {
            if (run?.promise || conversation.corrupted()) { return; }
            const sourceIdentity = deps.capture()?.identityKey;
            if (!sourceIdentity) { return; }
            const current = conversation.capture();
            const abort = new AbortController();
            const reader = createAdministratorChatReader(deps.capture, () => abort.signal);
            const executor = await createAdministratorToolExecutor({ registry: deps.management, reader, readOnly: false, operations: [], guard: () => false, onChange() {}, async saveReceipts() {} });
            if (!current() || run?.promise || deps.capture()?.identityKey !== sourceIdentity) { return; }
            const data = conversation.read(), boundary = data.summary ? data.turns.findIndex(t => t.id === data.summary!.throughId) : -1;
            usage = contextUsage([ADMINISTRATOR_PROMPT, executor.prompt].join('\n\n'), executor.tools,
                [{ role: 'system', content: `Current reference data:\n${safePromptJson(executor.data)}` }],
                [...referenceSummary(data.summary?.text ?? ''), ...data.turns.slice(boundary + 1).flatMap(administratorTurnMessages)], [], 0, {});
            changed(true);
        },
        retryTurnId: () => run && !run.promise && run.failed && sameChat(run) ? run.turn.id : null,
        async confirmed(resumeSend = true) {
            if (conversation.unsaved()) { return; }
            const sending = pendingSend;
            if (sending?.current()) {
                if (resumeSend && !sending.stopped) {
                    await continueSend(sending); return;
                }
                pendingSend = null;
            }
            if (run && sameChat(run) && conversation.read().turns.some(turn => turn.id === run!.turn.id)) {
                const active = run;
                const inspection = await active.executor?.confirmSaved();
                if (run === active && sameChat(active)) {
                    if (inspection?.status === 'superseded') { error = administratorError(new Error('management_request_superseded')); }
                    if (inspection?.status === 'unverifiable') { error = administratorError(inspection.error); }
                }
            }
            if (run?.failed && !conversation.unsaved()) {
                const actual = conversation.read().turns.find(turn => turn.id === run!.turn.id);
                if (actual?.status === 'finished' && actual.assistant === run.turn.assistant) {
                    run.failed = false; run.checkpoint = createAdministratorCheckpoint([], ''); run.executor?.releaseCheckpoint(); run.reader.releaseEvidence(); error = '';
                }
            }
            await this.prepareContext();
        },
        live(): AdministratorLive | null {
            return run?.promise && sameChat(run) ? { turnId: run.turn.id, text: run.text.slice(0, POLICY.textBlock), totalChars: run.text.length,
                operations: [...run.turn.operations, ...run.preview].slice(-POLICY.visibleOperations), operationCount: run.turn.operations.length + run.preview.length, phase: run.phase } : null;
        },
        async send(text: string, upload?: unknown) {
            if (run?.promise || conversation.unsaved()) { throw new Error('administrator_busy'); }
            if (typeof text !== 'string' || text.length > 16000 || !text.trim() && !upload) { throw new Error('administrator_input_invalid'); }
            const identity = repository.identity(), source = deps.capture()?.identityKey;
            const current = conversation.capture();
            const guard = () => current() && identity === repository.identity() && !!source && source === deps.capture()?.identityKey;
            const input: AdministratorUpload | null = upload ? parseAdministratorUpload(upload) : null;
            run = null; error = '';
            const turn: AdministratorTurn = { id: crypto.randomUUID(), createdAt: Date.now(), user: { text: text.trim() },
                assistant: null, operations: [], status: 'interrupted', error: '' };
            const sending: PendingSend = { turn, input, current: guard, stopped: false };
            pendingSend = sending;
            return continueSend(sending);
        },
        regenerate: (turnId: string) => launch(turnId, true, false),
        async retry(turnId: string) {
            if (run?.promise || conversation.unsaved()) { throw new Error('administrator_busy'); }
            if (run?.failed && run.turn.id === turnId && sameChat(run)) {
                run.abort = new AbortController(); run.retrying = true; error = ''; run.text = '';
                run.promise = perform(run); changed(true); return;
            }
            // After reload the live execution checkpoint is gone. Recheck facts without replaying uncertain writes.
            await launch(turnId, true, true);
        },
        evidence(reference: string, offset?: unknown) {
            if (!run?.executor || !sameChat(run)) { throw new Error('administrator_evidence_expired'); }
            return run.executor.evidence(reference, offset);
        },
        stop() { run?.abort.abort(); if (pendingSend) { pendingSend.stopped = true; } },
        async reset() {
            if (pendingSend) { pendingSend.stopped = true; }
            const previous = run; run = null; pendingSend = null; previous?.abort.abort();
            error = ''; usage = { ...usage, used: 0, history: 0, rules: 0, tools: 0, images: 0, runtime: 0 };
            if (streamTimer) { clearTimeout(streamTimer); streamTimer = null; }
            if (previous?.promise) { await previous.promise; }
        },
    };
}
export type AdministratorRuntime = ReturnType<typeof createAdministratorRuntime>;
