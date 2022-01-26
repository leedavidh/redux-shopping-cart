import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import cartReducer, {
  CartState,
  checkoutCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  getNumItems,
  getMemoizedNumItems,
  getTotalPrice,
} from './cartSlice';
import type { RootState } from '../../app/store';
import products from '../../../public/products.json';
import * as api from '../../app/api';

const mockStore = configureStore([thunk]);

jest.mock('../../app/api', () => {
  return {
    async getProducts() {
      return [];
    },
    async checkout(items: api.CartItems = {}) {
      const empty = Object.keys(items).length === 0;
      if (empty) throw new Error('Must include cart items');
      if (items.badItem > 0) return { success: false };
      return { success: true };
    },
  };
});

test('checkout should work', async () => {
  /* test is failing without mocking /app/api
    fetch is a browser API that doesn't exist natively in Node. 
    The easiest way to fix this for testing purposes is 
    to mock out the entire API surface.
  */
  await api.checkout({ fakeItem: 4 });
});

describe('cart reducer', () => {
  //test.todo('an empty action');
  //test.todo('addToCart');
  //test.todo('removeFromCart');
  //test.todo('updateQuantity');

  test('an empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const state = cartReducer(initialState, action);
    expect(state).toEqual({
      checkoutState: 'READY',
      errorMessage: '',
      items: {},
    });
  });
  test('addToCart', () => {
    const initialState = undefined;
    const action = addToCart('abc');
    let state = cartReducer(initialState, action);
    expect(state).toEqual({
      checkoutState: 'READY',
      errorMessage: '',
      items: { abc: 1 },
    });
    state = cartReducer(state, action);
    state = cartReducer(state, action);
    expect(state).toEqual({
      checkoutState: 'READY',
      errorMessage: '',
      items: { abc: 3 },
    });
  });
  test('removeFromCart', () => {
    const initialState: CartState = {
      checkoutState: 'READY',
      errorMessage: '',
      items: { abc: 1, def: 3 },
    };
    const action = removeFromCart('abc');
    const state = cartReducer(initialState, action);
    expect(state).toEqual({
      checkoutState: 'READY',
      errorMessage: '',
      items: { def: 3 },
    });
  });
  test('updateQuantity', () => {
    const initialState: CartState = {
      checkoutState: 'READY',
      errorMessage: '',
      items: { abc: 1, def: 3 },
    };
    const action = updateQuantity({ id: 'def', quantity: 5 });
    const state = cartReducer(initialState, action);
    expect(state).toEqual({
      checkoutState: 'READY',
      errorMessage: '',
      items: { abc: 1, def: 5 },
    });
  });
});
describe('selectors', () => {
  describe('getNumItems', () => {
    it('should return 0 with no items', () => {
      const cart: CartState = {
        checkoutState: 'READY',
        errorMessage: '',
        items: {},
      };
      const result = getNumItems({ cart } as RootState);
      expect(result).toEqual(0);
    });
    it('should add up the total', () => {
      const cart: CartState = {
        checkoutState: 'READY',
        errorMessage: '',
        items: { abc: 3, def: 3 },
      };
      const result = getNumItems({ cart } as RootState);
      expect(result).toEqual(6);
    });
  });

  /*
describe('getMemoizedNumItems', () => {
  it.todo('should return 0 with no items');
  it.todo('should add up the totals');
  it.todo('should not compute again with the same sale');
  it.todo('should recompute with new state');
});
*/
  /*
    getMemoizedNumItems is a memoized function, 
    so we need to add tests that take that into account. 
    It shouldn't compute again with the same state, 
    and it should recompute with new state.
*/
  describe('getMemoizedNumItems', () => {
    it('should return 0 with no items', () => {
      const cart: CartState = {
        checkoutState: 'READY',
        errorMessage: '',
        items: {},
      };
      const result = getMemoizedNumItems({ cart } as RootState);
      expect(result).toEqual(0);
    });
    it('should add up the total', () => {
      const cart: CartState = {
        checkoutState: 'READY',
        errorMessage: '',
        items: { abc: 3, def: 3 },
      };
      const result = getMemoizedNumItems({ cart } as RootState);
      expect(result).toEqual(6);
    });
    it('should not compute again with the same sale', () => {
      const cart: CartState = {
        checkoutState: 'READY',
        errorMessage: '',
        items: { abc: 3, def: 3 },
      };
      /*
          The createSelector in RTK comes with a built-in count of 
          how many times it has recomputed a certain value. 
          getMomoizedNumItems.resetRecomputations() allows you 
          to reset that count for your tests.
        */
      getMemoizedNumItems.resetRecomputations();
      getMemoizedNumItems({ cart } as RootState);
      expect(getMemoizedNumItems.recomputations()).toEqual(1);
      getMemoizedNumItems({ cart } as RootState);
      expect(getMemoizedNumItems.recomputations()).toEqual(1);
    });
    it('should recompute with new state', () => {
      const cart: CartState = {
        checkoutState: 'READY',
        errorMessage: '',
        items: { abc: 3, def: 3 },
      };
      getMemoizedNumItems.resetRecomputations();
      getMemoizedNumItems({ cart } as RootState);
      expect(getMemoizedNumItems.recomputations()).toEqual(1);
      cart.items = { abc: 2 }; // change the state
      getMemoizedNumItems({ cart } as RootState);
      expect(getMemoizedNumItems.recomputations()).toEqual(2);
    });
  });

  describe('getTotalPrice', () => {
    it('should return 0 with an empty cart', () => {
      const state: RootState = {
        cart: { checkoutState: 'READY', errorMessage: '', items: {} },
        products: { products: {} },
      };
      const result = getTotalPrice(state);
      expect(result).toEqual('0.00');
    });
    /*
        Products in the products.json source file are stored 
        as an array of objects, so we use computed properties 
        syntax to reference the product ids: [products[0].id]
    */
    it('should add up the totals', () => {
      const state: RootState = {
        cart: {
          checkoutState: 'READY',
          errorMessage: '',
          items: {
            [products[0].id]: 3,
            [products[1].id]: 4,
          },
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          },
        },
      };
      getTotalPrice.resetRecomputations();
      const result = getTotalPrice(state);
      expect(result).toEqual('43.23');
      expect(getTotalPrice.recomputations()).toEqual(1);
      getTotalPrice(state);
      expect(getTotalPrice.recomputations()).toEqual(1);
    });
    it('should not compute again with the same state', () => {
      const state: RootState = {
        cart: {
          checkoutState: 'READY',
          errorMessage: '',
          items: {
            [products[0].id]: 3,
            [products[1].id]: 4,
          },
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          },
        },
      };
      getTotalPrice.resetRecomputations();
      const result = getTotalPrice(state);
      expect(result).toEqual('43.23');
      expect(getTotalPrice.recomputations()).toEqual(1);
      getTotalPrice(state);
      expect(getTotalPrice.recomputations()).toEqual(1);
    });
    it('should recompute with new products', () => {
      const state: RootState = {
        cart: {
          checkoutState: 'READY',
          errorMessage: '',
          items: {
            [products[0].id]: 3,
            [products[1].id]: 4,
          },
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          },
        },
      };
      getTotalPrice.resetRecomputations();
      let result = getTotalPrice(state);
      expect(result).toEqual('43.23');
      expect(getTotalPrice.recomputations()).toEqual(1);
      state.products.products = {
        [products[0].id]: products[0],
        [products[1].id]: products[1],
        [products[2].id]: products[2],
      };
      /*
       verify that the result stayed the same 
       even though I changed the products.
       We're expecting in this case recomputations to equal two, 
       but you'll notice that's not doing that. 
       The test is failing and that's because 
       create selector expects you to pass in a new object 
       each time you call getTotalPrice.

      result = getTotalPrice(state);

      If it notices you pass in the exact same object as before, 
      even if you've modified some of the values, 
      it's going to send you back the same result. 
      */
      result = getTotalPrice({ ...state }); // fix: creating a copy of the state.

      expect(result).toEqual('43.23');
      expect(getTotalPrice.recomputations()).toEqual(2);
    });
    it('should recompute when cart changes', () => {
      const state: RootState = {
        cart: {
          checkoutState: 'READY',
          errorMessage: '',
          items: {
            [products[0].id]: 3,
            [products[1].id]: 4,
          },
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          },
        },
      };
      getTotalPrice.resetRecomputations();
      let result = getTotalPrice(state);
      expect(result).toEqual('43.23');
      expect(getTotalPrice.recomputations()).toEqual(1);
      state.cart.items = {}; // cart changes
      //result = getTotalPrice(state);
      result = getTotalPrice({ ...state });
      expect(result).toEqual('0.00');
      expect(getTotalPrice.recomputations()).toEqual(2);
    });
  });
});

