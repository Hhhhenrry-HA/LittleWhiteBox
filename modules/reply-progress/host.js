import { getContext } from '../../../../../extensions.js';
import { eventSource, event_types } from '../../../../../events.js';
import { is_group_generating } from '../../../../../group-chats.js';
import { online_status, setSendButtonState, streamingProcessor } from '../../../../../../script.js';
import { isGenerating } from '../../shared/common/sillytavern-generation-state.js';
import { createReplyProgressRuntime } from './runtime.js';

export function createReplyProgressHostRuntime() {
    return createReplyProgressRuntime({
        events: eventSource,
        eventTypes: event_types,
        getTextarea: () => document.querySelector('#send_textarea'),
        getChat: () => getContext().chat,
        getStream: () => streamingProcessor,
        isGenerating: () => isGenerating() || document.body.dataset.generating === 'true',
        markHostPreparing: () => {
            // The outer group call can return for an empty group without
            // releasing the send flag. Track the actual member calls instead.
            if (getContext().groupId && !is_group_generating) return false;
            setSendButtonState(true);
            return true;
        },
        isConnected: () => online_status !== 'no_connection',
    });
}
