import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/products";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");
      const nextProducts = await fetchProducts(signal);
      setProducts(nextProducts);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Unable to load products.");
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);
    return () => controller.abort();
  }, [loadProducts]);

  const getProduct = useCallback(
    (id) => products.find((product) => product.id === String(id)),
    [products]
  );

  const getCategoryProducts = useCallback(
    (category) =>
      category === "all"
        ? products
        : products.filter((product) => product.category === category),
    [products]
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      getProduct,
      getCategoryProducts,
      reload: () => loadProducts(),
    }),
    [products, loading, error, getProduct, getCategoryProducts, loadProducts]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  return useContext(ProductContext);
}
