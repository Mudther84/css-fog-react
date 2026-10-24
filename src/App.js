import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './store';
import { loadProgress } from './store/progressSlice';
import Sprite from './components/Sprite';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CssGame from './pages/CssGame';
import SelectorsGame from './pages/SelectorsGame';
import Quiz from './pages/Quiz';
import { themesCSS } from './utils/icons';
import { T } from './data/i18n';
import './styles/style.css';
import './styles/landing.css';
import './styles/accents.css';
import './styles/shapes.css';

function Shell() {
  const dispatch = useDispatch();
  const { lang, theme } = useSelector((s) => s.settings);
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    const d = document.documentElement;
    d.lang = lang;
    d.dir = lang === 'ar' ? 'rtl' : 'ltr';
    d.dataset.theme = theme;
    document.title = T[lang].app;
    try {
      localStorage.setItem('lang', lang);
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [lang, theme]);

  useEffect(() => {
    dispatch(loadProgress(user ? user.e : null));
  }, [user, dispatch]);

  return (
    <>
      <style>{themesCSS()}</style>
      <Sprite />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/css" element={<ProtectedRoute><CssGame /></ProtectedRoute>} />
        <Route path="/selectors" element={<ProtectedRoute><SelectorsGame /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Shell />
      </HashRouter>
    </Provider>
  );
}
