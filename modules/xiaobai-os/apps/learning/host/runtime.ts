import type { AgentCapability } from '../../../capabilities/agent/index.js';
import type { EconomyReadCapability } from '../../../capabilities/economy/index.js';
import { parseLearningSelection, type LearningSelection } from '../../../domains/learning/notes.js';
import { learningRecord, learningText, LearningValidationError, parseLearningLanguageTag, type LearningTeacherPreference } from '../../../domains/learning/profile.js';
import type { LearningAnswer } from '../../../domains/learning/types.js';
import { learningInteger, requireLearning } from '../../../domains/learning/validation.js';
import { learningUnitStage } from '../../../domains/learning/stage.js';
import type { KnownPerson } from '../../../host/prompt-context/known-people.js';
import type { PartitionStore, XiaobaiOsFileControls } from '../../../kernel/contracts.js';
import type { XiaobaiOsExecutionScope } from '../../../kernel/execution-scope.js';
import type { XiaobaiOsAppActivationContext, XiaobaiOsAppRuntime } from '../../../types.js';
import type { LearningTeacherContext } from '../agent/context.js';
import type { LearningAction } from '../agent/session.js';
import { isLearningConversation } from '../agent/access.js';
import { learningClassView } from '../application/projection.js';
import { createLearningId } from '../application/identity.js';
import type { LearningAttemptBasis } from '../application/attempt.js';
import { createLearningPractice } from '../application/practice.js';
import { createLearningRewards } from '../application/rewards.js';
import { confirmedLearning, createLearningService, type LearningRepository } from '../application/service.js';
import { createLearningSpeech } from '../application/speech.js';
import { createLearningTeacherService } from '../application/teacher.js';
import { createLearningTeaching, type LearningClassroom, type LearningTeachingResult } from '../application/teaching.js';
import { learningProgressMessage, reportLearningFailure, LEARNING_STORAGE_COPY, LEARNING_REWARD_COPY } from '../application/feedback.js';
import { LearningStorageError } from '../storage/repository.js';
import { sameLearningDocument } from '../storage/document.js';
import type { LearningClientState } from '../types.js';
import type { LearningTtsFacade } from './media-adapter.js';
import type { LearningRewardPolicy } from '../reward-partition.js';

