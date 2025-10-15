import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, number>()

// Bot protection configuration
const BOT_PROTECTION_CONFIG = {
  // Suspicious email domains
  SUSPICIOUS_DOMAINS: [
    'wls1.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
    'mailinator.com', 'throwaway.email', 'temp-mail.org', 'sharklasers.com',
    'grr.la', 'guerrillamailblock.com', 'pokemail.net', 'spam4.me',
    'bccto.me', 'chacuo.net', 'dispostable.com', 'mailnesia.com',
    'maildrop.cc', 'getnada.com', 'mailcatch.com', 'yopmail.com',
    'mailmetrash.com', 'trashmail.com', 'spamgourmet.com', 'spam.la'
  ],
  
  // Bot keywords
  BOT_KEYWORDS: ['test', 'spam', 'bot', 'fake'],
  
  // Rate limiting
  RATE_LIMIT_WINDOW: 30000, // 30 seconds in milliseconds
  
  // Content validation
  MIN_NAME_LENGTH: 2,
  MIN_MESSAGE_LENGTH: 10,
  MAX_REPEATED_CHARS: 4
}

// Enhanced logging function
function logSuspiciousAttempt(ip: string, email: string, reason: string, data: { name?: string; message?: string; userAgent?: string }) {
  const timestamp = new Date().toISOString()
  console.log(`[BOT_PROTECTION] ${timestamp} - IP: ${ip} - Email: ${email} - Reason: ${reason}`, {
    ip,
    email,
    reason,
    timestamp,
    userAgent: data.userAgent || 'unknown',
    formData: {
      name: data.name?.substring(0, 10) + '...',
      messageLength: data.message?.length || 0
    }
  })
}

// Get client IP address
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  return 'unknown'
}

// Email domain validation
function validateEmailDomain(email: string): { isValid: boolean; reason?: string } {
  const domain = email.split('@')[1]?.toLowerCase()
  
  if (!domain) {
    return { isValid: false, reason: 'invalid_domain' }
  }
  
  // Check for suspicious domains
  if (BOT_PROTECTION_CONFIG.SUSPICIOUS_DOMAINS.includes(domain)) {
    return { isValid: false, reason: 'suspicious_domain' }
  }
  
  // Check for domains containing suspicious keywords
  const suspiciousKeywords = ['temp', 'spam', 'fake', 'throwaway']
  if (suspiciousKeywords.some(keyword => domain.includes(keyword))) {
    return { isValid: false, reason: 'suspicious_keywords' }
  }
  
  // Check for domains shorter than 4 characters
  if (domain.length < 4) {
    return { isValid: false, reason: 'domain_too_short' }
  }
  
  // Block .xyz domains
  if (domain.endsWith('.xyz')) {
    return { isValid: false, reason: 'xyz_domain' }
  }
  
  return { isValid: true }
}

// Bot pattern detection
function detectBotPatterns(name: string, email: string): { isBot: boolean; reason?: string } {
  const emailLocal = email.split('@')[0]?.toLowerCase()
  const nameLower = name.toLowerCase()
  
  // Check for obvious bot keywords
  const allText = `${nameLower} ${emailLocal}`.toLowerCase()
  if (BOT_PROTECTION_CONFIG.BOT_KEYWORDS.some(keyword => allText.includes(keyword))) {
    return { isBot: true, reason: 'bot_keywords' }
  }
  
  // Check for email patterns like "hilton15@" or "15hilton@"
  if (/^[a-z]+\d+@/.test(email) || /^\d+[a-z]+@/.test(email)) {
    return { isBot: true, reason: 'email_pattern' }
  }
  
  // Check for short names with many digits
  if (/^[a-z]{1,3}\d{2,}@/.test(email)) {
    return { isBot: true, reason: 'short_name_digits' }
  }
  
  return { isBot: false }
}

