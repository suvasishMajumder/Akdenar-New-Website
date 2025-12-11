import { z } from "zod";

// Base job schema for API/Database
export const jobBaseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),

  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(10000, "Description cannot exceed 10000 characters"),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(200, "Location cannot exceed 200 characters"),
  workplaceType: z.enum(["Remote", "On-site", "Hybrid"]),
  postedAt: z
    .date()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  deadline: z
    .date()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  positions: z
    .number()
    .min(1, "At least one position required")
    .optional()
    .default(1),
  experience: z.object({
    min: z
      .number()
      .min(0, "Minimum experience must be positive")
      .optional()
      .default(0),
    max: z
      .number()
      .min(0, "Maximum experience must be positive")
      .optional()
      .default(0),
  }),
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),

  skills: z.array(z.string().max(100)).max(50).default([]),
});

// Form input schema (skills as comma-separated string)
export const jobFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),

  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(10000, "Description cannot exceed 10000 characters"),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(200, "Location cannot exceed 200 characters"),
  workplaceType: z.enum(["Remote", "On-site", "Hybrid"]),
  deadline: z.string().optional(),
  positions: z.number().min(1, "At least one position required"),
  experience: z.object({
    min: z.number().min(0, "Minimum experience must be positive"),
    max: z.number().min(0, "Maximum experience must be positive"),
  }),
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),
  skills: z.string(), // Comma-separated string for form input
});

// Create job schema
export const createJobSchema = jobBaseSchema;

// Export types
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type JobFormInput = z.infer<typeof jobFormSchema>;
