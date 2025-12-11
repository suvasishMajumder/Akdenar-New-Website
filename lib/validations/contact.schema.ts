import { z } from "zod";

// Common regex patterns
export const phoneRegex =
  /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Base contact schema
export const contactBaseSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .email("Please provide a valid email address")
    .max(100, "Email cannot exceed 100 characters"),

  phone: z
    .string()
    .regex(phoneRegex, "Please provide a valid phone number")
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});

// Create contact schema
export const createContactSchema = contactBaseSchema;

// Export types
export type CreateContactInput = z.infer<typeof createContactSchema>;
