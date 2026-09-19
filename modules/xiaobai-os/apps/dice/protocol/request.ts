import { ACTION_CHECK_REQUEST_FIELDS, parseActionCheckRequest, type ActionCheckRequest } from '../domain/action-check.js';
import { ACTION_CHECK_CLOSE, ACTION_CHECK_OPEN, findActionCheckStart } from './markup.js';
import { parseCoc7Request, type Coc7Request } from '../domain/coc7-request.js';
import type { ActionCheckRule } from '../types.js';

export const ACTION_CHECK_FIELDS = Object.freeze({
    action: { ...ACTION_CHECK_REQUEST_FIELDS.action, description: 'The attempt and objective.' },
    stat: { ...ACTION_CHECK_REQUEST_FIELDS.stat, description: 'The ability used.' },
    character: { ...ACTION_CHECK_REQUEST_FIELDS.character, description: 'Acting character, if ambiguous.' },
    stakes: { ...ACTION_CHECK_REQUEST_FIELDS.stakes, description: 'What success and failure each mean.' },
});

export type ActionCheckParseResult = { kind: 'none' }
    | { kind: 'invalid'; error: string }
    | ({ kind: 'request'; body: string; start: number; end: number } & (
        { rule: 'd20'; request: ActionCheckRequest } | { rule: 'coc7'; request: Coc7Request }));

export function parseActionCheck(body: string, generatedFrom = 0, rule: ActionCheckRule = 'd20'): ActionCheckParseResult {
    if (!Number.isSafeInteger(generatedFrom) || generatedFrom < 0 || generatedFrom > body.length) {
        return { kind: 'invalid', error: 'dice_generation_boundary_invalid' };
    }
    const start = findActionCheckStart(body, generatedFrom);
    if (start === null) { return { kind: 'none' }; }
    const block = body.slice(start).trim();
    if (!block.startsWith(ACTION_CHECK_OPEN) || !block.endsWith(ACTION_CHECK_CLOSE)) {
        return { kind: 'invalid', error: 'dice_request_incomplete_or_not_final' };
    }
    try {
        // The final closing tag delimits the JSON. Similar tags inside JSON strings are data.
        const json: unknown = JSON.parse(block.slice(ACTION_CHECK_OPEN.length, -ACTION_CHECK_CLOSE.length));
        const end = body.lastIndexOf(ACTION_CHECK_CLOSE) + ACTION_CHECK_CLOSE.length;
        const common = { kind: 'request' as const, body: body.slice(0, start), start, end };
        return rule === 'coc7' ? { ...common, rule, request: parseCoc7Request(json) }
            : { ...common, rule, request: parseActionCheckRequest(json) };
    } catch (error) {
        return { kind: 'invalid', error: error instanceof TypeError ? error.message : 'dice_request_json_invalid' };
    }
}

export const ACTION_CHECK_EXAMPLE = 'Mira reaches for the ledge.\n\n<xb_action_check>'
    + '{"action":"Climb the wet wall","stat":"Agility","difficulty":"hard","character":"Mira","stakes":"Reach the balcony unseen"}'
    + '</xb_action_check>';
