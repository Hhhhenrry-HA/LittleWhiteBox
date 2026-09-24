import type { ManagementParticipant } from '../../../capabilities/management/index.js';
import { MANAGEMENT_PAGE_SIZE, textPage } from '../../../capabilities/management/read-page.js';
import { createEmptyMapDomain } from '../../../domains/map/state.js';
import type { MapService } from '../application/service.js';
import { compileAtlasIntent } from '../tools/atlas-intent-compiler.js';
import { compileSceneIntent } from '../tools/scene-intent-compiler.js';
import { readAtlas } from '../tools/atlas-reader.js';
import { resolveSceneKey, sceneForTool } from '../tools/scene-reader.js';
import { createManagementSave } from '../../../capabilities/management/save.js';
import { jsonValuesEqual } from '../../../host/json-values-equal.js';
import { createMapReadBaseline } from './read-baseline.js';
import { MAP_MANAGEMENT_PROMPT } from './prompt.js';
import { createMapManagementTools } from './tool-contract.js';

export function createMapManagement(map: MapService, player: () => { actorKey: 'player'; displayName: string }): ManagementParticipant {
    return { id: 'map', label: '地图', confirmPending: map.confirmPending,
        async open() {
            await map.refreshCurrent();
            let current = map.readCurrent().map ?? createEmptyMapDomain();
            const baseline = createMapReadBaseline(current);
            const saving = createManagementSave(map.confirmPending);
            return {
                recover: saving.recover,
                confirmSaved: saving.confirmSaved,
                prompt: MAP_MANAGEMENT_PROMPT,
                initial: readAtlas(current, { mode: 'summary' }).data,
                tools: createMapManagementTools(),
                async execute(name, args, guard) {
                    if (name.endsWith('Read')) { await map.refreshCurrent(); current = map.readCurrent().map ?? createEmptyMapDomain(); }
                    if (name === 'MapAtlasRead') {
                        if (args.mode === 'document' || Number(args.limit ?? MANAGEMENT_PAGE_SIZE) > MANAGEMENT_PAGE_SIZE) { throw new Error('map_read_page_required'); }
                        const data = readAtlas(current, { ...args, limit: args.limit ?? MANAGEMENT_PAGE_SIZE }).data as Record<string, unknown>;
                        baseline.atlas(current, data);
                        return { ok: true, status: 'read', data };
                    }
                    if (name === 'MapSceneRead') {
                        const key = resolveSceneKey(current, String(args.scene ?? ''));
                        const owner = current.atlas.locations.find(l => l.sceneKey === key);
                        const scene = current.scenes[key];
                        baseline.scene(current, key, Number(args.offset ?? 0));
                        return { ok: true, status: 'read', data: textPage(JSON.stringify(scene && owner ? sceneForTool(scene, owner) : null), args.offset) };
                    }
                    if (!['MapAtlasEdit', 'MapSceneEdit'].includes(name)) { throw new Error('management_tool_unknown'); }
                    await map.refreshCurrent(); current = map.readCurrent().map ?? createEmptyMapDomain();
                    const compiled = name === 'MapAtlasEdit' ? compileAtlasIntent(current, args, player()) : compileSceneIntent(current, args, player());
                    if (!compiled.edits.length) { return { ok: compiled.result.ok, status: compiled.result.ok ? 'unchanged' : 'failed', data: compiled.result }; }
                    baseline.assertEdits(current, compiled.edits);
                    const expected = current;
                    const result = { ok: compiled.result.ok, status: compiled.result.status === 'partial' ? 'partial' as const : 'saved' as const, data: compiled.result };
                    return saving.run(async commitGuard => {
                        const saved = await map.replaceCurrent(compiled.domain, { expectedRevision: expected.revision, beforeCommit: () => { if (!commitGuard()) { throw new Error('management_context_changed'); } } });
                        current = saved.map ?? createEmptyMapDomain();
                        baseline.saved(current, compiled.edits);
                        return result;
                    }, async () => {
                        await map.refreshCurrent(); current = map.readCurrent().map ?? createEmptyMapDomain();
                        if (current.revision === expected.revision + 1 && jsonValuesEqual(current.atlas, compiled.domain.atlas) && jsonValuesEqual(current.scenes, compiled.domain.scenes)) { baseline.saved(current, compiled.edits); return { status: 'confirmed', result }; }
                        return { status: jsonValuesEqual(current, expected) ? 'unchanged' : 'superseded' };
                    }, guard);
                },
            };
        },
    };
}
