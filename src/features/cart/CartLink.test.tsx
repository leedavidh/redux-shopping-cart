import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CartLink } from './CartLink';
import { store } from '../../app/store';

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

function renderWithContext(element: React.ReactElement) {
  render(
    <Provider store={store}>
      <Router>{element}</Router>
    </Provider>
  );
}
