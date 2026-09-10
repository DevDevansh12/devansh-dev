import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a message of at least 5 characters." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();
    const emailSubject = subject?.trim() || `New Portfolio Message from ${trimmedName}`;

    // Read SMTP environment variables
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const isSecure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER || "74devanshvariya@gmail.com";
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || "74devanshvariya@gmail.com";

    // If SMTP_PASS is missing or still using placeholder
    if (!pass || pass === "your-app-password-here" || pass.trim() === "") {
      console.warn(
        "⚠️ [SMTP Warning]: SMTP_PASS is not configured in .env.local.\n" +
        "To enable direct SMTP delivery, generate a 16-character App Password at:\n" +
        "https://myaccount.google.com/apppasswords and add it to your .env.local as SMTP_PASS=xxxx xxxx xxxx xxxx"
      );

      return NextResponse.json(
        {
          error: "SMTP server credentials are not fully configured yet. Please update SMTP_PASS in .env.local or reach out via WhatsApp.",
          code: "SMTP_UNCONFIGURED",
        },
        { status: 503 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: isSecure,
      auth: {
        user,
        pass,
      },
      tls: {
        // Do not fail on invalid certificates in development
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Formatted HTML Email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #2563eb 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0 0; opacity: 0.9; font-size: 13px; }
            .content { padding: 32px 28px; }
            .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 4px; }
            .value { font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-all; }
            .message-box { background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #06b6d4; border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #ffffff; }
            .button { display: inline-block; background: #0284c7; color: #ffffff !important; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Portfolio Contact Form Submission</h1>
              <p>Received via Devansh Variya Portfolio</p>
            </div>
            <div class="content">
              <div class="card">
                <div style="margin-bottom: 12px;">
                  <div class="label">Sender Name</div>
                  <div class="value">${escapeHtml(trimmedName)}</div>
                </div>
                <div style="margin-bottom: 12px;">
                  <div class="label">Sender Email</div>
                  <div class="value"><a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(trimmedEmail)}</a></div>
                </div>
                <div>
                  <div class="label">Received Timestamp</div>
                  <div class="value">${escapeHtml(timestamp)} IST</div>
                </div>
              </div>

              <div class="label" style="margin-bottom: 8px;">Message Content</div>
              <div class="message-box">${escapeHtml(trimmedMessage)}</div>

              <div style="text-align: center;">
                <a href="mailto:${escapeHtml(trimmedEmail)}?subject=Re: ${encodeURIComponent(emailSubject)}" class="button">
                  Reply to ${escapeHtml(trimmedName)}
                </a>
              </div>
            </div>
            <div class="footer">
              Sent directly through your Next.js portfolio contact SMTP service.
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text fallback
    const textContent = `
New Contact Inquiry from Devansh Variya's Portfolio
---------------------------------------------------
Name: ${trimmedName}
Email: ${trimmedEmail}
Date: ${timestamp} IST

Message:
${trimmedMessage}
---------------------------------------------------
Reply directly to this email to contact ${trimmedName}.
    `.trim();

    // Send Mail
    const info = await transporter.sendMail({
      from: `"Devansh Portfolio Form" <${user}>`,
      to: receiver,
      replyTo: trimmedEmail,
      subject: `[Portfolio Inquiry] ${emailSubject}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully via SMTP!",
      messageId: info.messageId,
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    console.error("❌ [SMTP Error]:", err);

    let clientMessage = "Failed to send email. Please try again or reach out directly on WhatsApp.";
    if (err.code === "EAUTH") {
      clientMessage = "SMTP authentication failed. Please check your email credentials or App Password.";
    } else if (err.code === "ESOCKET" || err.code === "ETIMEDOUT") {
      clientMessage = "SMTP server connection timed out. Please check your network or host settings.";
    }

    return NextResponse.json(
      {
        error: clientMessage,
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}
