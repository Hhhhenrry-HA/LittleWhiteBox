import type { AcceptedTurnSource } from './accepted-turn-source.js';

type UnknownRecord = Record<string, unknown>;

export type MaintenanceMode = 'automatic' | 'manual' | 'rebuild';

export interface MaintenanceFunctionDeclaration {
    readonly type: 'function';
    readonly function: {
        readonly name: string;
        readonly description?: string;
        readonly parameters: UnknownRecord;
    };
}

export type MaintenanceCommitGuard = () => boolean;

export interface MaintenanceParticipantResult {
    readonly status: 'updated' | 'unchanged' | 'partial' | 'failed';
    readonly changed: boolean;
}

export interface MaintenanceSession {
    readonly participantId: string;
    readonly prompt: string;
    readonly tools: readonly MaintenanceFunctionDeclaration[];
    executeTool: (name: string, args: unknown) => unknown | Promise<unknown>;
    canCommit: () => boolean | Promise<boolean>;
    getResult: () => MaintenanceParticipantResult;
    commit: (beforeCommit: MaintenanceCommitGuard) => unknown | Promise<unknown>;
    invalidate?: (reason: string) => void;
}

export interface MaintenanceParticipant {
    readonly id: string;
    isEnabled: (mode: MaintenanceMode) => boolean;
    createSession: (
        source: AcceptedTurnSource,
        mode: MaintenanceMode,
    ) => MaintenanceSession | Promise<MaintenanceSession>;
}

export interface MaintenanceRegistry {
    readonly participants: readonly MaintenanceParticipant[];
    getById: (participantId: string) => MaintenanceParticipant | undefined;
    selectByMode: (mode: MaintenanceMode) => readonly MaintenanceParticipant[];
    selectById: (participantId: string, mode: MaintenanceMode) => MaintenanceParticipant | undefined;
}

export function createMaintenanceRegistry(
    participants: readonly MaintenanceParticipant[],
): MaintenanceRegistry {
    if (!Array.isArray(participants)) {throw new TypeError('Maintenance participants must be an array.');}

    const byId: Record<string, MaintenanceParticipant> = Object.create(null) as Record<string, MaintenanceParticipant>;
    const registered = participants.map((participant) => {
        const id = String(participant?.id || '').trim();
        if (!id) {throw new TypeError('Maintenance participant id is required.');}
        if (byId[id]) {throw new TypeError(`Duplicate maintenance participant id: ${id}`);}
        if (typeof participant.isEnabled !== 'function' || typeof participant.createSession !== 'function') {
            throw new TypeError(`Invalid maintenance participant: ${id}`);
        }
        byId[id] = participant;
        return participant;
    });
    const frozenParticipants = Object.freeze([...registered]);

    return Object.freeze({
        participants: frozenParticipants,
        getById(participantId: string) {
            return byId[String(participantId || '').trim()];
        },
        selectByMode(mode: MaintenanceMode) {
            return Object.freeze(frozenParticipants.filter(participant => participant.isEnabled(mode)));
        },
        selectById(participantId: string, mode: MaintenanceMode) {
            const participant = byId[String(participantId || '').trim()];
            return participant?.isEnabled(mode) ? participant : undefined;
        },
    });
}
