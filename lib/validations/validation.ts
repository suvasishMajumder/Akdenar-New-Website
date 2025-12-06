import { ZodType, ZodError } from "zod";
import { NextResponse } from "next/server";

// Generic validation function
export async function validateRequest<T>(
  schema: ZodType<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: string[] }> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return { success: false, errors };
    }
    return { success: false, errors: ["Validation failed"] };
  }
}

// API validation middleware
export async function validateBody<T>(
  schema: ZodType<T>,
  request: Request
): Promise<{ success: true; data: T } | NextResponse> {
  try {
    const body = await request.json();
    const result = await validateRequest(schema, body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.errors,
        },
        { status: 400 }
      );
    }

    return { success: true, data: result.data };
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON body",
      },
      { status: 400 }
    );
  }
}

// Validate query parameters
export function validateQuery<T>(
  schema: ZodType<T>,
  request: Request
): { success: true; data: T } | NextResponse {
  try {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    const result = schema.safeParse(params);

    if (!result.success) {
      const errors = result.error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return NextResponse.json(
        {
          success: false,
          errors,
        },
        { status: 400 }
      );
    }

    return { success: true, data: result.data };
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid query parameters",
      },
      { status: 400 }
    );
  }
}

// Sanitize data (XSS protection)
export function sanitizeData<T extends Record<string, any>>(data: T): T {
  const sanitized: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      // Basic XSS protection
      sanitized[key] = value.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string"
          ? item.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim()
          : item
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
