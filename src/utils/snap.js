/* Game engine: compares the computed style of "yours" vs "target" arenas. */
export const P = ['display','position','float','zIndex','boxSizing','color','backgroundColor','backgroundImage','backgroundSize','backgroundRepeat','backgroundPosition','fontFamily','fontSize','fontWeight','fontStyle','lineHeight','textAlign','textDecorationLine','textTransform','letterSpacing','wordSpacing','textIndent','textShadow','whiteSpace','textOverflow','wordBreak','overflowWrap','verticalAlign','direction','writingMode',
  'flexDirection','justifyContent','alignItems','alignSelf','alignContent','justifyItems','justifySelf','flexWrap','flexGrow','flexShrink','flexBasis','order','rowGap','columnGap',
  'gridTemplateColumns','gridTemplateRows','gridTemplateAreas','gridAutoFlow','gridColumnStart','gridColumnEnd','gridRowStart','gridRowEnd',
  'maxWidth','minWidth','maxHeight','minHeight','top','right','bottom','left','overflowX','overflowY','visibility','pointerEvents','opacity','filter','boxShadow','cursor','clipPath',
  'transitionProperty','transitionDuration','transitionTimingFunction','transitionDelay','transform','transformOrigin','translate','rotate','scale','perspective','backfaceVisibility',
  'animationName','animationDuration','animationTimingFunction','animationIterationCount','animationDelay','animationDirection','animationFillMode',
  'objectFit','objectPosition','aspectRatio','accentColor','caretColor','resize','userSelect','listStyleType','listStylePosition','borderCollapse','columnCount','columnRuleStyle','columnRuleWidth','columnRuleColor',
  'borderTopColor','borderRightColor','borderBottomColor','borderLeftColor','borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth',
  'borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius','outlineStyle','outlineWidth','outlineColor','outlineOffset'];
const PP = ['content','display','color','backgroundColor','fontSize','fontWeight','position','width','height'];
const MOVING = ['transform','translate','rotate','scale','opacity','filter'];

/* the editor body already lives inside #p, so "#p{a:b}" is the same as "a:b" */
export const flat = (s) => s.replace(/#p\s*\{([^{}]*)\}/g, (m, d) => d.trim().replace(/;?$/, ';'));
export const balanced = (v) => (v.match(/{/g) || []).length === (v.match(/}/g) || []).length;
export const pretty = (s) => s.replace(/\{/g, ' {\n  ').replace(/;(?!\s*\})/g, ';\n  ').replace(/\}/g, '\n}\n');
export const starter = (L) => L[8] || 'b {\n  \n}\n';

export function snap(root, L) {
  const r0 = root.getBoundingClientRect();
  const nr = L[7] === 'nr';
  const props = nr ? P.filter((p) => !MOVING.includes(p)) : P;
  return JSON.stringify(
    [root, ...root.querySelectorAll('*')].map((e) => {
      const r = e.getBoundingClientRect();
      const c = getComputedStyle(e);
      const geo = nr ? '' : c.display === 'none' ? '0,0,0,0' : [r.left - r0.left, r.top - r0.top, r.width, r.height].map(Math.round).join();
      let ps = '';
      if (!nr) {
        for (const q of ['::before', '::after', '::first-letter']) {
          const pc = getComputedStyle(e, q);
          ps += '|' + PP.map((p) => pc[p]).join(',');
        }
      }
      return geo + '|' + props.map((p) => c[p]).join('|') + ps;
    })
  );
}
