import { createDefaultFourthWallGlobalSettings } from '../domain/defaults.js';
import {
    addSession,
    appendMessage,
    clearSession,
    deleteMessage,
    deleteSession,
    editMessage,
    getActiveSession,
    prepareRegeneration,
    renameSession,
    switchSession,
    updateChatSettings,
} from '../domain/state.js';
import {
    buildFourthWallCommentaryPrompt,
    buildFourthWallPrompt,
} from '../domain/prompt.js';
import {
    projectGenerationProgress,
    projectGenerationResult,
} from '../domain/response-projection.js';
import { createFourthWallCommentaryRuntime } from './commentary-runtime.js';
import { createFourthWallGenerationRuntime } from './generation-runtime.js';

export const FOURTH_WALL_APP_DESCRIPTOR = Object.freeze({
    id: 'fourth-wall',
    name: '四次元壁',
    accent: '#7567d8',
});

function identityKey(identity) {
    if (typeof identity === 'string') return identity;
    return String(identity?.key || '');
}

function createSessionId() {
    if (globalThis.crypto?.randomUUID) return `session-${globalThis.crypto.randomUUID()}`;
    return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function describeError(error) {
    return error instanceof Error ? error.message : String(error || 'unknown_error');
}

function normalizeGlobalSettings(current, patch = {}) {
    const next = structuredClone(current);
    if (patch.image) next.image.enablePrompt = patch.image.enablePrompt === true;
    if (patch.voice) next.voice.enabled = patch.voice.enabled === true;
    if (patch.commentary) {
        if (Object.hasOwn(patch.commentary, 'enabled')) next.commentary.enabled = patch.commentary.enabled === true;
        if (Object.hasOwn(patch.commentary, 'probability')) {
            const probability = Number(patch.commentary.probability);
            if (!Number.isInteger(probability) || probability < 1 || probability > 99) {
                throw new Error('吐槽概率必须是 1 到 99 的整数');
            }
            next.commentary.probability = probability;
        }
    }
    if (patch.promptTemplates) {
        for (const key of ['topuser', 'confirm', 'metaProtocol', 'bottom']) {
            if (Object.hasOwn(patch.promptTemplates, key)) {
                next.promptTemplates[key] = String(patch.promptTemplates[key]);
            }
        }
    }
    return next;
}

function classifyGenerationError(error) {
    const message = describeError(error);
    if (/api key|配置|provider|model/i.test(message)) return 'configuration';
    if (/parse|格式|<msg>/i.test(message)) return 'parse';
    return 'network';
}

export function createFourthWallController({
    chatRepository,
    settingsRepository,
    getChatIdentity,
    getChatSnapshot,
    generateResponse,
    loadAgentConfig,
    imageProtocol,
    voiceProtocol,
    openAgentSettings = async () => true,
    closeAgentSettings = () => {},
    commentary = null,
    now = Date.now,
    createId = createSessionId,
} = {}) {
    if (!chatRepository || !settingsRepository || typeof getChatIdentity !== 'function'
        || typeof getChatSnapshot !== 'function' || typeof generateResponse !== 'function'
        || typeof loadAgentConfig !== 'function') {
        throw new TypeError('fourth-wall controller dependencies are incomplete');
    }

    let activation = null;
    let activationGeneration = 0;

    const generationRuntime = createFourthWallGenerationRuntime({ generateResponse, loadAgentConfig });

    function getGlobalSettings() {
        const root = settingsRepository.read();
        if (!root) throw new Error('小白 OS 设置尚未准备');
        return root.apps.fourthWall;
    }

    function buildClientState(chatState) {
        const snapshot = getChatSnapshot();
        return {
            chatIdentity: snapshot?.chatIdentity || identityKey(getChatIdentity()),
            userName: String(snapshot?.userName || 'User'),
            characterName: String(snapshot?.characterName || 'Assistant'),
            userAvatar: String(snapshot?.userAvatar || ''),
            characterAvatar: String(snapshot?.characterAvatar || ''),
            chat: structuredClone(chatState),
            global: structuredClone(getGlobalSettings()),
            capabilities: {
                image: imageProtocol?.getCapabilities?.() || { available: false },
                voice: voiceProtocol?.getCapabilities?.() || { available: false },
            },
        };
    }

    function assertActivation(payload = {}, expectedSession = false) {
        if (!activation) throw new Error('四次元壁 APP 未激活');
        const currentIdentity = identityKey(getChatIdentity());
        if (!currentIdentity || currentIdentity !== activation.chatIdentity
            || String(payload.chatIdentity || '') !== activation.chatIdentity) {
            throw new Error('聊天已切换，请重新打开四次元壁');
        }
        if (expectedSession && !String(payload.sessionId || '')) {
            throw new Error('四次元壁记录标识缺失');
        }
        return activation;
    }

    function post(type, payload = {}) {
        activation?.post?.(type, payload);
    }

    function emitState(chatState) {
        const state = buildClientState(chatState);
        post('fourth-wall/state', { state });
        return state;
    }

    function isRunCurrent(run) {
        return !!activation
            && activation.generation === run.activationGeneration
            && activation.chatIdentity === run.chatIdentity
            && identityKey(getChatIdentity()) === run.chatIdentity;
    }

    function launchGeneration({ chatState, sessionId, userInput, requestId }) {
        const session = chatState.sessions.find(item => item.id === sessionId);
        if (!session) throw new Error('四次元壁记录不存在');
        const run = {
            activationGeneration: activation.generation,
            chatIdentity: activation.chatIdentity,
            sessionId,
            requestId,
        };
        const builtPrompt = buildFourthWallPrompt({
            userInput,
            history: session.history,
            chatSnapshot: getChatSnapshot(),
            settings: chatState.settings,
            globalSettings: getGlobalSettings(),
        });
        post('fourth-wall/generation', { requestId, status: 'started', sessionId });
        generationRuntime.start({
            requestId,
            builtPrompt,
            stream: chatState.settings.stream,
            disableAssistantPrefill: chatState.settings.disableAssistantPrefill,
            onProgress(result) {
                if (!isRunCurrent(run)) return;
                post('fourth-wall/generation', {
                    requestId,
                    sessionId,
                    status: 'progress',
                    ...projectGenerationProgress(result),
                });
            },
            async onComplete(result) {
                if (!isRunCurrent(run)) return;
                const projected = projectGenerationResult(result);
                try {
                    const next = await chatRepository.mutateCurrentChatFourthWall((state) => {
                        if (state.activeSessionId !== sessionId) throw new Error('记录已切换，回复未保存');
                        return appendMessage(state, sessionId, {
                            role: 'ai',
                            content: projected.text,
                            thinking: projected.thinking || undefined,
                            ts: now(),
                        });
                    });
                    if (!isRunCurrent(run)) return;
                    emitState(next);
                    post('fourth-wall/generation', {
                        requestId,
                        sessionId,
                        status: 'complete',
                        ...projected,
                    });
                } catch (error) {
                    if (!isRunCurrent(run)) return;
                    post('fourth-wall/generation', {
                        requestId,
                        sessionId,
                        status: 'error',
                        kind: 'save',
                        message: `回复已生成，但未保存：${describeError(error)}`,
                        draft: projected,
                    });
                }
            },
            onError(error) {
                if (!isRunCurrent(run)) return;
                post('fourth-wall/generation', {
                    requestId,
                    sessionId,
                    status: 'error',
                    kind: classifyGenerationError(error),
                    message: describeError(error),
                });
            },
            onCancelled() {
                if (!isRunCurrent(run)) return;
                post('fourth-wall/generation', { requestId, sessionId, status: 'cancelled' });
            },
        });
    }

    const commentaryRuntime = commentary ? createFourthWallCommentaryRuntime({
        ...commentary,
        getSettings: () => {
            try {
                return getGlobalSettings().commentary;
            } catch {
                return { enabled: false, probability: 30 };
            }
        },
        isForegroundActive: () => activation !== null,
        capture(event) {
            const host = commentary.capture?.(event);
            if (!host) return null;
            let chatState;
            try {
                chatState = chatRepository.readCurrentChatFourthWall();
            } catch {
                return null;
            }
            if (!chatState) return null;
            const session = getActiveSession(chatState);
            if (!session) return null;
            return {
                ...host,
                chatState,
                sessionId: session.id,
                globalSettings: structuredClone(getGlobalSettings()),
            };
        },
        async generate(captured, signal) {
            const builtPrompt = buildFourthWallCommentaryPrompt({
                targetText: captured.text,
                type: captured.kind,
                history: captured.chatState.sessions.find(item => item.id === captured.sessionId)?.history || [],
                chatSnapshot: captured.chatSnapshot,
                settings: captured.chatState.settings,
                globalSettings: captured.globalSettings,
            });
            if (!builtPrompt) return '';
            const result = await generateResponse({
                config: await loadAgentConfig(),
                builtPrompt,
                stream: false,
                disableAssistantPrefill: captured.chatState.settings.disableAssistantPrefill,
                signal,
            });
            return projectGenerationResult(result).text;
        },
        async commit(captured, text) {
            if (identityKey(getChatIdentity()) !== captured.chatIdentity) {
                throw new Error('聊天已切换');
            }
            const prefixes = {
                ai_message: '(glanced at the last line) ',
                edit_own: '(caught you sneaking edits) ',
                edit_ai: '(noticed you edited my line) ',
            };
            await chatRepository.mutateCurrentChatFourthWall((state) => appendMessage(state, captured.sessionId, {
                role: 'ai',
                content: `${prefixes[captured.kind] || ''}${text}`,
                ts: now(),
                type: 'commentary',
            }));
        },
    }) : null;

    async function activate(appId, { post: postToFrame } = {}) {
        if (appId !== FOURTH_WALL_APP_DESCRIPTOR.id) throw new Error('app_unavailable');
        generationRuntime.cancel('reactivated');
        imageProtocol?.cancelAll?.();
        voiceProtocol?.cancelAll?.();
        const identity = getChatIdentity();
        const chatIdentity = identityKey(identity);
        if (!chatIdentity) throw new Error('请先打开一个聊天');
        const generation = ++activationGeneration;
        const chatState = await chatRepository.prepareCurrentChatFourthWall();
        if (identityKey(getChatIdentity()) !== chatIdentity || generation !== activationGeneration) {
            throw new Error('聊天已切换，请重新打开四次元壁');
        }
        activation = { generation, chatIdentity, post: postToFrame };
        commentaryRuntime?.cancel();
        return buildClientState(chatState);
    }

    function deactivate(appId, reason = 'deactivated') {
        if (appId !== FOURTH_WALL_APP_DESCRIPTOR.id || !activation) return;
        activationGeneration += 1;
        generationRuntime.cancel(reason);
        imageProtocol?.cancelAll?.();
        voiceProtocol?.cancelAll?.();
        closeAgentSettings();
        activation = null;
    }

    async function mutateChat(payload, action) {
        assertActivation(payload, true);
        const next = await chatRepository.mutateCurrentChatFourthWall(action);
        assertActivation(payload);
        return emitState(next);
    }

    async function handleMessage(appId, message) {
        if (appId !== FOURTH_WALL_APP_DESCRIPTOR.id) throw new Error('app_unavailable');
        const payload = message.payload || {};
        const action = message.type.slice('fourth-wall/'.length);

        if (action === 'cancel') {
            assertActivation(payload);
            return { cancelled: generationRuntime.cancel('user-cancelled') };
        }
        if (action === 'refresh') {
            assertActivation(payload);
            const state = chatRepository.readCurrentChatFourthWall();
            if (!state) throw new Error('四次元壁聊天数据不存在');
            return emitState(state);
        }
        if (action === 'update-chat-settings') {
            return await mutateChat(payload, state => updateChatSettings(state, payload.patch));
        }
        if (action === 'switch-session') {
            generationRuntime.cancel('session-switched');
            return await mutateChat(payload, state => switchSession(state, String(payload.targetSessionId || '')));
        }
        if (action === 'add-session') {
            generationRuntime.cancel('session-created');
            return await mutateChat(payload, state => addSession(state, {
                id: createId(),
                name: payload.name,
                createdAt: now(),
            }));
        }
        if (action === 'rename-session') {
            return await mutateChat(payload, state => renameSession(state, payload.sessionId, payload.name));
        }
        if (action === 'delete-session') {
            generationRuntime.cancel('session-deleted');
            return await mutateChat(payload, state => deleteSession(state, payload.sessionId));
        }
        if (action === 'edit-message') {
            return await mutateChat(payload, state => editMessage(state, payload.sessionId, Number(payload.messageIndex), payload.content));
        }
        if (action === 'delete-message') {
            return await mutateChat(payload, state => deleteMessage(state, payload.sessionId, Number(payload.messageIndex)));
        }
        if (action === 'clear-history') {
            generationRuntime.cancel('history-cleared');
            return await mutateChat(payload, state => clearSession(state, payload.sessionId));
        }
        if (action === 'send') {
            assertActivation(payload, true);
            if (generationRuntime.isRunning()) throw new Error('已有回复正在生成');
            const userInput = String(payload.content || '').trim();
            const next = await chatRepository.mutateCurrentChatFourthWall(state => appendMessage(state, payload.sessionId, {
                role: 'user',
                content: userInput,
                ts: now(),
            }));
            assertActivation(payload);
            const clientState = emitState(next);
            launchGeneration({
                chatState: next,
                sessionId: payload.sessionId,
                userInput,
                requestId: message.requestId,
            });
            return clientState;
        }
        if (action === 'regenerate') {
            assertActivation(payload, true);
            generationRuntime.cancel('regenerated');
            let userInput = '';
            const next = await chatRepository.mutateCurrentChatFourthWall((state) => {
                const prepared = prepareRegeneration(state, payload.sessionId);
                userInput = prepared.userInput;
                return prepared.state;
            });
            assertActivation(payload);
            const clientState = emitState(next);
            launchGeneration({
                chatState: next,
                sessionId: payload.sessionId,
                userInput,
                requestId: message.requestId,
            });
            return clientState;
        }
        if (action === 'update-global-settings') {
            assertActivation(payload);
            await settingsRepository.mutateFourthWall(current => normalizeGlobalSettings(current, payload.patch));
            commentaryRuntime?.sync();
            const chatState = chatRepository.readCurrentChatFourthWall();
            return emitState(chatState);
        }
        if (action === 'restore-prompts') {
            assertActivation(payload);
            const defaults = createDefaultFourthWallGlobalSettings();
            await settingsRepository.mutateFourthWall(current => ({
                ...current,
                promptTemplates: defaults.promptTemplates,
            }));
            return emitState(chatRepository.readCurrentChatFourthWall());
        }
        if (action === 'image-check') {
            assertActivation(payload, true);
            return await imageProtocol.check(payload);
        }
        if (action === 'image-generate') {
            const current = assertActivation(payload, true);
            return await imageProtocol.generate({
                requestId: payload.mediaRequestId,
                tags: payload.tags,
                onProgress(progress) {
                    if (activation === current) {
                        post('fourth-wall/image-progress', { mediaRequestId: payload.mediaRequestId, ...progress });
                    }
                },
            });
        }
        if (action === 'image-cancel') {
            assertActivation(payload);
            return { cancelled: imageProtocol.cancel(payload.mediaRequestId) };
        }
        if (action === 'voice-play') {
            const current = assertActivation(payload, true);
            return voiceProtocol.play({
                requestId: payload.mediaRequestId,
                text: payload.text,
                emotion: payload.emotion,
                onState(state) {
                    if (activation === current) post('fourth-wall/voice-state', state);
                },
            });
        }
        if (action === 'voice-stop') {
            assertActivation(payload);
            return { stopped: voiceProtocol.stop(payload.mediaRequestId) };
        }
        if (action === 'open-agent-settings') {
            assertActivation(payload);
            await openAgentSettings();
            return { opened: true };
        }
        throw new Error('unsupported_fourth_wall_action');
    }

    function cancelForeground(reason) {
        generationRuntime.cancel(reason);
        imageProtocol?.cancelAll?.();
        voiceProtocol?.cancelAll?.();
        closeAgentSettings();
    }

    return Object.freeze({
        activate,
        deactivate,
        handleMessage,
        cancelForeground,
        cancelAll(reason) {
            cancelForeground(reason);
            commentaryRuntime?.cancel();
        },
        handleWindowOpened() {
            commentaryRuntime?.cancel();
        },
        handleChatChanged() {
            commentaryRuntime?.cancel();
        },
        startBackground() {
            commentaryRuntime?.start();
        },
        stopBackground() {
            commentaryRuntime?.stop();
            closeAgentSettings();
        },
    });
}
