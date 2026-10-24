import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* Redirects to /login?next=<page> when nobody is signed in. */
export default function ProtectedRoute({ next, children }) {
  const user = useSelector((s) => s.auth.user);
  return user ? children : <Navigate to={`/login?next=${next}`} replace />;
}
