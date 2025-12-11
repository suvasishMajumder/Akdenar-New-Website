import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
}

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true, // cloud upload URL
    },

    coverLetter: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

const JobApplication: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", jobApplicationSchema);

export default JobApplication;
