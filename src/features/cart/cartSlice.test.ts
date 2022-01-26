import cartReducer, {
  CartState,
  addToCart,
  removeFromCart,
  updateQuantity,
  getNumItems,
  getMemoizedNumItems,
} from './cartSlice';
import type { RootState } from '../../app/store';

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
