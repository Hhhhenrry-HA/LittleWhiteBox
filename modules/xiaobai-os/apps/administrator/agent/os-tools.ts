import type { ManagementTool } from '../../../capabilities/management/index.js';
import { ADMINISTRATOR_COPY } from '../ui/copy.js';

export const OS_INSPECT = 'OSInspect';
export const ADMINISTRATOR_OS_INSPECT: ManagementTool = {
    effect: 'read', label: ADMINISTRATOR_COPY.inspect, target: () => '',
    definition: { type: 'function', function: {
        name: OS_INSPECT,
        description: [
            'Check how the OS is running for the chat you are helping with.',
            'data contains observedAt (Unix milliseconds), apps, maintenance, mainChatGenerating and storage. The initial environment reference uses the same result shape.',
            'Use it to investigate loading, maintenance or saving problems. For the contents of a record, use that APP’s read tools.',
            '',
            'apps contains id, name, description and load for each registered APP. load describes the APP’s runtime in the SillyTavern host: state is ready, loading with phase, or failed with phase and retryable.',
            'A ready host runtime is one part of an APP working. Its visible page loads separately, its records have their own contents, and maintenance has the status described below. Page rendering is outside this observation.',
            '',
            'maintenance contains each registered participant’s id, automaticEnabled, state (idle/running/error), mode, outcome, reason and lastProcessedAt.',
            'mode identifies automatic, manual or rebuild work. outcome is the recorded result and reason gives its category; absent values are null, including an outcome that is not available while work is running.',
            'This is the current runtime’s in-memory view. Null mode, outcome, reason and timestamp together mean this runtime has no observation to show.',
            'Only registered observation sources appear in this list; automaticEnabled describes their automatic setting independently.',
            'lastProcessedAt records the latest completion with an updated, unchanged or partial result. It can remain at that completion time after a later failed attempt.',
            '',
            'mainChatGenerating reports generation in the main roleplay chat.',
            'storage.chat and storage.user each contain state (loading/ready/saving/unconfirmed/conflict/failed) and hasPendingCommit (a prepared save awaiting resolution). Each file has its own save state.',
            '',
            'This is a read-only snapshot of existing state.',
            'If the observation cannot be read, the result has status failed and a code. Switching chats ends the old query.',
        ].join('\n'),
        parameters: { type: 'object', properties: {}, additionalProperties: false },
    } },
};
