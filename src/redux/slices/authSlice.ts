import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../api/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

function loadFromStorage(): Partial<AuthState> {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const userStr = localStorage.getItem('user');
  if (!token) return { user: null, accessToken: null, refreshToken: null, isAuthenticated: false };
  let user: User | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr) as User;
    } catch {
      /* ignore */
    }
  }
  return {
    user,
    accessToken: token,
    refreshToken,
    isAuthenticated: !!token,
  };
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  ...loadFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: {
        payload: {
          user: User;
          access_token: string;
          refresh_token: string;
        };
      }
    ) => {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.isAuthenticated = true;
      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    setTokens: (
      state,
      action: {
        payload: { access_token: string; refresh_token: string };
      }
    ) => {
      const { access_token, refresh_token } = action.payload;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.isAuthenticated = true;
      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
