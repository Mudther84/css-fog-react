import React, { useRef } from 'react';
import Icon from './Icon';
import useParallax from '../utils/useParallax';

const CHIPS = {
  pyramid: ['type="password"', 'autocomplete', ':focus-visible', 'required'],
  carousel: [':invalid', 'minlength: 6', 'placeholder', 'name="email"'],
  boxmodel: ['box-sizing', 'display: flex', 'gap: 12px', 'grid'],
  target: ['.card', '#hero', 'li:first-child', 'a[href^=https]'],
  armillary: ['clamp()', 'var(--x)', ':has()', 'transition'],
};

function Body({ kind }) {
  switch (kind) {
    case 'pyramid':
      return (
        <div className="sh pyr shape-spin">
          <div className="pf"><Icon name="key" /></div>
          <div className="pf"><Icon name="user" /></div>
          <div className="pf"><Icon name="check" /></div>
          <div className="pf"><Icon name="sparkle" /></div>
          <div className="pb" />
        </div>
      );
    case 'carousel':
      return (
        <div className="sh car shape-spin">
          {['user', 'sparkle', 'check', 'save', 'globe', 'star'].map((n) => (
            <div className="cp" key={n}><Icon name={n} /></div>
          ))}
        </div>
      );
    case 'boxmodel':
      return (
        <div className="sh bm">
          <div className="ly l1">margin</div>
          <div className="ly l2">border</div>
          <div className="ly l3">padding</div>
          <div className="ly l4">css</div>
        </div>
      );
    case 'target':
      return (
        <div className="sh tg3">
          <div className="dc d1" />
          <div className="dc d2" />
          <div className="dc d3" />
          <div className="dc d4" />
          <div className="dart" />
        </div>
      );
    default:
      return (
        <div className="sh arm">
          <div className="rg r1" />
          <div className="rg r2" />
          <div className="rg r3" />
          <div className="core">?</div>
        </div>
      );
  }
}

/* A 3D shape that follows the pointer — one per page / game, like the Home cube. */
export default function Shape3D({ kind }) {
  const sc = useRef(null);
  const world = useRef(null);
  useParallax(sc, world);
  const c = CHIPS[kind];
  return (
    <div className="scene3d sm" ref={sc} aria-hidden="true">
      <div className="world small" ref={world}>
        <div className="floor" />
        <div className="ring" />
        <Body kind={kind} />
        {c.map((t, i) => (
          <div className={`fl w${i + 1}`} key={t}><code>{t}</code></div>
        ))}
      </div>
    </div>
  );
}
