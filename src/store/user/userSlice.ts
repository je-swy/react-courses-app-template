import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

const initialToken = localStorage.getItem('token') || '';
const initialUser = localStorage.getItem('user') || ''; 
const initialEmail = localStorage.getItem('email') || '';

const initialState = {
  isAuth: !!initialToken,
  user: initialUser,
  email: initialEmail,
  token: initialToken,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: string; email: string; token: string }>) => { // user замість name
      const { user, email, token } = action.payload;
      
      state.isAuth = true;
      state.user = user;
      state.email = email;
      state.token = token;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      localStorage.setItem('email', email);
    },
    
    logout: (state) => {
      state.isAuth = false;
      state.user = '';
      state.email = '';
      state.token = '';
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      localStorage.removeItem('name'); 
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export const getUserName = (state: RootState) => state.user.user;
export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getUserToken = (state: RootState) => state.user.token;