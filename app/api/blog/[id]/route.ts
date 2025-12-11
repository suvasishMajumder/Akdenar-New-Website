import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/blog";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const data = await request.json();

    const updatePayload: any = { ...data };

    if (data.tags) {
      updatePayload.tags =
        typeof data.tags === "string"
          ? data.tags
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : data.tags;
    }

    // If publishing now and no published date exists, we might want to set it.
    // However, since we don't know the current state without fetching,
    // and this is a PATCH, we rely on the specific intent.
    // If we are strictly toggling status via the table, we might not want to reset publishedAt if it was already published before?
    // Actually, usually "Publishing" implies setting the date if it wasn't set.
    // But Mongoose `findByIdAndUpdate` with just the fields provided will only update those fields.
    // I need to be careful not to overwrite `tags` with [] if `tags` wasn't sent.

    // So the previous logic was:
    // const updatePayload = { ...data, tags: ... ? ... : [] } <--- This forced empty array if missing.

    // The corrected logic above `const updatePayload: any = { ...data };` creates a shallow copy.
    // Then conditionally processes tags ONLY if they exist.

    if (data.isPublished === true) {
      // We can't easily check current doc 'publishedAt' here without a fetch.
      // But usually if you publish, you set the date.
      // Let's check if publishedAt is provided in data.
      if (!data.publishedAt) {
        // If not provided, we should probably set it, BUT what if it was already published?
        // A simple toggle usually just flips the boolean.
        // Ideally we should fetch first to be safe or use $set / $setOnInsert styles.
        // But simpler: fetch first.
        const currentBlog = await Blog.findById(params.id);
        if (currentBlog && !currentBlog.publishedAt) {
          updatePayload.publishedAt = new Date();
        }
      }
    }

    const blog = await Blog.findByIdAndUpdate(params.id, updatePayload, {
      new: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error: any) {
    console.error("Update Blog Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
