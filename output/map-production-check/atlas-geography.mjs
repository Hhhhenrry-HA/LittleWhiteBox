// Representative authored geography for visual acceptance; not model output or a user save.
const contour = points => ({ shape: 'curve', closed: true, points });
const area = (id, role, material, points, form, name) => ({ id, map: null, role, material, geometry: contour(points), ...(form ? { form } : {}), ...(name ? { name } : {}) });
export const atlasGeographyInput = {
    locations: [
        { key: 'coast', name: '银湾海岸', scale: 'region', position: { map: null, at: [660, 560] }, status: 'visited' },
        { key: 'highlands', name: '苍脊高地', scale: 'region', position: { map: null, at: [540, 230] } },
        { key: 'woodlands', name: '翡翠林海', scale: 'region', position: { map: null, at: [980, 420] } },
        { key: 'harbor', name: '银湾港', scale: 'city', parent: 'coast', position: { map: null, at: [710, 620] }, status: 'visited' },
        { key: 'oldtown', name: '旧城钟楼', scale: 'building', parent: 'coast', position: { map: null, at: [630, 590] } },
        { key: 'rivergate', name: '河口驿站', scale: 'building', parent: 'coast', position: { map: null, at: [800, 540] } },
        { key: 'lighthouse', name: '白岬灯塔', scale: 'building', parent: 'coast', position: { map: null, at: [440, 720] } },
    ],
    actors: [{ actorKey: 'player', locationKey: 'harbor' }],
    maps: [
        { map: 'coast', mapping: { map: null, scale: 1, offset: [0, 0] }, boundary: 'coast-boundary' },
        { map: 'highlands', mapping: { map: null, scale: 1, offset: [0, 0] }, boundary: 'highlands-boundary' },
        { map: 'woodlands', mapping: { map: null, scale: 1, offset: [0, 0] }, boundary: 'woodlands-boundary' },
    ],
    features: [
        { id: 'sea', map: null, role: 'environment', material: 'water', geometry: { shape: 'rect', x: -300, y: -200, width: 2100, height: 1500 } },
        area('mainland', 'surface', 'grass', [[-180, 40], [140, -130], [620, -60], [1020, 90], [1300, 50], [1610, 220], [1510, 480], [1300, 540], [1180, 740], [930, 710], [830, 820], [630, 760], [500, 830], [410, 720], [210, 740], [160, 600], [-90, 540], [-180, 280]]),
        area('island', 'surface', 'sand', [[1080, 920], [1190, 870], [1270, 910], [1300, 1030], [1180, 1090], [1110, 1030]]),
        area('western-woods', 'cover', 'forest', [[-120, 180], [150, 120], [370, 280], [410, 420], [280, 490], [150, 620], [-60, 490]], 'forest'),
        area('emerald-woods', 'cover', 'forest', [[850, 180], [1060, 210], [1210, 150], [1460, 310], [1310, 470], [1140, 500], [1100, 620], [900, 560], [780, 380]], 'forest'),
        area('silver-range', 'relief', 'rock', [[140, -30], [330, 10], [490, 120], [700, 160], [880, 260], [800, 340], [610, 250], [450, 220], [270, 110], [160, 80]], 'ridge', '苍 脊 山 脉'),
        area('foothills', 'relief', 'grass', [[350, 260], [480, 230], [660, 290], [780, 370], [750, 450], [590, 390], [430, 400]], 'ridge'),
        { id: 'river', map: null, role: 'channel', material: 'water', name: '银川', geometry: { shape: 'curve', points: [[720, 290], [700, 380], [780, 450], [820, 540], [800, 620], [880, 760]], width: 26 } },
        { id: 'tributary', map: null, role: 'channel', material: 'water', geometry: { shape: 'curve', points: [[490, 260], [520, 410], [650, 460], [700, 510], [820, 540]], width: 12 } },
        area('harbor-city', 'cover', 'stone', [[530, 540], [650, 500], [770, 540], [790, 650], [680, 710], [540, 660]], 'blocks'),
        area('city-garden', 'cover', 'forest', [[560, 545], [605, 535], [625, 575], [580, 595]], 'forest'),
        { id: 'coastal-road', map: null, role: 'channel', material: 'sand', geometry: { shape: 'curve', points: [[430, 700], [560, 635], [630, 590], [740, 575], [800, 540]], width: 7 } },
        ...[
            ['coast', 350, 400, 570, 450], ['highlands', 100, -50, 780, 460], ['woodlands', 810, 120, 740, 600],
        ].map(([map, x, y, width, height]) => ({ id: `${map}-boundary`, map, role: 'boundary', material: 'unknown', geometry: { shape: 'rect', x, y, width, height } })),
    ],
};
