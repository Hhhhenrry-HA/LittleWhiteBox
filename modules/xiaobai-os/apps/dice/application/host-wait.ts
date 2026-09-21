export type DiceHostBlocker = 'generation';

/** A transient observation of the host, not a prediction of its completion time. */
export interface DiceHostWait {
    blockers: DiceHostBlocker[];
    elapsedSeconds: number;
}

export class DiceHostWaitTimeout extends Error {
    constructor(readonly wait: DiceHostWait) {
        super('dice_host_wait_timeout');
        this.name = 'DiceHostWaitTimeout';
    }
}
