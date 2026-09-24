import type { ManagementTool } from '../../../capabilities/management/index.js';
import { MANAGEMENT_READ_CHARS } from '../../../capabilities/management/read-page.js';
import { ADMINISTRATOR_COPY } from '../ui/copy.js';

export const TOOL_RESULT_READ = 'ToolResultRead';
export const ADMINISTRATOR_RESULT_READ: ManagementTool = {
    effect: 'read', label: ADMINISTRATOR_COPY.evidence, target: args => String(args.reference ?? ''),
    definition: { type: 'function', function: {
        name: TOOL_RESULT_READ,
        description: [
            'Continue a large tool result retained during this run.',
            `data contains reference, text, offset, nextOffset and totalChars, with at most ${MANAGEMENT_READ_CHARS} text characters per page.`,
            'Use it when a tool result supplies data.reference. Keep that reference and follow nextOffset until null to finish the retained result.',
            'This reads the earlier result, not a refreshed source. Any continuation inside the recovered result belongs to its original tool.',
            'A result with detailsUnavailable and totalChars has no retained body. For this or an expired reference, read the original source again in smaller pages.',
        ].join('\n'),
        parameters: { type: 'object', properties: {
            reference: { type: 'string', description: 'data.reference from the original result page, valid only in this run.' },
            offset: { type: 'integer', minimum: 0, description: 'Text offset in the retained result. Default 0; use data.nextOffset from the previous page.' },
        }, required: ['reference'], additionalProperties: false },
    } },
};
