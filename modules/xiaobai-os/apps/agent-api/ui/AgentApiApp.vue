<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, toRaw } from 'vue';
import { normalizeAgentConfig } from '../../../../agent-core/config.js';
import { createAgentSettingsPanel } from '../../../../agent-core/ui/settings-panel.js';
import { buildAgentSettingsPanelMarkup } from '../../../../agent-core/ui/settings-markup.js';
import type { XiaobaiOsAppProps } from '../../../shell/app-src/app-registry.js';
import type { AgentApiClientState, AgentApiConnectionResult } from '../types.js';
import './agent-api.css';

type UnknownRecord = Record<string, unknown>;
type SaveRequest = { payload?: UnknownRecord };
type Panel = {
    getActiveProviderConfigFromForm: (root: ParentNode) => UnknownRecord;
    syncConfigToForm: (root: ParentNode) => void;
    bindSettingsPanelEvents: (root: ParentNode) => void;
};

const NETWORK_TIMEOUT_MS = 130_000;
const props = defineProps<XiaobaiOsAppProps>();
const initialState = structuredClone(toRaw(props.initialState as AgentApiClientState));
const clientState = ref<AgentApiClientState>(initialState);
const panelRoot = ref<HTMLElement | null>(null);
const connectionStatus = ref<'idle' | 'testing' | 'success' | 'error'>('idle');
const connectionMessage = ref('尚未测试。打开页面和保存配置都不会自动连接供应商。');
let unsubscribe = () => {};
let saveResetTimer: ReturnType<typeof setTimeout> | null = null;
let reloadGeneration = 0;

const panelState = reactive({
    config: null as UnknownRecord | null,
    configDraft: null as UnknownRecord | null,
    configDirty: false,
    configExternalChangePending: false,
    configFormSyncPending: true,
    configPage: 'main',
    configSave: { status: 'idle', requestId: '', error: '' },
    modelOptionsByProvider: {} as Record<string, string[]>,
    pullStateByProvider: {} as Record<string, UnknownRecord>,
    inlineToastText: '',
});

const configReady = computed(() => clientState.value.status === 'ready' && panelState.config !== null);
const presetCount = computed(() => Object.keys((panelState.config?.presets as UnknownRecord) || {}).length);
const connectionBusy = computed(() => connectionStatus.value === 'testing');

function describeError(error: unknown): string {
    const message = error instanceof Error ? error.message : String(error || 'unknown_error');
    if (message === 'host_request_timeout') {return '请求等待超时，请检查网络后重试。';}
    if (message === 'app_inactive') {return '页面已经关闭。';}
    return message;
}

function scheduleSaveFeedbackReset(): void {
    if (saveResetTimer) {clearTimeout(saveResetTimer);}
    saveResetTimer = setTimeout(() => {
        panelState.configSave = { status: 'idle', requestId: '', error: '' };
        panelState.inlineToastText = '';
        renderPanel();
    }, 1_800);
}

async function handleSaveConfig(request: SaveRequest): Promise<void> {
    const patch = request.payload || {};
    panelState.configSave = { status: 'saving', requestId: '', error: '' };
    panelState.inlineToastText = '正在保存共享配置…';
    renderPanel();
    try {
        const response = await props.bridge.request('agent-api/save', { patch }, 35_000) as {
            result: { ok?: boolean; conflict?: boolean; config?: UnknownRecord; error?: string };
        };
        const result = response.result;
        if (result.ok !== true || !result.config) {
            if (result.conflict) {panelState.configExternalChangePending = true;}
            throw new Error(result.error || '共享 Agent API 配置保存失败');
        }
        panelState.config = normalizeAgentConfig(result.config);
        panelState.configDraft = null;
        panelState.configDirty = false;
        panelState.configExternalChangePending = false;
        panelState.configFormSyncPending = true;
        panelState.configSave = { status: 'success', requestId: '', error: '' };
        panelState.inlineToastText = '已保存；小白酒馆、画图、Ebook 与 OS 将读取同一份配置。';
    } catch (error) {
        const message = describeError(error);
        panelState.configSave = { status: 'error', requestId: '', error: message };
        panelState.inlineToastText = message;
    }
    renderPanel();
    scheduleSaveFeedbackReset();
}

async function reloadConfig(preserveNewDraft = false): Promise<void> {
    const generation = ++reloadGeneration;
    try {
        const response = await props.bridge.request('agent-api/reload', {}, 35_000) as {
            result: AgentApiClientState;
        };
        if (generation !== reloadGeneration) {return;}
        if (preserveNewDraft && panelState.configDirty) {
            panelState.configExternalChangePending = true;
            renderPanel();
            return;
        }
        applyClientState(response.result);
    } catch (error) {
        if (generation !== reloadGeneration) {return;}
        clientState.value = { status: 'error', config: null, message: describeError(error) };
        renderPanel();
    }
}