export function createLearningRuntime(deps: {
    repository: LearningRepository; store: PartitionStore<LearningTeacherPreference>; files: XiaobaiOsFileControls;
    rewardStore: PartitionStore<LearningRewardPolicy>; rewardFiles: XiaobaiOsFileControls;
    agent: AgentCapability; economy: EconomyReadCapability; execution: XiaobaiOsExecutionScope;
    chatIdentity(): string; playerName(): string; people(): KnownPerson[];
    capture(name: string, identity: string): Promise<LearningTeacherContext>;
    getTtsFacade?: () => LearningTtsFacade | undefined;
}): XiaobaiOsAppRuntime {
    let activation: XiaobaiOsAppActivationContext | null = null;
    let chatIdentity = '';
    let language = 'en';
    let epoch = 0;
    let job: object | null = null;
    let chatJob: object | null = null;
    let chatKind = '';
    let chatProgress = '';
    /** The stage request now running for a unit, so the workbench can show which step is being worked on. */
    let pending: LearningClientState['pending'] = null;
    let remark: LearningClientState['remark'] = null;
    let message = '';
    let progress = '';
    let loadFailed = false;
    let reply: LearningClientState['reply'] = null;
    let replySelection: LearningSelection | null = null;
    let pendingCleanup: string | null = null;
    let recordId = '';
    let offset = 0;
    const repository = deps.repository;
    const service = createLearningService(repository);
    const teacher = createLearningTeacherService(deps.store, { knownPeople: deps.people, playerName: deps.playerName });
    const rewards = createLearningRewards({ repository: deps.repository, store: deps.rewardStore, files: deps.rewardFiles, economy: deps.economy });
    const active = () => !!activation?.isCurrent() && chatIdentity === deps.chatIdentity();
    function current(): LearningClassroom | null {
        const saved = deps.store.peekCurrent();
        return active() && saved?.osId && saved.value?.teacher
            ? { language, osId: saved.osId, chatIdentity, teacher: saved.value.teacher } : null;
    }
    const teaching = createLearningTeaching({ repository, gateway: deps.agent, current, capture: deps.capture,
        onConversation: publish,
        canDelegate: () => !job,
        onProgress: (next, action) => {
            const text = learningProgressMessage(next);
            if (isLearningConversation(action)) { chatProgress = text; }
            else { progress = text; }
            publish();
        } });
    const practice = createLearningPractice({ repository, teaching, current });
    const speech = createLearningSpeech({ repository, current, getFacade: deps.getTtsFacade,
        onState: media => { if (active()) { activation!.post('learning/media', { media }); } }, onSave: () => publish(),
        onError: error => { message = error instanceof LearningStorageError && error.code === 'learning_file_full'
            ? '学习文件已满，已暂停播放。请先导出或清理不需要的学习记录；腾出空间后再操作，会重试保存听取记录。'
            : repository.snapshot().status === 'ready'
                ? '听取记录保存失败，已暂停播放。请重试刚才的操作，会先重试保存听取记录。'
                : '还不确定播放记录是否保存成功，请先检查保存再作答；题目不会更换。'; publish(); } });

    function state(): LearningClientState {
        const snapshot = repository.snapshot();
        const saved = deps.store.peekCurrent();
        const view = learningClassView(snapshot.document?.data ?? { profiles: [] }, language, saved?.osId ?? null, offset, recordId, rewards.status);
        // Keep navigation on the displayed page when deletion or a server read shrinks the list.
        offset = view.records.offset;
        return { ...view,
            chatIdentity, language, teacher: saved?.value?.teacher ?? null,
            candidates: teacher.candidates().map(person => ({ name: person.name, aliases: person.aliases })),
            storage: loadFailed ? 'unloaded' : snapshot.status, chatStorage: deps.files.getFileState(), walletStorage: deps.rewardFiles.getFileState(), busy: !!job,
            chatBusy: !!chatJob && chatKind !== 'companion', companionBusy: !!chatJob && chatKind === 'companion', chatMessage: chatProgress,
            message: job ? progress : message, reply, pending, remark, conversation: teaching.conversation(),
            walletOpen: deps.economy.isOpen(), media: speech.media.snapshot(), voices: speech.media.capabilities() };
    }
    function publish() { if (active()) { activation!.post('learning/state', { state: state() }); } }
    /** No learner job is running; a companion remark does not count, it gives way. */
    function idle() { return !job && (!chatJob || chatKind === 'companion'); }
    function cancel() {
        epoch++; teaching.cancel(); speech.stop(); job = null; progress = ''; pending = null;
        chatJob = null; chatKind = ''; chatProgress = '';
        reply = null; replySelection = null; remark = null;
    }
    function cancelConversation() {
        teaching.cancel('conversation'); chatJob = null; chatKind = ''; chatProgress = '';
    }
    /** Abort only the unprompted conversation lane; a workbench request has an independent lifetime. */
    function yieldRemark() {
        if (chatJob && chatKind === 'companion') { cancelConversation(); }
    }
    function saved(result: { status: string }) {
        if (result.status === 'unconfirmed') { message = LEARNING_STORAGE_COPY.unconfirmed; }
        else if (result.status === 'conflict') { message = LEARNING_STORAGE_COPY.conflict; }
        else if (result.status === 'failed') { message = LEARNING_STORAGE_COPY.failed; }
        return result.status === 'confirmed' || result.status === 'unchanged';
    }
    async function pay(unitId: string, open: boolean, guard: () => boolean) {
        const result = await rewards.settle(language, unitId, open, guard);
        // A save or storage warning already on screen matters more than the payment note.
        if (!guard() || message) { return; }
        // Successful settlement and wallet setup already have a home in the completion card.
        if (!['paid', 'wallet-closed', 'retired', 'cancelled'].includes(result)) { message = LEARNING_REWARD_COPY.unknown; }
    }
    /** Null while the file is not confirmed; confirming it is followed by payPending instead. */
    function completionIds() {
        return repository.snapshot().status === 'ready' ? new Set(profileNow()?.completions.map(entry => entry.unitId) ?? []) : null;
    }
    /** Completions are facts saved with learning; one that an action just recorded is settled once, keyed by its unitId. */
    async function payNew(before: Set<string> | null, guard: () => boolean) {
        if (!before || repository.snapshot().status !== 'ready') { return; }
        for (const completion of profileNow()?.completions ?? []) {
            if (!before.has(completion.unitId) && !completion.receipt && rewards.status(completion) !== 'retired' && guard()) { await pay(completion.unitId, false, guard); }
        }
    }
    /** On opening or after a wallet change, an unpaid completion in either slot that the wallet can take now is settled. */
    async function payPending(guard: () => boolean) {
        if (repository.snapshot().status !== 'ready') { return; }
        const profile = profileNow();
        for (const unitId of [profile?.unit?.id, profile?.review?.id]) {
            const completion = profile?.completions.find(entry => entry.unitId === unitId);
            if (completion && rewards.status(completion) === 'available' && guard()) { await pay(completion.unitId, false, guard); }
        }
    }
    async function afterTeaching(result: LearningTeachingResult, guard: () => boolean, action: LearningAction['kind'], exerciseId?: string, selection: LearningSelection | null = null) {
        if (!guard()) { return; }
        if (result.status === 'failed') { message = result.message; return; }
        if (result.status !== 'finished') { saved(result); return; }
        reply = { text: result.text, action, ...(exerciseId ? { exerciseId } : {}) }; replySelection = selection;
    }
    function profileNow() { return confirmedLearning(repository)?.data.profiles.find(entry => entry.language === language) ?? null; }
    /** The current lesson or review group with this id, when this story may read it. */
    function slot(unitId: string) {
        const classroom = current();
        const profile = profileNow();
        const found = [profile?.unit, profile?.review].find(entry => entry?.id === unitId);
        requireLearning(classroom && found && (found.scope.kind === 'public' || found.scope.osId === classroom.osId), 'unitId', 'Select an available current unit');
        return found;
    }
    const stageRequests = {
        grade: '我的初稿都写好了，请统一批改。',
        'revision-review': '我按批注改好了，请复核修订稿。',
        'model-essay': '请给我一篇这次作文的范文。',
        'review-assess': '这组复习题我都答完了，请批改。',
    } as const;
    const nextStage: Partial<Record<string, keyof typeof stageRequests>> = { grading: 'grade', reviewing: 'revision-review', model: 'model-essay' };
    /** Runs whichever stage request the saved facts ask for next, until the unit waits for the learner or is complete. */
    async function advance(unitId: string, guard: () => boolean) {
        for (let step = 0; step < 3 && guard(); step++) {
            const target = slot(unitId);
            const stage = learningUnitStage(target).stage;
            const purpose = target.kind === 'review' ? (stage === 'grading' ? 'review-assess' as const : undefined)
                : target.kind === 'reading-writing' ? nextStage[stage] : undefined;
            if (!purpose) { return; }
            pending = { purpose, unitId }; publish();
            const result = await teaching.run({ action: { kind: purpose, unitId }, message: stageRequests[purpose] });
            pending = null;
            await afterTeaching(result, guard, purpose);
            if (result.status !== 'finished' || !guard()) { return; }
            if (learningUnitStage(slot(unitId)).stage === stage) { message = '这一步还没有全部完成，可以再点一次继续。已保存的批改会保留。'; return; }
        }
    }
    function restoreTeaching() {
        if (pendingCleanup && repository.snapshot().status === 'ready') {
            if (repository.snapshot().document?.commitId === pendingCleanup) { teaching.reset(); reply = null; replySelection = null; }
            pendingCleanup = null;
        }
        const recovered = teaching.recoverConfirmed();
        if (recovered) {
            const { result, request } = recovered;
            reply = { text: result.text, action: request.action.kind, ...(request.exerciseId ? { exerciseId: request.exerciseId } : {}) };
            replySelection = request.selection ?? null;
        }
    }
    function unit() {
        const classroom = current();
        const profile = confirmedLearning(repository)?.data.profiles.find(entry => entry.language === language);
        requireLearning(classroom && profile?.unit && (profile.unit.scope.kind === 'public' || profile.unit.scope.osId === classroom.osId), 'unit', 'Select an available lesson');
        return profile.unit;
    }
    function selection(value: unknown) {
        const lesson = unit();
        const selected = parseLearningSelection(value, lesson.materials);
        const visible = state().unit?.materials.find(material => material.id === selected.materialId);
        requireLearning(visible && !visible.hidden, 'selection', 'Reveal the transcript before selecting text');
        return selected;
    }
    async function action(name: string, input: Record<string, unknown>, guard: () => boolean, answerBasis?: LearningAttemptBasis) {
        if (name === 'read' || name === 'verify' || name === 'retry-save' || name === 'adopt-server') {
            const before = repository.snapshot();
            if (name === 'verify') { saved(await repository.verify()); }
            else if (name === 'retry-save') { saved(await repository.retry(guard)); }
            else if (name === 'adopt-server') { await repository.adoptServer(); teaching.reset(); reply = null; replySelection = null; pendingCleanup = null; }
            else { await repository.refresh(); }
            await deps.store.read(); await deps.economy.refresh(); loadFailed = false;
            if (!guard()) { return; }
            if (name === 'read' && before.status === 'ready' && !sameLearningDocument(before.document ?? null, repository.snapshot().document ?? null)) {
                teaching.reset(); reply = null; replySelection = null;
            }
            restoreTeaching();
            // Reading or confirming a save may reveal a completion that is now certain; the wallet takes it once.
            if (guard()) { await payPending(guard); }
            return;
        }
        if (name === 'verify-wallet' || name === 'adopt-wallet') {
            saved(await (name === 'verify-wallet' ? deps.rewardFiles.retryPending() : deps.rewardFiles.adoptServerState()));
            await deps.economy.refresh();
            if (guard()) { await payPending(guard); }
            return;
        }
        requireLearning(!loadFailed, 'storage', 'Read the learning file first');
        confirmedLearning(repository);
        if (name === 'teacher') {
            const before = await deps.store.read();
            const selected = input.teacher as LearningTeacherPreference['teacher'];
            if (JSON.stringify(current()?.teacher) === JSON.stringify(selected)) { return; }
            if (saved(await teacher.select(before.identityKey, input.teacher as LearningTeacherPreference['teacher'], guard))) { teaching.reset(); reply = null; }
            return;
        }
        if (name === 'profile') {
            await afterTeaching(await teaching.run({ action: { kind: 'profile' }, message: learningText(input.message, 'message', 4000) }), guard, 'profile'); return;
        }
        if (name === 'prepare' || name === 'replace-lesson') {
            if (!profileNow() && !saved(await service.saveSettings(language, {}, guard))) { return; }
            if (!guard()) { return; }
            if (name === 'replace-lesson') {
                const profile = confirmedLearning(repository)?.data.profiles.find(entry => entry.language === language);
                requireLearning(profile?.unit?.id === input.unitId, 'unitId', 'The lesson has changed; ask the teacher again before replacing it');
            }
            requireLearning(input.kind === undefined || input.kind === 'reading-writing' || input.kind === 'lesson', 'kind', 'Choose reading-writing or lesson');
            const profile = profileNow();
            // A completed unit is put aside by the next one without asking again.
            const finished = !!profile?.unit && profile.completions.some(entry => entry.unitId === profile.unit!.id);
            reply = null;
            await afterTeaching(await teaching.run({ action: { kind: 'prepare', replaceCurrent: name === 'replace-lesson' || input.replaceCurrent === true || finished,
                ...(input.kind ? { unit: input.kind as 'reading-writing' | 'lesson' } : {}) },
                message: learningText(input.message, 'message', 4000) }), guard, 'prepare'); return;
        }
        if (name === 'submit') {
            const result = await practice.submit({ unitId: learningText(input.unitId, 'unitId', 128), exerciseId: learningText(input.exerciseId, 'exerciseId', 128),
                answer: input.answer as LearningAnswer, replays: 0, slowPlayback: false }, guard, answerBasis);
            if (result.status === 'saved' && result.teaching) {
                const purpose = slot(String(input.unitId)).kind === 'lesson' ? 'assess' : 'summary-review';
                await afterTeaching(result.teaching, guard, purpose, String(input.exerciseId));
            }
            else if (result.status !== 'saved') { saved(result); }
            if (result.status === 'saved' && guard() && slot(String(input.unitId)).kind === 'review') { await advance(String(input.unitId), guard); }
            return;
        }
        if (name === 'assess') {
            const attemptId = learningText(input.attemptId, 'attemptId', 128);
            if (input.review === true && !saved(await service.dispute(language, attemptId, guard))) { return; }
            if (!guard()) { return; }
            await afterTeaching(await teaching.run({ action: { kind: 'assess', attemptId, review: input.review === true },
                message: learningText(input.message, 'message', 4000) }), guard, 'assess'); return;
        }
        if (name === 'settings') { saved(await service.saveSettings(language, input.value, guard)); return; }
        if (name === 'bookmark') {
            saved(await service.bookmarkTerm(language, slot(learningText(input.unitId, 'unitId', 128)).id, learningText(input.materialId, 'materialId', 128),
                learningText(input.paragraphId, 'paragraphId', 128), learningText(input.termText, 'termText', 400), guard)); return;
        }
        if (name === 'skip-revision' || name === 'submit-revision') {
            const unitId = slot(learningText(input.unitId, 'unitId', 128)).id;
            const result = name === 'skip-revision' ? await service.skipRevision(language, unitId, guard)
                : await service.submitRevision(language, unitId, input.revisions, guard);
            if (saved(result) && guard()) { await advance(unitId, guard); }
            return;
        }
        if (name === 'grade') { await advance(slot(learningText(input.unitId, 'unitId', 128)).id, guard); return; }
        if (name === 'start-review') {
            const classroom = current();
            requireLearning(classroom, 'teacher', 'Select a companion first');
            const profile = profileNow();
            const open = profile?.review;
            requireLearning(!open || profile!.completions.some(entry => entry.unitId === open.id), 'review', 'Finish or put aside the current review first');
            const asOf = new Date().toISOString();
            const due = service.reviewSelection(language, asOf, classroom.osId);
            requireLearning(due, 'review', 'Nothing is due for review');
            pending = { purpose: 'review-prepare' }; publish();
            const result = await teaching.run({ action: { kind: 'review-prepare', itemIds: due.itemIds, asOf }, message: '开始今天的复习。' });
            pending = null;
            await afterTeaching(result, guard, 'review-prepare'); return;
        }
        if (name === 'abandon-review') { saved(await service.abandonReview(language, guard)); return; }
        if (name === 'complete') {
            await afterTeaching(await teaching.run({ action: { kind: 'complete' }, message: '请根据已经保存的练习和反馈，看看这一课是否已经达到可以收课的程度。' }), guard, 'complete'); return;
        }
        if (name === 'reveal') {
            const lesson = input.unitId === undefined ? unit() : slot(learningText(input.unitId, 'unitId', 128));
            requireLearning(['answers', 'hints', 'transcripts'].includes(String(input.kind)), 'kind', 'Choose what to reveal');
            saved(await service.reveal(language, lesson.id, input.kind as 'answers' | 'hints' | 'transcripts',
                learningText(input.id, 'id', 128), current()!.osId, guard)); return;
        }
        if (name === 'voice') { saved(await service.setVoice(language, input.voice, guard)); return; }
        if (name === 'play') {
            await speech.play({ materialId: String(input.materialId), partKey: String(input.partKey), exerciseId: typeof input.exerciseId === 'string' ? input.exerciseId : undefined }); return;
        }
        if (name === 'say') { await speech.say(selection(input.selection).quote); return; }
        if (name === 'say-reply') {
            requireLearning(reply?.text, 'reply', 'Select a current teacher explanation');
            await speech.say(reply.text); return;
        }
        if (name === 'say-question') {
            const exercise = unit().exercises.find(entry => entry.id === input.exerciseId);
            requireLearning(exercise, 'exerciseId', 'Select a current exercise');
            await speech.say(exercise.prompt); return;
        }
        if (name === 'save-note') {
            const lesson = input.unitId === undefined ? unit() : slot(learningText(input.unitId, 'unitId', 128));
            requireLearning(reply?.exerciseId && lesson.exercises.some(exercise => exercise.id === reply!.exerciseId), 'reply', 'Choose a current explanation');
            if (lesson.notes?.some(note => note.exerciseId === reply!.exerciseId && note.text === reply!.text
                && JSON.stringify(note.selection) === JSON.stringify(replySelection))) { return; }
            saved(await service.note(language, lesson.id, { id: createLearningId(), text: reply.text, exerciseId: reply.exerciseId, selection: replySelection }, guard)); return;
        }
        if (name === 'delete-note') {
            const lesson = input.unitId === undefined ? unit() : slot(learningText(input.unitId, 'unitId', 128));
            saved(await service.note(language, lesson.id, String(input.id), guard)); return;
        }
        if (name === 'reward') { await pay(String(input.unitId), input.openWallet === true, guard); return; }
        if (name === 'delete-item') { saved(await service.deleteItem(language, String(input.id), guard)); recordId = ''; return; }
        if (name === 'delete-attempt') { saved(await service.deleteAttempt(language, String(input.id), guard)); return; }
        requireLearning(!deps.rewardFiles.hasPendingCommit(), 'wallet', 'Resolve pending wallet changes before deleting learning data');
        if (name === 'abandon') { saved(await service.abandonUnit(language, guard)); reply = null; return; }
        if (name === 'delete-language') { saved(await service.deleteLanguage(language, guard)); reply = null; return; }
        if (name === 'clear') { saved(await repository.clear(confirmedLearning(repository), guard)); reply = null; return; }
        throw new Error('learning_unknown_action');
    }
    function launch(name: string, input: Record<string, unknown>, answerBasis?: LearningAttemptBasis) {
        if (name === 'talk' || name === 'explain' || name === 'companion') { return launchConversation(name, input); }
        yieldRemark();
        if (!active()) { return; }
        if (job) { return 'busy' as const; }
        const owned = epoch;
        const token = {};
        const guard = () => active() && epoch === owned && job === token;
        job = token; progress = '正在处理你的请求…';
        message = ''; remark = null;
        // Stop first so hearing facts cannot race a teacher snapshot or a submitted answer.
        speech.stop();
        void deps.execution.run(async () => {
            const cleanup = ['delete-note', 'delete-item', 'delete-attempt', 'abandon', 'delete-language', 'clear'].includes(name);
            const pendingBefore = repository.pendingCommitId();
            let before = repository.snapshot().document;
            try {
                if (!guard()) { return; }
                // Free space before retrying hearing writes. Repository confirmation/conflict guards still apply.
                if (cleanup) { await speech.settle(); }
                else if (!await speech.flush()) { return; }
                before = repository.snapshot().document;
                if (guard()) {
                    const completed = completionIds();
                    const previousReply = reply;
                    await action(name, input, guard, answerBasis);
                    if (guard() && reply && reply !== previousReply && completed && [...completionIds() ?? []].some(id => !completed.has(id))) {
                        remark = { text: reply.text };
                    }
                    // Any save may have completed a unit by its facts; payment follows it here, once per new completion.
                    if (!['reward', 'read', 'verify', 'retry-save', 'adopt-server', 'verify-wallet', 'adopt-wallet'].includes(name) && guard()) { await payNew(completed, guard); }
                }
            }
            catch (error) {
                if (guard()) {
                    message = error instanceof LearningStorageError ? reportLearningFailure(name, error.code, { stage: 'save', cause: error })
                        : error instanceof Error && error.message === 'learning_teacher_is_player' ? '请选择其他已知人物作为语伴，不能选择自己。'
                            : reportLearningFailure(name, error instanceof LearningValidationError ? 'learning_input_invalid' : 'learning_action_failed', { stage: 'action', cause: error });
                }
            } finally {
                if (cleanup && guard() && repository.pendingCommitId() !== pendingBefore) { pendingCleanup = repository.pendingCommitId(); }
                if (cleanup && guard() && !sameLearningDocument(before ?? null, repository.snapshot().document ?? null)) {
                    teaching.reset(); reply = null; replySelection = null;
                }
                if (job === token) { job = null; progress = ''; pending = null; publish(); }
            }
        });
        publish();
    }
    function launchConversation(name: 'talk' | 'explain' | 'companion', input: Record<string, unknown>) {
        if (name !== 'companion') { yieldRemark(); remark = null; }
        if (!active() || name === 'companion' && (chatJob || job)) { return; }
        if (chatJob) { return 'busy' as const; }
        remark = null;
        const token = {};
        const owned = epoch;
        chatJob = token; chatKind = name; chatProgress = '';
        const guard = () => active() && epoch === owned && chatJob === token;
        void deps.execution.run(async () => {
            try {
                const answerBasis = { document: confirmedLearning(repository), submittedAt: new Date().toISOString() };
                const exerciseId = input.exerciseId === undefined ? undefined : learningText(input.exerciseId, 'exerciseId', 128);
                const selected = name === 'explain' && input.selection ? selection(input.selection) : null;
                if (name === 'explain') { requireLearning(exerciseId || selected, 'selection', 'Select a question or passage'); }
                const materialId = name === 'companion' && input.materialId !== undefined ? learningText(input.materialId, 'materialId', 128) : undefined;
                const paragraphId = name === 'companion' && input.paragraphId !== undefined ? learningText(input.paragraphId, 'paragraphId', 128) : undefined;
                const text = name === 'companion' ? '' : learningText(input.message, 'message', selected ? 1800 : 4000);
                const result = await teaching.run({ action: name === 'companion' ? { kind: name, materialId, paragraphId } : { kind: name },
                    exerciseId, selection: selected, message: selected ? `${text}\n\n${selected.quote}` : text, ...(name === 'companion' ? { displayMessage: '' } : {}) });
                if (!guard()) { return; }
                if (name === 'companion') {
                    if (result.status === 'finished') { chatProgress = ''; }
                    if (result.status === 'finished' && result.text.trim()) { remark = { text: result.text, materialId, paragraphId }; }
                    else if (result.status === 'failed') { chatProgress = result.message; }
                } else {
                    chatProgress = result.status === 'failed' ? result.message : '';
                    if (result.status === 'finished') {
                        reply = { text: result.text, action: name, ...(exerciseId ? { exerciseId } : {}) }; replySelection = selected;
                    }
                    if (result.status === 'finished' && result.delegation) {
                        if (!job) { launch(result.delegation.action, result.delegation.input, result.delegation.action === 'submit' ? answerBasis : undefined); }
                        else { chatProgress = '当前训练操作尚未完成，这次委托没有执行。完成后可重新发起。'; }
                    }
                }
            } catch (error) {
                if (guard()) { chatProgress = reportLearningFailure(name, error instanceof LearningStorageError ? error.code
                    : error instanceof LearningValidationError ? 'learning_input_invalid' : 'learning_action_failed', { stage: 'action', cause: error }); }
            } finally {
                if (chatJob === token) { chatJob = null; chatKind = ''; publish(); }
            }
        });
        publish();
    }
    deps.execution.addCleanup(() => { cancel(); teaching.reset(); activation = null; });
    return {
        async activate(context) {
            cancel(); activation = context; chatIdentity = deps.chatIdentity(); message = ''; offset = 0; recordId = '';
            const owned = epoch;
            try {
                const before = repository.snapshot();
                await repository.read(); if (owned !== epoch) { return state(); }
                if (before.status === 'ready' && !sameLearningDocument(before.document ?? null, repository.snapshot().document ?? null)) { teaching.reset(); }
                await deps.store.read(); if (owned !== epoch) { return state(); }
                restoreTeaching();
                await deps.economy.refresh(); if (owned === epoch) { loadFailed = false; }
                // A completion saved while the app was closed is paid on opening.
                if (owned === epoch) { await payPending(() => owned === epoch && active()); }
            } catch (error) {
                if (owned === epoch) {
                    loadFailed = true;
                    message = reportLearningFailure('open', error instanceof LearningStorageError ? error.code : 'learning_read_failed', { stage: 'context', cause: error });
                }
            }
            return state();
        },
        deactivate() { cancel(); activation = null; },
        cancelForeground: cancel, cancelAll: cancel, handleChatChanged: () => { cancel(); teaching.reset(); activation = null; },
        handleWindowClosed: () => { cancel(); activation = null; },
        handleMessage(messageInput) {
            const name = messageInput.type.replace(/^learning\//, '');
            const input = learningRecord(messageInput.payload ?? {}, 'request', ['chatIdentity', 'language', 'teacher', 'message', 'replaceCurrent',
                'unitId', 'exerciseId', 'answer', 'attemptId', 'review', 'selection', 'kind', 'id', 'voice', 'materialId', 'partKey', 'openWallet', 'offset', 'value',
                'paragraphId', 'termText', 'revisions']);
            if (!active() || input.chatIdentity !== chatIdentity) { return { state: state() }; }
            if (name === 'pause') { speech.media.pause(); }
            // A companion remark never touches playback, so the player stays usable while it runs.
            else if (name === 'resume' && idle()) { speech.media.resume(); }
            else if (name === 'stop') { speech.stop(); }
            else if (name === 'rate' && idle()) { speech.media.setRate(Number(input.value)); }
            else if (name === 'seek' && idle()) { speech.media.seek(Number(input.value)); }
            else if (name === 'tts-settings') { speech.media.openSettings(); }
            else if (name === 'cancel-chat') { cancelConversation(); publish(); }
            else if (name === 'cancel-companion') { yieldRemark(); publish(); }
            else if (name === 'cancel') {
                teaching.cancel('work'); speech.stop(); job = null; progress = ''; pending = null;
                message = '已停止训练操作；如果保存已经开始，仍需检查是否成功。'; publish();
            }
            else if (name === 'forget-conversation' && idle()) { yieldRemark(); teaching.reset(); reply = null; replySelection = null; message = ''; }
            else if (name === 'language' && idle()) {
                const selected = parseLearningLanguageTag(input.language, 'language');
                if (selected !== language) { cancel(); teaching.reset(); language = selected; recordId = ''; offset = 0; message = ''; }
            } else if (name === 'records') { offset = learningInteger(input.offset ?? 0, 'offset'); recordId = typeof input.id === 'string' ? input.id : ''; }
            else if (name === 'export') { return { state: state(), document: structuredClone(confirmedLearning(repository)) }; }
            else {
                const rejected = launch(name, input);
                if (rejected) { return { state: state(), rejected }; }
            }
            // Cancellation can push an intermediate snapshot during a synchronous command.
            // Publish its settled state too; clients may already have superseded the request acknowledgement.
            const result = { state: state() };
            activation!.post('learning/state', result);
            return result;
        },
    };
}
