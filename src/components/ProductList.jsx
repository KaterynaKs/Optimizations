import React from 'react';
import { useProducts, useProductActions } from '../context/ProductProvider';
import Product from './Product';

export default function ProductList() {
  const { products } = useProducts();
  const { changeQuantity, changePrice } = useProductActions();

  console.log("ProductList rendering");

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          changeQuantity={changeQuantity}
          changePrice={changePrice}
        />
      ))}
    </div>
  );
}