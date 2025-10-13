import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { generateCsrfToken, createSessionId } from "../utils/csrf";

export async function GET(request: NextRequest) {
  try {
    // Get client IP and User-Agent for session identification
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwarded?.split(",")[0] || realIp || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // Create session identifier
    const sessionId = createSessionId(ip, userAgent);

    // Generate CSRF token
    const csrfToken = generateCsrfToken(sessionId);

    return NextResponse.json(
      { csrfToken },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, private",
          Pragma: "no-cache",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (error) {
    console.error("CSRF token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
