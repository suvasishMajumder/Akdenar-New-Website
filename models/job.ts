import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJob extends Document {
    title: string;
    slug: string;
    department: string;
    description: string;
    responsibilities?: string[];
    requirements?: string[];
    location: string;
    type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE';
    category: string;
    experienceLevel?: 'ENTRY' | 'MID' | 'SENIOR' | 'LEAD';
    salaryRange?: {
        min: number;
        max: number;
        currency: string;
    };
    isActive: boolean;
    applicationCount: number;
    postedBy?: mongoose.Types.ObjectId;
    publishedAt: Date;
    expiresAt?: Date;
    metadata?: {
        tags: string[];
        benefits: string[];
        skills: string[];
    };
}

const JobSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters'],
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        department: {
            type: String,
            required: [true, 'Department is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
            minlength: [50, 'Description must be at least 50 characters'],
        },
        responsibilities: {
            type: [String],
            default: [],
        },
        requirements: {
            type: [String],
            default: [],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        type: {
            type: String,
            enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE'],
            required: [true, 'Job type is required'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['PRODUCT', 'ENGINEERING', 'DESIGN', 'DATA_ANALYTICS', 'MARKETING', 'SALES', 'OPERATIONS', 'HR'],
        },
        experienceLevel: {
            type: String,
            enum: ['ENTRY', 'MID', 'SENIOR', 'LEAD'],
        },
        salaryRange: {
            min: { type: Number },
            max: { type: Number },
            currency: { type: String, default: 'USD' },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        applicationCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        publishedAt: {
            type: Date,
            default: Date.now,
        },
        expiresAt: {
            type: Date,
        },
        metadata: {
            tags: [{ type: String }],
            benefits: [{ type: String }],
            skills: [{ type: String }],
        },
    },
    {
        timestamps: true,
    }
);


export const Job: Model<IJob> =
    mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);