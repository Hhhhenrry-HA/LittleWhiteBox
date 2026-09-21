// Filled contours give each vein a changing width and a tapered end.
const DICE_FRACTURE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 320" preserveAspectRatio="none" fill="white">
    <path opacity="0.8" d="M336 15L352.08 26.84L363.18 27.76L378.38 46.53L389.21 48.72L398.52 61.4L412.96 67.99L418.26 80.7L437.57 90.43L445.87 107.25L455.32 111.68L469.99 130.8L489.34 139.57L498.62 154.35L514.25 163.76L522.79 179.87L519.33 193.89L533.49 211.76L536.18 228.91L549 242L549 242L535.82 229.09L532.51 212.24L518.67 194.11L521.21 180.13L513.75 164.24L497.38 155.65L488.66 140.43L468.01 133.2L454.68 112.32L444.13 108.75L436.43 91.57L417.74 81.3L411.04 70.01L397.48 62.6L388.79 49.28L377.62 47.47L362.82 28.24L351.92 27.16L336 15Z"/>
    <path opacity="0.7" d="M22 94L34.16 101.88L39.24 115.82L49.73 121.57L52.9 137.37L68.18 148.76L83.7 160.73L80.3 176.95L84.44 188.93L82.47 194.72L97.85 210.38L107.24 228.79L125.65 242.45L128.26 253.77L145.42 265.58L154.12 279.87L174 292L174 292L153.88 280.13L144.58 266.42L127.74 254.23L124.35 243.55L106.76 229.21L96.15 211.62L81.53 195.28L83.56 189.07L77.7 177.05L82.3 161.27L67.82 149.24L51.1 138.63L48.27 122.43L38.76 116.18L33.84 102.12L22 94Z"/>
    <path opacity="0.5" d="M411.66 68.28L426.81 61.76L430.78 53.55L448.9 50.83L460.8 35.65L479.91 32.82L489 22L489 22L480.09 33.18L461.2 36.35L449.1 51.17L431.22 54.45L427.19 62.24L412.34 69.72Z"/>
    <path opacity="0.45" d="M468.3 132.07L466.76 110.94L476.52 96.85L475.82 82.91L492.67 66.78L501 46L501 46L493.33 67.22L476.18 83.09L477.48 97.15L467.24 111.06L469.7 131.93Z"/>
    <path opacity="0.4" d="M521.48 179.71L530.66 163.91L529.81 149.93L541.61 134.89L538.81 117.93L553 105L553 105L539.19 118.07L542.39 135.11L530.19 150.07L531.34 164.09L522.52 180.29Z"/>
    <path opacity="0.45" d="M437.47 91.51L424.24 103.07L429.36 117.73L439.17 122.9L445.33 144.77L461.15 153.87L470 173L470 173L460.85 154.13L444.67 145.23L438.83 123.1L428.64 118.27L423.76 102.93L436.53 90.49Z"/>
    <path opacity="0.32" d="M489.28 140.28L478.15 151.04L481.3 173.03L474.15 186L481 204L481 204L473.85 186L480.7 172.97L477.85 150.96L488.72 139.72Z"/>
    <path opacity="0.55" d="M51.78 137.39L70.85 130.74L77.89 122.51L96.93 124.81L113.75 109.79L115.9 101.89L136 90L136 90L116.1 102.11L114.25 110.21L97.07 125.19L78.11 123.49L71.15 131.26L52.22 138.61Z"/>
    <path opacity="0.4" d="M82.87 160.57L99.04 155.8L111.21 165.6L128.16 170.81L142.48 192.86L139.19 210.06L125.37 243.16L124.63 242.84L138.81 209.94L141.52 193.14L127.84 171.19L110.79 166.4L98.96 156.2L83.13 161.43Z"/>
    <path opacity="0.45" d="M97.14 211.68L78.16 215.26L71.28 227.42L54.1 231.18L42.16 243.29L21 249L21 249L41.84 242.71L53.9 230.82L70.72 226.58L77.84 214.74L96.86 210.32Z"/>
    <path opacity="0.35" d="M127.81 253.65L144.96 244.8L159.91 247.72L174.94 234.86L194 232L194 232L175.06 235.14L160.09 248.28L145.04 245.2L128.19 254.35Z"/>
    <path opacity="0.3" d="M77.66 122.9L82.8 105.99L78.75 95.96L88 77L88 77L79.25 96.04L83.2 106.01L78.34 123.1Z"/>
    <path opacity="0.3" d="M110.8 165.85L122.9 149.86L136.88 147.84L150 130L150 130L137.12 148.16L123.1 150.14L111.2 166.15Z"/>
    <path opacity="0.3" d="M445.13 145.32L425.1 153.11L422.16 165.16L403 174L403 174L421.84 164.84L424.9 152.89L444.87 144.68Z"/>
    <path opacity="0.26" d="M460.8 36.22L447.94 24.14L434.96 25.09L423 13L423 13L435.04 24.91L448.06 23.86L461.2 35.78Z"/>
    <path opacity="0.28" d="M477.04 96.68L492.09 98.88L498.15 112.87L509 119L509 119L497.85 113.13L491.91 99.12L476.96 97.32Z"/>
