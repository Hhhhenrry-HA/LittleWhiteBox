import type { MessageContact, PrivateMessage } from '../../domains/messages/types.js';
import type { XiaobaiOsFileState } from '../../kernel/contracts.js';

export interface ContactView extends Omit<MessageContact, 'summary'> {
    preview: string;
    lastSeq: number;
    lastAt: number | null;
    lastMessageId: string | null;
}
export interface ThreadPage {
    contactId: string; messages: PrivateMessage[]; hasMore: boolean;
    retryMessageId: string | null;
}
export interface MessagesClientState {
    chatIdentity: string;
    contacts: ContactView[];
    knownPeople: { name: string; aliases: string[] }[];
    fileState: XiaobaiOsFileState;
    pendingSave: boolean;
    busy: { contactId: string; stage: string } | null;
    generationActive: boolean;
    unsynced: number;
    error: string;
    media: { image: boolean; voice: boolean };
}
