import { NextRequest, NextResponse } from "next/server";
import { newsletterSubscribeSchema } from "@/lib/validations/newsletter.schema";
import { sanitizeData, validateBody } from "@/lib/validations/validation";
import connectDB from "@/lib/mongodb";
import { Newsletter } from "@/models/newsletter";

export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const validationResult = await validateBody(
      newsletterSubscribeSchema,
      request
    );

    if (validationResult instanceof NextResponse) {
      return validationResult;
    }

    const { data: validatedData } = validationResult;

    // Sanitize data
    const sanitizedData = sanitizeData(validatedData);

    // Connect to database
    await connectDB();

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({
      email: sanitizedData.email,
    });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          {
            success: false,
            error: "This email is already subscribed to our newsletter",
          },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();

        return NextResponse.json(
          {
            success: true,
            message: "Welcome back! Your subscription has been reactivated",
            data: {
              email: existingSubscriber.email,
              subscribedAt: existingSubscriber.subscribedAt,
            },
          },
          { status: 200 }
        );
      }
    }

    // Create new subscription
    const subscription = await Newsletter.create(sanitizedData);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to our newsletter!",
        data: {
          email: subscription.email,
          subscribedAt: subscription.subscribedAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);

    // Handle duplicate email (in case of race condition)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "This email is already subscribed",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to subscribe. Please try again later",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .select("email subscribedAt");

    return NextResponse.json(
      {
        success: true,
        data: subscribers,
        count: subscribers.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch subscribers",
      },
      { status: 500 }
    );
  }
}
