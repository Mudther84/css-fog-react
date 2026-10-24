import React, { useEffect, useRef, useState } from 'react';
import { D } from '../data/dialogs';
import useT from '../utils/useT';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const NAMES = { ar: { a: 'سارة', b: 'عمر' }, fr: { a: 'Sara', b: 'Omar' }, en: { a: 'Sara', b: 'Omar' } };
const IDX = { ar: 1, fr: 2, en: 3 };

function Avatar({ who }) {
  return (
    <svg className="av" viewBox="0 0 120 120" aria-label={who === 'a' ? 'Sara' : 'Omar'}>
      <use href={`#bust${who === 'a' ? 'A' : 'B'}`} />
    </svg>
  );
}

/* Conversation between Sara and Omar. Plays line by line with a typing indicator.
   Changing the language only re-renders the text (the playback is not restarted). */
export default function Chat({ dkey, active = true, run = 0, id }) {
  const { lang } = useT();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(null);
  const box = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    let dead = false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = D[dkey];
    setShown(0);
    setTyping(null);
    (async () => {
      for (let i = 0; i < lines.length; i++) {
        if (!reduce) {
          setTyping(lines[i][0]);
          await wait(800);
          if (dead) return;
          setTyping(null);
        }
        setShown(i + 1);
        if (!reduce) await wait(350);
        if (dead) return;
      }
    })();
    return () => {
      dead = true;
    };
  }, [dkey, active, run]);

  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [shown, typing]);

  return (
    <div className="chat" id={id} ref={box}>
      {D[dkey].slice(0, shown).map((l) => (
        <div className={`row ${l[0]}`} key={l[1]}>
          <Avatar who={l[0]} />
          <div className="bub">
            <small>{NAMES[lang][l[0]]}</small>
            <span>{l[IDX[lang]]}</span>
          </div>
        </div>
      ))}
      {typing && (
        <div className={`row ${typing}`}>
          <Avatar who={typing} />
          <div className="bub dots">
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
    </div>
  );
}
