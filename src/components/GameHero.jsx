import React from 'react';
import Icon from './Icon';
import Shape3D from './Shape3D';
import useT from '../utils/useT';

/* Banner at the top of every game: name, one line, and the game's own 3D shape. */
export default function GameHero({ icon, title, desc, shape }) {
  const { t } = useT();
  return (
    <div className="pn ghero">
      <div className="gt">
        <h1><span className="gi"><Icon name={icon} /></span>{t(title)}</h1>
        <p>{t(desc)}</p>
      </div>
      <Shape3D kind={shape} />
    </div>
  );
}
