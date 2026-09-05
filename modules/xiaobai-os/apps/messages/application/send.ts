import { appendMessages } from '../../../domains/messages/commands.js';
import type { MessagePayload } from '../../../domains/messages/types.js';
import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import type { MessagesService } from './service.js';
import type { MessagesTimeline } from './timeline.js';
import type { MessagesContext } from '../host/context-adapter.js';
import { unsyncedIds } from './projection.js';
import { compileReplies, compileSummary } from '../prompt/reply-compiler.js';
import { buildReplyPrompt } from '../prompt/reply-prompt.js';
import { buildSummaryPrompt, summaryBatch } from '../prompt/thread-summary.js';

export interface SendDependencies {
    service: MessagesService; timeline: MessagesTimeline; context: MessagesContext;
    agent: Pick<XiaobaiOsAgentGateway, 'loadConfig' | 'openSession'>;
    playerName(): string; id(): string;
}

/** Owns ordering, not lifetime: the host supplies the captured chat/run guard. */
export async function sendPrivateMessage(deps: SendDependencies, input: {
    contactId: string; messageId: string; payload?: MessagePayload;
    guard: () => boolean; signal: AbortSignal; stage: (stage: string) => void;
}): Promise<void> {
    const { service, timeline, agent, context } = deps;
    const assertCurrent = () => {if (!input.guard() || input.signal.aborted) {throw new Error('messages_cancelled');}};
    assertCurrent();
    await service.refresh();
    assertCurrent();
    const segmentId = await timeline.select(input.guard);
    let incoming = service.current().messages.find(message => message.id === input.messageId);
    if (incoming) {
        if (incoming.contactId !== input.contactId || incoming.sender !== 'user'
            || input.payload && JSON.stringify(incoming.payload) !== JSON.stringify(input.payload)) {throw new Error('messages_action_conflict');}
    } else {
        if (!input.payload) {throw new Error('messages_input_missing');}
        input.stage('saving');
        await service.change(state => appendMessages(state, { segmentId, contactId: input.contactId,
            playerName: deps.playerName(), replyTo: null, entries: [{ id: input.messageId, payload: input.payload! }], createdAt: Date.now() }), input.guard);
        incoming = service.current().messages.find(message => message.id === input.messageId)!;
    }
    assertCurrent();
    const existingReplies = service.current().messages.filter(message => message.replyTo === incoming.id);
    const missing = new Set(unsyncedIds(service.current()));
    const projectionSegments = service.current().segments.filter(segment => segment.messageIds.some(id => missing.has(id))
        && (segment.messageIds.includes(incoming!.id) || existingReplies.some(message => segment.messageIds.includes(message.id))));
    input.stage('syncing');
    for (const segment of projectionSegments) {await timeline.sync(segment.id, input.guard);}
    if (existingReplies.length) {return;}
    const thread = service.current().messages.filter(message => message.contactId === input.contactId);
    if (thread.at(-1)?.id !== incoming.id) {throw new Error('messages_thread_changed');}
    assertCurrent();
    const config = await agent.loadConfig();
    assertCurrent();
    const session = await agent.openSession(config);
    assertCurrent();
    if (!String(session.providerConfig.model ?? '').trim()) {throw new Error('messages_agent_not_configured');}
    let contact = service.current().contacts.find(person => person.id === input.contactId)!;
    const history = thread.filter(message => message.id !== incoming!.id);
    let batch = summaryBatch(contact, history);
    while (batch.length) {
        input.stage('summarizing');
        const response = await session.run({ ...buildSummaryPrompt(contact, batch), tools: [], signal: input.signal });
        assertCurrent();
        const text = compileSummary(response);
        const throughSeq = batch.at(-1)!.seq;
        const previous = contact.summary?.throughSeq ?? 0;
        await service.change(state => {
            const target = state.contacts.find(person => person.id === input.contactId);
            if (!target || (target.summary?.throughSeq ?? 0) !== previous) {throw new Error('messages_thread_changed');}
            target.summary = { throughSeq, text };
        }, input.guard);
        assertCurrent();
        contact = service.current().contacts.find(person => person.id === input.contactId)!;
        batch = summaryBatch(contact, history);
    }
    input.stage('replying');
    const background = await context.capture(contact, history, incoming);
    assertCurrent();
    const prompt = buildReplyPrompt({ contact, context: background, incoming,
        history: history.filter(message => message.seq > (contact.summary?.throughSeq ?? 0)) });
    const response = await session.run({ ...prompt, tools: [], signal: input.signal });
    assertCurrent();
    const replies = compileReplies(response);
    const entries = replies.map(payload => ({ id: deps.id(), payload }));
    // The guard is also checked by the transaction coordinator immediately before replace.
    input.stage('saving');
    await service.change(state => {
        const currentThread = state.messages.filter(message => message.contactId === input.contactId);
        const currentContact = state.contacts.find(person => person.id === input.contactId);
        if (JSON.stringify(currentThread) !== JSON.stringify(thread)
            || currentContact?.name !== contact.name || currentContact?.note !== contact.note) {throw new Error('messages_thread_changed');}
        appendMessages(state, { segmentId, contactId: input.contactId, playerName: incoming!.from,
            replyTo: incoming!.id, entries, createdAt: Date.now() });
    }, input.guard);
    // A save already issued is allowed to settle, but cannot write into a new timeline.
    if (!input.guard() || input.signal.aborted) {return;}
    input.stage('syncing');
    await timeline.sync(segmentId, input.guard);
}
