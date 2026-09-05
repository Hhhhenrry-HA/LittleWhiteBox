/* eslint-disable */
import { B as N, D as t2, E as r2, F as y, I as i2, N as V, R as o2, S as l2, T as s2, V as _, _ as O, b as n2, c as c2, d as $, f as R, g as I, h as d2, j as X, l as K, n as p2, p as u, s as u2, t as f2, u as i, w as d, x as h2, y as v2, z as H } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
import { n as m2, t as M } from "./xiaobai-os-frame-bridge-8-bd80In.js";
var g2 = [
  "agent-api",
  "fourth-wall",
  "messages",
  "wallet",
  "shop",
  "bank",
  "game",
  "map",
  "tasks"
], y2 = Object.freeze({
  id: "agent-api",
  name: "Agent API",
  accent: "#63d8c6"
}), w2 = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), b2 = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), x2 = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), k2 = Object.freeze({
  id: "map",
  name: "地图",
  accent: "#3aa9ff"
}), A2 = Object.freeze({
  id: "messages",
  name: "信息",
  accent: "#65ac91"
}), S2 = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), O2 = Object.freeze({
  id: "tasks",
  name: "任务",
  accent: "#d96840"
}), _2 = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
}), R2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23334968'/%3e%3cstop%20offset='1'%20stop-color='%23111c32'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paper'%20x1='30'%20y1='16'%20x2='60'%20y2='72'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23fffdf4'/%3e%3cstop%20offset='1'%20stop-color='%23f2e8d6'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3cpath%20d='M30%2015h31l10%2010v41a7%207%200%200%201-7%207H27a7%207%200%200%201-7-7V25a10%2010%200%200%201%2010-10Z'%20fill='%2313213b'%20opacity='.4'%20transform='translate(0%203)'/%3e%3crect%20x='22'%20y='18'%20width='44'%20height='51'%20rx='10'%20fill='url(%23paper)'%20filter='url(%23shadow)'/%3e%3cpath%20d='M33%2030v28m22-28v28M28%2036h32M28%2051h32'%20stroke='%23b6c9de'%20stroke-width='2'/%3e%3crect%20x='32'%20y='31'%20width='24'%20height='25'%20rx='7'%20fill='%23426ee8'/%3e%3cpath%20d='m42%2037-6%206%206%206m5-12%206%206-6%206'%20stroke='white'%20stroke-width='2.3'%20fill='none'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3ccircle%20cx='64'%20cy='66'%20r='11'%20fill='%238be3c2'%20stroke='%231c3048'%20stroke-width='3'/%3e%3cpath%20d='m60%2066%203%203%205-6'%20stroke='%23164d49'%20stroke-width='2'%20fill='none'%20stroke-linecap='round'/%3e%3c/svg%3e", "" + import.meta.url).href, G2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23ab9ced'/%3e%3cstop%20offset='1'%20stop-color='%236552b5'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paper'%20x1='30'%20y1='16'%20x2='60'%20y2='72'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23fffdf4'/%3e%3cstop%20offset='1'%20stop-color='%23f2e8d6'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3crect%20x='23'%20y='16'%20width='43'%20height='54'%20rx='15'%20fill='%23513f99'%20opacity='.45'%20transform='rotate(12%2044%2044)'/%3e%3cpath%20d='M26%2023h34a10%2010%200%200%201%2010%2010v16a10%2010%200%200%201-10%2010H46L34%2070l1-11h-9a10%2010%200%200%201-10-10V33a10%2010%200%200%201%2010-10Z'%20fill='url(%23paper)'%20filter='url(%23shadow)'/%3e%3cpath%20d='M34%2034v15m-4-15h8m-8%2015h8m6-15%205%2015%206-15'%20stroke='%238069c2'%20stroke-width='3'%20fill='none'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='m68%2017%202%206%206%202-6%202-2%206-2-6-6-2%206-2Z'%20fill='%23fbe4a9'/%3e%3c/svg%3e", "" + import.meta.url).href, P2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%234dad91'/%3e%3cstop%20offset='1'%20stop-color='%23176b62'/%3e%3c/linearGradient%3e%3clinearGradient%20id='leather'%20x1='20'%20y1='30'%20x2='65'%20y2='67'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23388d73'/%3e%3cstop%20offset='1'%20stop-color='%23216657'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3cg%20transform='rotate(-10%2044%2035)'%3e%3crect%20x='21'%20y='16'%20width='46'%20height='37'%20rx='6'%20fill='%23dfb46e'/%3e%3crect%20x='25'%20y='23'%20width='40'%20height='32'%20rx='5'%20fill='%23f9e8bc'/%3e%3cpath%20d='M29%2030h27'%20stroke='%23d2b578'%20stroke-width='4'/%3e%3c/g%3e%3crect%20x='16'%20y='33'%20width='56'%20height='37'%20rx='10'%20fill='%23104c48'%20filter='url(%23shadow)'/%3e%3crect%20x='16'%20y='31'%20width='56'%20height='36'%20rx='10'%20fill='url(%23leather)'/%3e%3crect%20x='20'%20y='35'%20width='48'%20height='28'%20rx='7'%20fill='none'%20stroke='%23b3e3cc'%20stroke-opacity='.48'%20stroke-dasharray='2%202'/%3e%3cpath%20d='M59%2043h15v16H59a8%208%200%200%201%200-16Z'%20fill='%23206d60'%20stroke='%2386bba1'%20stroke-width='1'/%3e%3ccircle%20cx='60'%20cy='51'%20r='3'%20fill='%23eed59c'/%3e%3c/svg%3e", "" + import.meta.url).href, I2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23f1b8a1'/%3e%3cstop%20offset='1'%20stop-color='%23d37469'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paper'%20x1='30'%20y1='16'%20x2='60'%20y2='72'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23fffdf4'/%3e%3cstop%20offset='1'%20stop-color='%23f2e8d6'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3cpath%20d='M23%2033h43l5%2034a5%205%200%200%201-5%205H22a5%205%200%200%201-5-5Z'%20fill='%2386483e'%20opacity='.3'/%3e%3cpath%20d='M24%2030h40l5%2034a5%205%200%200%201-5%206H24a5%205%200%200%201-5-6Z'%20fill='url(%23paper)'%20filter='url(%23shadow)'/%3e%3cpath%20d='M34%2033v-8a10%2010%200%200%201%2020%200v8'%20fill='none'%20stroke='%2398594c'%20stroke-width='4'%20stroke-linecap='round'/%3e%3cpath%20d='m44%2041%203.5%208%208.5%203.5-8.5%203.5-3.5%208-3.5-8-8.5-3.5%208.5-3.5Z'%20fill='%23c67560'/%3e%3cpath%20d='m69%2017%202%205%205%202-5%202-2%205-2-5-5-2%205-2Z'%20fill='%23fff1d3'/%3e%3c/svg%3e", "" + import.meta.url).href, U2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%233d807d'/%3e%3cstop%20offset='1'%20stop-color='%23143c45'/%3e%3c/linearGradient%3e%3clinearGradient%20id='metal'%20x1='17'%20y1='14'%20x2='68'%20y2='74'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23d9e6df'/%3e%3cstop%20offset='.5'%20stop-color='%239cb7b5'/%3e%3cstop%20offset='1'%20stop-color='%23789a9e'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3crect%20x='17'%20y='16'%20width='56'%20height='60'%20rx='13'%20fill='%23122e35'%20opacity='.4'/%3e%3crect%20x='17'%20y='14'%20width='54'%20height='60'%20rx='12'%20fill='url(%23metal)'%20filter='url(%23shadow)'/%3e%3crect%20x='23'%20y='20'%20width='42'%20height='47'%20rx='8'%20fill='%23284c55'%20stroke='%23abc6c7'%20stroke-width='2'/%3e%3ccircle%20cx='44'%20cy='44'%20r='16'%20fill='url(%23metal)'/%3e%3ccircle%20cx='44'%20cy='44'%20r='11'%20fill='%2340636a'/%3e%3cpath%20d='M44%2035v18m-9-9h18m-15-6%2012%2012m0-12L38%2050'%20stroke='%23cfe1da'%20stroke-width='2.6'%20stroke-linecap='round'/%3e%3ccircle%20cx='44'%20cy='44'%20r='4.5'%20fill='%23e8c98b'/%3e%3cpath%20d='M22%2029v8m0%2014v8'%20stroke='%23f5f2dc'%20stroke-width='4'%20stroke-linecap='round'/%3e%3c/svg%3e", "" + import.meta.url).href, B2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23e7847d'/%3e%3cstop%20offset='1'%20stop-color='%23af344c'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paper'%20x1='30'%20y1='16'%20x2='60'%20y2='72'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23fffdf4'/%3e%3cstop%20offset='1'%20stop-color='%23f2e8d6'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3cg%20transform='rotate(17%2058%2034)'%3e%3crect%20x='37'%20y='14'%20width='35'%20height='37'%20rx='9'%20fill='%23792741'%20opacity='.4'%20transform='translate(0%203)'/%3e%3crect%20x='37'%20y='14'%20width='35'%20height='35'%20rx='9'%20fill='%23f6c9b5'/%3e%3cg%20fill='%23b24b5b'%3e%3ccircle%20cx='47'%20cy='24'%20r='3'/%3e%3ccircle%20cx='62'%20cy='39'%20r='3'/%3e%3c/g%3e%3c/g%3e%3cg%20transform='rotate(-15%2036%2052)'%20filter='url(%23shadow)'%3e%3crect%20x='15'%20y='31'%20width='43'%20height='43'%20rx='11'%20fill='url(%23paper)'/%3e%3cg%20fill='%23ae3d53'%3e%3ccircle%20cx='27'%20cy='43'%20r='3.6'/%3e%3ccircle%20cx='46'%20cy='43'%20r='3.6'/%3e%3ccircle%20cx='36.5'%20cy='52.5'%20r='3.6'/%3e%3ccircle%20cx='27'%20cy='62'%20r='3.6'/%3e%3ccircle%20cx='46'%20cy='62'%20r='3.6'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e", "" + import.meta.url).href, E2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%239dccad'/%3e%3cstop%20offset='1'%20stop-color='%234d997d'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3cpath%20d='m14%2026%2020-6%2020%206%2020-7v48l-20%207-20-6-20%206Z'%20fill='%2324694d'%20opacity='.25'%20transform='translate(0%203)'/%3e%3cpath%20d='m14%2024%2020-6%2020%206%2020-7v48l-20%207-20-6-20%206Z'%20fill='%23f5edd4'%20filter='url(%23shadow)'/%3e%3cpath%20d='m34%2018%2020%206v48l-20-6Z'%20fill='%23d9e4bb'/%3e%3cpath%20d='m14%2054%2020-7%2020%206%2020-20'%20stroke='%2392bdce'%20stroke-width='7'%20fill='none'/%3e%3cpath%20d='m20%2032%2017%205%208%2024%2025-5'%20stroke='%23fffef0'%20stroke-width='4'%20fill='none'/%3e%3cpath%20d='M59%2017a12%2012%200%200%200-12%2012c0%2010%2012%2020%2012%2020s12-10%2012-20a12%2012%200%200%200-12-12Z'%20fill='%23e4774f'%20filter='url(%23shadow)'/%3e%3ccircle%20cx='59'%20cy='29'%20r='4.5'%20fill='%23fff5df'/%3e%3c/svg%3e", "" + import.meta.url).href, D2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2096%2096'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='16'%20y1='4'%20x2='80'%20y2='96'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23b1e7c9'/%3e%3cstop%20offset='.5'%20stop-color='%2363ad8b'/%3e%3cstop%20offset='1'%20stop-color='%23347459'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='30'%20y1='21'%20x2='65'%20y2='68'%3e%3cstop%20stop-color='%23fff'/%3e%3cstop%20offset='1'%20stop-color='%23e4f4eb'/%3e%3c/linearGradient%3e%3cfilter%20id='s'%20x='0'%20y='0'%20width='100%25'%20height='110%25'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='2.5'%20flood-color='%23173c2c'%20flood-opacity='.2'/%3e%3c/filter%3e%3c/defs%3e%3crect%20x='2'%20y='2'%20width='92'%20height='92'%20rx='23'%20fill='url(%23a)'/%3e%3crect%20x='3'%20y='3'%20width='90'%20height='90'%20rx='22'%20stroke='%23fff'%20stroke-opacity='.35'/%3e%3cpath%20d='M24%2062c-4-5-6-10-6-16%200-15%2013-27%2030-27s30%2012%2030%2027S65%2073%2048%2073c-5%200-9-1-13-3l-13%206%202-14Z'%20fill='url(%23b)'%20filter='url(%23s)'/%3e%3cg%20fill='%23559475'%3e%3ccircle%20cx='35'%20cy='46'%20r='3.5'/%3e%3ccircle%20cx='48'%20cy='46'%20r='3.5'/%3e%3ccircle%20cx='61'%20cy='46'%20r='3.5'/%3e%3c/g%3e%3c/svg%3e", "" + import.meta.url).href, M2 = new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='bg'%20x1='8'%20y1='0'%20x2='80'%20y2='88'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23f6ac72'/%3e%3cstop%20offset='1'%20stop-color='%23df673d'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paper'%20x1='30'%20y1='16'%20x2='60'%20y2='72'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23fffdf4'/%3e%3cstop%20offset='1'%20stop-color='%23f2e8d6'/%3e%3c/linearGradient%3e%3cfilter%20id='shadow'%20x='-35%25'%20y='-25%25'%20width='175%25'%20height='175%25'%20color-interpolation-filters='sRGB'%3e%3cfeDropShadow%20dx='0'%20dy='3'%20stdDeviation='3'%20flood-color='%232b1a1a'%20flood-opacity='.22'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='88'%20height='88'%20rx='22'%20fill='url(%23bg)'/%3e%3cpath%20d='M22%20.75h44A21.25%2021.25%200%200%201%2087.25%2022v44A21.25%2021.25%200%200%201%2066%2087.25H22A21.25%2021.25%200%200%201%20.75%2066V22A21.25%2021.25%200%200%201%2022%20.75Z'%20stroke='white'%20stroke-opacity='.25'%20stroke-width='1.5'/%3e%3crect%20x='20'%20y='17'%20width='47'%20height='58'%20rx='8'%20fill='%23a84c2d'%20opacity='.3'%20transform='rotate(9%2044%2044)'/%3e%3crect%20x='18'%20y='15'%20width='48'%20height='59'%20rx='8'%20fill='%23f5d7ac'%20transform='rotate(-9%2044%2044)'/%3e%3cpath%20d='M30%2013h23l12%2012v42a7%207%200%200%201-7%207H30a7%207%200%200%201-7-7V20a7%207%200%200%201%207-7Z'%20fill='url(%23paper)'%20filter='url(%23shadow)'/%3e%3cpath%20d='M53%2013v9a3%203%200%200%200%203%203h9'%20fill='%23ead4b8'/%3e%3cpath%20d='M33%2034h21M33%2042h16M33%2050h12'%20stroke='%23d4b49b'%20stroke-width='3'%20stroke-linecap='round'/%3e%3ccircle%20cx='59'%20cy='61'%20r='13'%20fill='%23d96940'%20stroke='%23f9d7a9'%20stroke-width='2'/%3e%3cpath%20d='m53%2061%204%204%208-9'%20stroke='%23fff4db'%20stroke-width='3'%20fill='none'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", "" + import.meta.url).href;
function $2(t) {
  let a = null, r = null;
  return Object.freeze({
    load() {
      return a ? Promise.resolve(a) : (r ??= t().then((o) => {
        if (!o?.default) throw new Error("app_component_missing");
        return a = o.default, a;
      }).catch((o) => {
        throw r = null, o;
      }), r);
    },
    reset() {
      a = null, r = null;
    }
  });
}
function w(t, a, r) {
  const o = $2(r);
  return Object.freeze({
    ...t,
    icon: a,
    load: o.load,
    resetLoader: o.reset
  });
}
var H2 = Object.freeze({
  "agent-api": w(y2, R2, () => import("./xiaobai-os-AgentApiApp-PrQoMoBx.js")),
  "fourth-wall": w(b2, G2, () => import("./xiaobai-os-FourthWallApp-BjG-n6ga.js")),
  wallet: w(_2, P2, () => import("./xiaobai-os-WalletApp-BRolXZ0l.js")),
  shop: w(S2, I2, () => import("./xiaobai-os-ShopApp-LiZZOxft.js")),
  bank: w(w2, U2, () => import("./xiaobai-os-BankApp-tFIcSCqc.js")),
  game: w(x2, B2, () => import("./xiaobai-os-GameApp-DcGXAonX.js")),
  map: w(k2, E2, () => import("./xiaobai-os-MapApp-dCQ_0XVB.js")),
  messages: w(A2, D2, () => import("./xiaobai-os-MessagesApp-DLN_ylul.js")),
  tasks: w(O2, M2, () => import("./xiaobai-os-TasksApp-IN-Plsde.js"))
}), q = Object.freeze(g2.map((t) => {
  const a = H2[t];
  if (!a) throw new Error(`missing_shell_app:${t}`);
  return a;
})), he = Object.freeze(q.map((t) => t.id)), C2 = /* @__PURE__ */ O({
  __name: "AppBoundary",
  emits: ["failed"],
  setup(t, { emit: a }) {
    const r = a;
    return h2((o) => (r("failed", o), !1)), (o, l) => r2(o.$slots, "default");
  }
}), L2 = C2, T2 = { class: "xiaobai-os-home" }, Z2 = ["src"], j2 = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, z2 = ["onClick"], F2 = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, V2 = ["src"], X2 = { class: "xiaobai-os-app-name" }, N2 = /* @__PURE__ */ O({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(t) {
    return (a, r) => (d(), u("main", T2, [
      t.characterAvatar ? (d(), u("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: t.characterAvatar,
        alt: ""
      }, null, 8, Z2)) : R("", !0),
      r[0] || (r[0] = i("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      i("section", j2, [(d(!0), u(c2, null, s2(t.apps, (o) => (d(), u("button", {
        key: o.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: N({ "--app-accent": o.accent }),
        onClick: (l) => a.$emit("openApp", o)
      }, [i("span", F2, [i("img", {
        src: o.icon,
        alt: "",
        width: "64",
        height: "64",
        draggable: "false"
      }, null, 8, V2)]), i("span", X2, _(o.name), 1)], 12, z2))), 128))])
    ]));
  }
}), K2 = N2, q2 = ["disabled"], W2 = {
  key: 0,
  "aria-hidden": "true"
}, J2 = /* @__PURE__ */ O({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(t) {
    return (a, r) => (d(), u("nav", {
      class: H(["xiaobai-os-navigation", { "is-home": t.isHome }]),
      "aria-label": "系统导航"
    }, [
      i("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: t.isHome,
        "aria-label": "返回",
        onClick: r[0] || (r[0] = (o) => a.$emit("back"))
      }, [...r[3] || (r[3] = [i("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [i("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, q2),
      i("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: r[1] || (r[1] = (o) => a.$emit("home"))
      }, [r[4] || (r[4] = i("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [i("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), t.isHome ? (d(), u("i", W2)) : R("", !0)]),
      i("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: r[2] || (r[2] = (o) => a.$emit("close"))
      }, [...r[5] || (r[5] = [i("span", null, [i("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [i("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), Q2 = J2, Y2 = /* @__PURE__ */ O({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(t) {
    return (a, r) => (d(), u("header", {
      class: H(["xiaobai-os-system-bar", { "is-home": t.isHome }]),
      "aria-label": "系统状态"
    }, [...r[0] || (r[0] = [i("span", { class: "xiaobai-os-system-mark" }, "小白", -1), i("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [i("span", { class: "xiaobai-os-signal" }, [
      i("i"),
      i("i"),
      i("i"),
      i("i")
    ]), i("span", { class: "xiaobai-os-battery" }, [i("i")])], -1)])], 2));
  }
}), ee = Y2, ae = { class: "xiaobai-os-device" }, te = { class: "xiaobai-os-glass" }, re = {
  key: "failure",
  class: "xiaobai-os-app-failure",
  role: "alert"
}, ie = { class: "xiaobai-os-app-failure-actions" }, oe = {
  key: "loading",
  class: "xiaobai-os-app-loading",
  role: "status"
}, le = /* @__PURE__ */ O({
  __name: "XiaobaiOsDevice",
  props: {
    apps: {},
    activeApp: {},
    activeComponent: {},
    activeState: {},
    appFailure: {},
    appLoading: { type: Boolean },
    appRenderKey: {},
    bridge: {},
    characterAvatar: {}
  },
  emits: [
    "openApp",
    "back",
    "home",
    "close",
    "renderFailed",
    "retry",
    "reload"
  ],
  setup(t) {
    const a = t, r = K(() => a.activeApp === null);
    return (o, l) => (d(), u("div", ae, [l[9] || (l[9] = i("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), i("div", te, [
      I(ee, { "is-home": r.value }, null, 8, ["is-home"]),
      i("div", {
        class: "xiaobai-os-stage",
        style: N(t.activeApp ? { "--app-accent": t.activeApp.accent } : null)
      }, [I(f2, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: X(() => [r.value ? (d(), $(K2, {
          key: "home",
          apps: t.apps,
          "character-avatar": t.characterAvatar,
          onOpenApp: l[0] || (l[0] = (m) => o.$emit("openApp", m))
        }, null, 8, ["apps", "character-avatar"])) : t.appFailure ? (d(), u("section", re, [
          l[7] || (l[7] = i("span", {
            class: "xiaobai-os-app-failure-mark",
            "aria-hidden": "true"
          }, "!", -1)),
          i("h1", null, _(t.activeApp?.name) + "暂时无法打开", 1),
          i("p", null, _(t.appFailure.message), 1),
          i("div", ie, [t.appFailure.retryable ? (d(), u("button", {
            key: 0,
            type: "button",
            onClick: l[1] || (l[1] = (m) => o.$emit("retry"))
          }, "重试")) : R("", !0), i("button", {
            type: "button",
            onClick: l[2] || (l[2] = (m) => o.$emit("reload"))
          }, "重新载入 OS")])
        ])) : t.appLoading ? (d(), u("div", oe, [l[8] || (l[8] = i("span", { "aria-hidden": "true" }, null, -1)), d2(" 正在打开" + _(t.activeApp?.name), 1)])) : t.activeApp && t.activeComponent ? (d(), u("div", {
          key: `app:${t.activeApp.id}:${t.appRenderKey}`,
          class: "xiaobai-os-app-route"
        }, [I(L2, { onFailed: l[3] || (l[3] = (m) => o.$emit("renderFailed", m)) }, {
          default: X(() => [(d(), $(t2(t.activeComponent), {
            bridge: t.bridge,
            "initial-state": t.activeState
          }, null, 8, ["bridge", "initial-state"]))]),
          _: 1
        })])) : R("", !0)]),
        _: 1
      })], 4),
      I(Q2, {
        "is-home": r.value,
        onBack: l[4] || (l[4] = (m) => o.$emit("back")),
        onHome: l[5] || (l[5] = (m) => o.$emit("home")),
        onClose: l[6] || (l[6] = (m) => o.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), se = le, ne = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, ce = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, de = /* @__PURE__ */ O({
  __name: "App",
  setup(t) {
    const a = m2(), r = y(null), o = y(!1), l = y("light"), m = y(/* @__PURE__ */ new Set()), C = y(""), p = y(null), x = i2(null), k = y(null), f = y(!1), n = y(null), L = y(0), G = y("");
    let T = null, Z = () => {
    }, A = 0, h = null;
    const W = K(() => q.filter((e) => m.value.has(e.id)));
    function j(e) {
      const s = new Set(e.map((b) => String(b.id))), c = p.value && !s.has(p.value.id), g = h && !s.has(h.appId);
      m.value = s, !(!c && !g) && (A += 1, h = null, p.value = null, x.value = null, k.value = null, f.value = !1, n.value = null, a.clearAppSession());
    }
    function J(e) {
      A += 1, h = null, l.value = e.theme === "dark" ? "dark" : "light", j(e.apps || []), C.value = String(e.chat?.characterAvatar || ""), p.value = null, x.value = null, k.value = null, f.value = !1, n.value = null, a.clearAppSession(), o.value = !0;
    }
    function Q(e) {
      if (e.type === "os/init" && J(e.payload || {}), e.type === "os/theme-changed" && (l.value = e.payload?.theme === "dark" ? "dark" : "light"), e.type === "os/apps-changed") {
        const g = e.payload;
        j(g?.apps || []);
      }
      if (e.type === "os/app-state") {
        const g = e.payload, b = g?.status;
        g?.appId === p.value?.id && b?.state === "failed" && (f.value = !1, n.value = {
          phase: b.failure?.phase || "host",
          message: b.failure?.message || "Host APP 运行失败",
          retryable: b.failure?.retryable !== !1,
          requiresAppRetry: !0
        }, a.clearAppSession());
      }
      e.type === "os/error" && (G.value = String(e.payload?.message || "小白 OS 初始化失败"));
      const s = e.payload?.state;
      h && e.appId === h.appId && e.type === `${h.appId}/state` && (h.latestState = s);
      const c = a.getAppSession();
      p.value && c?.appId === p.value.id && e.appId === c.appId && e.activationToken === c.activationToken && e.type === `${p.value.id}/state` && (k.value = s);
    }
    async function U(e) {
      const s = ++A, c = { appId: e.id };
      h = c, p.value = e, x.value = null, k.value = null, f.value = !0, n.value = null, a.clearAppSession(), G.value = "";
      const g = a.request("app/activate", { appId: e.id }), b = e.load(), [S, P] = await Promise.allSettled([g, b]);
      try {
        if (s !== A) return;
        if (S.status === "fulfilled") {
          if (S.value.appId !== e.id || !S.value.activationToken) throw new Error("app_activation_mismatch");
          a.setAppSession({
            appId: e.id,
            activationToken: S.value.activationToken
          }), k.value = c.latestState ?? S.value.state ?? null;
        } else {
          const v = S.reason;
          n.value = {
            phase: v instanceof M ? v.phase : "host",
            message: v instanceof Error ? v.message : String(v),
            retryable: !(v instanceof M) || v.retryable,
            requiresAppRetry: v instanceof M && v.requiresAppRetry
          };
        }
        P.status === "fulfilled" ? x.value = V(P.value) : n.value || (n.value = {
          phase: "ui-load",
          message: P.reason instanceof Error ? P.reason.message : "APP 界面加载失败",
          retryable: !0
        }), f.value = !1;
      } catch (v) {
        f.value = !1, n.value = {
          phase: "host",
          message: v instanceof Error ? v.message : String(v),
          retryable: !0
        }, a.clearAppSession();
      } finally {
        h === c && (h = null);
      }
    }
    async function Y() {
      const e = p.value, s = n.value;
      if (!(!e || !s)) {
        if (s.phase === "ui-render") {
          n.value = null, L.value += 1;
          return;
        }
        if (s.phase === "ui-load" && a.getAppSession()?.appId === e.id) {
          f.value = !0, n.value = null, e.resetLoader();
          try {
            x.value = V(await e.load());
          } catch (c) {
            n.value = {
              phase: "ui-load",
              message: c instanceof Error ? c.message : "APP 界面加载失败",
              retryable: !0
            };
          } finally {
            f.value = !1;
          }
          return;
        }
        if ((s.phase === "activate" || s.phase === "host") && !s.requiresAppRetry) {
          await U(e);
          return;
        }
        f.value = !0, n.value = null;
        try {
          await a.request("app/retry", { appId: e.id }), await U(e);
        } catch (c) {
          f.value = !1, n.value = {
            phase: "host",
            message: c instanceof Error ? c.message : String(c),
            retryable: !0
          };
        }
      }
    }
    function B(e) {
      const s = p.value;
      s && (n.value = {
        phase: "ui-render",
        message: e instanceof Error ? e.message : "APP 界面渲染失败",
        retryable: !0
      }, a.post("os/app-ui-failure", {
        appId: s.id,
        phase: "ui-render"
      }));
    }
    function z(e) {
      !p.value || f.value || n.value || (e.preventDefault(), B(e.error ?? new Error(e.message || "APP 界面运行失败")));
    }
    function F(e) {
      !p.value || f.value || n.value || (e.preventDefault(), B(e.reason));
    }
    function e2() {
      window.location.reload();
    }
    function E() {
      A += 1, h = null, a.post("app/deactivate", { appId: p.value?.id || "" }), a.clearAppSession(), p.value = null, x.value = null, k.value = null, f.value = !1, n.value = null;
    }
    function D() {
      A += 1, h = null, a.post("os/close"), a.clearAppSession();
    }
    function a2(e) {
      if (e.key === "Escape") {
        e.preventDefault(), p.value ? E() : D();
        return;
      }
      if (e.key !== "Tab" || !r.value) return;
      const s = Array.from(r.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (s.length === 0) return;
      const c = s[0], g = s[s.length - 1];
      e.shiftKey && document.activeElement === c ? (e.preventDefault(), g.focus()) : !e.shiftKey && document.activeElement === g && (e.preventDefault(), c.focus());
    }
    return l2(async () => {
      T = document.activeElement instanceof HTMLElement ? document.activeElement : null, Z = a.subscribe(Q), a.start(), window.addEventListener("error", z), window.addEventListener("unhandledrejection", F), await v2(), r.value?.focus();
    }), n2(() => {
      A += 1, h = null, window.removeEventListener("error", z), window.removeEventListener("unhandledrejection", F), Z(), a.dispose(), T?.focus();
    }), (e, s) => (d(), u("main", {
      ref_key: "root",
      ref: r,
      class: H(["xiaobai-os-shell", `theme-${l.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: a2,
      onClick: u2(D, ["self"])
    }, [G.value ? (d(), u("div", ne, _(G.value), 1)) : R("", !0), o.value ? (d(), $(se, {
      key: 2,
      apps: W.value,
      "active-app": p.value,
      "active-component": x.value,
      "active-state": k.value,
      "app-failure": n.value,
      "app-loading": f.value,
      "app-render-key": L.value,
      bridge: o2(a),
      "character-avatar": C.value,
      onOpenApp: U,
      onBack: E,
      onHome: E,
      onClose: D,
      onRenderFailed: B,
      onRetry: Y,
      onReload: e2
    }, null, 8, [
      "apps",
      "active-app",
      "active-component",
      "active-state",
      "app-failure",
      "app-loading",
      "app-render-key",
      "bridge",
      "character-avatar"
    ])) : (d(), u("div", ce, "正在启动小白 OS"))], 34));
  }
}), pe = de;
p2(pe).mount("#app");
