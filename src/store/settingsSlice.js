import { createSlice } from '@reduxjs/toolkit';

const get = (k, d) => {
  try { return localStorage.getItem(k) || d; } catch { return d; }
};

const slice = createSlice({
  name: 'settings',
  initialState: { lang: get('lang', 'ar'), theme: get('theme', 'dark') },
  reducers: {
    setLang(state, a) {
      state.lang = a.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setLang, toggleTheme } = slice.actions;
export default slice.reducer;
