import {createContext, useContext, useState, useMemo, useCallback} from 'react';

import productsData from '../products.json';

const ProductContext = createContext();
const ProductActionContext = createContext();

// Ограничиваем количество продуктов
const initialProducts = productsData.slice(0, 20);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  // Изменение количества — используем функциональный setState
  const changeQuantity = useCallback((id, amount) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      )
    );
  }, []);

  // Изменение цены — также функциональный подход
  const changePrice = useCallback((id, amount) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, price: Math.max(1, product.price + amount) }
          : product
      )
    );
  }, []);

  // Сортировка продуктов
  const sortProducts = useCallback((criteria) => {
    setProducts(prev => {
      const sorted = [...prev];
      switch (criteria) {
        case 'name':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'quantity':
          sorted.sort((a, b) => a.quantity - b.quantity);
          break;
        default:
          break;
      }
      return sorted;
    });
  }, []);

  // Вычисление статистики — мемоизировано
  const statistics = useMemo(() => {
    const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalBeforeDiscount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const totalDiscounts = products.reduce((sum, p) => sum + p.price * p.quantity * (p.discount / 100), 0);
    const finalTotal = totalBeforeDiscount - totalDiscounts;
    const averagePrice = totalProducts ? totalBeforeDiscount / totalProducts : 0;

    return {
      totalProducts,
      totalBeforeDiscount,
      totalDiscounts,
      finalTotal,
      averagePrice
    };
  }, [products]);

  const state = useMemo(() => ({ 
    products, 
    statistics 
  }), [products, statistics]);

  const actions = useMemo(() => ({
    changeQuantity,
    changePrice,
    sortProducts
  }), [changeQuantity, changePrice, sortProducts]);

  return (
    <ProductContext.Provider value={state}>
      <ProductActionContext.Provider value={actions}>
        {children}
      </ProductActionContext.Provider>
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const useProductActions = () => {
  const context = useContext(ProductActionContext);
  if (!context) {
    throw new Error('useProductActions must be used within a ProductProvider');
  }
  return context;
};