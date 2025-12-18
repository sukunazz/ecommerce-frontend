"use client";

import { useCallback, useEffect, useState } from "react";
import { CartApi } from "@/lib/cart/cart";
import { CartItem } from "@/lib/cart/types/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load cart
   */
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const cart = await CartApi.getCart();

      // ✅ SAFE GUARD
      setItems(cart?.items ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load cart");
      setItems([]); // safety
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Add item
   */
  const addToCart = async (productId: number, quantity = 1) => {
    const cart = await CartApi.addCartItem(productId, quantity);
    setItems(cart.items);
  };

  /**
   * Update quantity
   */
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    const cart = await CartApi.updateCartItem(cartItemId, quantity);
    setItems(cart.items);
  };

  /**
   * Remove item
   */
  const removeItem = async (cartItemId: number) => {
    const cart = await CartApi.deleteCartItem(cartItemId);
    setItems(cart.items);
  };

  /**
   * Total price
   */
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
