import type { ManagementRegistry, ManagementResult, ManagementSession, ManagementTool } from '../../../capabilities/management/index.js';
import { MANAGEMENT_READ_CHARS, textPage } from '../../../capabilities/management/read-page.js';
import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';
import type { AdministratorOperation } from '../domain/types.js';
import type { createAdministratorChatReader } from '../host/chat-reader.js';
import { ADMINISTRATOR_CHAT_TOOLS } from './chat-tools.js';
import { ADMINISTRATOR_COPY } from '../ui/copy.js';
import { createAdministratorToolResults } from './tool-results.js';
import { createAdministratorId } from '../application/identity.js';

type Reader = ReturnType<typeof createAdministratorChatReader>;
export async function createAdministratorToolExecutor(options: {
    registry: ManagementRegistry; reader: Reader; readOnly: boolean; operations: AdministratorOperation[];
    guard(): boolean; onChange(): void; saveReceipts(confirmedOnly?: boolean): Promise<void>;
}) {
    const runId = createAdministratorId();
    const routes = new Map<string, { appId: string; tool: ManagementTool; session: ManagementSession | null }>();
    const domains: { id: string; prompt: string; data: unknown }[] = [];
    const unavailable: { id: string; error: string }[] = [];
    const evidence = createAdministratorToolResults();
    let completed: { id: string; output: unknown } | null = null;
    let pending: { id: string; operation: AdministratorOperation; session: ManagementSession } | null = null;
    for (const participant of options.registry.list()) {
        let session: ManagementSession;
        try { session = await participant.open(); }
        catch (error) { unavailable.push({ id: participant.id, error: String(error instanceof Error ? error.message : error) }); continue; }
        const initial = safePromptJson(session.initial);
        domains.push({ id: participant.id, prompt: session.prompt, data: initial.length <= MANAGEMENT_READ_CHARS ? session.initial : { ...textPage(initial), detail: 'Initial data is paged. Use this APP’s read tools for the complete records.' } });
        for (const tool of session.tools) {
            if (routes.has(tool.definition.function.name)) { throw new Error('administrator_duplicate_tool'); }
            routes.set(tool.definition.function.name, { appId: participant.id, tool, session });
        }
    }
    for (const tool of ADMINISTRATOR_CHAT_TOOLS) { routes.set(tool.definition.function.name, { appId: 'story', tool, session: null }); }
    const resultRead: ManagementTool = { effect: 'read', label: ADMINISTRATOR_COPY.evidence, target: args => String(args.reference ?? ''), definition: { type: 'function', function: {
        name: 'ToolResultRead', description: `Continue a large tool result from this run. data contains reference, text, offset, nextOffset and totalChars, at most ${MANAGEMENT_READ_CHARS} text characters. Keep the same reference and follow nextOffset until null to finish this result; any continuation inside the recovered result belongs to its original tool. For expired or oversized results, read the original source again in smaller pages.`,
        parameters: { type: 'object', properties: { reference: { type: 'string', description: 'data.reference from the original result page.' }, offset: { type: 'integer', minimum: 0, description: 'data.nextOffset from the previous page; default 0.' } }, required: ['reference'], additionalProperties: false },
    } } };
    routes.set('ToolResultRead', { appId: 'administrator', tool: resultRead, session: null });
    function complete(operation: AdministratorOperation, result: ManagementResult, continuation = false) {
        operation.status = result.status;
        const report = result.data && typeof result.data === 'object' ? result.data as { applied?: unknown[]; skipped?: unknown[] } : null;
        operation.summary = report?.applied || report?.skipped
            ? ADMINISTRATOR_COPY.itemReport(report.applied?.length ?? 0, report.skipped?.length ?? 0) : ADMINISTRATOR_COPY.operations[result.status];
        const output = { ...(continuation ? result : evidence.project(operation.id, result)), receipt: { ...operation } };
        completed = { id: operation.id, output };
        options.onChange();
        return output;
    }
    return {
        tools: [...routes.values()].filter(route => !options.readOnly || route.tool.effect === 'read').map(route => route.tool.definition),
        prompt: domains.map(domain => domain.prompt).join('\n\n'),
        data: { story: options.reader.info, apps: domains.map(({ id, data }) => ({ id, data })), unavailable },
        evidence: evidence.read,
        hasPendingWrite: () => pending !== null,
        releaseCheckpoint() { completed = null; pending = null; },
        async confirmSaved() {
            if (!pending) { return; }
            const inspection = await pending.session.confirmSaved();
            if (!inspection || inspection.status !== 'confirmed') { return inspection; }
            complete(pending.operation, inspection.result); pending = null;
            await options.saveReceipts(true);
            return inspection;
        },
        async execute(name: string, raw: unknown, callId: string): Promise<unknown> {
            const id = `${runId}:${callId}`;
            const route = routes.get(name);
            if (!route) { return { ok: false, status: 'failed', code: 'tool_unavailable' }; }
            // Enforcement is independent of the definitions supplied to the model.
            if (options.readOnly && route.tool.effect === 'write') { return { ok: false, status: 'failed', code: 'read_only' }; }
            if (!raw || typeof raw !== 'object' || Array.isArray(raw)) { return { ok: false, status: 'failed', code: 'arguments_must_be_object' }; }
            const args = raw as Record<string, unknown>;
            if (completed?.id === id) { if (route.tool.effect === 'write') { await options.saveReceipts(); } return completed.output; }
            if (route.tool.effect === 'write' && pending?.id !== id && !options.reader.isCurrent()) {
                return { ok: false, status: 'failed', code: 'story_evidence_changed', floors: options.reader.staleFloors() };
            }
            const operation = options.operations.find(operation => operation.id === id) ?? {
                id, appId: route.appId, name: route.tool.label, target: route.tool.target(args).slice(0, 160),
                status: route.tool.effect === 'write' ? 'saving' as const : 'reading' as const, elapsedMs: 0, summary: '',
            };
            if (!options.operations.includes(operation)) { options.operations.push(operation); }
            const wasUnconfirmed = operation.status === 'unconfirmed';
            operation.status = route.tool.effect === 'write' ? 'saving' : 'reading';
            const started = performance.now(); options.onChange();
            try {
                // Record the attempted write before dispatch, so reload cannot present it as a confirmed success.
                if (route.tool.effect === 'write') { await options.saveReceipts(); }
                let result: ManagementResult;
                if (pending?.id === id) {
                    result = await pending.session.recover(options.guard) ?? await route.session!.execute(name, args, options.guard); pending = null;
                } else if (route.session) {
                    try { result = await route.session.execute(name, args, options.guard); }
                    catch (error) { if (route.tool.effect === 'write') { pending = { id, operation, session: route.session }; } throw error; }
                } else {
                    const data = name === 'ChatRead' ? await options.reader.read(args) : name === 'ChatSearch' ? await options.reader.search(args) : evidence.page(id, String(args.reference), args.offset);
                    result = { ok: true, status: 'read', data };
                }
                operation.elapsedMs += Math.round(performance.now() - started);
                const output = complete(operation, result, name === 'ToolResultRead');
                if (route.tool.effect === 'write') { await options.saveReceipts(); }
                return output;
            } catch (error) {
                if (completed?.id !== id) {
                    operation.status = pending?.id === id && (wasUnconfirmed || (error as { uncertain?: boolean })?.uncertain) ? 'unconfirmed' : 'failed';
                    operation.elapsedMs += Math.round(performance.now() - started);
                    operation.summary = String(error instanceof Error ? error.message : error).slice(0, 350);
                }
                options.onChange();
                if (route.tool.effect === 'read' && (error as Error).name !== 'AbortError' && (error as Error).message !== 'administrator_context_changed') {
                    return { ok: false, status: 'failed', code: (error as Error).message, receipt: { ...operation } };
                }
                throw error;
            }
        },
        preview(names: string[]): AdministratorOperation[] {
            return names.slice(0, 6).flatMap((name, index) => {
                const route = routes.get(name);
                return route ? [{ id: `preview-${index}`, appId: route.appId, name: route.tool.label, target: '', status: 'preparing' as const, elapsedMs: 0, summary: '' }] : [];
            });
        },
    };
}
export type AdministratorToolExecutor = Awaited<ReturnType<typeof createAdministratorToolExecutor>>;
