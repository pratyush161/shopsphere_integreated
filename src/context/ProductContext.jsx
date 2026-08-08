import { createContext, useContext, useMemo } from "react";
import { PRODUCTS } from "../data/products";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const value = useMemo(() => ({
    products: PRODUCTS,
    getProduct: (id) => PRODUCTS.find((product) => product.id === id),
    getCategoryProducts: (category) => PRODUCTS.filter((product) => product.category === category),
  }), []);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  return useContext(ProductContext);
}
