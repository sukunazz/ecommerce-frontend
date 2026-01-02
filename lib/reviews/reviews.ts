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
    name?: string;
    email: string;
  };
}

export interface CreateReviewDto {
  rating: number;
  comment: string;
}

export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}

/* ================= API FUNCTIONS ================= */

export const ReviewsApi = {
  // GET reviews for a product
  getByProduct(productId: number) {
    return apiFetch<Review[]>(`/reviews/product/${productId}`);
  },

  // CREATE a review
  create(productId: number, data: CreateReviewDto) {
    return apiFetch<Review>(`/reviews/product/${productId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // UPDATE a review
  update(reviewId: number, data: UpdateReviewDto) {
    return apiFetch<Review>(`/reviews/${reviewId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // DELETE a review
  delete(reviewId: number) {
    return apiFetch<{ message: string }>(`/reviews/${reviewId}`, {
      method: "DELETE",
    });
  },
};
