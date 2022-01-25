import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../app/api';

export interface ProductsState {
  products: { [id: string]: Product };
}
const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // // Use the PayloadAction type to declare the contents of `action.payload`
    receivedProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
});

// Redux Toolkit automatically generates action creators for each of the reducer methods that we pass into it.
export const { receivedProducts } = productsSlice.actions;
export default productsSlice.reducer;

// https://redux.js.org/usage/usage-with-typescript#application-usage
