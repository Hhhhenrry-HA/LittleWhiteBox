function extractTaggedMessages(text) {
    const source = String(text || '');
    const expression = /<msg\b[^>]*>([\s\S]*?)<\/msg>/gi;
    const parts = [];
    let match;
    while ((match = expression.exec(source)) !== null) {
        const value = String(match[1] || '').trim();
        if (value) parts.push(value);
    }
    return parts.join('\n').trim();
}

function extractPartialMessage(text) {
    const source = String(text || '');
    const openIndex = source.toLowerCase().lastIndexOf('<msg');
    if (openIndex < 0) return '';
    const contentIndex = source.indexOf('>', openIndex);
    if (contentIndex < 0) return '';
    const remainder = source.slice(contentIndex + 1);
    const closeIndex = remainder.toLowerCase().indexOf('</msg>');
    return (closeIndex < 0 ? remainder : remainder.slice(0, closeIndex)).trim();
}

function formatThoughts(thoughts) {
    if (!Array.isArray(thoughts)) return '';
    return thoughts.map((item) => {
        if (typeof item === 'string') return item.trim();
        const label = String(item?.label || '').trim();
        const text = String(item?.text || '').trim();
        return text && label ? `【${label}】\n${text}` : text;
    }).filter(Boolean).join('\n\n');
}

function extractThinking(text, partial) {
    const source = String(text || '');
    const messageIndex = source.toLowerCase().indexOf('<msg');
    if (messageIndex < 0) return partial ? source.trim() : '';
    return messageIndex === 0 ? '' : source.slice(0, messageIndex).trim();
}

export function projectGenerationProgress(result = {}) {
    const rawText = String(result.text || '');
    return {
        text: extractTaggedMessages(rawText) || extractPartialMessage(rawText) || rawText.trim(),
        thinking: extractThinking(rawText, true) || formatThoughts(result.thoughts),
    };
}

export function projectGenerationResult(result = {}) {
    const rawText = String(result.text || '');
    return {
        text: extractTaggedMessages(rawText) || extractPartialMessage(rawText) || rawText.trim() || '(no response)',
        thinking: extractThinking(rawText, false) || formatThoughts(result.thoughts),
    };
}
