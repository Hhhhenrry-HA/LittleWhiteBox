import { normalizeAgentSettings } from '../../../agent-core/config.js';
import { resolveActiveProviderConfig } from '../../../agent-core/provider-resolution.js';
import {
    loadSharedAgentSettings,
    saveSharedAgentSettings,
    subscribeSharedAgentSettingsChanged,
} from '../../../agent-core/settings-repository.js';
import { AssistantStorage } from '../../../../core/server-storage.js';
import { loadXiaobaiOsAgentBridge } from './bridge-loader.js';

type UnknownRecord = Record<string, unknown>;

export interface XiaobaiOsAgentRunRequest {
    config: unknown;
    systemPrompt: string;
    messages: readonly UnknownRecord[];
    tools?: readonly UnknownRecord[];
    temperature?: number;
    maxTokens?: number;
    reasoning?: UnknownRecord;
    signal?: AbortSignal;
    onStreamProgress?: (snapshot: UnknownRecord) => void;
}

export interface XiaobaiOsAgentGateway {
    loadConfig: () => Promise<UnknownRecord>;
    saveConfig: (patch: UnknownRecord) => Promise<UnknownRecord>;
    subscribeConfigChanged: (listener: (detail: UnknownRecord) => void) => () => void;
    run: (request: XiaobaiOsAgentRunRequest) => Promise<UnknownRecord>;
    pullModels: (providerConfig: UnknownRecord, signal?: AbortSignal) => Promise<string[]>;
    testConnection: (
        providerConfig: UnknownRecord,
        signal?: AbortSignal,
    ) => Promise<{ provider: string; model: string; latencyMs: number }>;
}

export function createXiaobaiOsAgentGateway(
    options: { source?: string } = {},
): XiaobaiOsAgentGateway {
    const source = String(options.source || 'xiaobai-os-agent-api');
    const gateway: XiaobaiOsAgentGateway = {
        loadConfig: async () => await loadSharedAgentSettings({ storage: AssistantStorage }),
        saveConfig: async (patch: UnknownRecord) => await saveSharedAgentSettings(patch, {
            storage: AssistantStorage,
            silent: false,
            source,
        }) as UnknownRecord,
        subscribeConfigChanged: (listener) => subscribeSharedAgentSettingsChanged(listener),
        async run(request) {
            const config = normalizeAgentSettings(request.config || {});
            const providerConfig = resolveActiveProviderConfig(config);
            return await (await loadXiaobaiOsAgentBridge()).runXiaobaiOsAgent({
                providerConfig,
                systemPrompt: request.systemPrompt,
                messages: request.messages,
                tools: request.tools || [],
                temperature: request.temperature ?? providerConfig.temperature,
                maxTokens: request.maxTokens ?? providerConfig.maxTokens,
                reasoning: request.reasoning ?? providerConfig.reasoning,
                signal: request.signal,
                onStreamProgress: request.onStreamProgress,
            });
        },
        async pullModels(providerConfig, signal) {
            return await (await loadXiaobaiOsAgentBridge())
                .pullXiaobaiOsAgentModels(providerConfig, { signal });
        },
        async testConnection(providerConfig, signal) {
            return await (await loadXiaobaiOsAgentBridge())
                .testXiaobaiOsAgentConnection(providerConfig, { signal });
        },
    };
    return Object.freeze(gateway);
}
