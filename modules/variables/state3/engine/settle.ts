import type { Compiled, Json, JsonObject, Result, RunOptions, EvaluationContext, Success, Source, SubmissionItem } from '../types.js';
import { changes, clone, assertJson, pathOf, setAt, equal } from './data.js';
import { evaluate, explainCondition } from './expressions.js';
import { reject, diagnostic } from './diagnostics.js';
import { difference } from './difference.js';
import { displayChanges } from './delta-view.js';
import { digest } from '../definition/digest.js';
import { applyDirectInput, inputFields, inspectInput, validateActionParameters } from './input.js';
import { validateState } from './validation.js';
import { authorize } from './permissions.js';
import { createFunctionRunner } from './functions.js';

// A runaway, non-repeating trigger chain must also return control to the player.
export const TRIGGER_ROUND_LIMIT = 1024;

// No storage, host events, or publication here. The returned candidate belongs to
// the caller; every path (including preview) executes this same settlement.
export async function settle(compiled: Compiled, start: Json, input: unknown, { signal, stage }: RunOptions = {}): Promise<Result> {
    const provenance: Success['provenance'] = [], actions: Success['actions'] = [];
    let operationIndex: number | undefined;
    let ruleId: string | undefined;
    let items: SubmissionItem[] | undefined;
    const functions = createFunctionRunner();
    try {
        signal?.throwIfAborted();
        if (stage && !compiled.definition.updates.includes(stage)) {reject('stage-disabled', { stage });}
        assertJson(start);
        const checked = inspectInput(clone(input), compiled, stage);
        if (!checked.ok) {return checked;}
        const operations = checked.input;
        items = operations.map(item => ({ item, status: 'unchecked' }));
        const before = clone(start), state = clone(start);
        const context: EvaluationContext = { bundle: compiled.bundle, before, state, params: {}, signal, functions };
        const record = (previous: Json, source: Source) => {
            const definition = source.kind === 'action' ? compiled.actions.get(source.id!)
                : source.kind === 'trigger' ? compiled.definition.triggers?.find(item => item.id === source.id)
                    : compiled.rules.find(item => item.id === source.id);
            if (definition) {
                source = { ...source, description: definition.description, ...('title' in definition ? { title: definition.title } : {}) };
            }
            for (const change of changes(previous, state)) {provenance.push({ ...change, source });}
        };
        const stabilize = async () => {
            for (const rule of compiled.rules) {
                ruleId = rule.id;
                const previous = clone(state);
                const value = await evaluate(rule.value, context);
                assertJson(value);
                setAt(state, rule.path, value);
                record(previous, { kind: rule.kind, id: rule.id });
            }
            for (const rule of compiled.rules.filter(item => item.kind === 'correct')) {
                ruleId = rule.id;
                const value = await evaluate(rule.value, context);
                const candidate = clone(state);
                setAt(candidate, rule.path, value);
                if (!equal(candidate, state)) {reject('correction-unstable', { rule: rule.id });}
            }
            ruleId = undefined;
        };
        const effects = async (items: Compiled['definition']['actions'][number]['effects']) => {
            const values = [];
            for (const effect of items) {
                const value = await evaluate(effect.value, context);
                assertJson(value); values.push({ path: effect.path, value });
            }
            for (const effect of values) {setAt(state, effect.path, effect.value);}
        };
        const trigger = async (timing: 'action' | 'batch') => {
            const selected = (compiled.definition.triggers || []).filter(item => (item.timing || 'batch') === timing);
            if (!selected.length) {return;}
            const visited = new Set<string>(), chain = new Set<string>();
            let rounds = 0;
            while (true) {
                signal?.throwIfAborted();
                const key = digest(state);
                if (visited.has(key)) {reject('trigger-cycle', { rules: [...chain], timing });}
                if (rounds >= TRIGGER_ROUND_LIMIT) {reject('trigger-limit', { rules: [...chain], timing, rounds });}
                visited.add(key);
                let changed = false;
                for (const rule of selected) {
                    ruleId = rule.id;
                    if (await evaluate(rule.when, context) !== true) {continue;}
                    const previous = clone(state);
                    await effects(rule.effects);
                    if (equal(previous, state)) {continue;}
                    changed = true; chain.add(rule.id);
                    record(previous, { kind: 'trigger', id: rule.id });
                    await stabilize();
                }
                ruleId = undefined;
                if (!changed) {return;}
                // Let cancellation and the browser paint run between long chains.
                if (++rounds % 16 === 0) {await new Promise<void>(resolve => setTimeout(resolve, 0));}
            }
        };
        // Stored derived values may predate the current rules; actions read the recalculated state.
        let pendingDirect = true;
        for (const [index, operation] of operations.entries()) {
            operationIndex = index;
            signal?.throwIfAborted();
            if (!operation.action) {
                const previous = clone(state);
                applyDirectInput(state, operation);
                authorize(compiled, previous, state);
                record(previous, { kind: 'input' });
                pendingDirect = true;
                items[index].status = 'passed';
                continue;
            }
            if (pendingDirect) {
                operationIndex = undefined;
                await stabilize(); pendingDirect = false;
                operationIndex = index;
            }
            const action = compiled.actions.get(String(operation.action))!;
            ruleId = action.id;
            context.params = clone(operation.params as JsonObject);
            for (const conversion of action.conversions) {
                const value = await evaluate(conversion.value, context);
                assertJson(value);
                setAt(context.params, conversion.path, value);
            }
            if (action.conversions.length) {validateActionParameters(action, context.params);}
            if (await evaluate(action.requires, context) !== true) {reject('action-precondition', { action: action.id, actionTitle: action.title,
                condition: await explainCondition(action.requires, context, action.parameters) });}
            const previous = clone(state);
            // One action's effects observe the same pre-action state.
            await effects(action.effects);
            authorize(compiled, previous, state, action.id);
            record(previous, { kind: 'action', id: action.id });
            actions.push({ id: action.id, params: clone(context.params) });
            await stabilize();
            context.params = {};
            await trigger('action');
            items[index].status = 'passed';
        }
        operationIndex = undefined;
        context.params = {};
        await stabilize();
        await trigger('batch');
        const errors = await validateState(compiled, context);
        if (errors.length) {return { ok: false, diagnostics: [errors[0]], items };}
        signal?.throwIfAborted();
        const annotations = operations.flatMap((operation, index) => {
            const fields = Object.entries(operation).filter(([name]) => !inputFields(operation).includes(name));
            return fields.length ? [{ index, ...(operation.action ? { action: String(operation.action) } : { path: pathOf(operation.path) }), fields }] : [];
        });
        return { ok: true, state, changes: displayChanges(difference(before, state)), provenance, actions, diagnostics: [], ...(annotations.length ? { annotations } : {}) };
    } catch (error) {
        const detail = diagnostic(error);
        const issue = signal?.aborted ? { code: 'cancelled' } : { ...detail,
            ...(ruleId && !detail.rule ? { rule: ruleId } : {}),
            ...(operationIndex === undefined ? {} : { operation: operationIndex, path: detail.path ?? (items?.[operationIndex].item as JsonObject)?.path }),
        };
        if (items && operationIndex !== undefined) {items[operationIndex] = { ...items[operationIndex], status: 'rejected', diagnostics: [issue] };}
        return { ok: false, diagnostics: [issue], ...(items ? { items } : {}) };
    } finally { functions.dispose(); }
}

export const initialize = (compiled: Compiled, options: RunOptions = {}) => settle(compiled, compiled.definition.initial, [], options);
