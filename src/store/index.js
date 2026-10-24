import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import settings from './settingsSlice';
import progress from './progressSlice';

export const store = configureStore({ reducer: { auth, settings, progress } });
