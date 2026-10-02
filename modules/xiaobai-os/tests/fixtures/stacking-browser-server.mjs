// Loopback-only production Shell/Host verification. Real transactions, memory storage; never a real wallet.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { userEconomyHarness } from '../user-economy-harness.js';
import { createStackingService } from '../../apps/game/stacking/service.ts';
import { STACKING_PARTITION } from '../../apps/game/stacking/partition.ts';
import { withStackingRuntime } from '../../apps/game/stacking/host.ts';
import { solve } from '../../apps/game/stacking/rules.ts';
import { cranePhase, CRANE_SPEEDS, stage, STACKING_POLICY } from '../../apps/game/stacking/policy.ts';
import { createMovingService } from '../../apps/game/moving/service.ts';
import { MOVING_PARTITION } from '../../apps/game/moving/partition.ts';
import { withMovingRuntime } from '../../apps/game/moving/host.ts';
import { createGameService } from '../../apps/game/application/service.ts';
import { GAME_PARTITION } from '../../apps/game/partition.ts';
import { createGameController } from '../../apps/game/host/controller.ts';
import { createSettingsRepository } from '../../host/settings-repository.ts';
let harness, stacking, game, runtime, identity = 'stacking-preview', events = [], seed = 17;
const settingsRoot = {};
const settings = createSettingsRepository({ getExtensionSettings: () => settingsRoot, saveSettings() {} });
await settings.prepare();
async function reset(files) {
    await runtime?.stopBackground?.(); game?.dispose();
    harness = await userEconomyHarness({ files }); await harness.economy.ensureOpen();
    stacking = createStackingService(harness.store(STACKING_PARTITION), harness.transactions, harness.economy,
        { seed: () => seed++, soundEnabled: () => settings.read().apps.game.stackingSoundEnabled });
    const moving = createMovingService(harness.store(MOVING_PARTITION), harness.transactions, harness.economy,
        { soundEnabled: () => settings.read().apps.game.movingSoundEnabled });
    game = createGameService(harness.store(GAME_PARTITION), harness.transactions, harness.economy);
    await game.refreshCurrent(); await moving.refresh(); await stacking.refresh();
    runtime = withStackingRuntime(withMovingRuntime(createGameController({ game, economy: harness.economy, getChatIdentity: () => identity,
        isMainGenerationActive: () => false, subscribeGeneration: () => () => {} }), moving, () => identity, settings), stacking, () => identity, settings);
    await runtime.startBackground();
}
async function activate() { return runtime.activate({ post: (type, payload) => { events.push({ type, payload }); return true; } }); }
await reset();
const root = resolve('.');
const distRoot = resolve(process.env.XIAOBAI_OS_OUT_DIR || 'modules/xiaobai-os/dist');
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>Stacking isolated verification</title><style>html,body{margin:0;height:100%;background:#edf4f7}iframe{width:100%;height:100%;border:0;display:block}</style></head><body><iframe title="OS" src="/modules/xiaobai-os/shell/xiaobai-os.html"></iframe><script type="module" src="/__stacking/bridge.js"></script></body></html>`;
const bridge = `const frame=document.querySelector('iframe'),source='LittleWhiteBox-XiaobaiOS';let session=null,seq=0;const log=[];
function send(type,payload,requestId,app=session){frame.contentWindow.postMessage({source,type,payload,requestId,...app},location.origin)}
window.stackingPreview={log,theme:theme=>send('os/theme-changed',{theme})};
window.addEventListener('message',async({data:m,origin,source:sender})=>{if(origin!==location.origin||sender!==frame.contentWindow||m?.source!==source)return;
const {type,payload,requestId}=m;log.push({type,payload});if(type==='os/frame-ready'){send('os/init',{theme:'light',apps:[{id:'game'}],chat:{}},undefined,null);return;}
if(type==='app/activate'){session={appId:payload.appId,activationToken:'stacking-preview-'+ ++seq};const r=await(await fetch('/__stacking/activate')).json();send('app/activated',{ok:r.ok,...session,state:r.result},requestId,null);return;}
if(type==='app/deactivate'||type==='os/close'){session=null;await fetch('/__stacking/deactivate');return;}if(!session)return;const active=session;
const r=await(await fetch('/__stacking/action',{method:'POST',body:JSON.stringify({type,payload})})).json();if(active!==session)return;send('reply',r,requestId);for(const e of r.events??[])send(e.type,e.payload);});`;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
    try {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(html); return; }
        if (url.pathname === '/__stacking/bridge.js') { res.setHeader('Content-Type', 'text/javascript'); res.end(bridge); return; }
        if (url.pathname.startsWith('/__stacking/')) {
            let result;
            switch (url.pathname.slice('/__stacking/'.length)) {
                case 'activate': result = await activate(); break;
                case 'deactivate': await runtime.deactivate('preview'); break;
                case 'reset': identity = 'stacking-preview'; seed = Number(url.searchParams.get('seed') ?? 17); await reset(); result = await activate(); break;
                case 'reload': await reset(harness.state.files); result = await activate(); break;
                case 'chat': identity = url.searchParams.get('id'); harness.switchStory(identity); await runtime.handleChatChanged(); result = await activate(); break;
                case 'mode': harness.state.mode = url.searchParams.get('value'); result = harness.state.mode; break;
                case 'inspect': result = { view: stacking.view(), route: stacking.view().active ? solve(stacking.view().active.seed) : null,
                    motion: stacking.view().active ? { rail: STACKING_POLICY.rail, phase: cranePhase(stacking.view().active.seed, stacking.view().active.moves.length), speed: CRANE_SPEEDS[stage(stacking.view().active.moves.length)] } : null,
                    document: harness.document(), settings: settings.read() }; break;
                case 'action': {
                    let body = ''; for await (const part of req) { body += part; }
                    result = await runtime.handleMessage(JSON.parse(body)); break;
                }
                default: throw new Error('unknown_preview_request');
            }
            const outgoing = events; events = []; res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, result, events: outgoing })); return;
        }
        if (!['/modules/xiaobai-os/dist/', '/modules/xiaobai-os/shell/'].some(p => url.pathname.startsWith(p))) { throw new Error('outside_preview'); }
        const distPrefix = '/modules/xiaobai-os/dist/';
        const base = url.pathname.startsWith(distPrefix) ? distRoot : root;
        const relative = base === distRoot ? decodeURIComponent(url.pathname.slice(distPrefix.length)) : '.' + decodeURIComponent(url.pathname);
        const path = resolve(base, relative); if (!path.startsWith(base + sep)) { throw new Error('outside_root'); }
        res.setHeader('Content-Type', types[extname(path)] ?? 'application/octet-stream'); res.end(await readFile(path));
    } catch (error) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ ok: false, error: error.code ?? error.message, message: error.message })); }
}).listen(18913, '127.0.0.1', () => console.log('Stacking verification: http://127.0.0.1:18913/'));
