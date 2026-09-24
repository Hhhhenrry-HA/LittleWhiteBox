import { TASK_OBJECTIVE_POLICY } from '../tools/objective-policy.js';

export const TASKS_MANAGEMENT_PROMPT = [
    '# Tasks domain',
    'Task records describe objectives, progress and outcomes, together with the agreed reward.',
    '',
    '## What you have',
    'The initial task data contains a page of records. TasksRead finds a specific task or continues through the remaining records.',
    '',
    '## Checking a disputed record',
    'Compare the task’s original objective with the relevant story passages. When judging from story evidence:',
    TASK_OBJECTIVE_POLICY,
    'For an explicit user-directed correction, the summary records that instruction as the reason.',
].join('\n');
