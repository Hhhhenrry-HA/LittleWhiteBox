import type { LearningClassView } from './application/projection.js';
import type { XiaobaiOsFileState } from '../../kernel/contracts.js';
import type { LearningAction } from './agent/session.js';
import type { LearningDialogueView } from './application/message-view.js';
import type { LearningMediaState, LearningVoice } from './host/media-adapter.js';
import type { LearningApproval } from './application/approval.js';

export interface LearningClientState extends LearningClassView {
    chatIdentity: string;
    language: string;
    teacher: { name: string; note: string } | null;
    companionSessionId: string | null;
    candidates: { name: string; aliases: string[] }[];
    storage: 'unloaded' | 'ready' | 'unconfirmed' | 'conflict';
    chatStorage: XiaobaiOsFileState;
    workbenchStorage: XiaobaiOsFileState;
    walletStorage: XiaobaiOsFileState;
    busy: boolean;
    approval: LearningApproval | null;
    sourceChoice: 'unconfigured' | 'unavailable' | null;
    preparation: { phase: 'article' | 'notes' | 'essay'; running: boolean; message: string; unitId?: string; source?: 'web' | 'authored' } | null;
    chatBusy: boolean;
    workbenchBusy: boolean;
    companionBusy: boolean;
    chatMessage: string;
    workbenchMessage: string;
    message: string;
    reply: { text: string; action: LearningAction['kind']; unitId?: string; exerciseId?: string } | null;
    companionReply: LearningClientState['reply'];
    /** A stage request the app started for a unit (grading, revision review, model essay, review preparation or grading). */
    pending: { purpose: 'grade' | 'revision-review' | 'model-essay' | 'review-assess' | 'review-prepare'; unitId?: string } | null;
    /** The companion's latest unprompted remark while reading; it is not saved. */
    remark: { text: string; materialId?: string; paragraphId?: string } | null;
    conversation: { turns: LearningDialogueView[]; removedTurns: number; summaryReviews: { attemptId: string; text: string }[] };
    workbenchConversation: LearningClientState['conversation'];
    walletOpen: boolean;
    media: LearningMediaState;
    voices: { enabled: boolean; voices: LearningVoice[]; defaultVoice: string; message: string };
}
