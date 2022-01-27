import React from 'react';
import { screen, waitFor, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithContext } from '../../test-utils';
import { Products } from './Products';
import * as api from '../../app/api';
import mockProducts from '../../../public/products.json';

const getProductsSpy = jest.spyOn(api, 'getProducts');
getProductsSpy.mockResolvedValue(mockProducts);

test.skip('<Products />', async () => {
  const { debug } = renderWithContext(<Products />);
  debug();
  /*
console.log
    <body>
      <div>
        <main
          class="page"
        >
          <ul
            class="products"
          />
        </main>
      </div>
    </body>

  */
  await waitFor(() => expect(getProductsSpy).toHaveBeenCalledTimes(1));
  debug();
});

test('several products should be listed', async () => {
  renderWithContext(<Products />);
  await waitFor(() => expect(getProductsSpy).toHaveBeenCalledTimes(1));
  const articles = screen.getAllByRole('article');
  expect(articles.length).toEqual(mockProducts.length);
});
test('Each individual product should contain a heading', async () => {
  renderWithContext(<Products />);
  for (let product of mockProducts) {
    await screen.findByRole('heading', { name: product.name });
  }
});
/*
  when we call findByRole instead of getByRole, 
  findByRole with await actually waits until the heading is found.
  we don't need to expressly call `await waitFor`
*/
test('should be able to add a banana to your cart', async () => {
  const { store } = renderWithContext(<Products />);
  const heading = await screen.findByRole('heading', { name: /Banana/i });
  const div = heading.parentNode;
  const button = getByRole(div as HTMLElement, 'button');
  userEvent.click(button);
  console.log(store.getState().cart.items); // { '207': 1 }
  expect(store.getState().cart.items['207']).toEqual(1);
  userEvent.click(button);
  userEvent.click(button);
  console.log(store.getState().cart.items); // { '207': 3 }
  expect(store.getState().cart.items['207']).toEqual(3);

  /*
  const { store } = renderWithContext(<Products />);
  const button = await screen.findByRole('button', { name: /Bananas/i });
  userEvent.click(button);
  expect(store.getState().cart.items['207']).toEqual(1);
  userEvent.click(button);
  userEvent.click(button);
  expect(store.getState().cart.items['207']).toEqual(3);
  */
});
