import React from 'react';

/* <Icon name="frog" /> — uses the sprite rendered by <Sprite /> */
export default function Icon({ name, className = '' }) {
  return (
    <svg className={`ic ${className}`.trim()} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
