"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/product/useProductById";
import { useReviews } from "@/hooks/reviews/useReviews";

/* ================= PAGE ================= */

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);

  /* ---------- Product ---------- */
  const { product, loading, error } = useProduct(productId);

  /* ---------- Reviews ---------- */
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

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
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
  }

  /* ================= STATES ================= */

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return null;

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
      {/* ================= PRODUCT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-600">
            ${product.price}
          </p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>

        {loadingReviews && <p>Loading reviews...</p>}
        {reviewsError && <p className="text-red-500">{reviewsError}</p>}

        {reviews.length === 0 && !loadingReviews && (
          <p className="text-gray-500">No reviews yet.</p>
        )}

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
            </div>
          ))}
        </div>
      </section>

      {/* ================= ADD REVIEW ================= */}
      <section className="border-t pt-8 space-y-4">
        <h3 className="text-xl font-semibold">Write a Review</h3>

        <form onSubmit={handleSubmitReview} className="space-y-4">
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
      </section>
    </div>
  );
}
