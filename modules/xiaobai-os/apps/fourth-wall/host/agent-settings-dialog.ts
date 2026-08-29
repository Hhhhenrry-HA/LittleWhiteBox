import type { FourthWallGenerateResponse } from './generation-runtime.js';

const DIALOG_ID = 'xiaobaix-os-agent-settings';

type UnknownRecord = Record<string, unknown>;

interface ConfigSaveState {
    status: string;
    requestId: string;
    error: string;
}

interface AgentDialogState {
    config: UnknownRecord;
    configLoadError: string;
    configDraft: unknown;
    configDirty: boolean;
    configExternalChangePending: boolean;
    configFormSyncPending: boolean;
    configPage: string;
    configSave: ConfigSaveState;
    modelOptionsByProvider: UnknownRecord;
    pullStateByProvider: UnknownRecord;
}

interface AgentSettingsPanel {
    syncConfigToForm: (body: Element) => void;
    bindSettingsPanelEvents: (body: Element) => void;
}

export interface FourthWallAgentBridge {
    configureFourthWallAgent?: (options: { requestHeadersProvider?: (() => Record<string, string>) | null }) => void;
    generateFourthWallResponse: FourthWallGenerateResponse;
    normalizeAgentConfig: (value: unknown) => UnknownRecord;
    buildAgentSettingsPanelMarkup: (options: UnknownRecord) => string;
    createAgentSettingsPanel: (options: {
        state: AgentDialogState;
        render: () => void;
        showToast: (message: unknown) => void;
        describeError: (error: unknown) => string;
        reloadConfig: () => Promise<void>;
        getRuntimeSummaryText: (input: { providerLabel: string }) => string;
        saveConfig: (input: { requestId: string; payload: unknown }) => Promise<unknown>;
    }) => AgentSettingsPanel;
}

interface SaveConfigResult extends UnknownRecord {
    ok?: boolean;
    conflict?: boolean;
    config?: unknown;
    error?: string;
}

interface AgentSettingsDialogOptions {
    loadAgentBridge: () => Promise<FourthWallAgentBridge>;
    loadConfig: () => unknown | Promise<unknown>;
    saveConfig: (payload: UnknownRecord) => SaveConfigResult | Promise<SaveConfigResult>;
    subscribeConfigChanged?: (listener: (detail: UnknownRecord) => void) => () => void;
    documentTarget?: Document;
    windowTarget?: Window;
}

function describeError(error: unknown): string {
    return error instanceof Error ? error.message : String(error || 'unknown_error');
}

