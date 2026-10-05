// Loopback preview of production Shell/Host. Its wallet and files exist only in memory.
import { createServer } from 'node:http';
import process from 'node:process';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { userEconomyHarness } from '../user-economy-harness.js';
import { createExpeditionService } from '../../apps/game/expedition/service.ts';
import { EXPEDITION_PARTITION } from '../../apps/game/expedition/partition.ts';
import { withExpeditionRuntime } from '../../apps/game/expedition/host.ts';
import { createGameService } from '../../apps/game/application/service.ts';
import { GAME_PARTITION } from '../../apps/game/partition.ts';
import { createGameController } from '../../apps/game/host/controller.ts';
import { driveExpedition } from './expedition-service-driver.mjs';
let harness, expedition, game, runtime, events = [], seed = 7;
const identity = 'expedition-preview';
async function reset(files, initialPartitions) {
    await runtime?.stopBackground?.(); game?.dispose();
    harness = await userEconomyHarness({ files, initialPartitions }); await harness.economy.ensureOpen();
    expedition = createExpeditionService(harness.store(EXPEDITION_PARTITION), harness.transactions, harness.economy, { seed: () => seed++ });
    game = createGameService(harness.store(GAME_PARTITION), harness.transactions, harness.economy);
    await game.refreshCurrent(); await expedition.refresh();
    runtime = withExpeditionRuntime(createGameController({ game, economy: harness.economy, getChatIdentity: () => identity,
        isMainGenerationActive: () => false, subscribeGeneration: () => () => {} }), expedition, () => identity);
    await runtime.startBackground();
}
async function activate() { return runtime.activate({ post: (type, payload) => { events.push({ type, payload }); return true; } }); }
await reset();
const root = resolve('.'), distRoot = resolve(process.env.XIAOBAI_OS_OUT_DIR || 'output/expedition-build');
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>Expedition isolated verification</title><style>html,body{margin:0;height:100%;background:#edf4f7}iframe{width:100%;height:100%;border:0;display:block}</style></head><body><iframe title="OS" src="/modules/xiaobai-os/shell/xiaobai-os.html"></iframe><script type="module" src="/__expedition/bridge.js"></script></body></html>`;
const bridge = `const frame=document.querySelector('iframe'),source='LittleWhiteBox-XiaobaiOS';let session=null,seq=0;
function send(type,payload,requestId,app=session){frame.contentWindow.postMessage({source,type,payload,requestId,...app},location.origin)}
window.expeditionPreview={theme:theme=>send('os/theme-changed',{theme})};
window.addEventListener('message',async({data:m,origin,source:sender})=>{if(origin!==location.origin||sender!==frame.contentWindow||m?.source!==source)return;
const {type,payload,requestId}=m;if(type==='os/frame-ready'){send('os/init',{theme:'light',apps:[{id:'game'}],chat:{}},undefined,null);return;}
if(type==='app/activate'){session={appId:payload.appId,activationToken:'expedition-preview-'+ ++seq};const r=await(await fetch('/__expedition/activate')).json();send('app/activated',{ok:r.ok,...session,state:r.result},requestId,null);return;}
if(type==='app/deactivate'||type==='os/close'){session=null;await fetch('/__expedition/deactivate');return;}if(!session)return;const active=session;
const r=await(await fetch('/__expedition/action',{method:'POST',body:JSON.stringify({type,payload})})).json();if(active!==session)return;send('reply',r,requestId);for(const e of r.events??[])send(e.type,e.payload);});`;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
    try {
        const url = new URL(req.url, 'http://127.0.0.1');
        if (url.pathname === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(html); return; }
        if (url.pathname === '/__expedition/bridge.js') { res.setHeader('Content-Type', 'text/javascript'); res.end(bridge); return; }
        if (url.pathname.startsWith('/__expedition/')) {
            let result;
            switch (url.pathname.slice('/__expedition/'.length)) {
                case 'activate': result = await activate(); break;
                case 'deactivate': await runtime.deactivate('preview'); break;
                case 'reset': seed = Number(url.searchParams.get('seed') ?? 7); await reset(); result = await activate(); break;
                case 'v1': { const fixture = JSON.parse(await readFile(new URL('./expedition-v1.json', import.meta.url), 'utf8')); await reset(undefined, async () => fixture); result = await activate(); break; }
                case 'reload': await reset(harness.state.files); result = await activate(); break;
                case 'mode': harness.state.mode = url.searchParams.get('value'); result = harness.state.mode; break;
                case 'view': result = expedition.view(); break;
                case 'pilot': { const step = Number(url.searchParams.get('step') ?? 14), phase = url.searchParams.get('phase') ?? 'won'; result = await driveExpedition(expedition, r => r.step === step && r.phase === phase); break; }
                case 'action': { let body = ''; for await (const part of req) { body += part; if (body.length > 1024 * 1024) throw new Error('preview_request_too_large'); } result = await runtime.handleMessage(JSON.parse(body)); break; }
                default: throw new Error('unknown_preview_request');
            }
            const outgoing = events; events = []; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ ok: true, result, events: outgoing })); return;
        }
        if (!['/modules/xiaobai-os/dist/', '/modules/xiaobai-os/shell/'].some(p => url.pathname.startsWith(p))) throw new Error('outside_preview');
        const prefix = '/modules/xiaobai-os/dist/', base = url.pathname.startsWith(prefix) ? distRoot : root;
        const relative = base === distRoot ? decodeURIComponent(url.pathname.slice(prefix.length)) : '.' + decodeURIComponent(url.pathname);
        const path = resolve(base, relative); if (!path.startsWith(base + sep)) throw new Error('outside_root');
        res.setHeader('Content-Type', types[extname(path)] ?? 'application/octet-stream'); res.end(await readFile(path));
    } catch (error) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify({ ok: false, error: error.code ?? error.message, message: error.message })); }
}).listen(Number(process.env.EXPEDITION_PREVIEW_PORT ?? 18927), '127.0.0.1', function () { console.log(`Expedition verification: http://127.0.0.1:${this.address().port}/`); });
