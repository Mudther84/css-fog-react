import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import useT from '../utils/useT';
import { LV as LV0 } from '../data/levels';
import GameHero from '../components/GameHero';
import { recolorLevels } from '../utils/recolor';
import { themeOf } from '../utils/icons';
import { balanced, flat, pretty, snap, starter } from '../utils/snap';
import { completeLevel } from '../store/progressSlice';

const LV = recolorLevels(LV0, 'purple');

const TEXT = { ar: 4, fr: 5, en: 6 };

/* Game 1 — CSS properties: make "yours" identical to the target. */
export default function CssGame() {
  const { t, lang } = useT();
  const dispatch = useDispatch();
  const done = useSelector((s) => s.progress.css);
  const [cur, setCur] = useState(() => Math.min(done.length ? Math.max(...done) + 1 : 0, LV.length - 1));
  const [code, setCode] = useState(() => starter(LV[cur]));
  const [ok, setOk] = useState(false);
  const pRef = useRef(null);
  const tRef = useRef(null);
  const lastCSS = useRef('');

  const L = LV[cur];
  const th = themeOf(cur);
  const v = flat(code);
  /* keep the previous style while the braces are unbalanced */
  if (balanced(v)) lastCSS.current = `#p{${v}}`;

  const go = (n) => {
    setCur(n);
    setCode(starter(LV[n]));
    setOk(false);
  };

  /* compare the two arenas 700ms after the last change */
  useEffect(() => {
    setOk(false);
    const id = setTimeout(() => {
      if (pRef.current && tRef.current && snap(pRef.current, L) === snap(tRef.current, L)) {
        setOk(true);
        dispatch(completeLevel('css', cur));
      }
    }, 700);
    return () => clearTimeout(id);
  }, [code, cur, L, dispatch]);

  useEffect(() => {
    document.querySelector('#chips .act')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [cur]);

  return (
    <Layout helpKey="css" accent="purple">
      <section className="view on">
        <GameHero icon="palette" title="g1" desc="g1d" shape="boxmodel" />
        <div id="chips">
          {LV.map((_, i) => (
            <button key={i} aria-label={i + 1} className={`${i === cur ? 'act' : ''} ${done.includes(i) ? 'dn' : ''}`} onClick={() => go(i)}>
              {i + 1}
            </button>
          ))}
        </div>
        <div className="pn">
          <h2 id="ttl">
            {t('lvl')} {cur + 1}
            <span className="lvico"><Icon name={th} /></span>
          </h2>
          <code id="nm">{L[1]}</code>
          <p id="task">{L[TEXT[lang]]}</p>
        </div>
        <div className="pn">
          <div className="ed"><span className="ln">#p {'{'}</span></div>
          <textarea id="ta" spellCheck="false" aria-label="CSS" value={code} onChange={(e) => setCode(e.target.value)} />
          <div className="ed"><span className="ln">{'}'}</span></div>
          <div className="bar">
            <span id="st" className={ok ? 'ok' : ''}>{ok ? t('ok') : t('wait')}</span>
            <button className="sec" id="rs" onClick={() => setCode(starter(L))}>{t('reset')}</button>
            <button className="sec" id="an" onClick={() => setCode(pretty(flat(L[3])))}>{t('answer')}</button>
            <button id="nx" onClick={() => go(Math.min(cur + 1, LV.length - 1))}>{t('next')}</button>
          </div>
        </div>
        <style id="ps">{lastCSS.current}</style>
        <style id="ts">{`#t{${flat(L[3])}}`}</style>
        <div className="pv">
          <div>
            <h3>{t('yours')}</h3>
            <div className="arena" id="p" key={`p${cur}`} ref={pRef} data-th={th} dangerouslySetInnerHTML={{ __html: L[2] }} />
          </div>
          <div>
            <h3>{t('target')}</h3>
            <div className="arena" id="t" key={`t${cur}`} ref={tRef} data-th={th} dangerouslySetInnerHTML={{ __html: L[2] }} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
