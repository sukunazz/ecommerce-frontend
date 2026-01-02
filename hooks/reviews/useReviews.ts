// frontend/src/hooks/useReviews.ts
"use client";

import { useEffect, useState } from "react";
import {
  ReviewsApi,
  Review,
  CreateReviewDto,
  UpdateReviewDto,
} from "@/lib/reviews/reviews";

export function useReviews(productId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchReviews() {
    try {
      setLoading(true);
      const data = await ReviewsApi.getByProduct(productId);
      setReviews(data);
    } catch (err: any) {
      setError(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  async function addReview(data: CreateReviewDto) {
    await ReviewsApi.create(productId, data);
    await fetchReviews();
  }

  async function updateReview(reviewId: number, data: UpdateReviewDto) {
    await ReviewsApi.update(reviewId, data);
    await fetchReviews();
  }

  async function deleteReview(reviewId: number) {
    await ReviewsApi.delete(reviewId);
    await fetchReviews();
  }

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  return {
    reviews,
    loading,
    error,
    addReview,
    updateReview,
    deleteReview,
    refetch: fetchReviews,
  };
}
