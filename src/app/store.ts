import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

const reducer = {
  products: productsReducer,
  cart: cartReducer,
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

// for unit testing with preloadedState
export const getStoreWithState = (preloadedState?: RootState) => {
  return configureStore({ reducer, preloadedState });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
