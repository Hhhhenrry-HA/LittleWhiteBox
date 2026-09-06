import { parseLearningUnit } from '../../../domains/learning/data.js';
import { learningRecord, learningText } from '../../../domains/learning/profile.js';
import { LEARNING_LIMITS as L, type LearningScope, type LearningUnit, type RewardTier } from '../../../domains/learning/types.js';
import { learningArray, learningEnum, learningId, learningIds, learningInteger, requireLearning, uniqueLearning } from '../../../domains/learning/validation.js';
import { compileLearningMaterial, type createLearningSourceRegistry } from '../materials/lesson-sources.js';

export function createLearningLessonCompiler(options: {
    osId: string; scope: LearningScope; prices: Readonly<Record<RewardTier, number>>; createId: () => string;
    sources: Pick<ReturnType<typeof createLearningSourceRegistry>, 'get'>;
}) {
    // IDs belong to the preparation, so corrections keep references while nothing has been published.
    const unitId = options.createId();
    const ids = new Map<string, string>();
    const idFor = (key: string) => {
        if (!ids.has(key)) { ids.set(key, options.createId()); }
        return ids.get(key)!;
    };
    const prices = { ...options.prices };
    for (const [tier, price] of Object.entries(prices)) { learningInteger(price, `prices.${tier}`, 1); }
    return (args: unknown): LearningUnit => {
        const input = learningRecord(args, 'LearningLessonEdit', ['title', 'goal', 'tier', 'materials', 'exercises']);
        const rawMaterials = learningArray(input.materials, 'materials', (raw, path) => {
            const item = learningRecord(raw, path, ['key', 'title', 'kind', 'sourceId', 'from', 'through', 'text']);
            return { key: learningId(item.key, `${path}.key`), raw: item };
        }, L.materials);
        uniqueLearning(rawMaterials.map(material => material.key), 'materials.key');
        const materialRefs = new Map(rawMaterials.map(material => [material.key, idFor(`material:${material.key}`)]));
        const materialId = (key: string) => {
            const id = materialRefs.get(key);
            requireLearning(id, 'materialKeys', 'Reference a material key in this lesson');
            return id;
        };
        const materials = rawMaterials.map(material => compileLearningMaterial(material.raw, materialId(material.key), options.sources));
        const rawExercises = learningArray(input.exercises, 'exercises', (raw, path) => {
            const item = learningRecord(raw, path, ['key', 'skill', 'materialKeys', 'prompt', 'response', 'rule', 'hint']);
            return { key: learningId(item.key, `${path}.key`), raw: item };
        }, L.exercises);
        uniqueLearning(rawExercises.map(exercise => exercise.key), 'exercises.key');
        const exercises = rawExercises.map(({ key, raw }) => {
            let response = raw.response;
            if (response && typeof response === 'object' && 'kind' in response && response.kind === 'evidence') {
                const selection = learningRecord(response, 'response', ['kind', 'materialKey']);
                response = { kind: 'evidence', materialId: materialId(learningId(selection.materialKey, 'response.materialKey')) };
            }
            return { id: idFor(`exercise:${key}`), skill: raw.skill, materialIds: learningIds(raw.materialKeys, 'materialKeys', L.materials).map(materialId),
                prompt: raw.prompt, response, rule: raw.rule, hint: raw.hint ?? '' };
        });
        const tier = learningEnum(input.tier, 'tier', ['short', 'regular', 'deep']);
        return parseLearningUnit({ id: unitId, title: learningText(input.title, 'title', L.name), goal: input.goal,
            originOsId: options.osId, scope: options.scope, reward: { tier, amount: prices[tier] }, materials, exercises,
            attempts: [], assessments: [], revealed: { answers: [], hints: [] } });
    };
}
