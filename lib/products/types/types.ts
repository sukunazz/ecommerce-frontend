export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  createdAt?: string;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc";
  page?: number;
  limit?: number;
}
