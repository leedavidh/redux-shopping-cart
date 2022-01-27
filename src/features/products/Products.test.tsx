import React from 'react';
import { renderWithContext } from '../../test-utils';
import { Products } from './Products';

test('<Products />', () => {
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
});
