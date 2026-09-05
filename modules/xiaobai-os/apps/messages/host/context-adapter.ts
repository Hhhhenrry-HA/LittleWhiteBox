import { getContext } from '../../../../../../../../extensions.js';
import { createPromptContextAdapter } from '../../../host/prompt-context/adapter.js';
import { selectPromptCharacters } from '../../../host/prompt-context/character-source.js';
import { normalizePromptContext } from '../../../host/prompt-context/normalize.js';
import { projectionMarker, type ChatMessage } from '../application/projection.js';
import { getStorySummaryCharacters } from '../../../../story-summary/story-summary.js';
import type { MessagesChatPort } from '../application/timeline.js';
import type { MessageContact, PrivateMessage } from '../../../domains/messages/types.js';
import { privateMessageScan } from '../prompt/world-info-scan.js';

export interface KnownPerson { name: string; aliases: string[]; text: string }

export function createMessagesContext(chat: MessagesChatPort) {
    const adapter = createPromptContextAdapter();
    function people(name = ''): KnownPerson[] {
        return getStorySummaryCharacters({ name, throughMessageIndex: chat.messages().length - 1,
            maxCharacters: name ? 8000 : 12000, maxPeople: 200 }) as KnownPerson[];
    }
    function knownPeople(): KnownPerson[] {
        const result = people();
        for (const card of normalizePromptContext({ characters: selectPromptCharacters(getContext()) }).characters) {
            if (!result.some(item => item.name === card.displayName)) {result.push({ name: String(card.displayName), aliases: [], text: '' });}
        }
        return result.slice(0, 200).map(person => ({ ...person, text: '' }));
    }
    async function capture(contact: MessageContact, history: PrivateMessage[], incoming: PrivateMessage) {
        const excluded = chat.messages().flatMap((message: ChatMessage, index) => projectionMarker(message) ? [index] : []);
        const snapshot = await adapter.capture({ excludeMessageIndices: excluded,
            worldInfoScanMessages: privateMessageScan(contact, history, incoming) });
        return { ...snapshot.contextSnapshot, people: people(contact.name) };
    }
    return { knownPeople, capture };
}

export type MessagesContext = ReturnType<typeof createMessagesContext>;
