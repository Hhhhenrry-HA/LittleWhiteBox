import type { LearningClientState } from '../types.js';

type Activity = Pick<LearningClientState, 'busy' | 'chatBusy' | 'preparation'>;
const contextActions = new Set(['language', 'teacher', 'forget-conversation', 'resume', 'rate', 'seek', 'verify-teacher', 'adopt-teacher']);
const preparationConcurrentActions = new Set(['submit', 'bookmark', 'say', 'play', 'save-note', 'delete-note']);
const immediateActions = new Set(['records', 'export', 'pause', 'stop', 'cancel', 'cancel-chat', 'cancel-companion', 'cancel-preparation',
    'tts-settings', 'research-settings', 'dismiss-source']);
const recoveryActions = new Set(['read', 'verify', 'retry-save', 'adopt-server', 'verify-teacher', 'adopt-teacher', 'verify-wallet', 'adopt-wallet', 'export']);

/** One activity policy for native controls and Host dispatch. Reading never waits for model work. */
export function learningActionBusy(name: string, state: Activity): boolean {
    if (immediateActions.has(name)) { return false; }
    if (name === 'talk' || name === 'explain') { return state.chatBusy; }
    if (contextActions.has(name)) { return state.busy || state.chatBusy || !!state.preparation?.running; }
    return state.busy || !!state.preparation?.running && !preparationConcurrentActions.has(name);
}

export function learningActionAvailable(name: string, state: Activity & Pick<LearningClientState, 'storage' | 'chatStorage'>): boolean {
    return !learningActionBusy(name, state) && (immediateActions.has(name) || recoveryActions.has(name)
        || state.storage === 'ready' && state.chatStorage === 'ready');
}
