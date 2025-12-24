"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartApi } from "@/lib/cart/cart";
import { CartItem } from "@/lib/cart/types/cartItem.types";

type CartContextType = {
  items: CartItem[];
  selected: number[];
  loading: boolean;
  toggleSelect: (id: number) => void;
  reload: () => Promise<void>;
  updateQuantity: (id: number, qty: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  checkout: (address: string, coupon?: string) => Promise<any>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const cart = await CartApi.getCart();
    setItems(cart?.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const updateQuantity = async (id: number, qty: number) => {
    if (qty < 1) return;
    const cart = await CartApi.updateCartItem(id, qty);
    setItems(cart.items);
  };

  const removeItem = async (id: number) => {
    const cart = await CartApi.deleteCartItem(id);
    setItems(cart.items);
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const checkout = async (address: string, coupon?: string) => {
    return CartApi.checkout(selected, address, coupon);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        selected,
        loading,
        toggleSelect,
        reload: load,
        updateQuantity,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
