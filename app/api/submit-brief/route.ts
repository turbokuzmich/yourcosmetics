import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { headers } from 'next/headers';
import { verifyCsrfToken } from '../csrf/route';

// Server-side validation schemas (identical to client-side)
const productSpecSchema = z.object({
  brand: z.string().min(1, "Название бренда обязательно").max(100, "Название бренда слишком длинное"),
  collection: z.string().min(1, "Название коллекции обязательно").max(100, "Название коллекции слишком длинное"),
  productName: z.string().min(1, "Рабочее название продукта обязательно").max(150, "Название продукта слишком длинное"),
  marketingClaims: z.string().max(1000, "Маркетинговые клеймы слишком длинные").optional(),
  marketingClaimsProperties: z.string().max(1000, "Свойства слишком длинные").optional(),
  analogues: z.string().max(1000, "Аналоги слишком длинные").optional(),
  primaryPackaging: z.string().max(1000, "Описание упаковки слишком длинное").optional(),
  packagingAnalogues: z.string().max(1000, "Аналоги упаковки слишком длинные").optional(),
  packagingVolume: z.string().max(50, "Объем упаковки слишком длинный").optional(),
  designIdeas: z.string().max(1000, "Идеи дизайнов слишком длинные").optional(),
  textureDescription: z.string().max(1000, "Описание текстуры слишком длинное").optional(),
  components: z.string().max(1000, "Компоненты слишком длинные").optional(),
  fragrance: z.string().max(500, "Отдушка слишком длинная").optional(),
  textureBench: z.string().max(200, "Бенч слишком длинный").optional(),
  tonesCount: z.string().max(50, "Количество тонов слишком длинное").optional(),
  purchaseVolumes: z.string().max(200, "Объемы закупки слишком длинные").optional(),
  targetCost: z.string().max(100, "Целевая стоимость слишком длинная").optional(),
  plannedDeliveryDate: z.string().max(100, "Дата доставки слишком длинная").optional(),
});

const formSchema = z.object({
  // Basic customer information with length limits
  name: z.string().min(1, "Имя обязательно").max(100, "Имя слишком длинное"),
  company: z.string().max(200, "Название компании слишком длинное").optional(),
  email: z.string().email("Некорректный email").max(100, "Email слишком длинный"),
  phone: z.string().max(30, "Телефон слишком длинный").optional(),
  
  // Security fields
  csrfToken: z.string().min(1, "CSRF token is required"),
  honeypot: z.string().length(0, "Bot detected"), // Should be empty
  
  // Product specifications (limited to 10 products max)
  products: z.array(productSpecSchema).min(1, "Добавьте хотя бы один продукт").max(10, "Максимум 10 продуктов"),
});

// Rate limiting storage (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 5 requests
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

// Input sanitization function
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 10000); // Hard limit on input length
}

// Deep sanitize object
function sanitizeFormData(data: any): any {
  if (typeof data === 'string') {
    return sanitizeString(data);
  } else if (Array.isArray(data)) {
    return data.map(sanitizeFormData);
  } else if (data && typeof data === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeFormData(value);
    }
    return sanitized;
  }
  return data;
}

// Rate limiting check
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  // Increment count
  userLimit.count++;
  rateLimitStore.set(ip, userLimit);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get headers
    const headersList = await headers();
    const contentType = headersList.get('content-type');
    const origin = headersList.get('origin');
    const referer = headersList.get('referer');
    const userAgent = headersList.get('user-agent');
    
    // Get client IP
    const forwarded = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'unknown';
    
    // Security checks
    
    // 1. Content-Type validation
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }
    
    // 2. Origin/Referer validation (basic CSRF protection)
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'https://cosmetics.info',
      'https://www.cosmetics.info'
    ];
    
    const originValid = origin && allowedOrigins.some(allowed => origin.startsWith(allowed));
    const refererValid = referer && allowedOrigins.some(allowed => referer.startsWith(allowed));
    
    if (!originValid && !refererValid) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      );
    }
    
    // 3. Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': '900' // 15 minutes
          }
        }
      );
    }
    
    // 4. User-Agent validation (basic bot detection)
    if (!userAgent || userAgent.length < 10) {
      return NextResponse.json(
        { error: 'Invalid user agent' },
        { status: 400 }
      );
    }
    
    // 5. Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }
    
    // 6. Check request size (approximate)
    const bodyStr = JSON.stringify(body);
    if (bodyStr.length > 50000) { // 50KB limit
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }
    
    // 7. CSRF token validation
    const sessionId = Buffer.from(`${ip}-${userAgent}`).toString('base64');
    if (!body.csrfToken || !verifyCsrfToken(sessionId, body.csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    
    // 8. Sanitize input data
    const sanitizedData = sanitizeFormData(body);
    
    // 9. Server-side validation
    const validationResult = formSchema.safeParse(sanitizedData);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }
    
    const validatedData = validationResult.data;
    
    // 10. Additional business logic validation
    if (validatedData.products.length > 10) {
      return NextResponse.json(
        { error: 'Too many products' },
        { status: 400 }
      );
    }
    
    // Log the submission (in production, log to a secure location)
    console.log('Form submission received:', {
      ip,
      userAgent: userAgent.substring(0, 100),
      timestamp: new Date().toISOString(),
      customerEmail: validatedData.email,
      productsCount: validatedData.products.length,
    });
    
    // Here you would typically:
    // - Save to database
    // - Send email notification
    // - Integrate with CRM
    // - Generate unique submission ID
    
    // For now, simulate processing
    const submissionId = `BRIEF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Бриф успешно отправлен!',
        submissionId 
      },
      { 
        status: 200,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
        }
      }
    );
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
