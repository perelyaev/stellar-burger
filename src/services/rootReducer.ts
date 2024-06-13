import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice/constructorSlice';
import { feedsReducer } from './slices/feedSlice/feedSlice';
import { userReducer } from './slices/userSlice/userSlice';
import { orderReducer } from './slices/orderSlice/orderSlice';
import { userOrderReducer } from './slices/userOrderSlice/userOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  feed: feedsReducer,
  user: userReducer,
  userOrder: userOrderReducer,
  order: orderReducer
});