export function createFourthWallAgentSettingsDialog({
    loadAgentBridge,
    loadConfig,
    saveConfig,
    subscribeConfigChanged = () => () => {},
    documentTarget = document,
    windowTarget = window,
}: AgentSettingsDialogOptions) {
    let overlay: HTMLDivElement | null = null;
    let bridge: FourthWallAgentBridge | null = null;
    let panel: AgentSettingsPanel | null = null;
    let unsubscribe: (() => void) | null = null;
    let state: AgentDialogState | null = null;
    let saveResetTimer: number | null = null;
    let openGeneration = 0;

    function close(): void {
        openGeneration += 1;
        overlay?.remove();
        overlay = null;
        bridge = null;
        panel = null;
        state = null;
        unsubscribe?.();
        unsubscribe = null;
        if (saveResetTimer !== null) {
            windowTarget.clearTimeout(saveResetTimer);
        }
        saveResetTimer = null;
    }

    function showToast(message: unknown): void {
        if (!overlay || !message) {
            return;
        }
        const toast = documentTarget.createElement('div');
        toast.className = 'xiaobaix-os-agent-toast';
        toast.textContent = String(message);
        overlay.append(toast);
        windowTarget.setTimeout(() => toast.remove(), 2200);
    }

    function setSaveState(status: string, requestId = '', error = ''): void {
        if (!state) {
            return;
        }
        state.configSave = { status, requestId, error };
        render();
        if (status === 'success' || status === 'error') {
            if (saveResetTimer !== null) {
                windowTarget.clearTimeout(saveResetTimer);
            }
            saveResetTimer = windowTarget.setTimeout(() => {
                if (!state) {
                    return;
                }
                state.configSave = { status: 'idle', requestId: '', error: '' };
                render();
            }, 1800);
        }
    }

    async function reload(): Promise<void> {
        const currentBridge = bridge;
        const currentState = state;
        if (!currentState || !currentBridge) {
            return;
        }
        try {
            const config = currentBridge.normalizeAgentConfig(await loadConfig());
            if (state !== currentState || bridge !== currentBridge) {
                return;
            }
            currentState.config = config;
            currentState.configLoadError = '';
            currentState.configDraft = null;
            currentState.configDirty = false;
            currentState.configExternalChangePending = false;
            currentState.configFormSyncPending = true;
        } catch (error) {
            if (state !== currentState || bridge !== currentBridge) {
                return;
            }
            currentState.configLoadError = `共享 Agent API 配置读取失败：${describeError(error)}`;
        }
        render();
    }

    function render(): void {
        if (!overlay || !state || !bridge) {
            return;
        }
        const currentBridge = bridge;
        const currentState = state;
        const body = overlay.querySelector('.xiaobaix-os-agent-body');
        if (!body) {
            return;
        }
        // Markup is generated by the bundled first-party Agent settings module.
        // eslint-disable-next-line no-unsanitized/property
        body.innerHTML = currentBridge.buildAgentSettingsPanelMarkup({
            configSave: state.configSave,
            runtimeText: '',
            showInlineToast: false,
            showAssistantPermissions: false,
            showDelegateSettings: false,
            activePage: 'main',
            isBusy: false,
            canDeletePreset: Object.keys(state.config?.presets || {}).length > 1,
            configLoadError: state.configLoadError,
            configExternalChangePending: state.configExternalChangePending,
        });
        panel ||= currentBridge.createAgentSettingsPanel({
            state,
            render,
            showToast,
            describeError,
            reloadConfig: reload,
            getRuntimeSummaryText: ({ providerLabel }: { providerLabel: string }) => providerLabel,
            async saveConfig({ requestId, payload }: { requestId: string; payload: unknown }) {
                setSaveState('saving', requestId);
                const result = await saveConfig(payload as UnknownRecord);
                if (state !== currentState || bridge !== currentBridge) {
                    return result;
                }
                if (!result?.ok) {
                    if (result?.conflict && result.config) {
                        state.config = currentBridge.normalizeAgentConfig(result.config);
                        state.configExternalChangePending = true;
                    }
                    setSaveState('error', requestId, result?.error || '保存失败');
                    throw new Error(result?.error || '保存失败');
                }
                state.config = currentBridge.normalizeAgentConfig(result.config || state.config);
                state.configDraft = null;
                state.configDirty = false;
                state.configExternalChangePending = false;
                state.configFormSyncPending = true;
                setSaveState('success', requestId);
                showToast('配置已保存');
                return result;
            },
        });
        panel.syncConfigToForm(body);
        state.configFormSyncPending = false;
        panel.bindSettingsPanelEvents(body);
    }

    function createShell(): void {
        overlay = documentTarget.createElement('div');
        overlay.id = DIALOG_ID;
        overlay.className = 'xiaobaix-os-agent-overlay';
        const dialog = documentTarget.createElement('section');
        dialog.className = 'xiaobaix-os-agent-dialog';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-label', '四次元壁 Agent API 配置');
        const header = documentTarget.createElement('header');
        header.innerHTML = '<div><strong>Agent API 配置</strong><small>四次元壁使用小白 Agent 的共享配置</small></div>';
        const closeButton = documentTarget.createElement('button');
        closeButton.type = 'button';
        closeButton.textContent = '关闭';
        closeButton.addEventListener('click', close);
        header.append(closeButton);
        const body = documentTarget.createElement('div');
        body.className = 'xiaobaix-os-agent-body';
        body.textContent = '正在读取配置...';
        dialog.append(header, body);
        overlay.append(dialog);
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                close();
            }
        });
        documentTarget.body.append(overlay);
        closeButton.focus();
    }

    async function open(): Promise<boolean> {
        if (overlay?.isConnected) {
            return true;
        }
        const generation = ++openGeneration;
        createShell();
        try {
            const loadedBridge = await loadAgentBridge();
            if (generation !== openGeneration || !overlay?.isConnected) {
                return false;
            }
            const config = loadedBridge.normalizeAgentConfig(await loadConfig());
            if (generation !== openGeneration || !overlay?.isConnected) {
                return false;
            }
            bridge = loadedBridge;
            state = {
                config,
                configLoadError: '',
                configDraft: null,
                configDirty: false,
                configExternalChangePending: false,
                configFormSyncPending: true,
                configPage: 'main',
                configSave: { status: 'idle', requestId: '', error: '' },
                modelOptionsByProvider: {},
                pullStateByProvider: {},
            };
            unsubscribe = subscribeConfigChanged((detail: UnknownRecord) => {
                if (detail?.source === 'xiaobai-os-fourth-wall') {
                    return;
                }
                if (state?.configDirty) {
                    state.configExternalChangePending = true;
                    render();
                    return;
                }
                void reload();
            });
            render();
            return true;
        } catch (error) {
            if (generation !== openGeneration) {
                return false;
            }
            const body = overlay?.querySelector('.xiaobaix-os-agent-body');
            if (body) {
                body.textContent = `API 配置无法打开：${describeError(error)}`;
            }
            return false;
        }
    }

    return Object.freeze({ open, close, dispose: close, isOpen: () => !!overlay?.isConnected });
}
