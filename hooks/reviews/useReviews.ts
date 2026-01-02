"use client";

import { useEffect, useState } from "react";
import {
  ReviewsApi,
  Review,
  CreateReviewDto,
  UpdateReviewDto,
} from "@/lib/reviews/reviews";
import { useAuthContext } from "@/context/authContext/AuthContext";

export function useReviews(productId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext(); // current logged in user

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
    try {
      const newReview = await ReviewsApi.create(productId, data);
      setReviews((prev) => [newReview, ...prev]); // prepend so new review appears immediately
    } catch (err: any) {
      throw err;
    }
  }

  async function updateReview(reviewId: number, data: UpdateReviewDto) {
    try {
      const updated = await ReviewsApi.update(reviewId, data);
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? updated : r)));
    } catch (err: any) {
      throw err;
    }
  }

  async function deleteReview(reviewId: number) {
    try {
      await ReviewsApi.delete(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err: any) {
      throw err;
    }
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
    currentUser: user,
    refetch: fetchReviews,
  };
}
