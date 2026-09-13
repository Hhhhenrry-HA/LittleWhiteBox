// Local, static assets only. URLs are emitted as separate files by Vite.
import tableUrl from './assets/kenney/table.glb?url&no-inline';
import chairUrl from './assets/kenney/chairRounded.glb?url&no-inline';
import bedUrl from './assets/kenney/bedSingle.glb?url&no-inline';
import shelfUrl from './assets/kenney/bookcaseOpenLow.glb?url&no-inline';
import treeUrl from './assets/kenney/tree_oak.glb?url&no-inline';
import rockUrl from './assets/kenney/stone_largeE.glb?url&no-inline';
import type { SceneAssetKind } from './scene3d-assets.js';

export const SCENE_ASSET_URLS: Record<SceneAssetKind, string> = { table: tableUrl, chair: chairUrl, bed: bedUrl, shelf: shelfUrl, tree: treeUrl, rock: rockUrl };
