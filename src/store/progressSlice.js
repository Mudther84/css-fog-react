import { createSlice } from '@reduxjs/toolkit';

/* localStorage keys are the same as the plain-JS version: pr:<email> (css),
   pr:sel:<email>, pr:quiz:<email> ([best]) */
const read = (k) => {
  try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; }
};
const key = (game, email) => 'pr:' + (game === 'css' ? '' : game + ':') + email;

const slice = createSlice({
  name: 'progress',
  initialState: { css: [], sel: [], quiz: 0 },
  reducers: {
    setProgress: (_, a) => a.payload,
    levelDone(state, a) {
      const { game, index } = a.payload;
      if (!state[game].includes(index)) state[game].push(index);
    },
    bestScore(state, a) {
      state.quiz = a.payload;
    },
  },
});

const { setProgress, levelDone, bestScore } = slice.actions;

export const loadProgress = () => (dispatch, getState) => {
  const u = getState().auth.user;
  dispatch(setProgress(u ? { css: read(key('css', u.e)), sel: read(key('sel', u.e)), quiz: read(key('quiz', u.e))[0] || 0 } : { css: [], sel: [], quiz: 0 }));
};

export const completeLevel = (game, index) => (dispatch, getState) => {
  const s = getState();
  if (!s.auth.user || s.progress[game].includes(index)) return;
  dispatch(levelDone({ game, index }));
  localStorage.setItem(key(game, s.auth.user.e), JSON.stringify(getState().progress[game]));
};

export const saveBest = (score) => (dispatch, getState) => {
  const s = getState();
  if (!s.auth.user || score <= s.progress.quiz) return;
  dispatch(bestScore(score));
  localStorage.setItem(key('quiz', s.auth.user.e), JSON.stringify([score]));
};

export default slice.reducer;
