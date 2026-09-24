import type { ManagementTool } from '../../../capabilities/management/index.js';
import { ADMINISTRATOR_COPY } from '../ui/copy.js';

export const OS_INSPECT = 'OSInspect';
export const ADMINISTRATOR_OS_INSPECT: ManagementTool = {
    effect: 'read', label: ADMINISTRATOR_COPY.inspect, target: () => '',
    definition: { type: 'function', function: {
        name: OS_INSPECT,
        description: [
            'Refresh the OS environment observation for this conversation’s chat.',
            'data contains observedAt (Unix milliseconds), apps, maintenance, mainChatGenerating and storage. The initial environment reference uses the same result shape.',
            'Use it for runtime questions. Business-record details belong to the connected APP read tools.',
            '',
            'apps contains id, name, description and load for each registered APP. load observes only its runtime in the SillyTavern host: state is ready, loading with phase, or failed with phase and retryable.',
            'The APP’s visible page is loaded and rendered separately and is not observed here; ready cannot rule out a blank or inaccessible page. Host readiness also does not establish business-data correctness or maintenance health.',
            '',
            'maintenance contains each registered participant’s id, automaticEnabled, state (idle/running/error), mode, outcome, reason and lastProcessedAt.',
            'mode identifies automatic, manual or rebuild work. outcome is the recorded result and reason is its existing reason category; absent values are null, and a running operation may have no outcome yet.',
            'These observations live only in memory. Null mode, outcome, reason and timestamp together mean no record in this runtime, not that maintenance has never run. A missing participant means no registered observation source, not a disabled automatic setting.',
            'lastProcessedAt is the latest completion with an updated, unchanged or partial result, not the latest attempt. A later failure can retain that timestamp.',
            '',
            'mainChatGenerating reports main-chat generation, not administrator activity.',
            'storage.chat and storage.user each contain state (loading/ready/saving/unconfirmed/conflict/failed) and hasPendingCommit (a prepared save awaiting resolution). The files are independent; ready in one says nothing about the other.',
            '',
            'This query samples existing state without reading private APP records, retrying saves, running maintenance, changing settings or testing connections.',
            'A failed query returns status failed and a code rather than a healthy observation. Switching chats ends the old query.',
        ].join('\n'),
        parameters: { type: 'object', properties: {}, additionalProperties: false },
    } },
};
