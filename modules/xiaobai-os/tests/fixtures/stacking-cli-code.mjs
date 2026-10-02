// Generate a Playwright CLI snippet (the CLI sandbox has no dynamic-import callback).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const scenario = process.argv[2];
if (!['cashouts', 'lossRecovery', 'presentation', 'timedTower', 'lifecycle', 'endings', 'balanceFailure', 'recoveryPresentation', 'companionFraming'].includes(scenario)) { throw new Error('Unknown stacking browser scenario'); }
const source = await readFile(new URL('./stacking-browser-actions.mjs', import.meta.url), 'utf8');
const output = resolve('output/playwright'); await mkdir(output, { recursive: true });
await writeFile(resolve(output, `stacking-${scenario}.js`), `async (page) => {\n${source.replaceAll('export async function', 'async function')}\nreturn await ${scenario}(page);\n}\n`);
