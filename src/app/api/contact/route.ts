import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'כל השדות נדרשים' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email to you (site owner)
    const mailOptionsToOwner = {
      from: process.env.SMTP_USER,
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Talbensheva@gmail.com',
      subject: `פנייה חדשה מהאתר מ-${name}`,
      text: `
שם: ${name}
אימייל: ${email}

הודעה:
${message}
      `,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #8e44ad; border-bottom: 2px solid #8e44ad; padding-bottom: 10px;">
            פנייה חדשה מהאתר
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>שם:</strong> ${name}</p>
            <p><strong>אימייל:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">הודעה:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            הודעה זו נשלחה מטופס יצירת הקשר באתר של טל בן שבע
          </p>
        </div>
      `,
      replyTo: email, // Allow easy reply to the person who contacted
    }

    // Auto-reply email to the person who contacted
    const mailOptionsToSender = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `תודה על פנייתך! 🌟`,
      text: `
שלום ${name},

תודה רבה על פנייתך אליי! 😊

קיבלתי את הודעתך ואשמח לחזור אלייך תוך 24 שעות.

שמחה להכיר!
טל בן שבע

---
הודעה זו נשלחה אוטומטית מאתר טל בן שבע
      `,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h2 style="color: #8e44ad; margin-top: 0; font-size: 24px;">
              שלום ${name}! 👋
            </h2>
            
            <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">
              תודה רבה על פנייתך אליי! 😊
            </p>
            
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #8e44ad;">
              <p style="color: #555; font-size: 15px; margin: 0; line-height: 1.6;">
                קיבלתי את הודעתך ואשמח לחזור אלייך <strong>תוך 24 שעות</strong>. 
              </p>
            </div>
            
            <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">
              שמחה להכיר! ✨
            </p>
            
            <p style="color: #8e44ad; font-size: 18px; font-weight: 600; margin: 20px 0 10px 0;">
              טל בן שבע
            </p>
            
            <p style="color: #999; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              שחקנית | זמרת | רקדנית
            </p>
          </div>
          
          <p style="color: rgba(255,255,255,0.8); font-size: 11px; text-align: center; margin-top: 15px;">
            הודעה זו נשלחה אוטומטית מאתר טל בן שבע
          </p>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(mailOptionsToOwner)
    await transporter.sendMail(mailOptionsToSender)

    return NextResponse.json(
      { message: 'ההודעה נשלחה בהצלחה' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'שגיאה בשליחת האימייל. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    )
  }
}

