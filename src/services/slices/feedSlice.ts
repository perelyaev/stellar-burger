import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

// Define the shape of the feed state
type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null; // Error message, if any
};

// Initial state of the feed slice
export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

// Async thunk to fetch feeds
export const getFeeds = createAsyncThunk('feeds/all', getFeedsApi);

// Define the feed slice
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {}, // No reducers defined
  selectors: {
    // Selector to get the array of orders
    getFeedOrder: (state) => state.orders,
    // Selector to get the entire feed state
    getFeedSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? action.error.message
          : 'Неизвестная ошибка';
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

// Selector to get the feed state
export const getFeedState = (state: RootState) => state.feed;

// Export selector actions
export const { getFeedOrder, getFeedSelector } = feedSlice.selectors;

// Reducer
export const feedsReducer = feedSlice.reducer;
export default feedSlice.reducer;
