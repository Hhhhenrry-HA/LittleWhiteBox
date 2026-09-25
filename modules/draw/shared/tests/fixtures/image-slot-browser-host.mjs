import http from 'node:http';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

// Isolated manual/Playwright fixture. Serves production drawing components with
// synthetic image responses; never connects to SillyTavern or a drawing API.
const entry = `
import * as ui from './draw-common.js';
import * as gallery from './gallery-cache.js';
import { initChatMessageImages } from './chat-message-images.js';
import { registerPreparedImageProvider, submitPreparedChatImages } from './prepared-chat-images.js';
import { persistCardTagEdits } from './card-tag-editor.js';
import { redrawImageCard, removeChatImageSlot, restoreImageCard } from './image-card-actions.js';
import * as jobs from './pending-image-jobs.js';
import { startImageJobRecovery, stopImageJobRecovery, reconcilePendingImageJobs } from './image-job-recovery-runtime.js';
import { compileNovelPromptForTask } from '../providers/novelai/compiler.js';
import { compileSdPromptForTask } from '../providers/sd-webui/compiler.js';
import { compileComfyPromptForTask } from '../providers/comfyui/compiler.js';
import showdown from 'showdown';
const markdown = new showdown.Converter({ simpleLineBreaks: true });
const initial = [{name:'Alice', mes:'河畔的散步。 [img: riverside, flowers]\\n\\n[图片: failed scene]', swipe_id:0, extra:{}}];
const chat = JSON.parse(localStorage.getItem('fixtureChat') || 'null') || initial;
const ctx = {chatId:'isolated-image-slots', chat, groupId:'test', chatMetadata:{xbDrawTagFormat:1}, getRequestHeaders:()=>({}),
    saveChat: async()=>localStorage.setItem('fixtureChat',JSON.stringify(chat))};
window.fixture = {ctx, format:text=>markdown.makeHtml(text), requests:Number(sessionStorage.getItem('requests')||0), events:new Map()};
window.fetch = async()=>new Response(JSON.stringify([{chat_metadata:ctx.chatMetadata},...JSON.parse(localStorage.getItem('fixtureChat'))]));
window.toastr = {error:message=>{document.querySelector('#status').textContent=message;}};
let provider='novelai';
window.xiaobaixDraw = {getStatus:()=>({ready:true}),getProvider:()=>provider};
const canvas = document.createElement('canvas'); canvas.width=480; canvas.height=300;
const c=canvas.getContext('2d');c.fillStyle='#a4d4ed';c.fillRect(0,0,480,180);c.fillStyle='#416e80';c.fillRect(0,180,480,120);
c.fillStyle='#f4c567';c.beginPath();c.arc(380,65,30,0,Math.PI*2);c.fill();
const base64=canvas.toDataURL().split(',')[1];
const compilers={novelai:compileNovelPromptForTask,sdwebui:compileSdPromptForTask,comfyui:compileComfyPromptForTask};
for(const name of Object.keys(compilers))registerPreparedImageProvider(name, input=>submitPreparedChatImages({...input, backend:false,
    metadata:input.tasks.map(task=>{const data=compilers[name](task,{positivePrefix:'quality'});return {tags:task.scene,
        positive:data.scene??data.positive,negativePrompt:data.negativePrompt??data.negative,characterPrompts:data.characterPrompts};}),
    run:async callbacks=>{window.fixture.requests++;sessionStorage.setItem('requests',window.fixture.requests);
        if(window.fixture.hold)await new Promise(resolve=>{window.fixture.release=resolve;});
        await new Promise(resolve=>setTimeout(resolve,500));
        for(const [index,task] of input.tasks.entries()){
            if(task.scene==='failed scene')await callbacks.onItemSettled({index,state:'failed',error:new Error('模拟绘图失败')});
            else await callbacks.onItemReady({index,base64});
        }
    }}));
const root=document.querySelector('.mes_text');
root.innerHTML=markdown.makeHtml(chat[0].mes);
ui.ensureDrawImageStyles();
await ui.renderPreviewsForMessage(0);
initChatMessageImages();
document.querySelector('#provider').onchange=event=>{provider=event.target.value;};
document.querySelector('#theme').onclick=()=>document.body.classList.toggle('dark');
document.querySelector('#add').onclick=()=>{chat[0].mes+='\\n[img: another view]';ctx.saveChat();root.innerHTML=markdown.makeHtml(chat[0].mes);window.fixture.events.get('MESSAGE_UPDATED')?.();};
document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-action]');const card=button?.closest('.xb-nd-img');if(!card)return;
    const action=button.dataset.action;
    try{
        if(action==='toggle-menu')card.querySelector('.xb-nd-menu-wrap').classList.toggle('open');
        if(action==='edit-tags'){card.querySelector('.xb-nd-menu-wrap')?.classList.remove('open');card.querySelector('.xb-nd-edit').style.display='block';}
        if(action==='cancel-edit')card.querySelector('.xb-nd-edit').style.display='none';
        if(action==='save-tags'||action==='save-tags-retry'){
            await persistCardTagEdits(card,(tags,characterPrompts)=>{const data=compilers[provider]({scene:tags,characterPrompts},{positivePrefix:'quality'});return {positive:data.scene??data.positive};});
            card.querySelector('.xb-nd-edit').style.display='none';
        }
        if(['refresh-image','retry-image','save-tags-retry'].includes(action)||(action==='nav-next'&&Number(card.dataset.currentIndex)===0))await redrawImageCard(provider,card);
        if(action==='remove-placeholder'){if(confirm('移除此图位？'))await removeChatImageSlot(card);}
        if(action==='restore-image')await restoreImageCard(card);
        if(action==='nav-prev'||(action==='nav-next'&&Number(card.dataset.currentIndex)>0)){
            const records=(await gallery.getPreviewsBySlot(card.dataset.slotId)).filter(item=>item.base64||item.savedUrl);
            const index=Number(card.dataset.currentIndex)+(action==='nav-prev'?1:-1);await gallery.setSlotSelection(card.dataset.slotId,records[index].imgId);
            await ui.renderPreviewsForMessage(0,{refreshSlotIds:[card.dataset.slotId]});
        }
    }catch(error){window.toastr.error(error.message);throw error;}
});
window.fixture.gallery=gallery;window.fixture.ui=ui;window.fixture.jobs=jobs;
window.fixture.redrawImageCard=redrawImageCard;
window.fixture.stageRedraw=async slotId=>{
    const preview=(await gallery.getDisplayPreviewForSlot(slotId)).preview;
    await ui.setDrawSavedEntry(0,slotId,{imgId:preview.imgId,savedUrl:'data:image/png;base64,'+base64,tags:preview.tags});
    try{
        await submitPreparedChatImages({ctx,message:chat[0],messageId:0,sourceText:chat[0].mes,
            tasks:[{scene:'new simulated version',placement:{mode:'existing',slotId}}],
            metadata:[{tags:'new simulated version',positive:'new simulated version',characterPrompts:[],negativePrompt:''}],backend:true,
            run:async({recoverable})=>{
                const record=await jobs.recordPendingImageJob({...recoverable.plan,jobId:crypto.randomUUID(),provider:'sd-webui'});
                await recoverable.commitPlacements();
                await jobs.markPendingImageJobActive(record.jobId,record.leaseId);
                await jobs.renewPendingImageJobLease(record.jobId,record.leaseId,{now:0});
                throw Object.assign(new Error('fixture page detached'),{detached:true});
            }});
    }catch(error){if(!error.detached)throw error;}
};
window.fixture.recoverRedraw=async(cancel=false)=>{
    const records=await jobs.listPendingImageJobs();
    if(cancel)for(const record of records){
        await jobs.markPendingImageJobCancelling(record.jobId,record.leaseId);
        await jobs.renewPendingImageJobLease(record.jobId,record.leaseId,{now:0});
    }
    startImageJobRecovery({client:{listJobs:async()=>cancel?[]:records.map(record=>({id:record.jobId})),
        attachJob:async(_id,handlers)=>{await handlers.onItemReady({index:0,response:new Response(base64)});return {};}
    },decoders:{'sd-webui':async({response})=>response.text()}});
    await reconcilePendingImageJobs();stopImageJobRecovery();
};
`;
const stubs = {
    'extensions.js': 'export const getContext = () => window.fixture.ctx;',
    'script.js': 'export const messageFormatting = text => window.fixture.format(text); export const getRequestHeaders = () => ({});',
    'utils.js': 'export const uuidv4 = () => crypto.randomUUID(); export const saveBase64AsFile = async () => { throw new Error("unexpected upload"); };',
    'event-manager.js': `export const event_types = new Proxy({}, {get:(_,key)=>key});
        export const createModuleEvents = () => ({on:(key,fn)=>window.fixture.events.set(key,fn),cleanup:()=>{}});`,
    'generate-interceptor.js': 'export const GENERATE_INTERCEPTOR_ORDER={}; export const registerGenerateInterceptor=()=>{}; export const unregisterGenerateInterceptor=()=>{};',
    'after-ai-gate.js': 'export const initAfterAiGate=()=>{}; export const notifyAfterAiHint=()=>{}; export const registerAfterAiHandler=()=>()=>{};',
    'debug-core.js': 'export const xbLog={error:console.error,warn:console.warn,info:()=>{}};',
    'draw-run-recovery-runtime.js': 'export const runDrawRunRecoveryPass = async () => {};',
};
const bundle = await build({ stdin: { contents: entry, resolveDir: fileURLToPath(new URL('../..', import.meta.url)) },
    bundle: true, write: false, format: 'esm', platform: 'browser', plugins: [{ name: 'fixture-host', setup(builder) {
        builder.onResolve({ filter: /\.js$/ }, ({ path }) => {
            const name = path.split('/').at(-1);
            return Object.hasOwn(stubs, name) ? { path: name, namespace: 'host' } : null;
        });
        builder.onLoad({ filter: /.*/, namespace: 'host' }, ({ path }) => ({ contents: stubs[path] }));
    } }],
});
const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Image slot component check</title>
<style>body{margin:0;background:#f6f8fc;color:#182537;font:15px/1.5 system-ui}body.dark{background:#151a22;color:#e5edf8}main{max-width:720px;padding:16px;margin:auto}nav{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}nav button,select{min-height:36px}#status{color:#ce3737}.mes_text{overflow-wrap:anywhere}</style>
<main><nav><select id="provider" aria-label="绘图后端"><option value="novelai">NovelAI</option><option value="sdwebui">SD WebUI</option><option value="comfyui">ComfyUI</option></select><button id="theme">切换主题</button><button id="add">新增标签</button></nav><div id="status" role="status"></div><div id="chat"><div class="mes" mesid="0"><div class="mes_text"></div></div></div></main><script type="module" src="/fixture.js"></script>`;
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', req.url === '/fixture.js' ? 'text/javascript' : 'text/html; charset=utf-8');
    res.end(req.url === '/fixture.js' ? bundle.outputFiles[0].text : html);
});
server.listen(Number(process.argv[2] || 0), '127.0.0.1', () => console.log(`Image fixture: http://127.0.0.1:${server.address().port}`));
