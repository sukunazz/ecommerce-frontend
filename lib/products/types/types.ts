export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  createdAt: string;
  averageRating?: number;
  reviewCount?: number;
}

/* sorting values supported by backend */
export type ProductSort = "newest" | "price_asc" | "price_desc";

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

/* backend pagination response */
export interface PaginatedProducts {
  items: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
