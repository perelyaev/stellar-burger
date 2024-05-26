import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// Create async thunk to fetch orders
export const getOrder = createAsyncThunk('orders/getOrders', async () => {
  const orders = await getOrdersApi();
  return orders;
});

// Define the shape of user order state
type TUserState = {
  orders: TOrder[]; // Renamed field to "orders"
};

// Define initial state
const initialState: TUserState = {
  orders: [] // Renamed field to "orders"
};

// Create user order slice
export const userOrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orders = action.payload; // Fixed typo in action
    });
  }
});

// Export reducer
export const userOrderReducer = userOrderSlice.reducer;
