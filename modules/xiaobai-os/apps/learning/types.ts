import type { LearningClassView } from './application/projection.js';
import type { XiaobaiOsFileState } from '../../kernel/contracts.js';
import type { LearningAction } from './agent/session.js';
import type { LearningDialogueView } from './application/message-view.js';
import type { LearningMediaState, LearningVoice } from './host/media-adapter.js';

export interface LearningClientState extends LearningClassView {
    chatIdentity: string;
    language: string;
    teacher: { name: string; note: string } | null;
    candidates: { name: string; aliases: string[] }[];
    storage: 'unloaded' | 'ready' | 'unconfirmed' | 'conflict';
    chatStorage: string;
    walletStorage: XiaobaiOsFileState;
    busy: boolean;
    chatBusy: boolean;
    companionBusy: boolean;
    chatMessage: string;
    message: string;
    reply: { text: string; action: LearningAction['kind']; exerciseId?: string } | null;
    /** A stage request the app started for a unit (grading, revision review, model essay, review preparation or grading). */
    pending: { purpose: 'grade' | 'revision-review' | 'model-essay' | 'review-assess' | 'review-prepare'; unitId?: string } | null;
    /** The companion's latest unprompted remark while reading; it is not saved. */
    remark: { text: string; materialId?: string; paragraphId?: string } | null;
    conversation: { turns: LearningDialogueView[]; removedTurns: number; summaryReviews: { attemptId: string; text: string }[] };
    walletOpen: boolean;
    media: LearningMediaState;
    voices: { enabled: boolean; voices: LearningVoice[]; defaultVoice: string; message: string };
}
