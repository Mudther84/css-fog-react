import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Chat from '../components/Chat';
import Scene from '../components/Scene';
import useT from '../utils/useT';
import useReveal from '../utils/useReveal';
import { LV } from '../data/levels';
import { SL } from '../data/selLevels';
import { QZ } from '../data/quizData';

const TABS = [
  ['home', 'home'],
  ['css', 'g1'],
  ['sel', 'g2'],
  ['quiz', 'g3'],
];

export default function Home() {
  const { t } = useT();
  const location = useLocation();
  const progress = useSelector((s) => s.progress);
  const sceneRef = useRef(null);
  const worldRef = useRef(null);
  const chatWrap = useRef(null);
  const [tab, setTab] = useState('home');
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);

  useReveal();

  /* jump to a section when arriving from another page */
  useEffect(() => {
    const s = location.state && location.state.scroll;
    if (s) setTimeout(() => document.getElementById(s)?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, [location.state]);

  /* 3D hero: pointer parallax */
  useEffect(() => {
    const on = (e) => {
      const sc = sceneRef.current;
      const w = worldRef.current;
      if (!sc || !w) return;
      const r = sc.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      w.style.setProperty('--ry', 20 + x * 34 + 'deg');
      w.style.setProperty('--rx', -14 - y * 24 + 'deg');
    };
    document.addEventListener('pointermove', on);
    return () => document.removeEventListener('pointermove', on);
  }, []);

  /* start the conversation when it becomes visible */
  useEffect(() => {
    const io = new IntersectionObserver(
      (es, o) => {
        if (es[0].isIntersecting) {
          setVisible(true);
          o.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    if (chatWrap.current) io.observe(chatWrap.current);
    return () => io.disconnect();
  }, []);

  const tilt = (e) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--ry', (x - 0.5) * 18 + 'deg');
    c.style.setProperty('--rx', (0.5 - y) * 14 + 'deg');
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  const pct = (n, total) => (n / total) * 100 + '%';
  const cards = [
    { cls: 'c1', to: '/css', icon: 'palette', name: 'g1', desc: 'g1d', label: 'progress', meta: `${progress.css.length}/${LV.length} ${t('lvls')}`, w: pct(progress.css.length, LV.length) },
    { cls: 'c2', to: '/selectors', icon: 'target', name: 'g2', desc: 'g2d', label: 'progress', meta: `${progress.sel.length}/${SL.length} ${t('lvls')}`, w: pct(progress.sel.length, SL.length) },
    { cls: 'c3', to: '/quiz', icon: 'bolt', name: 'g3', desc: 'g3d', label: 'bestS', meta: `${progress.quiz} · ${QZ.length} ${t('qs')}`, w: Math.min(100, (progress.quiz / (QZ.length * 170)) * 100) + '%' },
  ];

  return (
    <Layout accent="green">
      <div className="wrap">
        <section className="hero" id="top">
          <div>
            <span className="pill">
              <Icon name="sparkle" />
              <span>{t('heroTag')}</span>
            </span>
            <h1>{t('heroTitle')}</h1>
            <p className="lead">{t('heroSub')}</p>
            <div className="cta">
              <a className="p" href="#/" onClick={(e) => { e.preventDefault(); document.getElementById('games').scrollIntoView({ behavior: 'smooth' }); }}>{t('ctaPlay')}</a>
              <a className="g" href="#/" onClick={(e) => { e.preventDefault(); document.getElementById('how').scrollIntoView({ behavior: 'smooth' }); }}>{t('ctaHow')}</a>
            </div>
            <div className="stats">
              <div><b>{LV.length + SL.length + QZ.length}</b><span>{t('stat1')}</span></div>
              <div><b>3</b><span>{t('stat2')}</span></div>
              <div><b>3</b><span>{t('stat3')}</span></div>
            </div>
          </div>
          <div className="scene3d" ref={sceneRef} aria-hidden="true">
            <div className="world" ref={worldRef}>
              <div className="floor" />
              <div className="ring" />
              <div className="cube">
                <div className="face f1">flex</div>
                <div className="face f2">grid</div>
                <div className="face f3">{'{ }'}</div>
                <div className="face f4">:has()</div>
                <div className="face f5">@media</div>
                <div className="face f6">var()</div>
              </div>
              <div className="fl w1"><code><em>display</em>: grid;</code></div>
              <div className="fl w2"><code><em>gap</em>: 12px;</code></div>
              <div className="fl w3"><code>.card<em>:has</em>(.new)</code></div>
              <div className="fl w4"><code><em>clamp</em>(14px,4vw,22px)</code></div>
            </div>
          </div>
        </section>

        <section className="sec" id="games">
          <h2 className="st rv">{t('gamesTitle')}</h2>
          <p className="sub rv">{t('gamesSub')}</p>
          <div className="cards">
            {cards.map((c) => (
              <Link key={c.to} className={`gcard ${c.cls} rv`} to={c.to} onPointerMove={tilt} onPointerLeave={untilt}>
                <div className="gico"><Icon name={c.icon} /></div>
                <h3>{t(c.name)}</h3>
                <p>{t(c.desc)}</p>
                <div className="meta"><span>{t(c.label)}</span><span>{c.meta}</span></div>
                <div className="pg"><i style={{ width: c.w }} /></div>
                <span className="gbtn">{t('play')}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sec" id="how">
          <div className="how">
            <Scene className="stage rv" />
            <div className="rv">
              <h2 className="st">{t('howTitle')}</h2>
              <p className="sub" style={{ marginBottom: 16 }}>{t('howSub')}</p>
              <div className="tabs" id="tabs">
                {TABS.map(([k, label]) => (
                  <button key={k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); setRun((r) => r + 1); }}>{t(label)}</button>
                ))}
              </div>
              <div className="chatbox" ref={chatWrap}>
                <Chat dkey={tab} active={visible} run={run} id="chat" />
                <button className="sec rp" onClick={() => setRun((r) => r + 1)}>{t('replay')}</button>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="feats">
            {[['flask', 'f1t', 'f1d'], ['save', 'f2t', 'f2d'], ['globe', 'f3t', 'f3d']].map(([i, a, b]) => (
              <div className="feat rv" key={a}>
                <div className="i"><Icon name={i} /></div>
                <h3>{t(a)}</h3>
                <p>{t(b)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
