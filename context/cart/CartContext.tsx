"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { apiFetch } from "@/lib/api";

/* ================= TYPES ================= */

export type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
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

      const data = await apiFetch<CartItem[]>("/cart");
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Failed to load cart");
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

  /* ---------- ADD TO CART ---------- */
  const addToCart = async (productId: number, quantity = 1) => {
    try {
      await apiFetch("/cart", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
      });

      // Reload cart to keep server as source of truth
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to add item to cart");
    }
  };

  /* ---------- UPDATE QUANTITY ---------- */
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      await apiFetch(`/cart/${cartItemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });

      setItems((prev) =>
        prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to update quantity");
    }
  };

  /* ---------- REMOVE ITEM ---------- */
  const removeItem = async (cartItemId: number) => {
    try {
      await apiFetch(`/cart/${cartItemId}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (err: any) {
      setError(err.message || "Failed to remove item");
    }
  };

  const value: CartContextType = {
    items,
    loading,
    error,
    total,
    addToCart,
    updateQuantity,
    removeItem,
    reload: load,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ================= HOOK ================= */

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
