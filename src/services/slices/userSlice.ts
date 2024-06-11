import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';

// Define the shape of user state
type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
};

// Define initial state
const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    name: '',
    email: ''
  },
  error: null
};

// Create thunks for async operations
export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

// Create user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // Include selectors in the selectors object
  selectors: {
    getErrorSelector: (state: TUserState) => state.error,
    getIsAuthCheckedSelector: (state: TUserState) => state.isAuthChecked,
    getUserSelector: (state: TUserState) => state.user
  },
  extraReducers: (builder) => {
    builder
      // Handling registration
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка регистрации';
      });
    builder // Handling login
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка авторизации';
      });
    // Handling logout
    builder.addCase(logout.fulfilled, (state) => (state = initialState));
    builder
      // Handling getting user
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка получения пользователя';
      });
    builder
      // Handling updating user
      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка обновления пользователя';
      });
  }
});

// Export reducer and selectors
export const userReducer = userSlice.reducer;
export const { getErrorSelector, getIsAuthCheckedSelector, getUserSelector } =
  userSlice.selectors;
