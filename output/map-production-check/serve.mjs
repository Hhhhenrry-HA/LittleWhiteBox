import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('.');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };
createServer(async (req, res) => {
    try {
        let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        if (path.endsWith('/')) path += 'index.html';
        if (!['/output/map-production-check/dist/', '/libs/material-symbols/'].some(prefix => path.startsWith(prefix))) { res.writeHead(404); res.end(); return; }
        const file = resolve(root, '.' + path);
        if (!file.startsWith(root + sep)) throw new Error('outside preview');
        const body = await readFile(file);
        res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(body);
    } catch (error) { res.writeHead(404); res.end(String(error)); }
}).listen(8765, '127.0.0.1', () => console.log('Map check: http://127.0.0.1:8765/output/map-production-check/dist/'));
