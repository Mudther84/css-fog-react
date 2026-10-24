import React from 'react';
import Icon from './Icon';
import useT from '../utils/useT';

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="ft">
      <span dir="ltr">© 2026 Mudther Yassin</span>
      <span>{t('copy')}</span>
      <a href="https://github.com/Mudther84" target="_blank" rel="noopener noreferrer">
        <Icon name="link" />
        <span>github.com/Mudther84</span>
      </a>
    </footer>
  );
}
