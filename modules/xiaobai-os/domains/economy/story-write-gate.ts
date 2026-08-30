/** Blocks Economy mutations while the current story is being reconciled. */
export interface StoryWriteGate {
    block: (identityKey: string) => number;
    release: (identityKey: string, token: number) => void;
    assertWritable: (identityKey: string) => void;
    clear: (identityKey?: string) => void;
}

interface GateState {
    token: number;
}

export function createStoryWriteGate(): StoryWriteGate {
    const states = new Map<string, GateState>();
    let sequence = 0;

    return Object.freeze({
        block(identityKey: string): number {
            if (!identityKey) {
                throw new Error('story_gate_identity_missing');
            }
            const token = ++sequence;
            states.set(identityKey, { token });
            return token;
        },
        release(identityKey: string, token: number): void {
            if (states.get(identityKey)?.token === token) {
                states.delete(identityKey);
            }
        },
        assertWritable(identityKey: string): void {
            if (states.has(identityKey)) {
                throw new Error('economy_story_reconciliation_required');
            }
        },
        clear(identityKey?: string): void {
            if (identityKey) {
                states.delete(identityKey);
            } else {
                states.clear();
            }
        },
    });
}
