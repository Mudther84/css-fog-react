import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icon from './Icon';
import useT from '../utils/useT';
import { setLang, toggleTheme } from '../store/settingsSlice';
import { logout } from '../store/authSlice';

export default function Header({ onHelp, minimal = false, onNav }) {
  const { t, lang } = useT();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const go = (section) => (e) => {
    e.preventDefault();
    onNav(section);
  };

  return (
    <header className="top">
      <Link className="brand" to="/">
        <svg aria-hidden="true">
          <use href="#logo" />
        </svg>
        <b>{t('app')}</b>
      </Link>
      {!minimal && (
        <nav className="nv">
          {onHelp ? (
            <>
              <Link to="/">{t('home')}</Link>
              <a href="#/" onClick={go('games')}>{t('games')}</a>
            </>
          ) : (
            <>
              <a href="#/" onClick={go('games')}>{t('games')}</a>
              <a href="#/" onClick={go('how')}>{t('how')}</a>
            </>
          )}
        </nav>
      )}
      <span className="tools">
        {onHelp && (
          <button className="sec" id="help" onClick={onHelp}>
            <Icon name="help" />
            <span>{t('help')}</span>
          </button>
        )}
        <button className="sec ib" id="th" aria-label="Theme" title="Light / Dark" onClick={() => dispatch(toggleTheme())}>
          <Icon name="sun" className="ic-sun" />
          <Icon name="moon" className="ic-moon" />
        </button>
        <select id="lg" aria-label="language" value={lang} onChange={(e) => dispatch(setLang(e.target.value))}>
          <option value="ar">العربية</option>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
        {!minimal && user && (
          <>
            {!onHelp && (
              <span id="who">
                <Icon name="user" />
                <span>{user.n}</span>
              </span>
            )}
            <button
              className="sec"
              id="out"
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
            >
              {t('logout')}
            </button>
          </>
        )}
        {!minimal && !user && (
          <Link id="lgn" className="sa" to="/login">
            {t('login')}
          </Link>
        )}
      </span>
    </header>
  );
}
