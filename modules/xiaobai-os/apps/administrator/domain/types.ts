export interface AdministratorImage { name: string; path: string }
export type OperationStatus = 'preparing' | 'reading' | 'saving' | 'read' | 'saved' | 'unchanged' | 'partial' | 'failed' | 'unconfirmed';
export interface AdministratorOperation {
    id: string;
    appId: string;
    name: string;
    target: string;
    status: OperationStatus;
    elapsedMs: number;
    summary: string;
}
export interface AdministratorTurn {
    id: string;
    createdAt: number;
    user: { text: string; image?: AdministratorImage } | null;
    assistant: string | null;
    operations: AdministratorOperation[];
    status: 'finished' | 'interrupted' | 'failed';
    error: string;
}
export interface AdministratorData {
    schemaVersion: 1;
    revision: number;
    turns: AdministratorTurn[];
    summary: { text: string; throughId: string } | null;
}
export interface AdministratorContextUsage { used: number; limit: number; trigger: number; history: number; rules: number; tools: number; images: number; runtime: number }
export interface AdministratorRow {
    revision: number;
    id: string; turnId: string; role: 'user' | 'assistant'; text: string; totalChars: number;
    image?: AdministratorImage; operations: AdministratorOperation[]; operationCount: number;
    status: AdministratorTurn['status']; error: string; canRegenerate: boolean;
}
export interface AdministratorPage { rows: AdministratorRow[]; start: number; total: number; revision: number }
export interface AdministratorLive {
    turnId: string; text: string; totalChars: number; operations: AdministratorOperation[]; operationCount: number;
    phase: 'preparing' | 'replying' | 'summarizing' | 'saving';
}
export interface AdministratorState {
    chatIdentity: string; page: AdministratorPage; live: AdministratorLive | null;
    context: AdministratorContextUsage; error: string; corrupted: boolean; unsaved: boolean;
    retryTurnId: string | null;
    sendTurnId: string | null;
    conflict: boolean;
}
