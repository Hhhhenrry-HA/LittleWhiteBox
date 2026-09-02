import {
    createPromptContextAdapter,
} from '../../../host/prompt-context/adapter.js';
import type { PromptContextAdapter } from '../../../host/prompt-context/types.js';
import { normalizeTaskGenerationContext } from '../generation/context.js';
import type { TaskGenerationContext } from '../generation/types.js';

export interface TaskGenerationCapture {
    readonly chatIdentity: string;
    readonly contextSnapshot: TaskGenerationContext;
    readonly assistantCount: number;
}

export interface TaskGenerationContextAdapter {
    currentChatIdentity: () => string;
    capture: () => Promise<TaskGenerationCapture>;
}

interface TaskGenerationContextAdapterDependencies {
    readonly promptContext?: PromptContextAdapter;
    readonly readMapContext?: () => string;
}

export function createTaskGenerationContextAdapter({
    promptContext = createPromptContextAdapter(),
    readMapContext = () => '',
}: TaskGenerationContextAdapterDependencies = {}): TaskGenerationContextAdapter {
    function currentChatIdentity(): string {
        return promptContext.currentChatIdentity();
    }

    async function capture(): Promise<TaskGenerationCapture> {
        const captured = await promptContext.capture();
        const mapContext = readMapContext();
        if (currentChatIdentity() !== captured.chatIdentity) {throw new Error('tasks_chat_changed');}
        return {
            chatIdentity: captured.chatIdentity,
            assistantCount: captured.assistantCount,
            contextSnapshot: normalizeTaskGenerationContext({
                ...captured.contextSnapshot,
                mapContext,
            }),
        };
    }

    return Object.freeze({ currentChatIdentity, capture });
}
