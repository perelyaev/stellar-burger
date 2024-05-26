import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { feedsReducer } from './slices/feedSlice';
import { userReducer } from './slices/userSlice';
import { orderReducer } from './slices/orderSlice';
import { userOrderReducer } from './slices/userOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  feed: feedsReducer,
  user: userReducer,
  userOrder: userOrderReducer,
  order: orderReducer
});
