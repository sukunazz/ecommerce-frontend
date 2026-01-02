"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // add product state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data.items);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= ADD PRODUCT =================
  const addProduct = async () => {
    if (!name || !price || !stock) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    setName("");
    setPrice("");
    setStock("");

    await fetchProducts();
    setLoading(false);
  };

  // ================= UPDATE STOCK =================
  const updateStock = async (id: number, stock: number) => {
    await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock }),
    });

    await fetchProducts();
  };

  // ================= UPLOAD IMAGE =================
  const uploadImage = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    await fetch(`${API_URL}/products/${id}/image`, {
      method: "POST",
      body: formData,
    });

    await fetchProducts(); // 🔑 this fixes image disappearing
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* ================= ADD PRODUCT ================= */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border p-3 rounded text-black"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-3 rounded text-black"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="border p-3 rounded text-black"
            placeholder="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <button
            onClick={addProduct}
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 py-3 hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= PRODUCTS LIST ================= */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-lg shadow space-y-3">
            <h3 className="text-lg font-semibold">{p.name}</h3>

            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />
            ) : (
              <div className="h-40 flex items-center justify-center bg-gray-200 rounded text-gray-600">
                No image
              </div>
            )}

            <p className="font-medium">Price: ${p.price}</p>

            {/* UPDATE STOCK */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={p.stock}
                className="border p-2 w-24 rounded text-black"
                onBlur={(e) => updateStock(p.id, Number(e.target.value))}
              />
              <span>Stock</span>
            </div>

            {/* UPLOAD IMAGE */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && uploadImage(p.id, e.target.files[0])
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