describe('thunks', () => {
  describe('checkoutCart w/mocked dispatch', () => {
    it('should checkout', async () => {
      const dispatch = jest.fn();
      const state: RootState = {
        products: { products: {} },
        cart: { checkoutState: 'READY', errorMessage: '', items: { abc: 123 } },
      };
      const thunk = checkoutCart();
      await thunk(dispatch, () => state, undefined);

      console.log(dispatch.mock.calls);
      /*
    [
      [
        {
          type: 'cart/checkout/pending',
          payload: undefined,
          meta: [Object]
        }
      ],
      [
        {
          type: 'cart/checkout/fulfilled',
          payload: [Object],
          meta: [Object]
        }
      ]
    ]

      */

      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual('cart/checkout/pending');
      expect(calls[1][0].type).toEqual('cart/checkout/fulfilled');
      expect(calls[1][0].payload).toEqual({ success: true });
    });
    it('should fail with no items', async () => {
      const dispatch = jest.fn();
      const state: RootState = {
        products: { products: {} },
        cart: { checkoutState: 'READY', errorMessage: '', items: {} },
      };
      const thunk = checkoutCart();
      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual('cart/checkout/pending');
      expect(calls[1][0].type).toEqual('cart/checkout/rejected');
      expect(calls[1][0].payload).toEqual(undefined);
      expect(calls[1][0].error.message).toEqual('Must include cart items');
    });
  });

  describe('checkoutCart w/mock redux store', () => {
    it('should checkout', async () => {
      const store = mockStore({ cart: { items: { testItem: 3 } } });
      await store.dispatch(checkoutCart() as any);
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0].type).toEqual('cart/checkout/pending');
      expect(actions[1].type).toEqual('cart/checkout/fulfilled');
      expect(actions[1].payload).toEqual({ success: true });
    });
    it('should fail with no items', async () => {
      const store = mockStore({ cart: { items: {} } });
      await store.dispatch(checkoutCart() as any);
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0].type).toEqual('cart/checkout/pending');
      expect(actions[1].type).toEqual('cart/checkout/rejected');
      expect(actions[1].payload).toEqual(undefined);
      expect(actions[1].error.message).toEqual('Must include cart items');
    });
  });
});
