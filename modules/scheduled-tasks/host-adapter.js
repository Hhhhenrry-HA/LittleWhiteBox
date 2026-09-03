export function createScheduledTasksHostAdapter({ events, eventTypes, handlers } = {}) {
    let started = false;
    const on = (eventType, handler) => {
        if (eventType && typeof handler === 'function') events.on(eventType, handler);
    };

    const start = () => {
        if (started) return;
        started = true;
        // 生成归属先于调度注册：GENERATION_ENDED 既要判定来源，又是 after_ai 的触发点。
        on(eventTypes.GENERATION_STARTED, handlers.onGenerationStarted);
        if (eventTypes.GENERATION_ENDED) on(eventTypes.GENERATION_ENDED, handlers.onGenerationEnded);
        else {
            // 旧宿主可能先发 GENERATION_STOPPED、后渲染最终消息。归属必须
            // 留给 CHARACTER_MESSAGE_RENDERED 消费，否则任务的 /gen 会自触发。
            on(eventTypes.CHARACTER_MESSAGE_RENDERED, handlers.onMessageReceived);
        }
        on(eventTypes.USER_MESSAGE_RENDERED, handlers.onUserMessage);
        on(eventTypes.CHAT_CHANGED, handlers.onChatChanged);
        on(eventTypes.CHAT_CREATED, handlers.onChatCreated);
        on(eventTypes.MESSAGE_DELETED, handlers.onMessageDeleted);
        on(eventTypes.MESSAGE_SWIPED, handlers.onMessageSwiped);
        on(eventTypes.CHARACTER_DELETED, handlers.onCharacterDeleted);
        on(eventTypes.PRESET_CHANGED, handlers.onPresetChanged);
        on(eventTypes.OAI_PRESET_CHANGED_AFTER, handlers.onPresetChanged);
        on(eventTypes.MAIN_API_CHANGED, handlers.onMainApiChanged);
    };

    const stop = () => {
        if (!started) return;
        started = false;
        events.cleanup();
    };

    return { start, stop, get started() { return started; } };
}

export async function saveCharacterTaskFieldStrict({
    fetchImpl = globalThis.fetch,
    getRequestHeaders = () => ({}),
    character,
    characterId,
    currentCharacterId,
    getCurrentCharacterId = () => currentCharacterId,
    fieldName,
    tasks,
    updateCurrentCharacterJson = () => {},
} = {}) {
    if (!character) throw new Error('当前没有可保存任务的角色');
    const value = { tasks: structuredClone(tasks) };
    const mergeJsonData = source => {
        const jsonData = JSON.parse(source);
        jsonData.data ??= {};
        jsonData.data.extensions ??= {};
        jsonData.data.extensions[fieldName] = value;
        return JSON.stringify(jsonData);
    };
    const originalJsonData = character.json_data || '';
    const preparedJsonData = originalJsonData ? mergeJsonData(originalJsonData) : null;
    const response = await fetchImpl('/api/characters/merge-attributes', {
        method: 'POST',
        headers: getRequestHeaders(),
        body: JSON.stringify({
            avatar: character.avatar,
            data: { extensions: { [fieldName]: value } },
        }),
    });
    if (!response.ok) throw new Error(`角色任务保存失败（HTTP ${response.status}）`);

    character.data ??= {};
    character.data.extensions ??= {};
    character.data.extensions[fieldName] = value;
    let nextJsonData = preparedJsonData;
    if (character.json_data !== originalJsonData) {
        try { nextJsonData = character.json_data ? mergeJsonData(character.json_data) : null; } catch { nextJsonData = null; }
    }
    if (nextJsonData !== null) {
        character.json_data = nextJsonData;
        if (Number(characterId) === Number(getCurrentCharacterId())) updateCurrentCharacterJson(character.json_data);
    }
    return value.tasks;
}

export async function saveExtensionSettingsStrict({ saveSettings, eventSource, committedEvent } = {}) {
    let committed = false;
    const onCommitted = () => { committed = true; };
    eventSource.on(committedEvent, onCommitted);
    try {
        await saveSettings();
        if (!committed) throw new Error('全局任务设置未能提交到服务器');
    } finally {
        eventSource.removeListener(committedEvent, onCommitted);
    }
}
