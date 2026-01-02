// frontend/src/app/products/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useReviews } from "@/hooks/reviews/useReviews";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);

  const { reviews, loading, error, addReview } = useReviews(productId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSubmitting(true);
      await addReview({ rating, comment });
      setComment("");
      setRating(5);
    } catch (err: any) {
      alert(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Product Reviews</h1>

      {/* Reviews */}
      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && reviews.length === 0 && (
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
              <p className="text-sm">⭐ {review.rating}/5</p>
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Add Review */}
      <form onSubmit={handleSubmit} className="border-t pt-6 space-y-4">
        <h2 className="text-lg font-semibold">Add a Review</h2>

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
            className="border rounded px-3 py-2 w-full"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
