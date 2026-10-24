import { SHADES } from './accents';

/* The levels were written with green values (#16a34a, #14532d, hsl(140 …) …).
   Every game has its own colour, so the same values are re-written in that colour —
   in the HTML, the starter code, the solution and the instructions alike. */
const FROM = ['#14532d', '#16a34a', '#22c55e', '#4ade80', '#86efac', '#15803d', '#0f6'];
export function recolor(str, accent) {
  if (typeof str !== 'string' || accent === 'green') return str;
  const s = SHADES[accent];
  const TO = { '#14532d': s.dk, '#16a34a': s.acL, '#22c55e': s.ac, '#4ade80': s.ac3, '#86efac': s.ac2, '#15803d': s.ac2L, '#0f6': s.ac };
  return str
    .replace(new RegExp(FROM.join('|'), 'gi'), (m) => TO[m.toLowerCase()])
    .replace(/%23(86efac|15803d)/gi, (m, h) => '%23' + (h.toLowerCase() === '86efac' ? s.ac2 : s.ac2L).slice(1))
    .replace(/hsl\(140 /g, `hsl(${s.hue} `);
}
export const recolorLevels = (levels, accent) => levels.map((l) => l.map((x) => recolor(x, accent)));
