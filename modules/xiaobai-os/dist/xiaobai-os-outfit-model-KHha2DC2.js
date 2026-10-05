/* eslint-disable */
function e(o, s, a) {
  for (const t of a) {
    const c = o[t.shape](s, [...t.size], t.color, [...t.at]);
    c.rotation.z = t.tilt ?? 0;
  }
}
export {
  e as t
};
