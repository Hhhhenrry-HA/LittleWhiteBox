import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import { classifyProviderFailure } from '../../../capabilities/agent/provider-failure.js';
import { learningText, LearningValidationError, type LearningTeacherPreference } from '../../../domains/learning/profile.js';
import { buildLearningContext, retainLearningDialogue, type LearningDialogue, type LearningTeacherContext } from '../agent/context.js';
import { LEARNING_SYSTEM_PROMPT } from '../agent/prompt.js';
import { runLearningProviderLoop } from '../agent/provider-loop.js';
import { learningResearchTools } from '../agent/research-tools.js';
import { createLearningSession, type LearningAction } from '../agent/session.js';
import { learningTools } from '../agent/tool-contract.js';
import { createLearningSourceRegistry } from '../materials/lesson-sources.js';
import { createLearningResearch } from '../materials/research.js';
import { LearningStorageError } from '../storage/repository.js';
import { sameLearningDocument } from '../storage/document.js';
import { confirmedLearning, type LearningRepository } from './service.js';
import { reportLearningFailure, type LearningFailureDetails, type LearningProgress } from './feedback.js';

export interface LearningClassroom {
    language: string; osId: string; chatIdentity: string;
    teacher: NonNullable<LearningTeacherPreference['teacher']>;
}
export type LearningTeachingResult =
    | { status: 'finished'; text: string; changed: boolean; appliedTools: string[] }
    | { status: 'unconfirmed' | 'conflict' | 'cancelled' | 'busy' }
    | { status: 'failed'; reason: string; message: string };

/** One active teaching action per classroom. Reading/opening never enters this function. */
export function createLearningTeaching(options: {
    repository: LearningRepository; gateway: XiaobaiOsAgentGateway;
    current: () => LearningClassroom | null;
    capture: (name: string, chatIdentity: string) => Promise<LearningTeacherContext>;
    createId?: () => string; now?: () => string;
    onProgress?: (progress: LearningProgress) => void;
}) {
    let active: AbortController | null = null;
    let dialogueKey = '';
    let dialogue: LearningDialogue[] = [];
    return {
        cancel() { active?.abort(); active = null; dialogue = []; dialogueKey = ''; },
        async run(input: { action: LearningAction; message: string; exerciseId?: string }): Promise<LearningTeachingResult> {
            if (active) { return { status: 'busy' }; }
            const classroom = structuredClone(options.current());
            if (!classroom?.chatIdentity || !classroom.osId) { return { status: 'cancelled' }; }
            const key = JSON.stringify(classroom);
            if (key !== dialogueKey) { dialogue = []; dialogueKey = key; }
            const controller = new AbortController();
            active = controller;
            const guard = () => active === controller && !controller.signal.aborted && JSON.stringify(options.current()) === key;
            let draft: ReturnType<typeof createLearningSession> | null = null;
            let progress: LearningProgress = { stage: 'context' };
            const advance = (next: LearningProgress) => {
                if (guard()) { progress = next; options.onProgress?.(next); }
            };
            const failure = (reason: string, details: LearningFailureDetails = progress): LearningTeachingResult => ({
                status: 'failed', reason, message: reportLearningFailure(input.action.kind, reason, details),
            });
            try {
                advance(progress);
                const request = structuredClone(input);
                learningText(request.message, 'message', 4000);
                const storage = options.repository.snapshot();
                if (storage.status === 'unconfirmed' || storage.status === 'conflict') { return { status: storage.status }; }
                if (storage.status === 'unloaded') { return failure('learning_read_failed'); }
                const baseline = confirmedLearning(options.repository);
                const context = await options.capture(classroom.teacher.name, classroom.chatIdentity);
                if (!guard()) { return { status: 'cancelled' }; }
                const messages = buildLearningContext({ ...classroom, ...request, context,
                    data: baseline?.data ?? { profiles: [] }, dialogue });
                advance({ stage: 'config' });
                const config = await options.gateway.loadConfig();
                if (!guard()) { return { status: 'cancelled' }; }
                advance({ stage: 'session' });
                const agent = await options.gateway.openSession(config);
                if (!guard()) { return { status: 'cancelled' }; }
                if (!sameLearningDocument(baseline, confirmedLearning(options.repository))) { return { status: 'conflict' }; }
                const sources = createLearningSourceRegistry();
                const research = createLearningResearch(config, { sources, signal: controller.signal, createId: options.createId, now: options.now });
                // One story-aware teacher for every action, including web research. Free-form derivatives retain this story scope.
                draft = createLearningSession(options.repository, { ...classroom, action: request.action,
                    inputScope: { kind: 'story', osId: classroom.osId }, sources, createId: options.createId, now: options.now });
                const session = draft;
                const outcome = await runLearningProviderLoop({ agent, systemPrompt: LEARNING_SYSTEM_PROMPT, messages,
                    tools: [...learningTools(request.action), ...(research.available ? learningResearchTools() : [])],
                    signal: controller.signal, guard, onProgress: advance, executeTool: (name, args) => name === 'LearningSearch' || name === 'LearningExtract'
                        ? research.executeTool(name, args) : session.executeTool(name, args) });
                if (outcome.status === 'cancelled') { return outcome; }
                if (outcome.status === 'failed') { return failure(outcome.reason, { ...outcome.details, issues: session.unresolvedErrors() }); }
                if (session.unresolvedErrors().length) {
                    return failure('learning_unresolved_proposals', { ...progress, stage: 'tools', issues: session.unresolvedErrors() });
                }
                const appliedTools = session.appliedTools();
                if (request.action.kind === 'assess' && !appliedTools.includes('LearningAssess')) { return failure('learning_assessment_missing'); }
                if (request.action.kind === 'explain' && request.exerciseId) { session.markExplained(request.exerciseId); }
                advance({ stage: 'save' });
                const saved = await session.commit(guard);
                if (!guard()) { return { status: 'cancelled' }; }
                if (saved.status !== 'confirmed' && saved.status !== 'unchanged') { return { status: saved.status }; }
                dialogue = retainLearningDialogue([...dialogue, { user: request.message, teacher: outcome.text }]);
                return { status: 'finished', text: outcome.text, changed: saved.status === 'confirmed', appliedTools };
            } catch (error) {
                if (!guard()) { return { status: 'cancelled' }; }
                const details = { ...progress, cause: error };
                if (error instanceof LearningStorageError) { return failure(error.code, details); }
                if (error instanceof LearningValidationError) {
                    return failure(error.path === 'context' ? 'learning_context_full' : 'learning_input_invalid', details);
                }
                const reason = progress.stage === 'provider' ? classifyProviderFailure(error)
                    : progress.stage === 'context' ? 'learning_context_failed' : progress.stage === 'config' ? 'learning_config_failed'
                        : progress.stage === 'save' ? 'learning_save_failed' : 'learning_session_failed';
                return failure(reason, details);
            } finally {
                draft?.invalidate();
                if (active === controller) { active = null; }
            }
        },
    };
}
