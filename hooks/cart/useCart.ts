"use client";

import { useCallback, useEffect, useState } from "react";
import { CartApi } from "@/lib/cart/cart";
import { CartItem } from "@/lib/cart/types/cartItem.types";
import { useAuthContext } from "@/context/authContext/AuthContext";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuthContext();

  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cart = await CartApi.getCart();
      setItems(cart?.items ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load cart");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addToCart = async (productId: number, quantity = 1) => {
    const cart = await CartApi.addCartItem(productId, quantity);
    setItems(cart.items);
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    const cart = await CartApi.updateCartItem(cartItemId, quantity);
    setItems(cart.items);
  };

  const removeItem = async (cartItemId: number) => {
    const cart = await CartApi.deleteCartItem(cartItemId);
    setItems(cart.items);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    items,
    total,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    reloadCart: loadCart,
  };
}
