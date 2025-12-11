import { NextRequest, NextResponse } from 'next/server';
import { createContactSchema } from '@/lib/validations/contact.schema';
import { sanitizeData, validateBody } from '@/lib/validations/validation';
import connectDB from '@/lib/mongodb';
import { Contact } from '@/models/contact';

export async function POST(request: NextRequest) {
    try {
        // Validate request body
        const validationResult = await validateBody(createContactSchema, request);

        if (validationResult instanceof NextResponse) { 
            return validationResult;
        }

        const { data: validatedData } = validationResult;

        // Sanitize data
        const sanitizedData = sanitizeData(validatedData);

        // Connect to database
        await connectDB();

        // Create contact
        const contact = await Contact.create(sanitizedData);

        return NextResponse.json(
            {
                success: true,
                message: 'Message sent successfully',
                data: {
                    id: contact._id,
                    name: contact.name,
                    email: contact.email,
                    createdAt: contact.createdAt,
                }
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Contact submission error:', error);

        // Handle duplicate email submission (if needed)
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'You have already submitted a message recently'
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to submit message'
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const contacts = await Contact.find().sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                data: contacts
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch contacts'
            },
            { status: 500 }
        );
    }
}
