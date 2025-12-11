import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import JobApplication from "@/models/jobApplication";
import Job from "@/models/job";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: jobId } = await params;

    // Verify job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { success: false, error: "Job not found" },
        { status: 404 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File;

    // Validate required fields
    if (!fullName || !phone || !resume) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload resume to Cloudinary
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "job-applications",
          resource_type: "auto", // Supports PDF, DOC, DOCX
          format: resume.name.split(".").pop(), // Preserve file extension
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Create job application
    const application = await JobApplication.create({
      jobId,
      fullName,
      phone,
      resumeUrl: uploadResult.secure_url,
      coverLetter: coverLetter || "",
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit application",
      },
      { status: 500 }
    );
  }
}
