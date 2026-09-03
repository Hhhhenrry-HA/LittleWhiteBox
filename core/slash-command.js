import { getContext } from "../../../../extensions.js";
import { SlashCommandAbortController } from "../../../../slash-commands/SlashCommandAbortController.js";

/**
 * 执行 SillyTavern 斜杠命令
 * @param {string} command - 要执行的命令
 * @param {{ signal?: AbortSignal | null }} [options] - 合作式取消选项
 * @returns {Promise<any>} 命令执行结果
 */
export async function executeSlashCommand(command, { signal = null } = {}) {
    let onAbort = null;
    try {
        if (!command) return { error: "命令为空" };
        if (!command.startsWith('/')) command = '/' + command;
        const { executeSlashCommands, executeSlashCommandsWithOptions, substituteParams } = getContext();
        if (typeof executeSlashCommands !== 'function' && typeof executeSlashCommandsWithOptions !== 'function') {
            throw new Error("executeSlashCommands 函数不可用");
        }
        command = substituteParams(command);
        let result;
        if (!signal) {
            result = await executeSlashCommands(command, true);
        } else {
            const abortController = new SlashCommandAbortController();
            onAbort = () => abortController.abort(signal.reason || '任务运行已取消', true);
            if (signal.aborted) onAbort();
            else signal.addEventListener('abort', onAbort, { once: true });
            result = typeof executeSlashCommandsWithOptions === 'function'
                ? await executeSlashCommandsWithOptions(command, { handleParserErrors: true, abortController })
                : await executeSlashCommands(command, true, null, false, null, abortController);
        }
        if (result && typeof result === 'object' && result.pipe !== undefined) {
            const pipeValue = result.pipe;
            if (typeof pipeValue === 'string') {
                try { return JSON.parse(pipeValue); } catch { return pipeValue; }
            }
            return pipeValue;
        }
        if (typeof result === 'string' && result.trim()) {
            try { return JSON.parse(result); } catch { return result; }
        }
        return result === undefined ? "" : result;
    } catch (err) {
        throw err;
    } finally {
        if (signal && onAbort) signal.removeEventListener('abort', onAbort);
    }
}
