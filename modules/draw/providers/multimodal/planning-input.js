import { getActiveParamsPreset, providerDefinition } from './settings-model.js';
import { NON_EXPLICIT_ILLUSTRATION_INSTRUCTION, NATURAL_PROMPT_DEFAULTS } from './prompts.js';
import { MULTIMODAL_COPY as COPY } from './copy.js';
import { assembleNaturalCharacters } from './prompt-assembly.js';
import { detectPresentCharacters } from '../../shared/present-characters.js';
import { characterLibraryFromSettings } from '../../shared/character-library.js';

export function directCharacterRoster(input, shared) {
    const text = [input.prompt ?? input.tags, ...(input.characterPrompts || []).map(character =>
        `${character.name || ''} ${character.prompt || ''}`)].join('\n');
    return detectPresentCharacters(text, characterLibraryFromSettings(shared));
}

function getMultimodalPlannerProfile(provider) {
    return { imageModelName: providerDefinition(provider).label, promptStyle: 'natural', centerMode: 'none', interactSyntax: 'plain', ucScope: 'global' };
}

export function generationGuidance(settings, input = {}) {
    const preset = getActiveParamsPreset(settings);
    return JSON.stringify({
        styleRequest: input.positivePrefix ?? preset.positivePrefix,
        exclusions: input.negativePrompt ?? '',
        characters: input.characterPrompts ?? [],
        referenceImageCount: input.referenceImages?.length ?? 0,
    });
}

export function naturalPlannerOptions(provider, settings, input = {}) {
    const customPrompts = settings.promptPresets?.find(item => item.id === settings.selectedPromptPresetId) || NATURAL_PROMPT_DEFAULTS;
    return { customPrompts, promptDefaults: NATURAL_PROMPT_DEFAULTS,
        plannerProfile: getMultimodalPlannerProfile(provider), systemInstruction: NON_EXPLICIT_ILLUSTRATION_INSTRUCTION,
        modelGuide: [customPrompts.tagGuideContent, generationGuidance(settings, input)].filter(Boolean).join('\n\n'),
    };
}

export function adaptedDirectInput(input, tasks) {
    if (!Array.isArray(tasks) || tasks.length !== 1 || typeof tasks[0].scene !== 'string' || !tasks[0].scene.trim()) throw new TypeError(COPY.unadaptedInput);
    return { ...input, prompt: tasks[0].scene.trim(), negativePrompt: '',
        characterPrompts: assembleNaturalCharacters(tasks[0]) };
}
