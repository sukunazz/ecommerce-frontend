// frontend/src/lib/validation/checkout.schema.ts
import { z } from "zod";

export const checkoutSchema = z.object({
  address: z.string().min(5, "Address is too short"),
  cartItemIds: z.array(z.number()).min(1, "No items selected"),
  coupon: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
