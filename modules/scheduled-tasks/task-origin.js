/**
 * 任务自产事件来源跟踪。
 *
 * 只回答一个问题：宿主刚刚发出的这个事件，是不是定时任务自己跑命令造成的。
 * 它不决定"现在执行还是排队"（那是 dispatcher 的职责），也不管理任何任务资源（那是 runtime 的职责）。
 *
 * 全部是当前运行内的过程状态，切聊天和模块清理时清空，不持久化。
 */
function commandSegments(command) {
    const source = String(command || '');
    const segments = [];
    let start = 0;
    let quote = '';
    let escaped = false;
    for (let index = 0; index < source.length; index++) {
        const char = source[index];
        if (escaped) {
            escaped = false;
            continue;
        }
        if (char === '\\') {
            escaped = true;
            continue;
        }
        if (quote) {
            if (char === quote) quote = '';
            continue;
        }
        if (char === '"' || char === "'" || char === '`') {
            quote = char;
            continue;
        }
        if (char === '|' || char === '\n' || char === '\r') {
            const segment = source.slice(start, index).trim();
            if (segment) segments.push(segment);
            if (char === '\r' && source[index + 1] === '\n') index++;
            start = index + 1;
        }
    }
    const tail = source.slice(start).trim();
    if (tail) segments.push(tail);
    return segments;
}

function hasAwaitedGenerationCommand(command) {
    // /ask 与 /gen 自身会等待生成。其他宿主生成命令只有 await=true 时，
    // 才能在命令生命周期内可靠地归属；默认异步模式没有可关联句柄。
    return commandSegments(command).some(segment => (
        /^\/(?:ask|gen)(?:\s|$)/i.test(segment)
        || /^\/(?:trigger|impersonate|imp|continue|cont|regenerate|regen|swipe)\b.*\bawait\s*=\s*(?:true|on|1)\b/i.test(segment)
    ));
}

function countMarkedMessageCommands(command) {
    return commandSegments(command)
        .filter(segment => /^\s*\/(?:sendas|comment|sys|nar)\b/i.test(segment))
        .length;
}

function countUnmarkedMessageCommands(command) {
    // ST 1.18 emits ordinary user-message records for these commands: neither
    // USER_MESSAGE_RENDERED nor message.extra carries a slash-command marker.
    return commandSegments(command)
        .filter(segment => /^\/(?:send|ask)\b/i.test(segment))
        .length;
}

export class TaskOriginTracker {
    constructor() {
        this.commands = new Map();
        this.nextCommandId = 0;
        this.generationFromTask = false;
    }

    beginCommand(command) {
        const token = ++this.nextCommandId;
        this.commands.set(token, {
            markedMessages: countMarkedMessageCommands(command),
            unmarkedMessages: countUnmarkedMessageCommands(command),
            awaitedGeneration: hasAwaitedGenerationCommand(command),
        });
        return token;
    }

    endCommand(token) {
        this.commands.delete(token);
    }

    consumeTaskMessage(message, source) {
        const field = source === 'command' || message?.extra?.model === 'slash command'
            ? 'markedMessages'
            : 'unmarkedMessages';
        for (const command of this.commands.values()) {
            if (!command[field]) continue;
            command[field]--;
            return true;
        }
        return false;
    }

    noteGenerationStarted() {
        this.generationFromTask = [...this.commands.values()].some(command => command.awaitedGeneration);
        return this.generationFromTask;
    }

    consumeGenerationSettled() {
        const fromTask = this.generationFromTask;
        this.generationFromTask = false;
        return fromTask;
    }

    reset() {
        this.commands.clear();
        this.generationFromTask = false;
    }
}
