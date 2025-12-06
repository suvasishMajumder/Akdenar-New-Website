import { NextRequest, NextResponse } from "next/server";

let jobs = [
  {
    id: "1",
    title: "Product Manager",
    department: "Product",
    description:
      "Drive product strategy for solutions that impact millions. Collaborate with cross-functional teams to identify and solve pressing global challenges.",
    location: "San Francisco",
    type: "Full-time",
    category: "Product",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Data Scientist",
    department: "Data & Analytics",
    description:
      "Leverage data to uncover insights that drive meaningful impact. Build models and systems that help solve complex real-world problems at scale.",
    location: "Boston / Remote",
    type: "Full-time",
    category: "Data & Analytics",
    createdAt: new Date().toISOString(),
  },
];
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = jobs.find((j) => j.id === id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        job,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const index = jobs.findIndex((j) => j.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    jobs[index] = {
      ...jobs[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Job updated successfully",
        job: jobs[index],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const index = jobs.findIndex((j) => j.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    jobs = jobs.filter((j) => j.id !== id);

    return NextResponse.json(
      {
        success: true,
        message: "Job deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
