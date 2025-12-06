import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory storage (replace with database)
let jobs = [
    {
        id: '1',
        title: 'Product Manager',
        department: 'Product',
        description: 'Drive product strategy for solutions that impact millions. Collaborate with cross-functional teams to identify and solve pressing global challenges.',
        location: 'San Francisco',
        type: 'Full-time',
        category: 'Product',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Data Scientist',
        department: 'Data & Analytics',
        description: 'Leverage data to uncover insights that drive meaningful impact. Build models and systems that help solve complex real-world problems at scale.',
        location: 'Boston / Remote',
        type: 'Full-time',
        category: 'Data & Analytics',
        createdAt: new Date().toISOString()
    }
];

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const location = searchParams.get('location');

        let filteredJobs = jobs;

        // Filter by category
        if (category) {
            filteredJobs = filteredJobs.filter(job =>
                job.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filter by location
        if (location) {
            filteredJobs = filteredJobs.filter(job =>
                job.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        return NextResponse.json(
            {
                success: true,
                jobs: filteredJobs,
                total: filteredJobs.length
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Get jobs error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, department, description, location, type, category } = body;

        // Validation
        if (!title || !department || !description || !location || !type || !category) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const newJob = {
            id: (jobs.length + 1).toString(),
            title,
            department,
            description,
            location,
            type,
            category,
            createdAt: new Date().toISOString()
        };

        // Add to array (in production, save to database)
        jobs.push(newJob);

        return NextResponse.json(
            {
                success: true,
                message: 'Job created successfully',
                job: newJob
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Create job error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}