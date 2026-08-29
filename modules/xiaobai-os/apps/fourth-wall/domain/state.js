function clone(value) {
    return structuredClone(value);
}

export class FourthWallStateError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'FourthWallStateError';
        this.code = code;
    }
}

function requireSession(state, sessionId) {
    const session = state.sessions.find(item => item.id === sessionId);
    if (!session) throw new FourthWallStateError('SESSION_NOT_FOUND', '四次元壁记录不存在');
    return session;
}

function requireMessage(session, messageIndex) {
    if (!Number.isInteger(messageIndex) || messageIndex < 0 || messageIndex >= session.history.length) {
        throw new FourthWallStateError('MESSAGE_NOT_FOUND', '四次元壁消息不存在');
    }
    return session.history[messageIndex];
}

function normalizeName(name) {
    const normalized = String(name || '').trim();
    if (!normalized) throw new FourthWallStateError('SESSION_NAME_REQUIRED', '记录名称不能为空');
    return normalized.slice(0, 80);
}

function normalizeChatSettings(settings, patch) {
    const next = { ...settings };
    if (Object.hasOwn(patch, 'maxChatLayers')) {
        next.maxChatLayers = Number(patch.maxChatLayers);
    }
    if (Object.hasOwn(patch, 'maxMetaTurns')) {
        next.maxMetaTurns = Number(patch.maxMetaTurns);
    }
    if (Object.hasOwn(patch, 'stream')) {
        next.stream = patch.stream === true;
    }
    if (Object.hasOwn(patch, 'disableAssistantPrefill')) {
        next.disableAssistantPrefill = patch.disableAssistantPrefill === true;
    }
    if (!Number.isInteger(next.maxChatLayers) || next.maxChatLayers < 1 || next.maxChatLayers > 9999) {
        throw new FourthWallStateError('INVALID_SETTINGS', '普通聊天层数必须是 1 到 9999 的整数');
    }
    if (!Number.isInteger(next.maxMetaTurns) || next.maxMetaTurns < 1 || next.maxMetaTurns > 9999) {
        throw new FourthWallStateError('INVALID_SETTINGS', '皮下聊天轮数必须是 1 到 9999 的整数');
    }
    return next;
}

export function getActiveSession(state) {
    return state.sessions.find(session => session.id === state.activeSessionId) || null;
}

export function updateChatSettings(state, patch = {}) {
    const next = clone(state);
    next.settings = normalizeChatSettings(next.settings, patch);
    return next;
}

export function switchSession(state, sessionId) {
    const next = clone(state);
    requireSession(next, sessionId);
    next.activeSessionId = sessionId;
    return next;
}

export function addSession(state, { id, name, createdAt }) {
    const next = clone(state);
    const normalizedId = String(id || '').trim();
    if (!normalizedId || next.sessions.some(session => session.id === normalizedId)) {
        throw new FourthWallStateError('INVALID_SESSION_ID', '无法创建四次元壁记录');
    }
    next.sessions.push({
        id: normalizedId,
        name: normalizeName(name),
        createdAt: Number(createdAt),
        history: [],
    });
    next.activeSessionId = normalizedId;
    return next;
}

export function renameSession(state, sessionId, name) {
    const next = clone(state);
    requireSession(next, sessionId).name = normalizeName(name);
    return next;
}

export function deleteSession(state, sessionId) {
    if (state.sessions.length <= 1) {
        throw new FourthWallStateError('LAST_SESSION', '至少保留一份四次元壁记录');
    }
    const next = clone(state);
    requireSession(next, sessionId);
    next.sessions = next.sessions.filter(session => session.id !== sessionId);
    if (next.activeSessionId === sessionId) {
        next.activeSessionId = next.sessions[0].id;
    }
    return next;
}

export function appendMessage(state, sessionId, message) {
    const next = clone(state);
    const session = requireSession(next, sessionId);
    const content = String(message?.content || '').trim();
    if (!content) throw new FourthWallStateError('MESSAGE_EMPTY', '消息不能为空');
    if (message?.role !== 'user' && message?.role !== 'ai') {
        throw new FourthWallStateError('INVALID_MESSAGE', '消息角色无效');
    }
    const nextMessage = {
        role: message.role,
        content,
        ts: Number(message.ts),
    };
    if (message.thinking) nextMessage.thinking = String(message.thinking);
    if (message.type) nextMessage.type = String(message.type);
    session.history.push(nextMessage);
    return next;
}

export function editMessage(state, sessionId, messageIndex, content) {
    const next = clone(state);
    const session = requireSession(next, sessionId);
    const message = requireMessage(session, messageIndex);
    const normalized = String(content || '').trim();
    if (!normalized) throw new FourthWallStateError('MESSAGE_EMPTY', '消息不能为空');
    message.content = normalized;
    return next;
}

export function deleteMessage(state, sessionId, messageIndex) {
    const next = clone(state);
    const session = requireSession(next, sessionId);
    requireMessage(session, messageIndex);
    session.history.splice(messageIndex, 1);
    return next;
}

export function clearSession(state, sessionId) {
    const next = clone(state);
    requireSession(next, sessionId).history = [];
    return next;
}

export function prepareRegeneration(state, sessionId) {
    const next = clone(state);
    const session = requireSession(next, sessionId);
    let userIndex = -1;
    for (let index = session.history.length - 1; index >= 0; index -= 1) {
        if (session.history[index].role === 'user') {
            userIndex = index;
            break;
        }
    }
    if (userIndex < 0) throw new FourthWallStateError('NO_USER_MESSAGE', '没有可重答的用户消息');
    const userInput = session.history[userIndex].content;
    session.history = session.history.slice(0, userIndex + 1);
    return { state: next, userInput };
}
