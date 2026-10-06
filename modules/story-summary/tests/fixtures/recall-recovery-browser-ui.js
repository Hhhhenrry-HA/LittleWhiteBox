import { createRecallRecovery } from '../../generate/recall-recovery.js';
import { createRecallRecoveryHost } from '../../generate/recovery-host.js';
import { acquireRecallRecoveryUi, protectGenerationDraft } from '../../generate/recovery-ui.js';
import { SUMMARY_FEEDBACK_COPY } from '../../feedback-copy.js';
import { createEnaPlannerSendInterceptor } from '../../../ena-planner/ena-planner-interceptor.js';

const textarea = document.getElementById('send_textarea');
const stop = document.getElementById('mes_stop');
const notice = document.getElementById('notice');
const state = { plans: 0, rounds: 0, main: 0, notices: 0, busy: true, errors: [] };
const listeners = new Map();
const handlers = new Map();
let nativeController = new AbortController();
let ready;
let failed = true;
const context = {
    chatId: 'fixture', groupId: null, chat: [{ is_user: true, mes: 'original with completed plan' }],
    eventTypes: { GENERATION_STOPPED: 'stop', GENERATION_STARTED: 'start' },
    eventSource: { makeFirst: (key, fn) => listeners.set(key, fn), removeListener: key => listeners.delete(key) },
    deactivateSendButtons() { stop.style.display = 'flex'; document.body.dataset.generating = 'true'; },
    activateSendButtons() { state.busy = false; stop.style.display = 'none'; delete document.body.dataset.generating; },
    stopGeneration() { nativeController.abort(); stop.style.display = 'none'; listeners.get('stop')?.(); },
    async generate(type, params) {
        state.rounds++;
        listeners.get('start')?.(type, params, false);
        state.busy = true; context.deactivateSendButtons();
        render();
        await new Promise(resolve => { ready = resolve; });
        textarea.value = ''; // Native preamble consumes the protected input.
        let aborted = false;
        for (const fn of handlers.values()) await fn([], 0, () => { aborted = true; });
        if (!aborted && !params.signal.aborted) {
            if (failed) retryRecall();
            else { recovery.succeeded(); state.main++; }
        }
        context.activateSendButtons(); render();
    },
};
const getContext = () => context;
const host = createRecallRecoveryHost({ getContext, isGenerating: () => state.busy,
    generateGroup: () => { throw new Error('not a group fixture'); },
    setAbortController: value => { nativeController = value; }, protectDraft: () => protectGenerationDraft(document, getContext),
    registerInterceptor: (key, fn) => handlers.set(key, fn), unregisterInterceptor: key => handlers.delete(key),
});
const recovery = createRecallRecovery({ getContext, host,
    acquireUi: onStop => acquireRecallRecoveryUi({ document, window, getContext, isGenerating: () => state.busy, onStop }),
    createNotice: () => ({ show() { notice.textContent = SUMMARY_FEEDBACK_COPY.recallRetrying; notice.hidden = false; state.notices++; render(); }, clear() { notice.hidden = true; } }),
    onError: error => { state.errors.push(String(error)); render(); },
});
host.install(() => { recovery.cancel('generation-stopped'); render(); });
const planner = createEnaPlannerSendInterceptor({ eventTarget: document, getChatIdentity: () => context.chatId,
    getSettings: () => ({ enabled: true }), getTextarea: () => textarea, getSendButton: () => document.getElementById('send_but'),
    shouldSendOnEnter: () => true, readStorySummary: () => '',
    plan: async () => { state.plans++; return { filtered: '<plot>fixture only</plot>' }; },
});
planner.install();
const request = { type: 'normal', params: {} };
function render() { document.getElementById('status').textContent = JSON.stringify(state); }
function retryRecall() {
    const startedAt = performance.now();
    recovery.retry({ request, startedAt, requestStartedAt: startedAt });
}
document.getElementById('start').onclick = () => {
    failed = true; state.busy = true; context.deactivateSendButtons();
    retryRecall();
    setTimeout(() => { context.activateSendButtons(); render(); }, 200);
};
document.getElementById('ready').onclick = () => ready?.();
document.getElementById('success').onclick = () => { failed = false; ready?.(); };
document.getElementById('theme').onclick = () => document.body.classList.toggle('light');
stop.onclick = () => { context.stopGeneration(); context.activateSendButtons(); render(); };
globalThis.recoveryFixture = { state, context, recovery, host };
render();
