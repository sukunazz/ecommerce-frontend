export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  total: number;
  address: string;
  status: "CREATED" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  createdAt: string;
  items: OrderItem[];
}
