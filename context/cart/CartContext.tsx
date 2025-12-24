"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartApi } from "@/lib/cart/cart";
import { CartItem } from "@/lib/cart/types/cartItem.types";

type CartContextType = {
  items: CartItem[];
  selected: number[];
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  toggleSelect: (cartItemId: number) => void;
  clearSelection: () => void;
  reload: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const cart = await CartApi.getCart();
      setItems(cart?.items ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ ADD TO CART
  const addToCart = async (productId: number, quantity = 1) => {
    const cart = await CartApi.addCartItem(productId, quantity);
    setItems(cart.items);
  };

  // ✅ UPDATE QTY
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    const cart = await CartApi.updateCartItem(cartItemId, quantity);
    setItems(cart.items);
  };

  // ✅ REMOVE ITEM
  const removeItem = async (cartItemId: number) => {
    const cart = await CartApi.deleteCartItem(cartItemId);
    setItems(cart.items);
    setSelected((prev) => prev.filter((id) => id !== cartItemId));
  };

  // ✅ SELECT / UNSELECT
  const toggleSelect = (cartItemId: number) => {
    setSelected((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  const clearSelection = () => setSelected([]);

  return (
    <CartContext.Provider
      value={{
        items,
        selected,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        toggleSelect,
        clearSelection,
        reload: load,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ SAFE HOOK
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
