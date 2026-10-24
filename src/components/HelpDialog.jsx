import React, { useEffect, useRef } from 'react';
import Chat from './Chat';
import Scene from './Scene';
import useT from '../utils/useT';

/* "How do I play?" modal — Sara and Omar explain the current game. */
export default function HelpDialog({ dkey, open, onClose }) {
  const { t } = useT();
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      id="dlg"
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="dhead">
        <b>{t('help')}</b>
        <button className="sec" id="dx" onClick={onClose}>
          {t('close')}
        </button>
      </div>
      <Scene className="stage-s" />
      <Chat dkey={dkey} active={open} id="dchat" />
    </dialog>
  );
}
