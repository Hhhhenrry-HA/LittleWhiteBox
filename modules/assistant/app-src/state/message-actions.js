import { deliveredText } from '../../plugins/delivery/history.js';

function isAssistantTextMessage(message) {
    return message?.role === 'assistant'
        && !message.approvalRequest
        && !message.streaming
        && !message.toolCalls?.length
        && !!String(message.content || '').trim();
}

export function getMessageActions(messages, messageIndex) {
    const message = messages[messageIndex];
    if (!message || message.approvalRequest || message.streaming) return [];
    const lastUserIndex = messages.findLastIndex(item => item.role === 'user' && !item.approvalRequest);
    if (message.role === 'user') {
        if (messageIndex !== lastUserIndex) return [];
        return message.localOperation ? ['copy', 'edit', 'delete'] : ['copy', 'edit', 'reroll', 'delete'];
    }
    const delivery = deliveredText(messages, messageIndex) !== undefined;
    if (!delivery && !isAssistantTextMessage(message)) return [];
    const lastReplyIndex = messages.findLastIndex((item, i) => isAssistantTextMessage(item) || deliveredText(messages, i) !== undefined);
    const latest = messageIndex === lastReplyIndex && messageIndex > lastUserIndex;
    const canReroll = latest && !messages[lastUserIndex]?.localOperation;
    if (delivery) return canReroll ? ['copy', 'reroll'] : ['copy'];
    return latest
        ? ['copy', 'edit', ...(canReroll ? ['reroll'] : []), 'delete']
        : ['copy', 'edit'];
}

export function getRerollUserIndex(messages, messageIndex) {
    for (let index = messageIndex; index >= 0; index--) {
        if (messages[index]?.role === 'user' && !messages[index].approvalRequest) return messages[index].localOperation ? -1 : index;
    }
    return -1;
}
