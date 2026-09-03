/* eslint-disable */
import { getRequestHeaders as l } from "../../../../../../../script.js";
import { extensionFolderPath as c } from "../../../core/constants.js";
import { normalizeAgentSettings as p } from "../../agent-core/config.js";
import { resolveActiveProviderConfig as u } from "../../agent-core/provider-resolution.js";
import { loadSharedAgentSettings as d, saveSharedAgentSettings as f, subscribeSharedAgentSettingsChanged as S } from "../../agent-core/settings-repository.js";
import { AssistantStorage as m } from "../../../core/server-storage.js";
var a = null;
function w(n) {
  const s = String(n || "");
  return /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(s) || s.startsWith("/") || s.startsWith("./") || s.startsWith("../") ? s : `/${s}`;
}
function i() {
  return a || (a = import(w(`${c}/modules/xiaobai-os/dist/xiaobai-os-agent.js`)).then((n) => (n.configureXiaobaiOsAgent?.({ requestHeadersProvider: () => l?.() || {} }), n)).catch((n) => {
    throw a = null, n;
  })), a;
}
function C(n = {}) {
  const s = String(n.source || "xiaobai-os-agent-api"), r = {
    loadConfig: async () => await d({ storage: m }),
    saveConfig: async (e) => await f(e, {
      storage: m,
      silent: !1,
      source: s
    }),
    subscribeConfigChanged: (e) => S(e),
    async openSession(e) {
      const t = u(p(e || {})), g = (await i()).openXiaobaiOsAgentSession(t);
      return Object.freeze({
        providerConfig: t,
        supportsSessionToolLoop: g.supportsSessionToolLoop,
        async run(o) {
          return await g.run({
            systemPrompt: o.systemPrompt,
            messages: o.messages,
            tools: o.tools || [],
            temperature: o.temperature ?? t.temperature,
            maxTokens: o.maxTokens ?? t.maxTokens,
            reasoning: o.reasoning ?? t.reasoning,
            signal: o.signal,
            onStreamProgress: o.onStreamProgress,
            toolResponses: o.toolResponses,
            finalAnswerReminderText: o.finalAnswerReminderText
          });
        }
      });
    },
    async run(e) {
      return await (await r.openSession(e.config)).run(e);
    },
    async pullModels(e, t) {
      return await (await i()).pullXiaobaiOsAgentModels(e, { signal: t });
    },
    async testConnection(e, t) {
      return await (await i()).testXiaobaiOsAgentConnection(e, { signal: t });
    }
  };
  return Object.freeze(r);
}
export {
  C as createXiaobaiOsAgentGateway
};
