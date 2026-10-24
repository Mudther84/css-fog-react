import React from 'react';
import { SVGS } from '../data/svgs';

/* The illustration of the two front-end developers talking (original artwork). */
export default function Scene({ className = '' }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: SVGS.scene }} />;
}
