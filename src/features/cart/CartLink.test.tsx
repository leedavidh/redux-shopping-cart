import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartLink } from './CartLink';
import { store } from '../../app/store';
import { addToCart, updateQuantity, removeFromCart } from './cartSlice';
import { getStateWithItems, renderWithContext } from '../../test-utils';
/*
the following test is failing 
    Error: could not find react-redux context value
    
test('should contain a link', () => {
  render(<CartLink />);
  expect(screen.getByRole('link')).toBeInTheDocument();
});
*/
test('should contain a link', () => {
  renderWithContext(<CartLink />);
  expect(screen.getByRole('link')).toBeInTheDocument();
});

test('should show text when there are no items', () => {
  renderWithContext(<CartLink />);
  const link = screen.getByRole('link');
  expect(link).toHaveTextContent('Cart');
  expect(link).not.toHaveTextContent('0');
  expect(link).not.toHaveTextContent('1');
});
test('should show the correct number of items', () => {
  const state = getStateWithItems({ testItem: 1 });
  const { store } = renderWithContext(<CartLink />, state);
  const link = screen.getByRole('link');
  expect(link).toHaveTextContent('1');
  store.dispatch(updateQuantity({ id: 'testItem', quantity: 5 }));
  expect(link).toHaveTextContent('5');
  store.dispatch(addToCart('anotherItem'));
  expect(link).toHaveTextContent('6');
  store.dispatch(removeFromCart('testItem'));
  store.dispatch(removeFromCart('anotherItem'));
  expect(link).toHaveTextContent('Cart');
});
