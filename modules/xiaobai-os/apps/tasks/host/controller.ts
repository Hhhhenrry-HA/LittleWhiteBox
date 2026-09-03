import type { EconomyReadCapability } from '../../../capabilities/economy/index.js';
import type { XiaobaiOsExecutionScope } from '../../../kernel/execution-scope.js';
import type {
    XiaobaiOsAppActivationContext,
    XiaobaiOsAppRuntime,
    XiaobaiOsChatIdentity,
} from '../../../types.js';
import type { TasksService } from '../application/service.js';
import {
    createTaskControllerRuntime,
    type TaskControllerRuntimeDependencies,
} from './controller-runtime.js';

export interface TaskControllerDependencies extends Omit<
    TaskControllerRuntimeDependencies,
    'tasks' | 'economy' | 'subscribeData' | 'schedule' | 'getChatIdentity'
> {
    tasks: TasksService;
    economy: EconomyReadCapability;
    execution?: XiaobaiOsExecutionScope;
    getChatIdentity: () => XiaobaiOsChatIdentity | { key?: unknown } | string | null;
}

type TaskControllerRuntime = XiaobaiOsAppRuntime & {
    activate: NonNullable<XiaobaiOsAppRuntime['activate']>;
    handleMessage: NonNullable<XiaobaiOsAppRuntime['handleMessage']>;
};

function identityKey(identity: ReturnType<TaskControllerDependencies['getChatIdentity']>): string {
    return typeof identity === 'string' ? identity : String(identity?.key || '');
}

export function createTaskController(dependencies: TaskControllerDependencies): TaskControllerRuntime {
    const { tasks, economy, execution, getChatIdentity, ...runtimeDependencies } = dependencies;

    async function prepareCurrent(): Promise<void> {
        const requestedIdentity = identityKey(getChatIdentity());
        if (!requestedIdentity) {throw new Error('tasks_chat_unavailable');}
        await economy.refresh();
        if (!economy.isOpen()) {await economy.ensureOpen();}
        await tasks.refreshCurrent();
        if (identityKey(getChatIdentity()) !== requestedIdentity) {
            throw Object.assign(new Error('tasks_chat_changed'), { code: 'chat_changed' });
        }
    }

    const runtime = createTaskControllerRuntime({
        ...runtimeDependencies,
        tasks,
        getChatIdentity,
        economy,
        subscribeData: tasks.subscribe,
        schedule: execution
            ? task => {execution.setTimeout(task, 0);}
            : undefined,
    });

    return Object.freeze({
        ...runtime,
        async activate(context: XiaobaiOsAppActivationContext) {
            runtime.deactivate?.('app-reactivated');
            await prepareCurrent();
            return runtime.activate(context);
        },
    });
}
