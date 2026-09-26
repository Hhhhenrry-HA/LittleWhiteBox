// Explicit bounded model acceptance, not a recall experiment. Preflight is the default and performs zero API calls.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createAgentAdapter } from '../../agent-core/provider-config.js';
import { resolveActiveProviderConfig } from '../../agent-core/provider-resolution.js';
import { redactRequestSecrets } from '../../agent-core/adapters/request-inspection.js';
import { runMemoryAgent } from '../maintenance/runner.js';
import { createMemorySession } from '../maintenance/session.js';
import { MEMORY_TOOLS } from '../maintenance/tools.js';
import { MEMORY_MAINTENANCE_PROMPT } from '../maintenance/prompt.js';
import { maintenanceFixture } from './fixtures/memory-maintenance.js';

const run = process.argv.includes('--run');
const settingsPath = process.argv.find(arg => arg.startsWith('--settings='))?.slice(11);
const presetName = process.argv.find(arg => arg.startsWith('--preset='))?.slice(9);
const direct = process.argv.includes('--direct');
const model = process.argv.find(arg => arg.startsWith('--model='))?.slice(8);
const output = path.resolve(process.argv.find(arg => arg.startsWith('--out='))?.slice(6) || 'output/memory-maintenance-check');
const fixture = maintenanceFixture();
const fixed = { fixture, presetName: presetName || null, direct, model: model || null, prompt: MEMORY_MAINTENANCE_PROMPT, tools: MEMORY_TOOLS,
    limits: { turns: 24, inputChars: 180000 },
    cases: { summaryErrors: ['f-1', 'f-2', 'f-3', 'f-4'], anchorErrors: ['atom-1-0', 'atom-3-0', 'atom-5-0'],
        correctControls: ['f-5', 'atom-7-0', 'evt-3'], eventJoin: ['evt-1', 'evt-2'], causalRedirect: 'evt-4' },
};
const digest = crypto.createHash('sha256').update(JSON.stringify(fixed)).digest('hex');
await fs.mkdir(output, { recursive: true });
const manifestPath = path.join(output, 'preflight.json');
if (!run) {
    await fs.writeFile(manifestPath, JSON.stringify({ digest, networkCalls: 0, ...fixed }, null, 2));
    console.log(JSON.stringify({ preflight: 'passed', digest, networkCalls: 0, floors: fixture.chat.length, ...fixed.cases }));
} else {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    if (manifest.digest !== digest) throw new Error('Preflight no longer matches the fixed sample and implementation');
    if (!settingsPath) throw new Error('A shared Agent settings file is required');
    // Exclusive create prevents repurchasing a previous or unknown run.
    const journal = await fs.open(path.join(output, 'requests.jsonl'), 'wx');
    const settings = JSON.parse(await fs.readFile(settingsPath, 'utf8')).settings;
    const config = resolveActiveProviderConfig(settings, { presetName });
    if (direct) {
        if (config.provider !== 'sillytavern-openai-compatible') throw new Error('Direct check supports only the configured OpenAI-compatible relay');
        config.provider = 'openai-compatible';
    }
    if (model) config.model = model;
    const adapter = createAgentAdapter(config);
    let ordinal = 0;
    const tracked = {
        supportsSessionToolLoop: adapter.supportsSessionToolLoop,
        async chat(task) {
            const id = ++ordinal;
            await journal.appendFile(`${JSON.stringify({ id, state: 'started', at: Date.now() })}\n`);
            await fs.writeFile(path.join(output, `request-${id}.json`), JSON.stringify({ ...task, signal: undefined }, null, 2));
            try {
                const result = await adapter.chat(task);
                await fs.writeFile(path.join(output, `response-${id}.json`), JSON.stringify(redactRequestSecrets(result), null, 2));
                await journal.appendFile(`${JSON.stringify({ id, state: 'completed', at: Date.now(), usage: result.usage })}\n`);
                return result;
            } catch (error) {
                await fs.writeFile(path.join(output, `failure-${id}.json`), JSON.stringify(redactRequestSecrets({
                    name: error.name, code: error.code, status: error.status, message: error.message,
                    requestId: error.request_id, requestInspection: error.requestInspection,
                }), null, 2));
                await journal.appendFile(`${JSON.stringify({ id, state: 'failed-or-unknown', at: Date.now(), code: error.code || error.name, status: error.status })}\n`);
                throw error;
            }
        },
    };
    try {
        const session = createMemorySession(fixture);
        const result = await runMemoryAgent(session, { adapter: tracked, config, limits: fixed.limits });
        await fs.writeFile(path.join(output, 'result.json'), JSON.stringify({ digest, provider: config.provider, model: config.model,
            reasoning: config.reasoning, ...result, operations: session.operations, coverage: session.coverage(), memory: session.memory }, null, 2));
        console.log(JSON.stringify({ completed: true, calls: ordinal, operations: session.operations.length, coverage: session.coverage() }));
    } catch (error) {
        console.error(JSON.stringify({ completed: false, code: error.code || error.name, status: error.status }));
        process.exitCode = 1;
    } finally { await journal.close(); }
}
