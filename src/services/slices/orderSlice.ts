import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

// Define the shape of the order state
type TOrderState = {
  orders: TOrder | null;
  request: boolean;
  name: string;
  error?: string | null; // Error message, if any
};

// Initial state of the order slice
export const initialState: TOrderState = {
  orders: null,
  name: '',
  request: false
};

// Async thunk to post an order
export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (orders: string[]) => {
    const response = await orderBurgerApi(orders);
    return response;
  }
);

// Define the order slice
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Clear the order state
    clearOrder: (state) => {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.error = null;
        state.request = true;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.request = false;
      })
      .addCase(
        postOrder.fulfilled,
        (state, action: PayloadAction<{ name: string; order: TOrder }>) => {
          state.error = null;
          state.request = false;
          state.name = action.payload.name;
          state.orders = action.payload.order;
        }
      );
  }
});

// Export reducer actions
export const { clearOrder } = orderSlice.actions;

// Selectors
export const getOrderState = (state: RootState) => state.order;

// Reducer
export const orderReducer = orderSlice.reducer;
export default orderSlice.reducer;
