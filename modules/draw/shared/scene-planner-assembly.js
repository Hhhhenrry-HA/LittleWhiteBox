// Layout -> message templates. Dynamic documents are expanded by scene-planner.js before
// becoming JSON tool results; custom messages keep their roles and relative layout order.
import { TOOL_PROTOCOL_MARKER } from '../../agent-core/adapters/tool-protocol-marker.js';
import { BUILTIN_BLOCKS, normalizeLayout } from './scene-planner-layout.js';
import { SCENE_PLANNER_ACTION, buildScenePlannerExchange } from './scene-planner-handoff.js';

const SEPARATOR = '\n\n';
const BUILTIN_ROLE_BY_ID = new Map(BUILTIN_BLOCKS.map(block => [block.id, block.role]));
const MATERIAL_BLOCKS = new Set(['worldInfo', 'content']);
const GUIDE_BLOCKS = new Set(['guide', 'rules', 'limits']);

// Only the tools block may place the adapter's protocol instructions.
function removeMarker(text) {
    return String(text ?? '').split(TOOL_PROTOCOL_MARKER).join('');
}

function blockText(block, builtinTexts) {
    if (BUILTIN_ROLE_BY_ID.has(block.id)) {
        if (block.id === 'tools') return TOOL_PROTOCOL_MARKER;
        return removeMarker(builtinTexts[block.id]).trim();
    }
    return removeMarker(block.content).trim();
}

function documentTemplate(blocks, ids, texts) {
    const selected = blocks.filter(block => ids.has(block.id));
    return {
        template: selected.map(block => blockText(block, texts)).filter(Boolean).join(SEPARATOR),
        blockIds: selected.map(block => block.id),
    };
}

export function planScenePlannerMessages({ layout, builtinTexts } = {}) {
    const texts = builtinTexts && typeof builtinTexts === 'object' ? builtinTexts : {};
    const { blocks } = normalizeLayout(layout).layout;
    const materials = documentTemplate(blocks, MATERIAL_BLOCKS, texts);
    const guide = documentTemplate(blocks, GUIDE_BLOCKS, texts);
    const firstMaterial = blocks.findIndex(block => MATERIAL_BLOCKS.has(block.id));
    const lastMaterial = blocks.findLastIndex(block => MATERIAL_BLOCKS.has(block.id));
    const templates = [];

    // The first material block opens the handoff; the last closes the reading phase.
    // Documents follow the user's block order within each reading. Custom messages and
    // the tool-protocol block stay in their layout order, outside the atomic tool pairs.
    blocks.forEach((block, index) => {
        if (index === firstMaterial) {
            templates.push({ role: 'user', template: SCENE_PLANNER_ACTION, blockIds: [] });
            templates.push(...buildScenePlannerExchange('materials', materials.template, materials.blockIds));
        }
        if (!MATERIAL_BLOCKS.has(block.id) && !GUIDE_BLOCKS.has(block.id)) {
            const builtin = BUILTIN_ROLE_BY_ID.has(block.id);
            const template = blockText(block, texts);
            if (template && (builtin || block.enabled !== false)) {
                const role = BUILTIN_ROLE_BY_ID.get(block.id) || block.role;
                const last = templates.at(-1);
                // The action checklist is its own message, and tool pairs never merge.
                if (last?.role === role && last.blockIds.length && !last.tool_calls) {
                    last.template += SEPARATOR + template;
                    last.blockIds.push(block.id);
                } else {
                    templates.push({ role, template, blockIds: [block.id] });
                }
            }
        }
        if (index === lastMaterial) {
            templates.push(...buildScenePlannerExchange('guide', guide.template, guide.blockIds));
        }
    });
    templates.push(...buildScenePlannerExchange('approval'));
    return { templates };
}
