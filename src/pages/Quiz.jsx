import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import GameHero from '../components/GameHero';
import useT from '../utils/useT';
import { QZ } from '../data/quizData';
import { saveBest } from '../store/progressSlice';

const TIME = 20000;
const IDX = { ar: 0, fr: 1, en: 2 };
const shuffle = (a) => {
  a = [...a];
  for (let k = a.length - 1; k > 0; k--) {
    const j = (Math.random() * (k + 1)) | 0;
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
};

/* Game 3 — speed quiz: 12 timed questions with a streak bonus. */
export default function Quiz() {
  const { t, lang } = useT();
  const dispatch = useDispatch();
  const best = useSelector((s) => s.progress.quiz);
  const [phase, setPhase] = useState('start'); // start | play | end
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [right, setRight] = useState(0);
  const [opts, setOpts] = useState([]);
  const [picked, setPicked] = useState(-1);
  const [locked, setLocked] = useState(false);
  const [verdict, setVerdict] = useState(null); // 'right' | 'wrong' | 'time'
  const [pct, setPct] = useState(1);
  const [newRec, setNewRec] = useState(false);
  const [run, setRun] = useState(0);
  const t0 = useRef(0);
  const timer = useRef(null);
  const stateRef = useRef({});
  stateRef.current = { streak, opts, i };

  const answer = useCallback((k) => {
    if (locked) return;
    clearInterval(timer.current);
    const { streak: st, opts: o, i: qi } = stateRef.current;
    setLocked(true);
    setPicked(k);
    const left = Math.max(0, 1 - (performance.now() - t0.current) / TIME);
    if (k >= 0 && o[k] === QZ[qi][3][0]) {
      setStreak(st + 1);
      setRight((r) => r + 1);
      setScore((s) => s + 100 + Math.min(st, 5) * 20 + Math.round(left * 50));
      setVerdict('right');
    } else {
      setStreak(0);
      setVerdict(k < 0 ? 'time' : 'wrong');
    }
  }, [locked]);
  const answerRef = useRef(answer);
  answerRef.current = answer;

  /* every new question: shuffle options and start the countdown */
  useEffect(() => {
    if (phase !== 'play') return undefined;
    setOpts(shuffle(QZ[i][3]));
    setPicked(-1);
    setLocked(false);
    setVerdict(null);
    setPct(1);
    t0.current = performance.now();
    timer.current = setInterval(() => {
      const left = 1 - (performance.now() - t0.current) / TIME;
      if (left <= 0) {
        setPct(0);
        answerRef.current(-1);
      } else setPct(left);
    }, 80);
    return () => clearInterval(timer.current);
  }, [phase, i, run]);

  const start = () => {
    setI(0);
    setScore(0);
    setStreak(0);
    setRight(0);
    setNewRec(false);
    setRun((r) => r + 1);
    setPhase('play');
  };
  const next = () => {
    if (i + 1 >= QZ.length) {
      clearInterval(timer.current);
      setNewRec(score > best);
      dispatch(saveBest(score));
      setPhase('end');
    } else setI(i + 1);
  };

  const stars = right >= QZ.length * 0.9 ? 3 : right >= QZ.length * 0.6 ? 2 : right >= QZ.length * 0.3 ? 1 : 0;
  const q = QZ[i];

  return (
    <Layout helpKey="quiz" accent="yellow">
      <section className="view on">
        <GameHero icon="flask" title="g3" desc="g3d" shape="armillary" />
        <div className="pn qhead">
          <span><b>{t('qNum')}</b><em id="qn">{phase === 'play' ? i + 1 : '–'}/{QZ.length}</em></span>
          <span><b>{t('qScore')}</b><em id="qs">{score}</em></span>
          <span><b>{t('qStreak')}</b><em id="qk">{streak}</em></span>
          <span><b>{t('qBest')}</b><em id="qb">{Math.max(best, phase === 'end' ? 0 : 0)}</em></span>
        </div>
        <div className="tbar"><i id="tb" style={{ width: (phase === 'play' ? pct : 1) * 100 + '%' }} /></div>
        <div className="pn" id="qbox">
          {phase === 'start' && (
            <div className="big-res">
              <div className="stars"><Icon name="bolt" /></div>
              <h2>{t('g3')}</h2>
              <p>{t('qIntro')}</p>
              <button id="go" onClick={start}>{t('qStart')}</button>
            </div>
          )}
          {phase === 'end' && (
            <div className="big-res">
              <h2>{t('qRes')}</h2>
              <div className="stars">{[0, 1, 2].map((k) => <Icon key={k} name="star" className={k < stars ? 'on' : ''} />)}</div>
              <div className="sc">{score}</div>
              <p>
                {right}/{QZ.length} {t('qRight2')}
                {newRec && score > 0 && (<> · <Icon name="trophy" /> {t('qNew')}</>)}
              </p>
              <button id="go" onClick={start}>{t('qAgain')}</button>
            </div>
          )}
          {phase === 'play' && (
            <>
              <div className="qq">{q[IDX[lang]]}</div>
              <div className="opts">
                {opts.map((o, k) => (
                  <button
                    key={o}
                    disabled={locked}
                    className={locked ? (o === q[3][0] ? 'right' : k === picked ? 'wrong' : '') : ''}
                    onClick={() => answer(k)}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <div className="fb">
                {verdict === 'right' && (<><Icon name="check" /> {t('qRight')}</>)}
                {verdict === 'wrong' && (<><Icon name="cross" /> {t('qWrong')}</>)}
                {verdict === 'time' && (<><Icon name="clock" /> {t('qTime')}</>)}
              </div>
              {locked && (
                <div className="bar">
                  <button id="nx" onClick={next}>{i + 1 < QZ.length ? t('next') : t('qFinish')}</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
