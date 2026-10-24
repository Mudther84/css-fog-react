/* Original SVG icon set (24x24, drawn for this project).
   - UI icons: stroke icons that follow currentColor.
   - THEMES: 16 "game characters" used both as outline icons and, in filled form,
     as the item picture inside the property-game arenas (var(--ic)). */
export const THEME_PATHS={
frog:["M5 14a7 6 0 0 0 14 0c0-3-3-5-7-5s-7 2-7 5z","M5 8.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0z","M14 8.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0z","M9 15.5q3 2 6 0"],
rocket:["M12 2c3 2 5 6 5 10l-2 4H9l-2-4c0-4 2-8 5-10z","M10.2 9.5a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0z","M7 13l-3 4 3-1","M17 13l3 4-3-1","M10 18l2 4 2-4z"],
carrot:["M16 8c-2-2-5-2-7 0L3 21l13-6c2-2 2-5 0-7z","M16 8l2-4","M16 8l4-1","M16 8l3 3"],
star:["M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z"],
fish:["M3 12c3-5 9-6 13-3l5-3v12l-5-3c-4 3-10 2-13-3z","M7 11.3a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z"],
gem:["M6 3h12l4 6-10 12L2 9z","M2 9h20","M9 3l-3 6 6 12 6-12-3-6"],
key:["M4 8a4 4 0 1 0 8 0a4 4 0 1 0-8 0z","M11 11l9 9","M16 16l2-2","M18 18l2-2"],
heart:["M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"],
bolt:["M13 2L4 14h7l-1 8 10-13h-7z"],
flag:["M5 21V3","M5 4h12l-2 4 2 4H5"],
sun:["M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0z","M12 2v3","M12 19v3","M2 12h3","M19 12h3","M4.9 4.9l2.1 2.1","M17 17l2.1 2.1","M19.1 4.9L17 7","M7 17l-2.1 2.1"],
moon:["M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"],
bee:["M12 8c4 0 6 3 6 6s-2 6-6 6-6-3-6-6 2-6 6-6z","M7 13h10","M7.5 16.5h9","M9 8c-2-4-5-3-5-1s3 2 5 1","M15 8c2-4 5-3 5-1s-3 2-5 1"],
cat:["M4 4l4 3h8l4-3v10a8 8 0 0 1-16 0z","M8.2 13a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z","M14.2 13a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z","M10.5 16.5h3"],
crown:["M3 18L2 7l6 5 4-7 4 7 6-5-1 11z"],
tree:["M12 22v-5","M12 3l6 8h-3l5 6H4l5-6H6z"]
};
export const THEMES=Object.keys(THEME_PATHS);
export const UI_PATHS={
palette:["M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-3 1-2 3-2h2a3 3 0 0 0 3-3c0-4.5-4-8-9-8z","M7.5 11h.01","M10 7.5h.01","M14.5 7.5h.01"],
target:["M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0z","M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0z","M12 12h.01"],
flask:["M9 3h6","M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3","M7 15h10"],
save:["M5 3h11l4 4v14H5z","M8 3v6h8V3","M8 21v-7h8v7"],
globe:["M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0z","M3 12h18","M12 3c3 3 3 15 0 18","M12 3c-3 3-3 15 0 18"],
sparkle:["M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"],
check:["M5 12l5 5 9-10"],
cross:["M6 6l12 12","M18 6L6 18"],
clock:["M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0z","M12 7v5l3 2"],
trophy:["M8 4h8v6a4 4 0 0 1-8 0z","M8 6H4v2a4 4 0 0 0 4 4","M16 6h4v2a4 4 0 0 1-4 4","M12 14v4","M8 21h8"],
user:["M8 8a4 4 0 1 0 8 0a4 4 0 1 0-8 0z","M4 21a8 8 0 0 1 16 0"],
help:["M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0z","M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7","M12 17h.01"],
link:["M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1","M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"],
play:["M7 4l13 8-13 8z"]
};
export const ICON_PATHS=Object.assign({},THEME_PATHS,UI_PATHS);
export const svgOf=(n,extra='')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${extra}>${ICON_PATHS[n].map(d=>`<path d="${d}"/>`).join('')}</svg>`;
export const themeOf = (i) => THEMES[(i * 7) % THEMES.length];

/* <symbol> sprite with every icon: <svg><use href="#i-name"/></svg> */
export const spriteMarkup = () =>
  Object.keys(ICON_PATHS)
    .map((n) => `<symbol id="i-${n}" viewBox="0 0 24 24">${ICON_PATHS[n].map((d) => `<path d="${d}"/>`).join('')}</symbol>`)
    .join('');

/* filled version of every character for the arenas: .arena[data-th=frog]{--ic:url(...)} */
export const themesCSS = () =>
  THEMES.map(
    (n) =>
      `.arena[data-th="${n}"]{--ic:url("data:image/svg+xml,${encodeURIComponent(
        svgOf(n, 'fill="#fff" stroke="#052e16" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"')
      )}")}`
  ).join('\n');
