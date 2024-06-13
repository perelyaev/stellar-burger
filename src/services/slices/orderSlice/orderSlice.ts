import { orderBurgerApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../../store';

// Define the shape of the order state
type TOrderState = {
  orders: TOrder | null;
  request: boolean;
  name: string;
  error?: string | undefined; // Error message, if any
};

// Initial state of the order slice
export const initialState: TOrderState = {
  orders: null,
  name: '',
  request: false,
  error: undefined
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
        state.orders = initialState.orders;
        state.name = initialState.name;
        state.request = true;
        state.error = initialState.error;
      })
      .addCase(
        postOrder.fulfilled,
        (state, action: PayloadAction<{ name: string; order: TOrder }>) => {
          state.orders = action.payload.order;
          state.name = action.payload.name;
          state.request = false;
          state.error = initialState.error;
        }
      )
      .addCase(postOrder.rejected, (state, action) => {
        state.orders = initialState.orders;
        state.name = initialState.name;
        state.request = initialState.request;
        state.error = action.error.message;
      });
  }
});

// Export reducer actions
export const { clearOrder } = orderSlice.actions;

// Selectors
export const getOrderState = (state: RootState) => state.order;

// Reducer
export const orderReducer = orderSlice.reducer;
export default orderSlice.reducer;
