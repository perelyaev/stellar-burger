import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => useReduxDispatch();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
