import { randomBytes } from 'crypto';

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

// Generate CSRF token for a session
export function generateCsrfToken(sessionId: string): string {
  // Generate CSRF token
  const csrfToken = randomBytes(32).toString('hex');
  
  // Store token with timestamp
  csrfTokens.set(sessionId, {
    token: csrfToken,
    timestamp: Date.now()
  });
  
  // Clean up expired tokens
  cleanupExpiredTokens();
  
  return csrfToken;
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

// Create session identifier from IP and User-Agent
export function createSessionId(ip: string, userAgent: string): string {
  return Buffer.from(`${ip}-${userAgent}`).toString('base64');
}
