import {
  createSlice,
  createSelector,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { checkout, CartItems } from '../../app/api';
import type { RootState, AppDispatch } from '../../app/store';

type CheckoutState = 'LOADING' | 'READY' | 'ERROR';

export interface CartState {
  items: { [productID: string]: number };
  checkoutState: CheckoutState;
  errorMessage: string;
}

/*
    items: {
        "abc": 123
    }
*/

const initialState: CartState = {
  items: {},
  checkoutState: 'READY',
  errorMessage: '',
};
/*
export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (items: CartItems) => {
    const response = await checkout(items);
    return response;
  }
);
*/
export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const items = state.cart.items;
    const response = await checkout(items);
    return response;
  }
);

/*

export const checkoutCart = createAsyncThunk<{
 success: boolean}, 
 undefined, 
 { state: RootState } 
>("cart/checkout", async (_, thunkAPI) => {
 const sate = thunkAPI.getState();
 const items = state.cart.items;
 const response = await checkout(items);
 return response;
})

*/

// https://redux-toolkit.js.org/usage/usage-with-typescript
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkoutCart.pending, (state, action) => {
      //console.log('cart/checkout/pending');
      state.checkoutState = 'LOADING';
    });
    builder.addCase(
      checkoutCart.fulfilled,
      (state, action: PayloadAction<{ success: boolean }>) => {
        const { success } = action.payload;
        if (success) {
          state.checkoutState = 'READY';
          state.items = {};
        } else {
          state.checkoutState = 'ERROR';
        }
      }
    );
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.checkoutState = 'ERROR';
      state.errorMessage = action.error.message || '';
    });
  },
});

// https://redux.js.org/usage/writing-logic-thunks#redux-thunk-middleware
/*
export function checkout() {
  console.log('checkout');
  return (dispatch: AppDispatch) => {
    //console.log('dispatching cart/checkout/pending');
    dispatch({ type: 'cart/checkout/pending' });
    setTimeout(() => {
      dispatch({ type: 'cart/checkout/fulfilled' });
    }, 500);
  };
}
*/

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState) {
  let numItems = 0;
  for (let id in state.cart.items) {
    numItems += state.cart.items[id];
  }
  return numItems;
}

// basically the same as we had in our getNumbItems function,
//  except it's running on the items object instead of the entire state.
export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    console.log('calling getMemoizedNumItems');
    let numItems = 0;
    for (let id in items) {
      numItems += items[id];
    }
    return numItems;
  }
);

/*
the createSelector function will remember the value of its final selector 
as long as the first one hasn't changed.
*/

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    let total = 0;
    for (let id in items) {
      total += products[id].price * items[id];
    }
    return total.toFixed(2);
  }
);
