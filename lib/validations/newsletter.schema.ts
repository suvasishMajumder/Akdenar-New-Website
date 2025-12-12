import { z } from "zod";

// Newsletter subscription schema
export const newsletterSubscribeSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(100, "Email cannot exceed 100 characters"),
});

// Export types
export type NewsletterSubscribeInput = z.infer<
  typeof newsletterSubscribeSchema
>;
