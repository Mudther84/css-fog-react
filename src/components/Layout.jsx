import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HelpDialog from './HelpDialog';

/* Header + page + footer. Game pages pass helpKey to get the "How do I play?" modal. */
export default function Layout({ helpKey, minimal, accent = 'green', children }) {
  const navigate = useNavigate();

  /* every page / game has its own accent colour (before paint, so nothing flashes) */
  useLayoutEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);
  const [help, setHelp] = useState(false);

  /* first visit to a game: open the conversation automatically */
  useEffect(() => {
    if (!helpKey) return undefined;
    let seen = true;
    try {
      seen = !!localStorage.getItem('seen:' + helpKey);
      if (!seen) localStorage.setItem('seen:' + helpKey, '1');
    } catch {}
    if (seen) return undefined;
    const id = setTimeout(() => setHelp(true), 600);
    return () => clearTimeout(id);
  }, [helpKey]);

  const onNav = (section) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else navigate('/', { state: { scroll: section } });
  };

  return (
    <>
      <Header minimal={minimal} onHelp={helpKey ? () => setHelp(true) : undefined} onNav={onNav} />
      <main>{children}</main>
      <Footer />
      {helpKey && <HelpDialog dkey={helpKey} open={help} onClose={() => setHelp(false)} />}
    </>
  );
}
