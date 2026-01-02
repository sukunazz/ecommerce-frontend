"use client";

import { useState } from "react";

/* ===================== TYPES ===================== */
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
};

/* ===================== API ===================== */
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
}

/* ===================== HOOK ===================== */
function useProductAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ UPLOAD IMAGE (PATCH /products/:id/image)
  async function uploadImage(productId: number, file: File) {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      return await apiFetch<Product>(`/products/${productId}/image`, {
        method: "PATCH",
        body: formData,
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // ✅ UPDATE STOCK (PATCH /products/:id)
  async function updateStock(productId: number, stock: number) {
    setLoading(true);
    setError(null);

    try {
      return await apiFetch<Product>(`/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock }),
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { uploadImage, updateStock, loading, error };
}

/* ===================== PAGE ===================== */
export default function ProductManagePage() {
  const { uploadImage, updateStock, loading, error } = useProductAdmin();

  const [productId, setProductId] = useState<number>(1);
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleImageUpload() {
    if (!image) return;

    await uploadImage(productId, image);
    setSuccess("✅ Product image uploaded successfully");
  }

  async function handleStockUpdate() {
    await updateStock(productId, stock);
    setSuccess("✅ Product stock updated successfully");
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6 text-white">
      <h1 className="text-2xl font-semibold">Product Image & Stock Admin</h1>

      {/* PRODUCT ID */}
      <div>
        <label className="block text-sm mb-1">Product ID</label>
        <input
          type="number"
          value={productId}
          onChange={(e) => setProductId(+e.target.value)}
          className="w-full px-3 py-2 rounded bg-white/10 border border-white/10"
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div className="space-y-2">
        <label className="block text-sm">Upload Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleImageUpload}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Upload Image
        </button>
      </div>

      {/* STOCK UPDATE */}
      <div className="space-y-2">
        <label className="block text-sm">Update Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(+e.target.value)}
          className="w-full px-3 py-2 rounded bg-white/10 border border-white/10"
        />
        <button
          onClick={handleStockUpdate}
          disabled={loading}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Update Stock
        </button>
      </div>

      {/* STATUS */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-green-400">{success}</p>}
    </div>
  );
}
