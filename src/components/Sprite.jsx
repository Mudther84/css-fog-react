import React from 'react';
import { SVGS } from '../data/svgs';
import { spriteMarkup } from '../utils/icons';

const html = spriteMarkup() + SVGS.bustA + SVGS.bustB + SVGS.logo;

/* Hidden SVG sprite: icons, the two developers (Sara / Omar) and the logo. */
export default function Sprite() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}
