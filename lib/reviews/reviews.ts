import { apiFetch } from "@/lib/api";

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: { id: number; name: string; email: string };
}

export interface CreateReviewDto {
  rating: number;
  comment: string;
}
export interface UpdateReviewDto {
  rating: number;
  comment: string;
}

export const ReviewsApi = {
  getByProduct(productId: number) {
    return apiFetch<Review[]>(`/reviews/product/${productId}`);
  },
  create(productId: number, data: CreateReviewDto) {
    return apiFetch<Review>(`/reviews/product/${productId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(reviewId: number, data: UpdateReviewDto) {
    return apiFetch<Review>(`/reviews/${reviewId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
  delete(reviewId: number) {
    return apiFetch<{ success: boolean }>(`/reviews/${reviewId}`, {
      method: "DELETE",
    });
  },
};
