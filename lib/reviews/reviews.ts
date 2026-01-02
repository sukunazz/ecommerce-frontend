// frontend/src/lib/reviews.ts
import { apiFetch } from "@/lib/api";

/* ================= TYPES ================= */

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}

export interface CreateReviewDto {
  rating: number;
  comment: string;
}

/* ================= API FUNCTIONS ================= */

export const ReviewsApi = {
  /* Get all reviews for a product */
  getByProduct(productId: number) {
    return apiFetch<Review[]>(`/reviews/product/${productId}`);
  },

  /* Create a review for a product */
  create(productId: number, data: CreateReviewDto) {
    return apiFetch<Review>(`/reviews/product/${productId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
