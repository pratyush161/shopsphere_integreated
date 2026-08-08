import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Cart stores product IDs and quantities, as required.
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("shop_cart");
    return saved ? JSON.parse(saved) : {};
  });

  function persist(next) {
    setItems(next);
    localStorage.setItem("shop_cart", JSON.stringify(next));
  }

  function addToCart(productId) {
    persist({ ...items, [productId]: (items[productId] || 0) + 1 });
  }

  function increaseQuantity(productId) {
    addToCart(productId);
  }

  function decreaseQuantity(productId) {
    const nextQuantity = (items[productId] || 0) - 1;
    const next = { ...items };
    if (nextQuantity <= 0) delete next[productId];
    else next[productId] = nextQuantity;
    persist(next);
  }

  function removeFromCart(productId) {
    const next = { ...items };
    delete next[productId];
    persist(next);
  }

  function clearCart() {
    persist({});
  }

  const cartCount = Object.values(items).reduce((sum, qty) => sum + qty, 0);

  const value = useMemo(
    () => ({
      items,
      cartCount,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}