import { z } from 'zod';

// File validation (for resume upload)
export const fileSchema = z.object({
    name: z.string(),
    type: z.string().regex(/^application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/,
        'File must be PDF or Word document'),
    size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),
});

// Base application schema
export const applicationBaseSchema = z.object({
    jobId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid job ID format'),

    applicantName: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),

    applicantEmail: z.string()
        .email('Please provide a valid email address')
        .max(100, 'Email cannot exceed 100 characters'),

    applicantPhone: z.string()
        .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number')
        .optional(),

    coverLetter: z.string()
        .max(5000, 'Cover letter cannot exceed 5000 characters')
        .optional(),

    source: z.enum(['WEBSITE', 'LINKEDIN', 'INDEED', 'REFERRAL', 'OTHER'])
        .default('WEBSITE'),
});

// Create application schema (with file)
export const createApplicationSchema = applicationBaseSchema.extend({
    resume: fileSchema,
});

// Create application schema (with resume URL after upload)
export const createApplicationWithUrlSchema = applicationBaseSchema.extend({
    resumeUrl: z.string().url('Invalid resume URL'),
});

// Update application schema (for admin)
export const updateApplicationSchema = z.object({
    status: z.enum(['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED']),
    notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
    rating: z.number().min(1).max(5).optional(),
});

// Application query schema
export const applicationQuerySchema = z.object({
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

    jobId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid job ID format')
        .optional(),

    status: z.enum(['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED']).optional(),

    search: z.string().max(100).optional(),

    startDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .optional(),

    endDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .optional(),
});

// Export types
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type CreateApplicationWithUrlInput = z.infer<typeof createApplicationWithUrlSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type ApplicationQueryInput = z.infer<typeof applicationQuerySchema>;