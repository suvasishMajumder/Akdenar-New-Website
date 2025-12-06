import { z } from 'zod';

// Salary range schema
export const salaryRangeSchema = z.object({
    min: z.number()
        .min(0, 'Minimum salary must be positive')
        .max(10000000, 'Salary too high'),

    max: z.number()
        .min(0, 'Maximum salary must be positive')
        .max(10000000, 'Salary too high'),

    currency: z.string()
        .length(3, 'Currency must be 3 characters')
        .default('USD'),
}).refine(
    (data) => data.max >= data.min,
    {
        message: 'Maximum salary must be greater than or equal to minimum salary',
        path: ['max'],
    }
);

// Job metadata schema
export const jobMetadataSchema = z.object({
    tags: z.array(z.string().max(50)).max(20).default([]),
    benefits: z.array(z.string().max(200)).max(30).default([]),
    skills: z.array(z.string().max(100)).max(50).default([]),
});

// Base job schema
export const jobBaseSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters')
        .max(200, 'Title cannot exceed 200 characters'),

    department: z.string()
        .min(2, 'Department must be at least 2 characters')
        .max(100, 'Department cannot exceed 100 characters'),

    description: z.string()
        .min(50, 'Description must be at least 50 characters')
        .max(10000, 'Description cannot exceed 10000 characters'),

    responsibilities: z.array(
        z.string().min(10, 'Responsibility must be at least 10 characters')
    ).max(50, 'Too many responsibilities').default([]),

    requirements: z.array(
        z.string().min(10, 'Requirement must be at least 10 characters')
    ).max(50, 'Too many requirements').default([]),

    location: z.string()
        .min(2, 'Location must be at least 2 characters')
        .max(200, 'Location cannot exceed 200 characters'),

    type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE']),

    category: z.enum([
        'PRODUCT',
        'ENGINEERING',
        'DESIGN',
        'DATA_ANALYTICS',
        'MARKETING',
        'SALES',
        'OPERATIONS',
        'HR'
    ]),

    experienceLevel: z.enum(['ENTRY', 'MID', 'SENIOR', 'LEAD']).optional(),

    salaryRange: salaryRangeSchema.optional(),

    isActive: z.boolean().default(true),

    expiresAt: z.string()
        .datetime('Invalid date format')
        .optional()
        .transform(val => val ? new Date(val) : undefined),

    metadata: jobMetadataSchema.optional(),
});

// Create job schema
export const createJobSchema = jobBaseSchema;

// Update job schema
export const updateJobSchema = jobBaseSchema.partial();

// Job query schema (for filtering)
export const jobQuerySchema = z.object({
    page: z.string()
        .regex(/^\d+$/, 'Page must be a number')
        .optional()
        .default('1')
        .transform(Number),

    limit: z.string()
        .regex(/^\d+$/, 'Limit must be a number')
        .optional()
        .default('10')
        .transform(Number),

    category: z.enum([
        'PRODUCT', 'ENGINEERING', 'DESIGN', 'DATA_ANALYTICS',
        'MARKETING', 'SALES', 'OPERATIONS', 'HR'
    ]).optional(),

    type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE']).optional(),

    location: z.string().max(100).optional(),

    experienceLevel: z.enum(['ENTRY', 'MID', 'SENIOR', 'LEAD']).optional(),

    search: z.string().max(100).optional(),

    isActive: z.enum(['true', 'false']).optional().transform(val => val === 'true'),

    minSalary: z.string()
        .regex(/^\d+$/, 'Min salary must be a number')
        .optional()
        .transform(val => val ? Number(val) : undefined),

    maxSalary: z.string()
        .regex(/^\d+$/, 'Max salary must be a number')
        .optional()
        .transform(val => val ? Number(val) : undefined),

    sortBy: z.enum([
        'createdAt', 'publishedAt', 'title', 'location', 'salary'
    ]).optional(),

    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Export types
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobQueryInput = z.infer<typeof jobQuerySchema>;
export type SalaryRangeInput = z.infer<typeof salaryRangeSchema>;