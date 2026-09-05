export interface MessageDraft { type: 'text' | 'image' | 'voice'; text: string }
export const emptyDraft = (): MessageDraft => ({ type: 'text', text: '' });
