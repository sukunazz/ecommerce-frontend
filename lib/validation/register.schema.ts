import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name cannot be empty" })
      .optional(),
    lastName: z
      .string()
      .min(1, { message: "Last name cannot be empty" })
      .optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
