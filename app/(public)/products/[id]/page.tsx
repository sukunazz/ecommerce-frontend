"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useReviews } from "@/hooks/useReviews";

/* ================= TYPES ================= */

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category?: string;
}

/* ================= PAGE ================= */

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);

  /* ---------- Product state ---------- */
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  /* ---------- Reviews hook ---------- */
  const {
    reviews,
    loading: loadingReviews,
    error: reviewsError,
    addReview,
  } = useReviews(productId);

  /* ---------- Review form ---------- */
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await apiFetch<Product>(`/products/${productId}`);
        setProduct(data);
      } catch (err: any) {
        setProductError(err.message || "Failed to load product");
      } finally {
        setLoadingProduct(false);
      }
    }

    if (productId) fetchProduct();
  }, [productId]);

  /* ================= SUBMIT REVIEW ================= */

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSubmitting(true);
      await addReview({ rating, comment });
      setRating(5);
      setComment("");
    } catch (err: any) {
      alert(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  /* ================= LOADING / ERROR ================= */

  if (loadingProduct) return <p className="p-6">Loading product...</p>;
  if (productError) return <p className="p-6 text-red-500">{productError}</p>;
  if (!product) return null;

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* ================= PRODUCT INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-2xl font-semibold text-green-600">
            ${product.price}
          </p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {product.category && (
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
          )}

          <p
            className={`text-sm ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
          </p>

          <button
            disabled={product.stock === 0}
            className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>

        {loadingReviews && <p>Loading reviews...</p>}
        {reviewsError && <p className="text-red-500">{reviewsError}</p>}

        {reviews.length === 0 && !loadingReviews && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between">
                <p className="font-semibold">{review.user.name}</p>
                <p>⭐ {review.rating}/5</p>
              </div>

              <p className="mt-2 text-gray-700">{review.comment}</p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ADD REVIEW ================= */}
      <form onSubmit={handleSubmitReview} className="border-t pt-8 space-y-4">
        <h3 className="text-xl font-semibold">Write a Review</h3>

        <div>
          <label className="block text-sm font-medium">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
