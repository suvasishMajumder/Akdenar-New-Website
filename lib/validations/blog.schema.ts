import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  shortDescription: z.string().optional(),
  coverImage: z.string().url("Invalid URL").optional().or(z.literal("")),
  tags: z.string().optional(), // Comma separated string for UI
  isPublished: z.boolean(),
  author: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type BlogSchema = z.infer<typeof blogSchema>;