async function pullModels(providerConfig: UnknownRecord): Promise<string[]> {
    const response = await props.bridge.request('agent-api/pull-models', {
        providerConfig,
    }, NETWORK_TIMEOUT_MS) as { result: { models: string[] } };
    return response.result.models;
}

const panel = createAgentSettingsPanel({
    state: panelState,
    render: renderPanel,
    saveConfig: handleSaveConfig,
    reloadConfig,
    pullModels,
    describeError,
}) as Panel;

function renderPanel(): void {
    const root = panelRoot.value;
    if (!root || !panelState.config) {return;}
    // This markup is produced by the first-party Agent Core form renderer.
    // eslint-disable-next-line no-unsanitized/property
    root.innerHTML = buildAgentSettingsPanelMarkup({
        configSave: panelState.configSave,
        inlineToastText: panelState.inlineToastText,
        showAssistantPermissions: false,
        showDelegateSettings: false,
        showTavilySettings: false,
        canDeletePreset: presetCount.value > 1,
        configLoadError: clientState.value.status === 'error' ? clientState.value.message : '',
        configExternalChangePending: panelState.configExternalChangePending,
    });
    panel.syncConfigToForm(root);
    panel.bindSettingsPanelEvents(root);
}

function applyClientState(next: AgentApiClientState): void {
    clientState.value = structuredClone(next);
    if (next.status === 'ready' && next.config) {
        panelState.config = normalizeAgentConfig(next.config);
        panelState.configDraft = null;
        panelState.configDirty = false;
        panelState.configExternalChangePending = false;
        panelState.configFormSyncPending = true;
    }
    void nextTick(renderPanel);
}

async function testConnection(): Promise<void> {
    const root = panelRoot.value;
    if (!root || !configReady.value || connectionBusy.value) {return;}
    const providerConfig = panel.getActiveProviderConfigFromForm(root);
    connectionStatus.value = 'testing';
    connectionMessage.value = '正在测试当前表单中的连接…';
    try {
        const response = await props.bridge.request('agent-api/test-connection', {
            providerConfig: structuredClone(toRaw(providerConfig)),
        }, NETWORK_TIMEOUT_MS) as { result: AgentApiConnectionResult };
        const result = response.result;
        connectionStatus.value = 'success';
        connectionMessage.value = `${result.provider || 'Provider'} · ${result.model || '当前模型'} · ${result.latencyMs} ms`;
    } catch (error) {
        connectionStatus.value = 'error';
        connectionMessage.value = describeError(error);
    }
}

onMounted(() => {
    unsubscribe = props.bridge.subscribe((message) => {
        if (message.type === 'agent-api/state') {
            applyClientState((message.payload as { state: AgentApiClientState }).state);
            return;
        }
        if (message.type !== 'agent-api/config-changed') {return;}
        if (panelState.configDirty) {
            panelState.configExternalChangePending = true;
            renderPanel();
        } else {
            void reloadConfig(true);
        }
    });
    applyClientState(initialState);
});

onBeforeUnmount(() => {
    reloadGeneration += 1;
    unsubscribe();
    if (saveResetTimer) {clearTimeout(saveResetTimer);}
});
</script>

<template>
    <main class="agent-api-app">
        <header class="agent-api-header">
            <div>
                <span>System service</span>
                <h1>Agent API</h1>
                <p>一份配置，供小白酒馆、画图、Ebook 与 OS 共同使用。</p>
            </div>
            <i aria-hidden="true"><b /> API</i>
        </header>

        <div class="agent-api-scroll">
            <section class="agent-api-connection" :class="`is-${connectionStatus}`" aria-labelledby="agent-api-connection-title">
                <div>
                    <small>CONNECTION CHECK</small>
                    <h2 id="agent-api-connection-title">当前连接</h2>
                    <p aria-live="polite">{{ connectionMessage }}</p>
                </div>
                <button type="button" :disabled="!configReady || connectionBusy" @click="testConnection">
                    {{ connectionBusy ? '测试中…' : '测试当前连接' }}
                </button>
            </section>

            <section v-if="clientState.status === 'loading'" class="agent-api-state" aria-live="polite">
                <i aria-hidden="true" />
                <div><strong>正在读取共享配置</strong><span>页面打开不会连接模型供应商。</span></div>
            </section>

            <section v-else-if="clientState.status === 'error'" class="agent-api-state is-error" role="alert">
                <div><strong>配置暂时无法读取</strong><span>{{ clientState.message }}</span></div>
                <button type="button" @click="reloadConfig()">重新读取</button>
            </section>

            <section v-show="configReady" class="agent-api-panel" aria-label="共享 Agent API 配置">
                <div ref="panelRoot" />
            </section>
        </div>
    </main>
</template>
