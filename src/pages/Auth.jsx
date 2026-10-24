import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Scene from '../components/Scene';
import Shape3D from '../components/Shape3D';
import useT from '../utils/useT';
import { clearError, login, signup } from '../store/authSlice';

const NEXT = { css: '/css', selectors: '/selectors', quiz: '/quiz' };

/* one component for both /login and /signup */
export default function Auth({ mode }) {
  const { t } = useT();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const user = useSelector((s) => s.auth.user);
  const error = useSelector((s) => s.auth.error);
  const [mismatch, setMismatch] = useState(false);
  const next = params.get('next');
  const target = NEXT[next] ? { to: NEXT[next] } : { to: '/', state: { scroll: 'games' } };
  const qs = next ? `?next=${encodeURIComponent(next)}` : '';

  useEffect(() => {
    dispatch(clearError());
  }, [mode, dispatch]);

  if (user) return <Navigate to={target.to} state={target.state} replace />;

  const submit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    setMismatch(false);
    if (mode === 'signup') {
      if (f.get('p') !== f.get('q')) return setMismatch(true);
      const r = await dispatch(signup({ n: f.get('n'), e: f.get('e'), p: f.get('p') }));
      if (signup.fulfilled.match(r)) navigate(target.to, { state: target.state, replace: true });
    } else {
      const r = await dispatch(login({ e: f.get('e'), p: f.get('p') }));
      if (login.fulfilled.match(r)) navigate(target.to, { state: target.state, replace: true });
    }
  };

  const isLogin = mode === 'login';
  return (
    <Layout minimal accent={isLogin ? 'orange' : 'blue'}>
      <div className="authwrap">
        <div className="ill">
          <Shape3D kind={isLogin ? 'pyramid' : 'carousel'} />
          <Scene />
          <p className="tag">{t('authTag')}</p>
        </div>
        <form className="card" id={isLogin ? 'fl' : 'fs'} onSubmit={submit}>
          <h1>{isLogin ? t('login') : t('signup')}</h1>
          {!isLogin && (
            <>
              <label htmlFor="n">{t('name')}</label>
              <input id="n" name="n" required autoComplete="name" />
            </>
          )}
          <label htmlFor="e">{t('email')}</label>
          <input id="e" name="e" type="email" required autoComplete="email" />
          <label htmlFor="p">{t('pass')}</label>
          <input id="p" name="p" type="password" minLength={isLogin ? undefined : 6} required autoComplete={isLogin ? 'current-password' : 'new-password'} />
          {!isLogin && (
            <>
              <label htmlFor="q">{t('pass2')}</label>
              <input id="q" name="q" type="password" minLength={6} required autoComplete="new-password" />
            </>
          )}
          <div className="err" role="alert">{mismatch ? t('eMis') : error ? t(error) : ''}</div>
          <button className="go">{isLogin ? t('login') : t('signup')}</button>
          <p>
            <span>{isLogin ? t('noacc') : t('hasacc')}</span>{' '}
            <Link to={(isLogin ? '/signup' : '/login') + qs}>{isLogin ? t('signup') : t('login')}</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
