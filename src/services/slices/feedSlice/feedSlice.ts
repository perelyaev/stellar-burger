import { getFeedsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../../store';

// Define the shape of the feed state
type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | undefined; // Error message, if any
};

// Initial state of the feed slice
export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined
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
        state.orders = initialState.orders;
        state.total = initialState.total;
        state.totalToday = initialState.totalToday;
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
        state.error = initialState.error;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.orders = initialState.orders;
        state.total = initialState.total;
        state.totalToday = initialState.totalToday;
        state.loading = initialState.loading;
        state.error = action.error.message;
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
