import { MASCOT_COLORS, MASCOT_PARTS } from './design.js';

export function renderMascotSvg(view: 'portrait' | 'mark'): string {
    const viewBox = view === 'mark' ? '132 56 248 305' : '110 48 292 420';
    const ellipses = MASCOT_PARTS.map(part => {
        const x = 256 + part.center[0] * 360;
        const y = 300 - part.center[1] * 360;
        return `  <ellipse cx="${x}" cy="${y}" rx="${part.radius[0] * 360}" ry="${part.radius[1] * 360}" fill="${MASCOT_COLORS[part.color]}"/>`;
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title">
  <title id="title">小白</title>
${ellipses.join('\n')}
</svg>
`;
}
