import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import GameHero from '../components/GameHero';
import useT from '../utils/useT';
import { SL } from '../data/selLevels';
import { themeOf } from '../utils/icons';
import { completeLevel } from '../store/progressSlice';

const TEXT = { ar: 4, fr: 5, en: 6 };

/* Game 2 — Selectors: type a selector that picks exactly the glowing elements. */
export default function SelectorsGame() {
  const { t, lang } = useT();
  const dispatch = useDispatch();
  const done = useSelector((s) => s.progress.sel);
  const [cur, setCur] = useState(() => Math.min(done.length ? Math.max(...done) + 1 : 0, SL.length - 1));
  const [value, setValue] = useState('');
  const [info, setInfo] = useState({ valid: true, extra: 0, miss: 0, solved: false });
  const scene = useRef(null);
  const L = SL[cur];

  const go = (n) => {
    setCur(n);
    setValue('');
  };

  useEffect(() => {
    const sc = scene.current;
    if (!sc) return;
    sc.querySelectorAll('*').forEach((e) => e.classList.remove('tg', 'good', 'bad'));
    const v = value.trim();
    const targets = new Set(sc.querySelectorAll(L[3]));
    let matched = new Set();
    let valid = true;
    if (v) {
      try {
        matched = new Set(sc.querySelectorAll(v));
      } catch {
        valid = false;
      }
    }
    targets.forEach((e) => e.classList.add(matched.has(e) ? 'good' : 'tg'));
    matched.forEach((e) => {
      if (!targets.has(e)) e.classList.add('bad');
    });
    const extra = [...matched].filter((e) => !targets.has(e)).length;
    const miss = [...targets].filter((e) => !matched.has(e)).length;
    const solved = valid && !!v && !extra && !miss;
    setInfo({ valid, extra, miss, solved });
    if (solved) dispatch(completeLevel('sel', cur));
  }, [value, cur, L, dispatch]);

  useEffect(() => {
    document.querySelector('#chips .act')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [cur]);

  const status = !info.valid
    ? t('selBad')
    : info.solved
    ? t('selOk')
    : value.trim() && (info.extra || info.miss)
    ? [info.extra ? `${info.extra} ${t('selExtra')}` : '', info.miss ? `${info.miss} ${t('selMiss')}` : ''].filter(Boolean).join(' · ')
    : t('selWait');

  return (
    <Layout helpKey="sel" accent="pink">
      <section className="view on">
        <GameHero icon="target" title="g2" desc="g2d" shape="target" />
        <div id="chips">
          {SL.map((_, i) => (
            <button key={i} aria-label={i + 1} className={`${i === cur ? 'act' : ''} ${done.includes(i) ? 'dn' : ''}`} onClick={() => go(i)}>
              {i + 1}
            </button>
          ))}
        </div>
        <div className="pn">
          <h2 id="ttl">
            {t('lvl')} {cur + 1}
            <span className="lvico"><Icon name={themeOf(cur)} /></span>
          </h2>
          <code id="nm">{L[1]}</code>
          <p id="task">{L[TEXT[lang]]}</p>
        </div>
        <div className="pn">
          <label htmlFor="sel" style={{ fontWeight: 700 }}>{t('selTask')}</label>
          <div className="selrow">
            <span>$</span>
            <input className="inp" id="sel" spellCheck="false" autoComplete="off" placeholder={t('selPh')} value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div className="bar">
            <span id="st" className={info.solved ? 'ok' : ''}>{status}</span>
            <button className="sec" id="rs" onClick={() => setValue('')}>{t('reset')}</button>
            <button className="sec" id="an" onClick={() => setValue(L[3])}>{t('answer')}</button>
            <button id="nx" onClick={() => go(Math.min(cur + 1, SL.length - 1))}>{t('next')}</button>
          </div>
        </div>
        <div className="pv">
          <div>
            <h3>{t('selScene')}</h3>
            <div className="scn" id="scn" key={`s${cur}`} ref={scene} dangerouslySetInnerHTML={{ __html: L[2] }} />
          </div>
          <div>
            <h3>{t('selSrc')}</h3>
            <pre className="src" id="src">{L[2]}</pre>
          </div>
        </div>
      </section>
    </Layout>
  );
}
