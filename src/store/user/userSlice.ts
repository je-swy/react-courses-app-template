import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

const initialToken = localStorage.getItem('token') || '';
const initialName = localStorage.getItem('name') || '';
const initialEmail = localStorage.getItem('email') || '';

const initialState = {
  isAuth: !!initialToken,
  name: initialName,
  email: initialEmail,
  token: initialToken,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string; token: string }>) => {
      const { name, email, token } = action.payload;

      state.isAuth = true;
      state.name = name;
      state.email = email;
      state.token = token;

      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    },

    logout: (state) => {
      state.isAuth = false;
      state.name = '';
      state.email = '';
      state.token = '';

      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export const getUserName = (state: RootState) => state.user.name;
export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getUserToken = (state: RootState) => state.user.token;