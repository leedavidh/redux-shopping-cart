import { createSlice } from '@reduxjs/toolkit';

export interface CartState {
  items: { [productID: string]: number };
}

/*
    items: {
        "abc": 123
    }
*/

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
