import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // SMTP transporter (your domain mail)
    const transporter = nodemailer.createTransport({
      host: "mail.graphodio.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true, // Enable debug output
      logger: true // Enable logger
    });

    // Test connection first
    transporter.verify(function (error, success) {
      if (error) {
        console.log('SMTP connection error:', error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // Email options (multiple recipients)
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: [process.env.SMTP_USER, process.env.SMTP_USER_BACKUP],
      subject: `Graphodio - New Contact Form Submission for ${service}`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
    <div style="background: #0d6efd; padding: 16px; text-align: center; color: white;">
      <h2 style="margin: 0;">📩 New Contact Form Submission</h2>
    </div>
    <div style="padding: 20px; background: #fafafa;">
      <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 0 0 10px;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 0 0 10px;"><strong>Service:</strong> ${service}</p>
      <p style="margin: 0;"><strong>Message:</strong></p>
      <div style="margin-top: 8px; padding: 12px; background: #fff; border: 1px solid #ddd; border-radius: 6px; white-space: pre-line;">
        ${message}
      </div>
    </div>
    <div style="background: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #555;">
      <p style="margin: 4px 0;">This message was sent from the <strong>Graphodio</strong> website.</p>
    </div>
  </div>
  `,
    };


    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
