import React from 'react'
import { useProducts } from '../context/ProductProvider';

export default function Product({ product }) {
  const { changeQuantity, changePrice } = useProducts();
  console.log(`Product ${product.id} rendering`);

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="flex flex-col h-full border rounded shadow-sm bg-white">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
        {product.discount > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-3 flex-grow">
        <h3 className="text-lg font-bold truncate">{product.name}</h3>

        <div className="flex items-center mt-1">
          <span className={product.discount > 0 ? "line-through text-gray-500" : "font-bold"}>
            ${product.price.toFixed(2)}
          </span>

          {product.discount > 0 && (
            <span className="ml-2 text-red-500 font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <div className="p-3 border-t bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span>Количество:</span>
          <div className="flex items-center">
            <button
              onClick={() => changeQuantity(product.id, -1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l"
            >
              -
            </button>
            <span className="w-8 h-8 flex items-center justify-center bg-white border-y">
              {product.quantity}
            </span>
            <button
              onClick={() => changeQuantity(product.id, 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span>Цена:</span>
          <div className="flex">
            <button
              onClick={() => changePrice(product.id, -10)}
              className="px-2 py-1 bg-red-200 rounded-l"
            >
              -$10
            </button>
            <button
              onClick={() => changePrice(product.id, 10)}
              className="px-2 py-1 bg-green-200 rounded-r"
            >
              +$10
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};