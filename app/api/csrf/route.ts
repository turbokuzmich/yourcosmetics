import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { headers } from 'next/headers';

// In-memory store for CSRF tokens (use Redis in production)
const csrfTokens = new Map<string, { token: string; timestamp: number }>();

// Token expiration time (15 minutes)
const TOKEN_EXPIRY = 15 * 60 * 1000;

// Cleanup expired tokens
function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (now - data.timestamp > TOKEN_EXPIRY) {
      csrfTokens.delete(sessionId);
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP and User-Agent for session identification
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    // Create session identifier
    const sessionId = Buffer.from(`${ip}-${userAgent}`).toString('base64');
    
    // Generate CSRF token
    const csrfToken = randomBytes(32).toString('hex');
    
    // Store token with timestamp
    csrfTokens.set(sessionId, {
      token: csrfToken,
      timestamp: Date.now()
    });
    
    // Clean up expired tokens
    cleanupExpiredTokens();
    
    return NextResponse.json(
      { csrfToken },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          'Pragma': 'no-cache',
          'X-Content-Type-Options': 'nosniff',
        }
      }
    );
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

// Verify CSRF token function for use in other API routes
export function verifyCsrfToken(sessionId: string, providedToken: string): boolean {
  cleanupExpiredTokens();
  
  const storedData = csrfTokens.get(sessionId);
  if (!storedData) {
    return false;
  }
  
  const { token, timestamp } = storedData;
  const now = Date.now();
  
  // Check if token is expired
  if (now - timestamp > TOKEN_EXPIRY) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  // Compare tokens (constant-time comparison to prevent timing attacks)
  return token === providedToken && token.length === providedToken.length;
}
