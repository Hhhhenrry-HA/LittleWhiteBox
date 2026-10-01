import type { PartitionRegistration } from '../../kernel/contracts.js';
import { parseLearningWorkbenchHistory, type LearningWorkbenchHistory } from './domain/conversation.js';

export const LEARNING_WORKBENCH_PARTITION: PartitionRegistration<LearningWorkbenchHistory> = Object.freeze({
    key: 'learning-workbench', ownerId: 'learning', schemaVersion: 1, storage: 'user',
    parse(value: unknown) {
        try { return { ok: true as const, value: parseLearningWorkbenchHistory(value) }; }
        catch (error) { return { ok: false as const, error: { code: 'partition_invalid' as const,
            message: error instanceof Error ? error.message : 'Invalid learning conversation' } }; }
    },
    serialize: parseLearningWorkbenchHistory,
    createInitial: () => ({ conversations: [] }),
});
