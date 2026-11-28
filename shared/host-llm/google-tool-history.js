// Google documents this marker for function calls that did not come from Gemini.
// https://ai.google.dev/gemini-api/docs/thought-signatures
export const GOOGLE_SYNTHETIC_HISTORY_SIGNATURE = 'skip_thought_signature_validator';

// Some OpenAI-compatible relays append the opaque Google signature to the call ID.
const ID_MARKER = '__thought__';
export function googleSignatureFromToolId(id) {
    const offset = typeof id === 'string' ? id.indexOf(ID_MARKER) : -1;
    return offset < 0 ? undefined : id.slice(offset + ID_MARKER.length);
}
