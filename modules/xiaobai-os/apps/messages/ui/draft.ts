import type { ImageUpload } from '../application/image-upload.js';

export interface MessageDraft { text: string; image: ImageUpload | null }
export const emptyDraft = (): MessageDraft => ({ text: '', image: null });
export const sameDraft = (left: MessageDraft, right: MessageDraft): boolean => left.text === right.text
    && left.image?.dataUrl === right.image?.dataUrl && left.image?.name === right.image?.name;
