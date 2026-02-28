import { NextResponse } from "next/server";
import { ContactNotificationTemplate } from "@/components/templates/contact-notification-template";
import { ContactTemplate } from "@/components/templates/contact-template";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "info@fedhahub.co.ke";
  const FROM_EMAIL = process.env.FROM_EMAIL || "info@fedhahub.co.ke";
  const ALTERNATE_EMAIL = process.env.ALTERNATE_EMAIL || "";

  try {
    const body = await req.json();
    const { 
      userName, 
      email, 
      message,
      website_url, // Honeypot field
    } = body;

    // Honeypot Check (Spam Prevention)
    if (website_url) {
      console.log("Spam attempt blocked (Honeypot):", { ip: req.headers.get("x-forwarded-for"), website_url });
      return NextResponse.json({ success: true });
    }

    // 1. Send notification to Business Team
    const toEmails = [BUSINESS_EMAIL];
    if (ALTERNATE_EMAIL) toEmails.push(ALTERNATE_EMAIL);

    await resend.emails.send({
      from: `FedhaHub Contact <${FROM_EMAIL}>`,
      to: toEmails,
      subject: `New Inquiry from ${userName}`,
      react: ContactNotificationTemplate({
        userName,
        userEmail: email,
        message,
      }),
    });

    // 2. Send acknowledgement to User
    if (email) {
      await resend.emails.send({
        from: `FedhaHub Team <${FROM_EMAIL}>`,
        to: [email],
        subject: `We've received your message, ${userName}`,
        react: ContactTemplate({
          userName,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
