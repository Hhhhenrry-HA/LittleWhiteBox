async (page) => {
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    await page.setViewportSize({width:1280,height:844});
    await page.goto('http://127.0.0.1:8765/output/map-production-check/dist/?scene=atlas-empty-places');
    await page.evaluate(() => {
        const map = window.mapCheck.fixture('empty');
        map.atlas.features = [{id:'nebula',frame:'atlas',role:'environment',material:'rune',form:'nebula',geometry:{shape:'rect',x:-512,y:-512,width:1024,height:1024}}];
        window.mapCheck.push(map);
    });
    await page.locator('.map-fit').click();
    await page.waitForTimeout(2500);
    const samples = await page.evaluate(async () => {
        const material = document.querySelector('[data-feature="nebula"] .map-atlas-material');
        const clone = material.cloneNode(true);
        for (const image of clone.querySelectorAll('image')) {
            const blob = await (await fetch(image.getAttribute('href'))).blob();
            const data = await new Promise(resolve => { const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob); });
            image.setAttribute('href', data);
        }
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns,'svg');
        svg.setAttribute('width','80'); svg.setAttribute('height','360'); svg.setAttribute('viewBox','-20 0 40 180');
        svg.append(clone);
        const render = async () => {
            const image = new Image(); image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg)); await image.decode();
            const canvas = new OffscreenCanvas(80,360),ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);return ctx.getImageData(0,0,80,360).data;
        };
        const images = [...clone.querySelectorAll('image')];
        const first = new Image(); first.src = images[0].getAttribute('href'); await first.decode();
        const unit = Number(images[0].getAttribute('width')) / first.naturalWidth;
        const sheet = document.createElement('canvas'); sheet.width = sheet.height = 1024/unit;
        const ctx = sheet.getContext('2d');
        for (const n of images) {
            const img = new Image(); img.src=n.getAttribute('href'); await img.decode();
            ctx.drawImage(img,1,1,img.naturalWidth-2,img.naturalHeight-2,(Number(n.getAttribute('x'))+512)/unit+1,(Number(n.getAttribute('y'))+512)/unit+1,img.naturalWidth-2,img.naturalHeight-2);
        }
        const reference = document.createElementNS(ns,'image');
        for (const [k,v] of Object.entries({x:-512,y:-512,width:1024,height:1024,href:sheet.toDataURL()})) reference.setAttribute(k,String(v));
        const result=[];
        for(const offset of [0,.35,.7]) {
            svg.setAttribute('viewBox',`${-20-offset} 0 40 180`); svg.replaceChildren(clone);
            const combined=await render(); svg.replaceChildren(reference); const single=await render();
            for(const y of [25,50,75,100,125,150]) for(const x of [39,40,41,42]) {
                const i=(y*2*80+x)*4+3;result.push({offset,x,y,expected:single[i],actual:combined[i]});
            }
        }
        return result;
    });
    check(samples.every(s=>Math.abs(s.expected-s.actual)<=1),'transparent tile seam changed alpha: '+JSON.stringify(samples));
    return { samples: samples.length, maxAlphaError: Math.max(...samples.map(s => Math.abs(s.expected - s.actual))) };
}
