// Natural-language requests keep author text intact, including punctuation and weights.
const paragraphs = parts => parts.filter(value => typeof value === 'string' && value.trim()).join('\n\n');

export function assembleNaturalCharacters({ chars = [], resolvedForms = [] }) {
    return chars.map((character, index) => {
        const fixed = resolvedForms[index];
        return {
            name: fixed?.name || character.name,
            prompt: paragraphs([
                fixed ? fixed.type : character.type,
                fixed ? fixed.danbooruTag : character.danbooru,
                fixed ? fixed.appearance : character.appear,
                character.costume, character.action, character.interact,
            ]),
        };
    });
}

export function assembleNaturalPrompt(task, recipe = {}) {
    const characterPrompts = task.characterPrompts ?? assembleNaturalCharacters(task);
    return {
        positive: paragraphs([recipe.positivePrefix, task.scene,
            ...characterPrompts.map(character => paragraphs([character.name, character.prompt]))]),
        negative: '',
        characterPrompts,
    };
}
