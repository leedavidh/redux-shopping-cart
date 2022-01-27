import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithContext } from '../../test-utils';
import { Products } from './Products';
import * as api from '../../app/api';
import mockProducts from '../../../public/products.json';

const getProductsSpy = jest.spyOn(api, 'getProducts');
getProductsSpy.mockResolvedValue(mockProducts);

test('<Products />', async () => {
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
