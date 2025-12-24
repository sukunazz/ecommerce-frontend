"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { apiFetch } from "@/lib/api";
import { CartItem } from "@/lib/cart/types/cartItem.types";

/* ================= TYPES ================= */

type CartResponse = {
  id: number;
  items: CartItem[];
};

type CartContextType = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  total: number;

  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  reload: () => Promise<void>;
};

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------- LOAD CART ---------- */
  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const cart = await apiFetch<CartResponse>("/cart");

      setItems(cart?.items ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load cart");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ---------- TOTAL ---------- */
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  /* ---------- ADD ---------- */
  const addToCart = async (productId: number, quantity = 1) => {
    await apiFetch("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });

    await load();
  };

  /* ---------- UPDATE ---------- */
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;

    await apiFetch(`/cart/${cartItemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    });

    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  /* ---------- REMOVE ---------- */
  const removeItem = async (cartItemId: number) => {
    await apiFetch(`/cart/${cartItemId}`, {
      method: "DELETE",
    });

    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        total,
        addToCart,
        updateQuantity,
        removeItem,
        reload: load,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