// Content validation
function validateContent(name: string, message: string): { isValid: boolean; reason?: string } {
  // Check name length
  if (name.length < BOT_PROTECTION_CONFIG.MIN_NAME_LENGTH) {
    return { isValid: false, reason: 'name_too_short' }
  }
  
  // Check message length
  if (message.length < BOT_PROTECTION_CONFIG.MIN_MESSAGE_LENGTH) {
    return { isValid: false, reason: 'message_too_short' }
  }
  
  // Check for repeated characters in message
  const repeatedCharRegex = new RegExp(`(.)\\1{${BOT_PROTECTION_CONFIG.MAX_REPEATED_CHARS},}`)
  if (repeatedCharRegex.test(message)) {
    return { isValid: false, reason: 'repeated_characters' }
  }
  
  // Check for messages with only letters and very short length
  if (message.length < 20 && /^[a-zA-Z\s]+$/.test(message)) {
    return { isValid: false, reason: 'insufficient_content' }
  }
  
  return { isValid: true }
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now()
  const lastSubmission = rateLimitStore.get(ip)
  
  if (lastSubmission && (now - lastSubmission) < BOT_PROTECTION_CONFIG.RATE_LIMIT_WINDOW) {
    return { allowed: false, reason: 'rate_limited' }
  }
  
  // Update the timestamp
  rateLimitStore.set(ip, now)
  
  // Clean up old entries (simple cleanup)
  if (rateLimitStore.size > 1000) {
    const cutoff = now - BOT_PROTECTION_CONFIG.RATE_LIMIT_WINDOW
    for (const [key, value] of rateLimitStore.entries()) {
      if (value < cutoff) {
        rateLimitStore.delete(key)
      }
    }
  }
  
  return { allowed: true }
}

// Honeypot check
function checkHoneypot(data: { company?: string }): { isBot: boolean; reason?: string } {
  // Check if honeypot field is filled (indicates bot)
  if (data.company && data.company.trim() !== '') {
    return { isBot: true, reason: 'honeypot_triggered' }
  }
  
  return { isBot: false }
}

export async function POST(request: Request) {
  const clientIP = getClientIP(request)
  
  try {
    const data = await request.json()
    const { name, email, message } = data

    // Basic input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'כל השדות נדרשים' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      )
    }

    // 1. HONEYPOT CHECK (first check - if bot, return success without sending)
    const honeypotCheck = checkHoneypot(data)
    if (honeypotCheck.isBot) {
      logSuspiciousAttempt(clientIP, email, honeypotCheck.reason!, data)
      // Return success to bot without sending email
      return NextResponse.json(
        { message: 'ההודעה נשלחה בהצלחה' },
        { status: 200 }
      )
    }

    // 2. RATE LIMITING
    const rateLimitCheck = checkRateLimit(clientIP)
    if (!rateLimitCheck.allowed) {
      logSuspiciousAttempt(clientIP, email, rateLimitCheck.reason!, data)
      return NextResponse.json(
        { error: 'אנא המתן לפני שליחת הודעה נוספת' },
        { status: 429 }
      )
    }

    // 3. EMAIL DOMAIN VALIDATION
    const domainCheck = validateEmailDomain(email)
    if (!domainCheck.isValid) {
      logSuspiciousAttempt(clientIP, email, domainCheck.reason!, data)
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      )
    }

    // 4. BOT PATTERN DETECTION
    const botPatternCheck = detectBotPatterns(name, email)
    if (botPatternCheck.isBot) {
      logSuspiciousAttempt(clientIP, email, botPatternCheck.reason!, data)
      return NextResponse.json(
        { error: 'נתונים לא תקינים' },
        { status: 400 }
      )
    }

    // 5. CONTENT VALIDATION
    const contentCheck = validateContent(name, message)
    if (!contentCheck.isValid) {
      logSuspiciousAttempt(clientIP, email, contentCheck.reason!, data)
      return NextResponse.json(
        { error: 'אנא מלא את הטופס בצורה מלאה יותר' },
        { status: 400 }
      )
    }

    // All validations passed - proceed with email sending
    console.log(`[LEGITIMATE_SUBMISSION] ${new Date().toISOString()} - IP: ${clientIP} - Email: ${email} - Name: ${name}`)

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

