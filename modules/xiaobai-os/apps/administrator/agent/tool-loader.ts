import type { ManagementResult, ManagementTool } from '../../../capabilities/management/index.js';
import { ADMINISTRATOR_COPY } from '../ui/copy.js';

export const TOOLS_LOAD = 'ToolsLoad';
export const TOOL_NOT_LOADED = Object.freeze({ ok: false, status: 'failed' as const, code: 'tool_not_loaded' });

interface ToolPackage { id: string; label: string; tools: readonly ManagementTool[] }

export function createAdministratorToolLoader(apps: readonly ToolPackage[], common: readonly ManagementTool[]) {
    const packages = new Map(apps.map(app => [app.id, app]));
    const loaded = new Map<string | null, readonly ManagementTool[]>();
    const describe = (tools: readonly ManagementTool[]) => tools.map(tool => `${tool.definition.function.name}: ${tool.label} (${tool.effect})`).join('; ');
    const tool: ManagementTool = {
        effect: 'read', label: ADMINISTRATOR_COPY.loadTools,
        target: args => Array.isArray(args.apps) ? args.apps.filter(id => typeof id === 'string').join(', ') : '',
        definition: { type: 'function', function: {
            name: TOOLS_LOAD,
            description: [
                'Load complete APP tool packages for this run, together with the common tools listed below.',
                'data contains apps (all loaded APP IDs) and tools (all currently available tool names, including this entry). Full tool definitions become available on the next model request.',
                'Use it before an operation whose tool is not yet available. Each APP package includes both its read and write tools; moving from inspection to editing needs no further load.',
                'Loaded tools remain available for this run. Repeated loads are harmless; a new user request or regeneration starts with this entry alone.',
                'Loading exposes tools without executing their operations or granting authorization to change records. An invalid request loads nothing; unavailable APP IDs are returned in data.unavailableApps.',
                '',
                `Common tools: ${describe(common)}`,
                ...apps.map(app => `APP ${app.id} (${app.label}): ${describe(app.tools)}`),
            ].join('\n'),
            parameters: { type: 'object', properties: {
                apps: { type: 'array', items: { type: 'string' }, description: 'APP IDs from the catalog above. Loads every selected APP’s tools. Omit or pass [] to load only common tools.' },
            }, additionalProperties: false },
        } },
    };
    const getTools = () => [tool.definition, ...[...loaded.values()].flatMap(tools => tools.map(item => item.definition))];
    return {
        tool, getTools,
        load(args: Record<string, unknown>): ManagementResult & { code?: string } {
            const ids = args.apps === undefined ? [] : args.apps;
            if (Object.keys(args).some(key => key !== 'apps') || !Array.isArray(ids) || ids.some(id => typeof id !== 'string')) {
                return { ok: false, status: 'failed', code: 'arguments_invalid' };
            }
            const unavailable = ids.filter(id => !packages.has(id));
            if (unavailable.length) { return { ok: false, status: 'failed', code: 'management_unavailable', data: { unavailableApps: unavailable } }; }
            loaded.set(null, common);
            for (const id of ids) { loaded.set(id, packages.get(id)!.tools); }
            return { ok: true, status: 'read', data: { apps: [...loaded.keys()].filter(id => id !== null), tools: getTools().map(item => item.function.name) } };
        },
    };
}
