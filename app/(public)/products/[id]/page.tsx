"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/product/useProductById";
import { useReviews } from "@/hooks/reviews/useReviews";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton/Skeleton";
import { useAuthContext } from "@/context/authContext/AuthContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);

  const { product, loading, error } = useProduct(productId);
  const {
    reviews,
    addReview,
    updateReview,
    deleteReview,
    loading: loadingReviews,
  } = useReviews(productId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuthContext();

  /* Submit new review */
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return alert("Login to submit a review");

    setSubmitting(true);
    try {
      await addReview({ rating, comment });
      setRating(5);
      setComment("");
    } catch (err: any) {
      alert(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Skeleton height="400px" width="100%" />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* PRODUCT INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-yellow-400 font-semibold">
            ⭐ {product.averageRating?.toFixed(1) || 0} (
            {product.reviewCount || 0} reviews)
          </p>
          <p className="text-2xl font-semibold text-green-600">
            ${product.price}
          </p>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>

        {loadingReviews && <p>Loading reviews...</p>}

        {reviews.length === 0 && !loadingReviews && <p>No reviews yet.</p>}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{review.user.email}</p>
                <p>⭐ {review.rating}/5</p>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>

              {/* EDIT / DELETE */}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    const newComment = prompt("Edit review:", review.comment);
                    if (newComment)
                      updateReview(review.id, { comment: newComment });
                  }}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete review?")) deleteReview(review.id);
                  }}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADD REVIEW */}
      <section className="border-t pt-8 space-y-4">
        <h3 className="text-xl font-semibold">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label>Rating</label>
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
            <label>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
      </section>
    </div>
  );
}
