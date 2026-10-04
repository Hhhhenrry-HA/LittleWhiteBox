// Isolated browser fixture: production recovery UI/host/controller and planner,
// with a local, non-network generation boundary. No real chat or model calls.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const page = `<!doctype html><html lang="zh"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { font: 17px system-ui; margin: 0; padding: 24px; color: #eee; background: #20242a; }
body.light { color: #222; background: #f7f9fb; }
main { max-width: 680px; margin: 0 auto; } #send_form { display: flex; gap: 12px; align-items: center; }
textarea { font: inherit; width: 100%; height: 120px; background: transparent; color: inherit; border: 1px solid #888; border-radius: 8px; padding: 10px; }
button { font: inherit; min-height: 44px; min-width: 64px; border-radius: 8px; border: 1px solid #888; }
#mes_stop { display: none; } body[data-generating] #send_but { display: none; }
nav { display: flex; gap: 10px; margin: 24px 0; flex-wrap: wrap; } output { display: block; padding: 12px 0; overflow-wrap: anywhere; }
#notice { padding: 14px; border-left: 3px solid #dfb456; }
</style></head><body><main><h2>召回恢复隔离验证</h2>
<p>已入楼：用户消息＋完成的剧情规划</p>
<div id="send_form"><textarea id="send_textarea" aria-label="下一条草稿">下一条草稿，不应再次发送</textarea>
<button id="send_but">发送</button><button id="mes_stop" class="mes_stop">停止</button></div>
<nav><button id="start">模拟召回失败</button><button id="ready">准备完成</button><button id="success">模拟召回成功</button><button id="theme">深浅切换</button></nav>
<output id="status"></output><p id="notice" hidden></p></main><script type="module" src="/repo/modules/story-summary/tests/fixtures/recall-recovery-browser-ui.js"></script></body></html>`;

const server = http.createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (pathname === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(page); return; }
    const target = path.resolve(root, decodeURIComponent(pathname.replace(/^\/repo\//, '')));
    if (!pathname.startsWith('/repo/') || !target.startsWith(root + path.sep)) { res.writeHead(404).end(); return; }
    try {
        const data = await readFile(target);
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8'); res.end(data);
    } catch { res.writeHead(404).end(); }
});
server.listen(0, '127.0.0.1', () => console.log(`http://127.0.0.1:${server.address().port}`));
