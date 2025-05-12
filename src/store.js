import { configureStore, createAction, createReducer } from "@reduxjs/toolkit"
import products from './products.json';

const initialProducts = products.slice(0,100)

function calculateStatistics(products) {
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
}

const initialState = {
products: [],
stats: {
totalProducts: 0,
totalBeforeDiscount: 0,
totalDiscounts: 0,
finalTotal: 0,
averagePrice: 0
},
}

export const IncrementPriceAction = createAction('incrementPrice')
export const IncrementQuantityAction = createAction('incrementQuantity')
export const SortProductsAction = createAction('sortProducts')
export const InitiliazeProductsAction = createAction('initiliazeProducts')

const productReducer = createReducer(initialState, (builder) => { // immer
  builder
  .addCase(InitiliazeProductsAction, (state, action) => {
        state.products = action.payload.products;
        state.stats = calculateStatistics(state.products);
    })
    .addCase(IncrementPriceAction, (state, action) => {
        // иммутабельный способ
    //   state.products.map(product =>
    //     product.id === action.payload.id
    //       ? { ...product, price: Math.max(1, product.price + action.payload.amount) }
    //       : product
    //   )
    // мутабельный способ, содержит в себе inner createReducer, поэтому тут можно применять мутаб.способ
    state.products.forEach((product) => {
        if (product.id === action.payload.id) {
            product.price += action.payload.amount
        }
    });
        state.stats = calculateStatistics(state.products);
    })
    .addCase(IncrementQuantityAction, (state, action) => {
      state.products.forEach((product) => {
        if (product.id === action.payload.id) {
            product.quantity += action.payload.amount
        }
    });
        state.stats = calculateStatistics(state.products);
    })
    .addCase(SortProductsAction, (state, action) => {
      switch (action.payload.criteria) {
        case 'name':
          state.products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          state.products.sort((a, b) => a.price - b.price);
          break;
        case 'quantity':
          state.products.sort((a, b) => a.quantity - b.quantity);
          break;
        default:
          break;
      }
      state.stats = calculateStatistics(state.products);
    })
    
})

export const store = configureStore({
    reducer: productReducer,
})

store.dispatch(InitiliazeProductsAction({
    products: initialProducts
}))