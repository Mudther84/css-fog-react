import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* ---- Backend placeholder: replace the bodies of these thunks with real API calls ---- */
const hashPw = async (s) => {
  if (!window.crypto || !window.crypto.subtle) return btoa(unescape(encodeURIComponent(s)));
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
};
const readUsers = () => {
  try { return JSON.parse(localStorage.users || '{}'); } catch { return {}; }
};
const readSession = () => {
  try { return JSON.parse(localStorage.sess || 'null'); } catch { return null; }
};

export const signup = createAsyncThunk('auth/signup', async ({ n, e, p }, { rejectWithValue }) => {
  const users = readUsers();
  if (users[e]) return rejectWithValue('eEx');
  users[e] = { n, h: await hashPw(p) };
  localStorage.users = JSON.stringify(users);
  return { n, e };
});

export const login = createAsyncThunk('auth/login', async ({ e, p }, { rejectWithValue }) => {
  const u = readUsers()[e];
  if (!u || u.h !== (await hashPw(p))) return rejectWithValue('eCred');
  return { n: u.n, e };
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: readSession(), error: null },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('sess');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (b) => {
    const ok = (state, a) => {
      state.user = a.payload;
      state.error = null;
      localStorage.sess = JSON.stringify(a.payload);
    };
    const bad = (state, a) => {
      state.error = a.payload || 'eCred';
    };
    b.addCase(signup.fulfilled, ok).addCase(login.fulfilled, ok).addCase(signup.rejected, bad).addCase(login.rejected, bad);
  },
});

export const { logout, clearError } = slice.actions;
export default slice.reducer;
