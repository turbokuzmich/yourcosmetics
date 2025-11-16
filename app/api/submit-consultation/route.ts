import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

// Email configuration
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Function to format consultation form data into readable text
const formatConsultationDataForEmail = (
  data: any,
  submissionId: string
): string => {
  const { fullName, email, phone, question } = data;

  let emailContent = `📞 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ\n`;
  emailContent += `📄 ID заявки: ${submissionId}\n`;
  emailContent += `📅 Дата: ${new Date().toLocaleString("ru-RU")}\n\n`;

  emailContent += `👤 ИНФОРМАЦИЯ О КЛИЕНТЕ:\n`;
  emailContent += `• ФИО: ${fullName}\n`;
  emailContent += `• Email: ${email}\n`;
  emailContent += `• Телефон: ${phone}\n`;
  emailContent += `\n`;

  emailContent += `❓ ВОПРОС КЛИЕНТА:\n`;
  emailContent += `${question}\n\n`;

  emailContent += `\n📧 Ответьте клиенту: ${email}\n`;
  emailContent += `📞 Позвоните клиенту: ${phone}\n`;

  return emailContent;
};

// Function to send email
const sendEmailNotification = async (
  formData: any,
  submissionId: string
): Promise<boolean> => {
  try {
    const transporter = createEmailTransporter();

    const emailContent = formatConsultationDataForEmail(formData, submissionId);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `📞 Новая заявка на консультацию от ${formData.fullName} - ${submissionId}`,
      text: emailContent,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

// Server-side validation schema
const consultationFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "ФИО обязательно")
    .max(150, "ФИО слишком длинное"),
  email: z
    .string()
    .email("Некорректный email")
    .max(100, "Email слишком длинный"),
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .max(30, "Телефон слишком длинный"),
  question: z
    .string()
    .min(1, "Вопрос обязателен")
    .max(2000, "Вопрос слишком длинный"),
  // Security fields
  csrfToken: z.string().min(1, "CSRF token is required"),
  honeypot: z.string().length(0, "Bot detected"), // Should be empty
});

// Rate limiting storage (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 5 requests
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

// Input sanitization function
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .slice(0, 10000); // Hard limit on input length
}

// Deep sanitize object
function sanitizeFormData(data: any): any {
  if (typeof data === "string") {
    return sanitizeString(data);
  } else if (Array.isArray(data)) {
    return data.map(sanitizeFormData);
  } else if (data && typeof data === "object") {
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
    const contentType = headersList.get("content-type");
    const origin = headersList.get("origin");
    const referer = headersList.get("referer");
    const userAgent = headersList.get("user-agent");

    // Get client IP
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwarded?.split(",")[0] || realIp || "unknown";

    // Security checks

    // 1. Content-Type validation
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    // 2. Origin/Referer validation (basic CSRF protection)
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "https://cosmetics.info",
      "https://www.cosmetics.info",
    ];

    const originValid =
      origin && allowedOrigins.some((allowed) => origin.startsWith(allowed));
    const refererValid =
      referer && allowedOrigins.some((allowed) => referer.startsWith(allowed));

    if (!originValid && !refererValid) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    // 3. Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "900", // 15 minutes
          },
        }
      );
    }

    // 4. User-Agent validation (basic bot detection)
    if (!userAgent || userAgent.length < 10) {
      return NextResponse.json(
        { error: "Invalid user agent" },
        { status: 400 }
      );
    }

    // 5. Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // 6. Check request size (approximate)
    const bodyStr = JSON.stringify(body);
    if (bodyStr.length > 50000) {
      // 50KB limit
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    // 7. Sanitize input data
    const sanitizedData = sanitizeFormData(body);

    // 8. Server-side validation
    const validationResult = consultationFormSchema.safeParse(sanitizedData);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Generate unique submission ID
    const submissionId = `CONSULT-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // Log the submission (in production, log to a secure location)
    console.log("Consultation form submission received:", {
      ip,
      userAgent: userAgent.substring(0, 100),
      timestamp: new Date().toISOString(),
      customerEmail: validatedData.email,
      submissionId,
    });

    // Send email notification
    const emailSent = await sendEmailNotification(validatedData, submissionId);

    if (!emailSent) {
      console.error(
        "Failed to send email notification for submission:",
        submissionId
      );
      // Note: We still return success to the user to avoid revealing email issues
    } else {
      console.log(
        "Email notification sent successfully for submission:",
        submissionId
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Заявка на консультацию успешно отправлена!",
        submissionId,
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
        },
      }
    );
  } catch (error) {
    console.error("Consultation form submission error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

