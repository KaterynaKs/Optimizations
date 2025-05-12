import React from 'react'
import { useDispatch } from 'react-redux';
// import { useProductActions } from '../context/ProductProvider';
import { SortProductsAction } from '../store';

export default function SortPanel() {
  // const { sortProducts } = useProductActions();
  const dispatch = useDispatch()
  console.log("SortPanel rendering");

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
      <h3 className="font-bold mb-3 text-lg">Сортировка продуктов:</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => dispatch(SortProductsAction({
            criteria: 'name'
          }))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          По имени
        </button>
        <button
          onClick={() => dispatch(SortProductsAction({
            criteria: 'price'
          }))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Пo цене
        </button>
        <button
          onClick={() => dispatch(SortProductsAction({
            criteria: 'quantity'
          }))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Пo количеству
        </button>
      </div>
    </div>
  );
};