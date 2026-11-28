import { buildScenePlannerTask, generateAndParseScenePlan } from '../../shared/scene-planner.js';
import { createSceneSource, normalizeMessageSceneSourceText } from '../../shared/scene-source.js';
import { detectPresentCharacters, DEFAULT_MESSAGE_FILTER_RULES, toScenePlannerProgress } from '../../shared/draw-common.js';
import { characterLibraryFromSettings } from '../../shared/character-library.js';
import { getSharedDrawSettings, loadSharedDrawSettings } from '../../shared/draw-settings.js';
import { WorldbookProcessor } from '../../shared/worldbook-processor.js';
import { resolveEffectiveMaxImages } from '../../shared/max-images-override.js';
import { getActiveParamsPreset } from './settings-model.js';
import { naturalPlannerOptions, adaptedDirectInput, directCharacterRoster } from './planning-input.js';
import { validateMultimodalInput } from './compiler.js';
import { collectToolBlocks } from '../../shared/custom-tools.js';
import { normalizeLayout } from '../../shared/scene-planner-layout.js';
import { createSandboxToolHost } from '../../shared/custom-tool-sandbox.js';

const plannerRetry = shared => ({ maxRetries: shared.plannerMaxRetries });

export async function buildPlannerOptions(provider, { message, settings, sharedSettings, signal, onStateChange,
    useWorldbook = true, stripImageMarkers = true, ...input }) {
    const shared = sharedSettings || await loadSharedDrawSettings();
    const text = stripImageMarkers ? normalizeMessageSceneSourceText(message.mes) : String(message.mes || '');
    const sceneSource = createSceneSource(text, { filterRules: shared.messageFilterRules?.length ? shared.messageFilterRules : DEFAULT_MESSAGE_FILTER_RULES });
    const presentCharacters = detectPresentCharacters(sceneSource.content, characterLibraryFromSettings(shared));
    const worldbookEntries = useWorldbook && shared.worldbooks?.enabled && shared.worldbooks.uploadedBooks?.length
        ? new WorldbookProcessor().processFromEntries({
            entries: shared.worldbooks.uploadedBooks.flatMap(book => book.entries || []),
            contextText: `${sceneSource.content} ${presentCharacters.map(character => character.name).join(' ')}`,
            keywordFilterMode: shared.worldbooks.keywordFilterMode || 'auto',
        }) : null;
    return { sceneSource, plannerOptions: {
        ...naturalPlannerOptions(provider, settings, input), sceneSource, presentCharacters, worldbookEntries,
        useWorldInfo: useWorldbook && shared.useWorldInfo,
        maxImages: resolveEffectiveMaxImages(settings, getActiveParamsPreset(settings)),
        timeout: settings.timeout, plannerRetry: plannerRetry(shared), signal,
        onDiagnosticUpdate: diagnostic => onStateChange?.('llm', toScenePlannerProgress(diagnostic)),
    } };
}

function directPlannerOptions(provider, input, settings, presentCharacters) {
    return { ...naturalPlannerOptions(provider, settings, input),
        sceneSource: createSceneSource(input.prompt), maxImages: 1, presentCharacters, useWorldInfo: false };
}

export function previewDirectInput(provider, input, settings, options = {}) {
    return buildScenePlannerTask({ ...directPlannerOptions(provider, input, settings, directCharacterRoster(input, getSharedDrawSettings())), ...options, preview: true });
}

export function runMultimodalScenePlan(options, plan = generateAndParseScenePlan) {
    const { layout } = normalizeLayout(options.customPrompts?.layout);
    return plan(collectToolBlocks(layout).length
        ? { ...options, customToolHost: createSandboxToolHost({ document: globalThis.document }) }
        : options);
}

export async function planDirectInput(provider, input, settings, { signal, onStateChange, sceneConfig, onAgentRequest, presentCharacters,
    plan = generateAndParseScenePlan } = {}) {
    validateMultimodalInput(provider, input);
    signal?.throwIfAborted();
    const shared = await loadSharedDrawSettings();
    signal?.throwIfAborted();
    onStateChange?.('llm', toScenePlannerProgress());
    const options = directPlannerOptions(provider, input, settings, presentCharacters ?? directCharacterRoster(input, shared));
    const tasks = await runMultimodalScenePlan({ ...options,
        signal, timeout: settings.timeout, plannerRetry: plannerRetry(shared),
        ...(sceneConfig ? { agentOptions: { providerConfig: sceneConfig } } : {}),
        onAgentRequest,
        onDiagnosticUpdate: diagnostic => onStateChange?.('llm', toScenePlannerProgress(diagnostic)),
    }, plan);
    signal?.throwIfAborted();
    return adaptedDirectInput(input, tasks);
}
