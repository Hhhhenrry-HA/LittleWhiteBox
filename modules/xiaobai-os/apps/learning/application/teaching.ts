import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import { classifyProviderFailure, providerFailureMessage } from '../../../capabilities/agent/provider-failure.js';
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

export interface LearningClassroom {
    language: string; osId: string; chatIdentity: string;
    teacher: NonNullable<LearningTeacherPreference['teacher']>;
}
export type LearningTeachingResult =
    | { status: 'finished'; text: string; changed: boolean; appliedTools: string[] }
    | { status: 'unconfirmed' | 'conflict' | 'cancelled' | 'busy' }
    | { status: 'failed'; reason: string; message: string };

export function learningTeachingFailure(reason: string): string {
    const provider = providerFailureMessage(reason);
    if (provider) { return provider; }
    switch (reason) {
        case 'learning_context_full': return '这次题目和资料超过了单次上下文容量，已保存的课程与作答保持不变。可以减少本次补充材料后重试。';
        case 'learning_empty_response': return '老师没有返回有效回复，本次修改未发布，可以重试。';
        case 'learning_round_limit': return '本次教学未能在请求上限内完成，未发布半成品，可以重试。';
        case 'learning_unresolved_proposals': return '老师提交的学习内容仍有未修正的问题，本次没有保存，可以重试。';
        case 'learning_assessment_missing': return '老师尚未给这条作答提交评估，原答已保留，可以重试评估。';
        case 'learning_file_invalid': return '学习文件暂时无法读取，请检查文件；不会覆盖已有内容。';
        case 'learning_read_failed': return '读取学习记录失败，请检查连接后重试。';
        case 'learning_resolve_pending_first': return '上一次保存尚未核实，请先核实保存状态。';
        case 'learning_file_full': return '学习文件已达到容量上限，请整理不再需要的记录后重试。';
        case 'learning_write_rejected': return '服务器拒绝保存学习记录，请检查登录状态和存储权限后重试。';
        case 'learning_input_invalid': return '当前课程或作答不可用于这次操作，请返回已保存内容后重试。';
        default: return '本次教学未完成，已确认的学习内容保持不变，可以重试。';
    }
}

/** One active teaching action per classroom. Reading/opening never enters this function. */
export function createLearningTeaching(options: {
    repository: LearningRepository; gateway: XiaobaiOsAgentGateway;
    current: () => LearningClassroom | null;
    capture: (name: string, chatIdentity: string) => Promise<LearningTeacherContext>;
    createId?: () => string; now?: () => string;
}) {
    let active: AbortController | null = null;
    let dialogueKey = '';
    let dialogue: LearningDialogue[] = [];
    const failure = (reason: string): LearningTeachingResult => ({ status: 'failed', reason, message: learningTeachingFailure(reason) });
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
            let phase: 'context' | 'provider' | 'save' = 'context';
            try {
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
                phase = 'provider';
                const config = await options.gateway.loadConfig();
                if (!guard()) { return { status: 'cancelled' }; }
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
                    signal: controller.signal, guard, executeTool: (name, args) => name === 'LearningSearch' || name === 'LearningExtract'
                        ? research.executeTool(name, args) : session.executeTool(name, args) });
                if (outcome.status === 'cancelled') { return outcome; }
                if (outcome.status === 'failed') { return failure(outcome.reason); }
                if (session.unresolvedErrors().length) { return failure('learning_unresolved_proposals'); }
                const appliedTools = session.appliedTools();
                if (request.action.kind === 'assess' && !appliedTools.includes('LearningAssess')) { return failure('learning_assessment_missing'); }
                if (request.action.kind === 'explain' && request.exerciseId) { session.markExplained(request.exerciseId); }
                phase = 'save';
                const saved = await session.commit(guard);
                if (!guard()) { return { status: 'cancelled' }; }
                if (saved.status !== 'confirmed' && saved.status !== 'unchanged') { return { status: saved.status }; }
                dialogue = retainLearningDialogue([...dialogue, { user: request.message, teacher: outcome.text }]);
                return { status: 'finished', text: outcome.text, changed: saved.status === 'confirmed', appliedTools };
            } catch (error) {
                if (!guard()) { return { status: 'cancelled' }; }
                if (error instanceof LearningStorageError) { return failure(error.code); }
                if (error instanceof LearningValidationError) { return failure('learning_input_invalid'); }
                return failure(phase === 'provider' ? classifyProviderFailure(error) : 'learning_action_failed');
            } finally {
                draft?.invalidate();
                if (active === controller) { active = null; }
            }
        },
    };
}
