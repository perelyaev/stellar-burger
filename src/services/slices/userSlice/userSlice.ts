import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../../utils/burger-api';
import { TUser } from '@utils-types';

// Define the shape of user state
type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
};

// Define initial state
export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    name: '',
    email: ''
  },
  error: undefined
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
      // register
      .addCase(register.pending, (state) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = initialState.error);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.isAuthChecked = true),
          (state.user = action.payload.user),
          (state.error = initialState.error);
      })
      .addCase(register.rejected, (state, action) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = action.error.message);
      })
      //login
      .addCase(login.pending, (state) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = initialState.error);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.isAuthChecked = true),
          (state.user = action.payload.user),
          (state.error = initialState.error);
      })
      .addCase(login.rejected, (state, action) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = action.error.message);
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = initialState.error);
      })
      // getuser
      .addCase(getUser.pending, (state) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = initialState.error);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        (state.isAuthChecked = true),
          (state.user = action.payload.user),
          (state.error = initialState.error);
      })
      .addCase(getUser.rejected, (state, action) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = action.error.message);
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = initialState.error);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        (state.isAuthChecked = true),
          (state.user = action.payload.user),
          (state.error = initialState.error);
      })
      .addCase(updateUser.rejected, (state, action) => {
        (state.isAuthChecked = initialState.isAuthChecked),
          (state.user = initialState.user),
          (state.error = action.error.message);
      });
  }
});

// Export reducer and selectors
export const userReducer = userSlice.reducer;
export const { getErrorSelector, getIsAuthCheckedSelector, getUserSelector } =
  userSlice.selectors;
