import type { ManagementParticipant } from '../../../capabilities/management/index.js';
import { textPage } from '../../../capabilities/management/read-page.js';
import { editWorld } from '../../../domains/world/edit.js';
import { worldContent } from '../../../domains/world/projection.js';
import type { WorldService } from '../application/service.js';
import { createManagementSave } from '../../../capabilities/management/save.js';
import { sameWorldContent } from '../../../domains/world/types.js';
import { jsonValuesEqual } from '../../../host/json-values-equal.js';
import { WORLD_MANAGEMENT_PROMPT } from './prompt.js';
import { createWorldManagementTools } from './tool-contract.js';

export function createWorldManagement(world: WorldService): ManagementParticipant {
    return { id: 'world', label: '世界', confirmPending: world.confirmPending,
        async open() {
            await world.refreshCurrent();
            let view = world.readCurrent();
            let expected = worldContent(view.world);
            let overviewRead = expected.overview;
            const articlesRead = new Map(expected.news.map(article => [article.id, article]));
            const saving = createManagementSave(world.confirmPending);
            const projection = () => ({ overview: expected.overview, news: expected.news.map(n => ({ id: n.id, title: n.title })) });
            return {
                recover: saving.recover,
                confirmSaved: saving.confirmSaved,
                prompt: WORLD_MANAGEMENT_PROMPT,
                initial: projection(),
                tools: createWorldManagementTools(),
                async execute(name, args, guard) {
                    if (name === 'WorldRead') {
                        await world.refreshCurrent(); view = world.readCurrent(); expected = worldContent(view.world);
                        if (args.id) {
                            const id = String(args.id), article = expected.news.find(n => n.id === id);
                            if (Number(args.offset ?? 0) > 0 && !jsonValuesEqual(articlesRead.get(id) ?? null, article ?? null)) { throw new Error('management_request_superseded'); }
                            if (article) { articlesRead.set(id, article); } else { articlesRead.delete(id); }
                        } else {
                            if (Number(args.offset ?? 0) > 0 && overviewRead !== expected.overview) { throw new Error('management_request_superseded'); }
                            overviewRead = expected.overview;
                        }
                        return { ok: true, status: 'read', data: textPage(JSON.stringify(args.id ? expected.news.find(n => n.id === args.id) ?? null : projection()), args.offset) };
                    }
                    if (name !== 'WorldEdit') { throw new Error('management_tool_unknown'); }
                    await world.refreshCurrent(); view = world.readCurrent(); expected = worldContent(view.world);
                    const edit = editWorld(expected, args);
                    if (!edit.ok) { return { ok: false, status: 'failed', data: { errors: edit.errors } }; }
                    if (!edit.changed) { return { ok: true, status: 'unchanged' }; }
                    const ids = new Set([...expected.news, ...edit.data.news].filter(article =>
                        !jsonValuesEqual(expected.news.find(n => n.id === article.id) ?? null, edit.data.news.find(n => n.id === article.id) ?? null)).map(article => article.id));
                    if (Object.hasOwn(args, 'overview') && expected.overview !== overviewRead
                        || [...ids].some(id => !jsonValuesEqual(articlesRead.get(id) ?? null, expected.news.find(n => n.id === id) ?? null))) {
                        throw new Error('management_request_superseded');
                    }
                    const before = expected, identity = view.identityKey;
                    const result = () => {
                        overviewRead = expected.overview;
                        for (const id of ids) {
                            const article = expected.news.find(n => n.id === id);
                            if (article) { articlesRead.set(id, article); } else { articlesRead.delete(id); }
                        }
                        return { ok: true, status: 'saved' as const, data: projection() };
                    };
                    return saving.run(async commitGuard => {
                        view = await world.replaceContent(identity, before, edit.data, commitGuard);
                        expected = worldContent(view.world);
                        return result();
                    }, async () => {
                        await world.refreshCurrent(); view = world.readCurrent(); expected = worldContent(view.world);
                        if (sameWorldContent(expected, edit.data)) { return { status: 'confirmed', result: result() }; }
                        return { status: sameWorldContent(expected, before) ? 'unchanged' : 'superseded' };
                    }, guard);
                },
            };
        },
    };
}
