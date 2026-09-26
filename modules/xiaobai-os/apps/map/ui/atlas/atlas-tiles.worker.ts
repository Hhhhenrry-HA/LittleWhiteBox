import { renderAtlasTileJob, type AtlasTileJob } from './tile-render.js';

self.onmessage = (event: MessageEvent<AtlasTileJob>) => { self.postMessage(renderAtlasTileJob(event.data)); };
