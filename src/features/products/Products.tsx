import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { receivedProducts } from './productsSlice';
import { getProducts, Product } from '../../app/api';
import { addToCart } from '../cart/cartSlice';
import styles from './Products.module.css';

export function Products() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getProducts().then((products) => {
      // setProducts(products);
      dispatch(receivedProducts(products));
    });
  }, []);
  /*
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);
  */
  const products = useAppSelector((state) => state.products.products);

  return (
    <main className="page">
      <ul className={styles.products}>
        {Object.values(products).map((product) => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={() => dispatch(addToCart(product.id))}>
                  Add to Cart 🛒
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
