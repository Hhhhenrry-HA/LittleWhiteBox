// Compatibility: DeepSeek V3.2 DSML leaked into assistant text by compatible endpoints.
// Reference: https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/main/encoding/encoding_dsv32.py
// Also accepts the repeated bars / spaces / `calls` spelling in reported relay output.
// Remove DSML support when supported endpoints no longer leak it into assistant text.
const TOOL_START = /<tool_call\b|<\/?[｜|]+DSML[｜|]+\s*/gi;
const INVOKE_OPEN = /<[｜|]+DSML[｜|]+\s*invoke\s+name="([^"]+)"\s*>/iy;
const INVOKE_CLOSE = /<\/[｜|]+DSML[｜|]+\s*invoke\s*>/iy;
const GROUP_OPEN = /<[｜|]+DSML[｜|]+\s*(function_calls|calls)\s*>/iy;
const GROUP_CLOSE = /<\/[｜|]+DSML[｜|]+\s*(function_calls|calls)\s*>/iy;
const PARAMETER_OPEN = /<[｜|]+DSML[｜|]+\s*parameter\s+name="([^"]+)"\s+string="(true|false)"\s*>/iy;
const PARAMETER_BOUNDARY = /<(\/?)[｜|]+DSML[｜|]+\s*parameter\b/gi;
const PARAMETER_CLOSE = /<\/[｜|]+DSML[｜|]+\s*parameter\s*>/iy;

function matchAt(pattern, text, index) {
    pattern.lastIndex = index;
    return pattern.exec(text);
}

export function findTextToolStart(text, fromIndex = 0) {
    return matchAt(TOOL_START, text, fromIndex);
}

function skipWhitespace(text, index) {
    while (index < text.length && /\s/.test(text[index])) index += 1;
    return index;
}

function failDsml(index, reason) {
    const error = new SyntaxError(`DSML 工具调用格式无效：${reason}（位置 ${index}）。本轮工具未执行。`);
    error.code = 'DSML_TOOL_CALL_INVALID';
    error.offset = index;
    throw error;
}

function readDsmlInvoke(text, start) {
    const opening = matchAt(INVOKE_OPEN, text, start);
    const name = opening?.[1].trim();
    if (!name) failDsml(start, '缺少完整的 invoke 标签或工具名');
    let cursor = start + opening[0].length;
    const keys = new Set();
    const fields = [];
    while (cursor < text.length) {
        cursor = skipWhitespace(text, cursor);
        const closing = matchAt(INVOKE_CLOSE, text, cursor);
        if (closing) {
            return { end: cursor + closing[0].length, calls: [{ name, arguments: `{${fields.join(',')}}` }] };
        }
        const parameter = matchAt(PARAMETER_OPEN, text, cursor);
        if (!parameter) failDsml(cursor, '缺少完整的 parameter 标签或 invoke 结束标签');
        const key = parameter[1];
        if (keys.has(key)) failDsml(cursor, '存在重复参数');
        keys.add(key);
        const valueStart = cursor + parameter[0].length;
        const boundary = matchAt(PARAMETER_BOUNDARY, text, valueStart);
        // Invokes and JSON tool examples inside a value are data, never sibling calls.
        // A nested parameter marker is ambiguous (often a missing close), so fail closed.
        if (!boundary || !boundary[1]) failDsml(valueStart, '参数未闭合或参数边界有歧义');
        const parameterClose = matchAt(PARAMETER_CLOSE, text, boundary.index);
        if (!parameterClose) failDsml(boundary.index, 'parameter 结束标签无效');
        const value = text.slice(valueStart, boundary.index);
        let jsonValue = JSON.stringify(value);
        if (parameter[2].toLowerCase() === 'false') {
            jsonValue = value.trim();
            try {
                JSON.parse(jsonValue);
            } catch {
                failDsml(valueStart, '非字符串参数不是合法 JSON');
            }
        }
        fields.push(`${JSON.stringify(key)}:${jsonValue}`);
        cursor = boundary.index + parameterClose[0].length;
    }
    failDsml(cursor, 'invoke 未闭合');
}

function readDsmlBlock(text, start) {
    const group = matchAt(GROUP_OPEN, text, start);
    if (!group) return readDsmlInvoke(text, start);
    let cursor = start + group[0].length;
    const calls = [];
    while (cursor < text.length) {
        cursor = skipWhitespace(text, cursor);
        const closing = matchAt(GROUP_CLOSE, text, cursor);
        if (closing) {
            if (closing[1].toLowerCase() !== group[1].toLowerCase()) failDsml(cursor, '调用组结束标签不匹配');
            return { end: cursor + closing[0].length, calls };
        }
        const invocation = readDsmlInvoke(text, cursor);
        calls.push(...invocation.calls);
        cursor = invocation.end;
    }
    failDsml(cursor, '调用组未闭合');
}

function findJsonEnvelopeEnd(text, start) {
    const first = skipWhitespace(text, start);
    if (text[first] !== '{') return -1;
    let depth = 0;
    let quoted = false;
    for (let index = first; index < text.length; index += 1) {
        const char = text[index];
        if (quoted) {
            if (char === '\\') index += 1;
            else if (char === '"') quoted = false;
        } else if (char === '"') quoted = true;
        else if (char === '{' || char === '[') depth += 1;
        else if (char === '}' || char === ']') {
            depth -= 1;
            if (depth === 0) return index + 1;
        } else if (char === '<') return -1;
    }
    return -1;
}

function readJsonBlock(text, start) {
    const opening = matchAt(/<tool_call>/iy, text, start);
    if (!opening) return null;
    const payloadStart = start + opening[0].length;
    // Prefer a complete JSON envelope so literal closing tags inside strings survive replay.
    // Malformed JSON still uses the existing first-closing-tag boundary and loose repair.
    const jsonEnd = findJsonEnvelopeEnd(text, payloadStart);
    let closing = jsonEnd < 0 ? null : matchAt(/\s*<\/tool_call>/iy, text, jsonEnd);
    let payloadEnd = jsonEnd;
    if (!closing) {
        closing = matchAt(/<\/tool_call>/gi, text, payloadStart);
        payloadEnd = closing?.index;
    }
    if (!closing) {
        if (/<\/[｜|]+DSML[｜|]+/i.test(text.slice(payloadStart))) {
            failDsml(start, 'tool_call 开头与 DSML 结尾混用，无法确定调用边界');
        }
        return null;
    }
    return { end: closing.index + closing[0].length, payload: text.slice(payloadStart, payloadEnd) };
}

// Consume each block before looking for the next one: values cannot create extra calls.
// Nothing is returned until every DSML block has passed structural validation.
export function scanTextToolBlocks(text) {
    const blocks = [];
    let cursor = 0;
    let start;
    while ((start = findTextToolStart(text, cursor))) {
        if (/^<tool_call/i.test(start[0])) {
            const block = readJsonBlock(text, start.index);
            if (!block) break;
            blocks.push(block);
            cursor = block.end;
        } else {
            const block = readDsmlBlock(text, start.index);
            blocks.push(block);
            cursor = block.end;
        }
    }
    const partial = findPartialTextToolStart(text);
    if (partial >= cursor && /^<\/?[｜|]/.test(text.slice(partial))) {
        failDsml(partial, 'DSML 标记未输出完整');
    }
    return blocks;
}

export function findPartialTextToolStart(text) {
    const index = text.lastIndexOf('<');
    if (index < 0) return -1;
    const tail = text.slice(index).replace(/[｜|]+/g, '|').toLowerCase();
    return ['<tool_call', '<|dsml|', '</|dsml|'].some(prefix => prefix.startsWith(tail)) ? index : -1;
}
