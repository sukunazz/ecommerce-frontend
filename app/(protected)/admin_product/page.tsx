"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // ADD PRODUCT STATE
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  /* ================= LOAD PRODUCTS ================= */
  async function loadProducts() {
    const res = await apiFetch<{ items: Product[] }>("/products");
    setProducts(res.items);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= ADD PRODUCT ================= */
  async function addProduct() {
    if (!name || !price || !stock) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          price: Number(price),
          stock: Number(stock),
        }),
      });

      setName("");
      setPrice("");
      setStock("");
      loadProducts();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ================= UPDATE STOCK ================= */
  async function updateStock(productId: number, newStock: number) {
    await apiFetch(`/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ stock: newStock }),
    });

    loadProducts();
  }

  /* ================= UPLOAD IMAGE ================= */
  async function uploadImage(productId: number, file: File) {
    const formData = new FormData();
    formData.append("image", file);

    await apiFetch(`/products/${productId}/image`, {
      method: "PATCH",
      body: formData,
      headers: {}, // 🔥 IMPORTANT (remove JSON header)
    });

    loadProducts();
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin · Products</h1>

        {/* ADD PRODUCT */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="bg-black border border-white/20 rounded px-4 py-3 text-white"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              className="bg-black border border-white/20 rounded px-4 py-3 text-white"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              className="bg-black border border-white/20 rounded px-4 py-3 text-white"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <button
            onClick={addProduct}
            disabled={loading}
            className="mt-5 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded font-medium"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>

        {/* PRODUCT LIST */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row md:items-center gap-4 bg-zinc-900 border border-white/10 p-4 rounded-xl"
            >
              <img
                src={product.image || "/placeholder.png"}
                className="w-20 h-20 rounded object-cover bg-zinc-800"
              />

              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-400">Price: ${product.price}</p>
              </div>

              {/* UPDATE STOCK */}
              <input
                type="number"
                defaultValue={product.stock}
                className="w-24 bg-black border border-white/20 rounded px-3 py-2 text-white"
                onBlur={(e) => updateStock(product.id, Number(e.target.value))}
              />

              {/* UPLOAD IMAGE */}
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                onChange={(e) =>
                  e.target.files && uploadImage(product.id, e.target.files[0])
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