</svg>`;

const DICE_FRACTURE_MASK = `url("data:image/svg+xml,${encodeURIComponent(DICE_FRACTURE_SVG)}")`;

export const DICE_CARD_CSS = `
.xb-dice-card {
    --xb-dice-tone: #718494;
    display: block; position: relative; box-sizing: border-box; max-width: 34em;
    margin: .9em 0; padding: .85em 1em; border-radius: 14px;
    border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
    background: color-mix(in srgb, currentColor 3%, transparent);
    color: inherit; font: inherit; line-height: 1.45; overflow-wrap: anywhere; text-shadow: none;
    isolation: isolate;
}
.xb-dice-card[data-dice-record]::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
    background: currentColor; opacity: .18; z-index: -1;
    mask: ${DICE_FRACTURE_MASK} center / 100% 100% no-repeat;
}
.xb-dice-card[data-outcome="success"] { --xb-dice-tone: #1c9b91; }
.xb-dice-card[data-outcome="failure"] { --xb-dice-tone: #d47757; }
.xb-dice-card[data-outcome="critical_success"] { --xb-dice-tone: #c59730; }
.xb-dice-card[data-outcome="critical_failure"] { --xb-dice-tone: #c85070; }
.xb-dice-card [hidden] { display: none !important; }
.xb-dice-card .xb-dice-hero { display: grid; grid-template-columns: 6.4em minmax(0, 1fr); align-items: center; gap: .9em; min-height: 6.8em; }
.xb-dice-card .xb-dice-die { display: flex; flex-direction: column; align-items: center; width: 6.4em; grid-area: 1 / 1; }
.xb-dice-card .xb-dice-solid { display: block; width: 6.4em; height: 6.4em; overflow: visible; }
.xb-dice-card .xb-dice-system { font: 650 .62em/1 ui-sans-serif, system-ui, sans-serif; letter-spacing: .14em; opacity: .6; }
.xb-dice-card .xb-dice-verdict { display: grid; gap: .35em; min-width: 0; }
.xb-dice-card .xb-dice-outcome { font-size: 1.6em; font-weight: 750; letter-spacing: .06em; color: color-mix(in srgb, var(--xb-dice-tone) 72%, currentColor); }
.xb-dice-card .xb-dice-comparison { display: flex; flex-wrap: wrap; align-items: baseline; gap: .15em .85em; font-size: .8em; }
.xb-dice-card .xb-dice-score { display: inline-flex; align-items: baseline; gap: .35em; white-space: nowrap; }
.xb-dice-card .xb-dice-score-label { opacity: .7; }
.xb-dice-card .xb-dice-score-value { font-size: 1.25em; font-weight: 650; font-variant-numeric: tabular-nums; }
.xb-dice-card .xb-dice-identity { display: block; margin-bottom: .45em; font-size: .85em; font-weight: 650; }
.xb-dice-card .xb-dice-copy { display: block; margin-top: .65em; padding-top: .7em; border-top: 1px solid color-mix(in srgb, currentColor 11%, transparent); }
.xb-dice-card .xb-dice-action { display: block; font-size: .92em; }
.xb-dice-card .xb-dice-stakes { display: block; margin: .45em 0 0; font-size: .8em; opacity: .7; }
.xb-dice-card .xb-dice-stakes-label { margin-right: .6em; font-weight: 650; }
.xb-dice-card details.xb-dice-stakes { padding: 0; border: 0; background: none; }
.xb-dice-card .xb-dice-stakes summary { cursor: pointer; min-height: 36px; display: list-item; align-content: center; width: fit-content; }
.xb-dice-card .xb-dice-stakes-text { white-space: pre-wrap; }
.xb-dice-card .xb-dice-status { display: flex; align-items: center; flex-wrap: wrap; gap: .6em; margin-top: .8em; padding-top: .7em; border-top: 1px dashed color-mix(in srgb, currentColor 24%, transparent); font-size: .8em; }
.xb-dice-card .xb-dice-note { display: block; flex-basis: 100%; }
.xb-dice-card button { color: inherit; background: transparent; border: 1px solid color-mix(in srgb, currentColor 22%, transparent); border-radius: 8px; padding: .45em .8em; min-height: 40px; font: inherit; cursor: pointer; box-shadow: none; }
.xb-dice-card button:hover { background: color-mix(in srgb, currentColor 7%, transparent); }
.xb-dice-card button:disabled { opacity: .5; cursor: wait; }
.xb-dice-card :is(button, summary):focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.xb-dice-card .xb-dice-rolling-label { grid-area: 1 / 2; font-size: .9em; }
.xb-dice-card[data-rule="coc7"] { container-type: inline-size; }
.xb-dice-card .xb-dice-coc7 { display: block; }
.xb-dice-card .xb-dice-coc7-heading { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: .35em .8em; }
.xb-dice-card .xb-dice-coc7-identity { font-size: .85em; font-weight: 650; }
.xb-dice-card .xb-dice-coc7-heading .xb-dice-system { font-size: .7em; letter-spacing: .04em; }
.xb-dice-card .xb-dice-coc7-hero { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); align-items: center; gap: .75em; max-width: 27em; margin: .4em 0 .7em; }
.xb-dice-card .xb-dice-percentile-dice { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: center; grid-area: 1 / 1; max-width: 13em; }
.xb-dice-card .xb-dice-percentile-die { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.xb-dice-card .xb-dice-d10 { display: block; width: 100%; height: auto; overflow: visible; }
.xb-dice-card .xb-dice-coc7-hero .xb-dice-verdict { grid-area: 1 / 2; gap: .5em; }
.xb-dice-card .xb-dice-coc7-hero .xb-dice-outcome { font-size: 1.55em; }
.xb-dice-card .xb-dice-coc7-comparison { display: flex; flex-wrap: wrap; align-items: flex-end; gap: .4em; }
.xb-dice-card .xb-dice-coc7-comparison .xb-dice-score { display: flex; flex-direction: column; align-items: flex-start; gap: .05em; }
.xb-dice-card .xb-dice-coc7-comparison .xb-dice-score-label { font-size: .65em; }
.xb-dice-card .xb-dice-coc7-comparison .xb-dice-score-value { font-size: 1.6em; font-weight: 750; line-height: 1.15; }
.xb-dice-card .xb-dice-operator { font-size: 1.15em; line-height: 1.6; opacity: .7; }
.xb-dice-card .xb-dice-coc7-detail { display: grid; gap: .25em; font-size: .78em; }
.xb-dice-card .xb-dice-coc7-basis { display: block; opacity: .8; }
.xb-dice-card .xb-dice-coc7-reason { display: block; }
.xb-dice-card .xb-dice-coc7-hundred { display: block; opacity: .7; }
@container (max-width: 14em) {
    .xb-dice-card .xb-dice-coc7-hero { grid-template-columns: minmax(0, 1fr); gap: .7em; }
    .xb-dice-card .xb-dice-percentile-dice { width: 100%; max-width: 10em; justify-self: center; }
    .xb-dice-card .xb-dice-coc7-hero :is(.xb-dice-verdict, .xb-dice-rolling-label) { grid-area: 2 / 1; }
    .xb-dice-card .xb-dice-coc7-hero .xb-dice-verdict { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; }
}
.xb-dice-notice { display: flex; flex-wrap: wrap; gap: .7em; font-size: .9em; }
.xb-dice-pending { display: flex; align-items: center; gap: .7em; font-size: .9em; }
.xb-dice-pending::before { content: ''; flex: none; width: 1em; height: 1em; border: 2px solid color-mix(in srgb, currentColor 20%, transparent); border-top-color: currentColor; border-radius: 50%; }
@media (prefers-reduced-motion: no-preference) {
    .xb-dice-pending::before { animation: xb-dice-pending-spin .9s linear infinite; }
    .xb-dice-card .xb-dice-die { transition: transform .28s ease-out; }
    .xb-dice-card[data-state="rolling"] .xb-dice-die { transform: scale(1.12); }
    .xb-dice-card[data-revealed="true"] :is(.xb-dice-verdict, .xb-dice-copy) { animation: xb-dice-unveil .28s ease-out both; }
}
@keyframes xb-dice-pending-spin { to { transform: rotate(360deg); } }
@keyframes xb-dice-unveil { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 400px) {
    .xb-dice-card { padding: .7em .75em; }
    .xb-dice-card .xb-dice-hero { grid-template-columns: 80px minmax(0, 1fr); gap: .6em; }
    .xb-dice-card .xb-dice-die, .xb-dice-card .xb-dice-solid { width: 80px; }
    .xb-dice-card .xb-dice-solid { height: 80px; }
    .xb-dice-card .xb-dice-outcome { font-size: 1.45em; }
}
@media (max-width: 350px) {
    .xb-dice-card .xb-dice-hero { grid-template-columns: 64px minmax(0, 1fr); }
    .xb-dice-card .xb-dice-die, .xb-dice-card .xb-dice-solid { width: 64px; }
    .xb-dice-card .xb-dice-solid { height: 64px; }
}
`;
