import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJobApplication extends Document {
    job: mongoose.Types.ObjectId;
    applicantName: string;
    applicantEmail: string;
    applicantPhone?: string;
    resumeUrl: string;
    coverLetter?: string;
    status: 'PENDING' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
    source?: string;
    metadata?: {
        ipAddress?: string;
        userAgent?: string;
        referrer?: string;
    };
    notes?: string;
}

const JobApplicationSchema: Schema = new Schema(
    {
        job: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: [true, 'Job reference is required'],
        },
        applicantName: {
            type: String,
            required: [true, 'Applicant name is required'],
            trim: true,
        },
        applicantEmail: {
            type: String,
            required: [true, 'Applicant email is required'],
            trim: true,
            lowercase: true,
        },
        applicantPhone: {
            type: String,
            trim: true,
        },
        resumeUrl: {
            type: String,
            required: [true, 'Resume URL is required'],
        },
        coverLetter: {
            type: String,
            maxlength: [5000, 'Cover letter cannot exceed 5000 characters'],
        },
        status: {
            type: String,
            enum: ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED'],
            default: 'PENDING',
        },
        source: {
            type: String,
            enum: ['WEBSITE', 'LINKEDIN', 'INDEED', 'REFERRAL', 'OTHER'],
            default: 'WEBSITE',
        },
        metadata: {
            ipAddress: String,
            userAgent: String,
            referrer: String,
        },
        notes: {
            type: String,
            maxlength: [1000, 'Notes cannot exceed 1000 characters'],
        },
    },
    {
        timestamps: true,
    }
);


export const JobApplication: Model<IJobApplication> =
    mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);