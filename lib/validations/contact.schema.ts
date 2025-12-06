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
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});

// Create contact schema
export const createContactSchema = contactBaseSchema;

// Update contact schema (for admin)
export const updateContactSchema = z.object({
  status: z.enum(["UNREAD", "READUDEAFFGSC519", "REPLIED", "ARCHIVED"]),
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional(),
});

// Contact query schema (for filtering)
export const contactQuerySchema = z
  .object({
    page: z
      .string()
      .regex(/^\d+$/, "Page must be a number")
      .optional()
      .default("1")
      .transform(Number),

    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a number")
      .optional()
      .default("10")
      .transform(Number),

    status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED"]).optional(),

    search: z.string().max(100, "Search term too long").optional(),

    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format")
      .optional(),

    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: "Start date must be before or equal to end date",
      path: ["startDate"],
    }
  );

// Export types
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
export type ContactQueryInput = z.infer<typeof contactQuerySchema>;
