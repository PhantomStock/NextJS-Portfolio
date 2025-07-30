"use server"

import { Resend } from "resend"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "All fields are required.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  // Get API key from environment or use the provided one
  const apiKey = process.env.RESEND_API_KEY || "re_JW8dorkA_ECRYWnoCppFJC89aUUw37hyB"

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured")
    return {
      success: false,
      message: "Email service is not configured. Please try again later.",
    }
  }

  try {
    // Initialize Resend with the API key
    const resend = new Resend(apiKey)

    // Send email using Resend - all emails go to wilcampos2003@gmail.com
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Default Resend domain
      to: ["wilcampos2003@gmail.com"], // Your verified email address
      replyTo: email, // Allow replying directly to the sender
      subject: `Portfolio Contact from ${name}: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .container {
                background-color: #ffffff;
                border-radius: 12px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                border-bottom: 3px solid #3b82f6;
                padding-bottom: 20px;
                margin-bottom: 30px;
                text-align: center;
              }
              .header h1 {
                color: #1e40af;
                margin: 0;
                font-size: 24px;
              }
              .header p {
                color: #6b7280;
                margin: 5px 0 0 0;
                font-size: 14px;
              }
              .content {
                margin-bottom: 30px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background-color: #f8fafc;
                border-radius: 8px;
                border-left: 4px solid #3b82f6;
              }
              .field-label {
                font-weight: 600;
                color: #374151;
                margin-bottom: 5px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .field-value {
                color: #1f2937;
                font-size: 16px;
                word-wrap: break-word;
              }
              .message-field {
                border-left-color: #10b981;
              }
              .message-field .field-value {
                white-space: pre-wrap;
                line-height: 1.8;
              }
              .footer {
                border-top: 1px solid #e5e7eb;
                padding-top: 20px;
                text-align: center;
                color: #6b7280;
                font-size: 12px;
              }
              .timestamp {
                background-color: #eff6ff;
                border: 1px solid #dbeafe;
                border-radius: 6px;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #1e40af;
                margin-top: 20px;
              }
              .reply-info {
                background-color: #f0fdf4;
                border: 1px solid #dcfce7;
                border-radius: 6px;
                padding: 15px;
                margin-top: 20px;
              }
              .reply-info h3 {
                color: #166534;
                margin: 0 0 10px 0;
                font-size: 14px;
              }
              .reply-info p {
                color: #15803d;
                margin: 0;
                font-size: 13px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 New Contact Form Submission</h1>
                <p>From Wilson's Portfolio Website</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="field-label">👤 Name</div>
                  <div class="field-value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="field-label">📧 Email</div>
                  <div class="field-value">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                  </div>
                </div>
                
                <div class="field">
                  <div class="field-label">📝 Subject</div>
                  <div class="field-value">${subject}</div>
                </div>
                
                <div class="field message-field">
                  <div class="field-label">💬 Message</div>
                  <div class="field-value">${message}</div>
                </div>
              </div>
              
              <div class="reply-info">
                <h3>💡 Quick Reply</h3>
                <p>You can reply directly to this email to respond to ${name}. The reply-to address is already set to their email (${email}).</p>
              </div>
              
              <div class="timestamp">
                📅 Received on ${new Date().toLocaleString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Europe/Lisbon",
                })} (Lisbon time)
              </div>
              
              <div class="footer">
                <p>This email was sent from the contact form on Wilson's portfolio website.</p>
                <p><strong>Wilson Tsuyoshi Oliveira Campos</strong> | Computer Science Student</p>
                <p>Instituto Politécnico de Leiria</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
REPLY INSTRUCTIONS:
You can reply directly to this email to respond to ${name}. The reply-to address is set to: ${email}

---
Received on ${new Date().toLocaleString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Lisbon",
      })} (Lisbon time)

This email was sent from the contact form on Wilson's portfolio website.
Wilson Tsuyoshi Oliveira Campos | Computer Science Student
Instituto Politécnico de Leiria

You can reply directly to this email to respond to the sender.
      `.trim(),
    })

    if (error) {
      console.error("Resend error:", error)
      return {
        success: false,
        message: "Failed to send email. Please try again later or contact me directly at wilcampos2003@gmail.com",
      }
    }

    console.log("Email sent successfully:", data)

    return {
      success: true,
      message:
        "Message sent successfully! I received it at wilcampos2003@gmail.com and will get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please contact me directly at wilcampos2003@gmail.com",
    }
  }
}
