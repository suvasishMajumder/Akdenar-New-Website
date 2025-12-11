import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJob extends Document {
  title: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workplaceType: "Remote" | "On-site" | "Hybrid";
  description: string;
  postedAt: Date;
  deadline: Date | null;
  positions: number;
  experience: {
    min: number;
    max: number;
  };
  skills: string[];
  slug?: string; // for detail page
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },

    workplaceType: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
      default: "Hybrid",
    },

    description: {
      type: String,
      required: true,
    },

    postedAt: {
      type: Date,
      default: Date.now,
    },

    deadline: {
      type: Date,
      default: null,
    },

    positions: {
      type: Number,
      min: [1, "At least one position required"],
      default: 1,
    },

    experience: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Job: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);

export default Job;
