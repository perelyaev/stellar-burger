import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { orderBurgerApi } from '@api';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';

// Define the shape of the constructor state
export type TConstructorState = {
  loading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null; // Error message, if any
};

// Initial state of the constructor slice
export const initialState: TConstructorState = {
  loading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Async thunk to order a burger
export const orderBurger = createAsyncThunk(
  'user/order',
  async (data: string[]) => orderBurgerApi(data)
);

// Define the constructor slice
export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    // Add an ingredient to the constructor
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    /* Remove an ingredient from the constructor (only group)
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload
        );
    },
    */
    // Remove an ingredient from the constructor (only 1)
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.constructorItems.ingredients.findIndex(
        (i) => i._id === action.payload
      );
      if (indexToRemove !== 1) {
        state.constructorItems.ingredients.splice(indexToRemove, 1);
      }
    },
    // Move an ingredient up in the constructor
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.constructorItems.ingredients.length) {
        const temp = state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },
    // Move an ingredient down in the constructor
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] =
          state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },
    // Set the order request flag
    setRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    // Reset the order modal data
    resetModal: (state) => {
      state.orderModalData = null;
    },
    // Clear all constructor data
    clearAll: (state) => (state = initialState)
  },
  selectors: {
    // Selector to get the entire constructor state
    getConstructorSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message
          ? action.error.message
          : 'Неизвестная ошибка';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

// Export reducer actions
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  setRequest,
  resetModal,
  clearAll
} = constructorSlice.actions;

// Reducer
export const constructorReducer = constructorSlice.reducer;

// Selector to get the constructor state
export const getConstructorState = (state: RootState) =>
  state.constructorBurger;

// Export selector actions
export const { getConstructorSelector } = constructorSlice.selectors;
export default constructorSlice.reducer;
