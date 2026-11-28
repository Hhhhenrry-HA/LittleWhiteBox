import{r as _}from"./constants-RJ4jNr01.js";import{$ as D,A as ee,D as u,E as te,J as V,K as se,O as ae,X as h,Y as F,Z as y,a as ne,d as ie,f as le,i as oe,k as S,n as L}from"./provider-resolution-Bn2s2sS-.js";import{t as f}from"./installation-S-HFMGPj.js";function re(){return`<link rel="stylesheet" href="/${encodeURI(_)}/modules/agent-core/ui/web-settings.css">
    <div class="xb-assistant-web-settings"><label><span>${y.provider}</span>
        <select id="xb-assistant-web-provider">${h.map(({id:e,label:t})=>`<option value="${e}">${t}</option>`).join("")}</select>
    </label>${h.map(({id:e,label:t})=>`<label id="xb-assistant-${e}-key-wrap">
        <span>${t} ${y.key}</span>
        <div class="xb-assistant-inline-input">
            <input id="xb-assistant-${e}-api-key" type="password" autocomplete="off" />
            <button id="xb-assistant-toggle-${e}-key" type="button" class="secondary ghost">${y.show}</button>
        </div>
    </label>`).join("")}<div id="xb-assistant-exa-backend-note" class="xb-web-backend-note" hidden>
        <small>${y.exaBackend}</small>
        <button id="xb-assistant-exa-install-guide" class="xb-web-guide-button" type="button" aria-haspopup="dialog">${f.open}</button>
    </div>
    <dialog id="xb-assistant-exa-install-dialog" class="xb-web-install-dialog" aria-labelledby="xb-assistant-exa-install-title">
        <header><h3 id="xb-assistant-exa-install-title">${f.title}</h3>
            <button type="button" id="xb-assistant-exa-install-close" class="xb-web-guide-button" autofocus>${f.close}</button></header>
        <ol id="xb-assistant-exa-install-steps"></ol>
    </dialog></div>`}function xe(e){const t=e.querySelector("#xb-assistant-exa-install-dialog");if(!t)return;const s=t.ownerDocument;e.querySelector("#xb-assistant-exa-install-steps").replaceChildren(...f.steps.map(a=>{const n=s.createElement("li");if(n.textContent=a.text,a.code){const l=s.createElement("code");l.textContent=a.code,n.append(l)}return n})),e.querySelector("#xb-assistant-exa-install-guide").addEventListener("click",()=>t.showModal()),e.querySelector("#xb-assistant-exa-install-close").addEventListener("click",()=>t.close())}function me(e,t){return D({webProvider:e.querySelector("#xb-assistant-web-provider")?.value,...Object.fromEntries(h.map(({id:s})=>[`${s}ApiKey`,e.querySelector(`#xb-assistant-${s}-api-key`)?.value]))},t)}function ve(e,t){const s=D(t),a=e.querySelector("#xb-assistant-web-provider");a&&(a.value=s.webProvider);const n=e.querySelector("#xb-assistant-exa-backend-note");n&&(n.hidden=s.webProvider!=="exa");const l=e.querySelector("#xb-assistant-exa-install-dialog");s.webProvider!=="exa"&&l?.open&&l.close();for(const{id:i}of h){const o=e.querySelector(`#xb-assistant-${i}-key-wrap`),d=e.querySelector(`#xb-assistant-${i}-api-key`);o&&(o.style.display=s.webProvider===i?"":"none"),d&&(d.value=s[`${i}ApiKey`])}}var v=Object.freeze({title:"采样参数",temperature:"温度",defaults:"使用接口默认",enable:"启用",enabled:"已启用",disabled:"未启用"}),B=[{key:"temperature",label:v.temperature,min:0,max:2,step:.05,value:1},...se],W=e=>e==="delegate"?"xb-assistant-delegate":"xb-assistant";function O(e="main"){const t=W(e);return`${e==="main"?`<link rel="stylesheet" href="/${encodeURI(_)}/modules/agent-core/ui/sampling-settings.css">`:""}
    <details class="xb-sampling" data-sampling-scope="${e}">
        <summary><span class="xb-sampling-title">${v.title}</span><span class="xb-sampling-summary"></span><span class="xb-sampling-chevron" aria-hidden="true">⌄</span></summary>
        <div class="xb-sampling-fields">${B.map(s=>{const a=`${t}-${s.key}`,n=s.key==="temperature"?`${t}-send-temperature`:`${a}-enabled`;return`<div class="xb-sampling-row" data-sampling-key="${s.key}">
                <label class="xb-sampling-name" for="${a}">${s.label}</label>
                <input id="${a}" type="number" min="${s.min}" ${s.max===void 0?"":`max="${s.max}"`} step="${s.step===1?1:"any"}" inputmode="${s.step===1?"numeric":"decimal"}" required>
                <label class="xb-sampling-toggle" title="${v.enable}${s.label}"><input id="${n}" type="checkbox" role="switch" aria-label="${v.enable}${s.label}"><span aria-hidden="true"></span></label>
            </div>`}).join("")}</div>
    </details>`}function ye(e,t,s,a="main"){const n=W(a),l=V(s);for(const i of F(t)){const o=e.querySelector(`#${n}-${i.key}`),d=e.querySelector(`#${n}-${i.key}-enabled`);if(!o||!d)continue;const r=o.value!==""&&o.validity?.valid!==!1?Number(o.value):l[i.key]?.value??i.value;!Object.hasOwn(l,i.key)&&!d.checked&&r===i.value||(l[i.key]={enabled:d.checked,value:r})}return l}function E(e){const t=[];for(const s of e.querySelectorAll("[data-sampling-key]")){if(s.hidden)continue;const a=s.querySelector('input[type="checkbox"]'),n=s.querySelector('input[type="number"]');n.disabled=!a.checked,s.dataset.enabled=String(a.checked),s.querySelector(".xb-sampling-toggle").title=a.checked?v.enabled:v.disabled,a.checked&&t.push(`${s.querySelector(".xb-sampling-name").textContent} ${n.value}`)}e.querySelector(".xb-sampling-summary").textContent=t.join(" · ")||v.defaults}function fe(e,{provider:t,temperature:s,sendTemperature:a,sampling:n},l="main"){const i=e.querySelector(`[data-sampling-scope="${l}"]`);if(!i)return;const o=new Set(t==="google-vertex"?[]:["temperature",...F(t).map(r=>r.key)]);i.hidden=!o.size;const d=V(n);for(const r of B){const c=i.querySelector(`[data-sampling-key="${r.key}"]`);c.hidden=!o.has(r.key);const b=r.key==="temperature",x=c.querySelector('input[type="number"]');x.value=String(b?s??r.value:d[r.key]?.value??r.value),c.querySelector('input[type="checkbox"]').checked=b?a!==!1:d[r.key]?.enabled===!0,x.disabled=c.hidden||!c.querySelector('input[type="checkbox"]').checked}E(i)}function $e(e,t){for(const s of e.querySelectorAll("[data-sampling-scope]"))s.addEventListener("input",()=>{E(s),t()}),s.addEventListener("change",()=>{E(s),t()})}function he(e){for(const t of e.querySelectorAll('.xb-sampling input[type="number"]'))if(!t.disabled&&t.validity?.valid===!1)return t.closest("details").open=!0,t.reportValidity(),!1;return!0}var k=e=>e==="delegate"?"xb-assistant-delegate":"xb-assistant",$=new WeakMap;function R(e="main"){const t=k(e);return`<div id="${t}-vertex" style="display:none">
        <label><span>${u.auth}</span><select id="${t}-vertex-authMode">${te.map(s=>`<option value="${s.value}">${s.label}</option>`).join("")}</select></label>
        <label data-vertex-standard><span>${u.account}</span><input id="${t}-vertex-serviceAccountJson" type="password" autocomplete="off" spellcheck="false" /></label>
        <label data-vertex-standard><span>${u.chooseFile}</span><input id="${t}-vertex-file" type="file" accept=".json,application/json" /></label>
        <label data-vertex-standard><span>${u.project}</span><input id="${t}-vertex-projectId" type="text" placeholder="${u.projectPlaceholder}" spellcheck="false" /></label>
        <label data-vertex-standard><span>${u.location}</span><input id="${t}-vertex-location" type="text" spellcheck="false" /></label>
        <label><span>${u.streamArguments}</span><select id="${t}-vertex-streamFunctionCallArguments"><option value="true">${u.streamOn}</option><option value="false">${u.streamOff}</option></select></label>
    </div>`}function Se(e,t,s="main"){const a=S(t),n=k(s);return S(Object.fromEntries(Object.entries(a).map(([l,i])=>[l,l==="streamFunctionCallArguments"?(e.querySelector(`#${n}-vertex-${l}`)?.value??String(i))!=="false":e.querySelector(`#${n}-vertex-${l}`)?.value??i])))}function ke(e,t,s,a="main"){const n=k(a),l=S(s),i=t===ae,o=e.querySelector(`#${n}-vertex`);if(o){$.delete(o),o.style.display=i?"contents":"none";for(const[c,b]of Object.entries(l)){const x=e.querySelector(`#${n}-vertex-${c}`);x&&(x.value=b)}for(const c of o.querySelectorAll("[data-vertex-standard]"))c.style.display=l.authMode==="service-account"?"":"none"}const d=e.querySelector(`#${n}-base-url`)?.closest("label");d&&(d.style.display=i&&l.authMode!=="relay"?"none":"");const r=e.querySelector(`#${n}-api-key`)?.closest("label");r&&(r.style.display=i&&l.authMode==="service-account"?"none":"")}function we(e,t,s){for(const a of["main","delegate"]){const n=k(a);for(const l of Object.keys(S()))e.querySelector(`#${n}-vertex-${l}`)?.addEventListener(["authMode","streamFunctionCallArguments"].includes(l)?"change":"input",t);e.querySelector(`#${n}-vertex-file`)?.addEventListener("change",async l=>{const i=l.currentTarget,o=i.files?.[0];if(!o)return;const d=e.querySelector(`#${n}-vertex`),r={};$.set(d,r);try{const c=await o.text();if(!i.isConnected||$.get(d)!==r)return;ee(c),e.querySelector(`#${n}-vertex-serviceAccountJson`).value=c,t()}catch{i.isConnected&&$.get(d)===r&&s?.(u.invalidAccount)}finally{i.value=""}})}}function p(e=""){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function de(e="前端直连"){return[{label:e,options:L.filter(t=>!t.directProvider)},{label:"酒馆后端",options:L.filter(t=>t.directProvider)}]}function Ae(e){if(!e)return;const t=oe(e.value),s=`${e.id}-hint`;let a=e.nextElementSibling?.id===s?e.nextElementSibling:null;if(!t){a?.remove(),e.removeAttribute("aria-describedby");return}a||(a=e.ownerDocument.createElement("small"),a.id=s,e.after(a),e.setAttribute("aria-describedby",s)),a.textContent=`酒馆后端的兼容性因版本而异。遇到 400 错误时，可试试直连「${ne(t)}」。`}function N(e,t){return`<label>
        <span>连接方式</span>
        <select id="${e==="delegate"?"xb-assistant-delegate-provider":"xb-assistant-provider"}">${de(t).map(({label:s,options:a})=>`<optgroup label="${p(s)}">${a.map(n=>`<option value="${p(n.value)}">${p(n.label)}</option>`).join("")}</optgroup>`).join("")}</select>
    </label>`}function C(e="main"){const t=e==="delegate"?"xb-assistant-delegate":"xb-assistant";return`<label id="${t}-model-list-auth-wrap" style="display: none">
        <span>模型列表鉴权</span>
        <select id="${t}-model-list-auth"></select>
    </label>`}function j(e="main"){const t=e==="delegate"?"xb-assistant-delegate":"xb-assistant";return`<label>
        <span>Base URL</span>
        <input id="${t}-base-url" type="text" aria-describedby="${t}-base-url-hint" />
        <small id="${t}-base-url-hint" hidden>填写服务地址，不要在末尾加 /v1；系统默认使用 /v1beta。</small>
    </label>`}function g(e){return`<svg viewBox="0 0 24 24" aria-hidden="true">${{add:'<path d="M12 5v14" /><path d="M5 12h14" />',rename:'<path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />',save:'<path d="M5 21h14a1 1 0 0 0 1-1V7.5L16.5 4H5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1Z" /><path d="M8 21v-7h8v7" /><path d="M8 4v5h7" />',saving:'<path class="xb-assistant-save-spinner" d="M12 3a9 9 0 1 1-8.2 5.3" />',success:'<path d="M20 6 9 17l-5-5" />',error:'<path d="M18 6 6 18" /><path d="M6 6l12 12" />',delete:'<path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />'}[e]||""}</svg>`}function ce({isBusy:e,saveButton:t,saveIcon:s,saveDisabled:a}){return`<div class="xb-assistant-preset-row is-list">
                <div class="preset-list-header">
                    <div class="preset-list-title">
                        <button id="xb-assistant-preset-collapse" type="button" class="preset-list-toggle" title="折叠 / 展开" aria-label="折叠预设列表" aria-expanded="true" aria-controls="xb-assistant-preset-list"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
                        <span class="xb-assistant-preset-title" id="xb-assistant-preset-title">已存预设</span>
                    </div>
                    <input id="xb-assistant-preset-name" type="hidden" />
                    <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                        <button id="xb-assistant-new-preset" type="button" class="xb-assistant-text-button" title="新增预设" aria-label="新增预设" ${e?"disabled":""}>${g("add")}<span>新建</span></button>
                        <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${t.className}" title="${t.title}" aria-label="${t.title}" ${a}>${g(s)}</button>
                    </div>
                </div>
                <div id="xb-assistant-preset-list" class="preset-list" role="list" aria-labelledby="xb-assistant-preset-title"></div>
            </div>`}function z(e={}){const t=String(e?.status||"idle");return t==="saving"?"saving":t==="success"?"success":t==="error"?"error":"save"}function G(e={}){const t=String(e?.status||"idle");return t==="saving"?{className:"xb-assistant-save-button is-saving",title:"正在保存配置"}:t==="success"?{className:"xb-assistant-save-button is-success",title:"配置已保存"}:t==="error"?{className:"xb-assistant-save-button is-error",title:p(e?.error||"保存失败")}:{className:"xb-assistant-save-button",title:"保存配置"}}function be(e,t,{className:s="xb-assistant-icon-button",disabled:a=!1}={}){const n=G(t);e.className=`${s} ${n.className}`,e.title=n.title,e.setAttribute("aria-label",n.title),e.setAttribute("aria-busy",String(t?.status==="saving")),e.toggleAttribute("disabled",a||t?.status==="saving"),e.innerHTML=g(z(t))}function Pe(e,t={}){if(!e?.querySelector)return;const{configSave:s={},inlineToastText:a="",isBusy:n=!1,canDeletePreset:l=!0,configLoadError:i=""}=t,o=String(i||"").trim(),d=n||!!o||String(s?.status||"")==="saving";["#xb-assistant-save","#xb-assistant-delegate-save"].forEach(c=>{const b=e.querySelector(c);b&&be(b,s,{disabled:d})}),["#xb-assistant-preset-select","#xb-assistant-new-preset","#xb-assistant-rename-preset","#xb-assistant-pull-models","#xb-assistant-delegate-pull-models"].forEach(c=>{e.querySelector(c)?.toggleAttribute("disabled",n)}),e.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("disabled",n||!l);const r=e.querySelector("#xb-assistant-toast");r&&(r.textContent=o||String(a||"")),e.querySelector("[data-xb-agent-config-fields]")?.toggleAttribute("disabled",!!o)}function Me(e={}){const{configSave:t={},runtimeText:s="",inlineToastText:a="",showInlineToast:n=!0,showAssistantPermissions:l=!0,showImageInput:i=!1,showDelegateSettings:o=!0,showWebSettings:d=!0,activePage:r="main",delegatePresetHint:c="DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。",isBusy:b=!1,canDeletePreset:x=!0,configLoadError:H="",presetLayout:U="select"}=e,w=String(H||"").trim(),m=G(t),A=z(t),P=b||w||String(t?.status||"")==="saving"?"disabled":"",K=b||!x?"disabled":"",I=r==="delegate"?"delegate":"main",M=I==="main",q=I==="delegate",Y=l?`
            <label>
                <span>${p(le)}</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>`:"",T=Q=>i?`
            <label class="xb-assistant-checkbox-row">
                <span>${p(ie.label)}</span>
                <span class="xb-assistant-checkbox-control">
                    <input id="${Q==="delegate"?"xb-assistant-delegate-model-image-input":"xb-assistant-model-image-input"}" type="checkbox" />
                </span>
            </label>`:"",X=o?`
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${M?"is-active":""}" data-config-page="main" role="tab" aria-selected="${M?"true":"false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${q?"is-active":""}" data-config-page="delegate" role="tab" aria-selected="${q?"true":"false"}">分身 API</button>
            </div>`:"",J=o?`
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${q?"":"hidden"}>
                <p class="xb-assistant-config-note">${p(c)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${m.className}" title="${m.title}" aria-label="${m.title}" ${P}>${g(A)}</button>
                    </div>
                </div>
                ${N("delegate",e.directProviderLabel)}
                ${j("delegate")}
                <label>
                    <span>API Key</span>
                    <div class="xb-assistant-inline-input">
                        <input id="xb-assistant-delegate-api-key" type="password" />
                        <button id="xb-assistant-delegate-toggle-key" type="button" class="secondary ghost">显示</button>
                    </div>
                </label>
                <label>
                    <span>Model</span>
                    <input id="xb-assistant-delegate-model" type="text" />
                </label>
                ${R("delegate")}
                ${C("delegate")}
                <div class="xb-assistant-inline-input xb-assistant-model-row">
                    <label class="xb-assistant-grow">
                        <span>已拉取模型</span>
                        <select id="xb-assistant-delegate-model-pulled">
                            <option value="">手动填写</option>
                        </select>
                    </label>
                    <button id="xb-assistant-delegate-pull-models" type="button" class="secondary" ${b?"disabled":""}>拉取模型</button>
                </div>
                <div class="xb-assistant-inline-status" id="xb-assistant-delegate-model-pull-status" aria-live="polite" hidden></div>
                <label>
                    <span>最大输出 Token</span>
                    <input id="xb-assistant-delegate-max-tokens" type="number" min="1" step="1" inputmode="numeric" />
                </label>
                ${O("delegate")}
                <label id="xb-assistant-delegate-tool-mode-wrap">
                    <span>Tool 调用格式</span>
                    <select id="xb-assistant-delegate-tool-mode"></select>
                </label>
                ${T("delegate")}
                <label>
                    <span>Reasoning 模式</span>
                    <select id="xb-assistant-delegate-reasoning-mode"></select>
                    <small id="xb-assistant-delegate-reasoning-capability"></small>
                </label>
                <label id="xb-assistant-delegate-reasoning-effort-wrap">
                    <span>思考强度</span>
                    <select id="xb-assistant-delegate-reasoning-effort"></select>
                </label>
                <label id="xb-assistant-delegate-reasoning-budget-wrap">
                    <span>思考 Token 预算</span>
                    <input id="xb-assistant-delegate-reasoning-budget" type="number" step="1" inputmode="numeric" />
                    <small>支持 -1 时表示由模型自动决定</small>
                </label>
            </div>`:"",Z=U==="list"?ce({isBusy:b,saveButton:m,saveIcon:A,saveDisabled:P}):`<div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${b?"disabled":""}>${g("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${b?"disabled":""}>${g("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${m.className}" title="${m.title}" aria-label="${m.title}" ${P}>${g(A)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${K}>${g("delete")}</button>
                </div>
            </div>`;return`
        <section class="xb-assistant-config">
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${w?"disabled":""}>
            ${X}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${M?"":"hidden"}>
            ${Z}
            ${N("main",e.directProviderLabel)}
            ${j()}
            <label>
                <span>API Key</span>
                <div class="xb-assistant-inline-input">
                    <input id="xb-assistant-api-key" type="password" />
                    <button id="xb-assistant-toggle-key" type="button" class="secondary ghost">显示</button>
                </div>
            </label>
            <label>
                <span>Model</span>
                <input id="xb-assistant-model" type="text" />
            </label>
            ${R()}
            ${C()}
            <div class="xb-assistant-inline-input xb-assistant-model-row">
                <label class="xb-assistant-grow">
                    <span>已拉取模型</span>
                    <select id="xb-assistant-model-pulled">
                        <option value="">手动填写</option>
                    </select>
                </label>
                <button id="xb-assistant-pull-models" type="button" class="secondary" ${b?"disabled":""}>拉取模型</button>
            </div>
            <div class="xb-assistant-inline-status" id="xb-assistant-model-pull-status" aria-live="polite" hidden></div>
            <label>
                <span>最大输出 Token</span>
                <input id="xb-assistant-max-tokens" type="number" min="1" step="1" inputmode="numeric" />
            </label>
            ${O("main")}
            ${d?re():""}
            <label id="xb-assistant-tool-mode-wrap">
                <span>Tool 调用格式</span>
                <select id="xb-assistant-tool-mode"></select>
            </label>
            ${T("main")}
            ${Y}
            <label>
                <span>Reasoning 模式</span>
                <select id="xb-assistant-reasoning-mode"></select>
                <small id="xb-assistant-reasoning-capability"></small>
            </label>
            <label id="xb-assistant-reasoning-effort-wrap">
                <span>思考强度</span>
                <select id="xb-assistant-reasoning-effort"></select>
            </label>
            <label id="xb-assistant-reasoning-budget-wrap">
                <span>思考 Token 预算</span>
                <input id="xb-assistant-reasoning-budget" type="number" step="1" inputmode="numeric" />
                <small>支持 -1 时表示由模型自动决定</small>
            </label>
            </div>
            ${J}
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${p(s)}</div>
            </fieldset>
            ${n?`<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${p(w||a)}</div>`:""}
        </section>
    `}export{ve as _,be as a,R as c,$e as d,ye as f,me as g,xe as h,Pe as i,Se as l,he as m,g as n,Ae as o,fe as p,de as r,we as s,Me as t,ke as u};
