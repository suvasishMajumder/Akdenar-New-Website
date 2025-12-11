import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import JobApplication from "@/models/jobApplication";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const applications = await JobApplication.find()
      .populate("jobId", "title location type")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}
