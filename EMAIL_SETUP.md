# 📧 Email Setup Guide for Contact Form

## Overview
The contact form uses SMTP (via Nodemailer) to send emails directly from the server. This provides a professional, automatic email sending experience.

---

## 🔧 Setup Instructions

### Step 1: Create `.env.local` File

Create a file named `.env.local` in the root of your project with the following content:

```env
# Contact email where form submissions will be sent
NEXT_PUBLIC_CONTACT_EMAIL=Talbensheva@gmail.com

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=Talbensheva@gmail.com
SMTP_PASSWORD=your_app_password_here
```

---

### Step 2: Generate Gmail App Password

Since you're using Gmail (`Talbensheva@gmail.com`), you need to create an **App Password**:

#### Instructions:

1. **Enable 2-Factor Authentication** on your Google Account
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "Tal Website Contact Form"
   - Click "Generate"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Add to `.env.local`**
   - Replace `your_app_password_here` with the generated password
   - Remove spaces: `abcdefghijklmnop`

---

### Step 3: Complete `.env.local` Example

```env
NEXT_PUBLIC_CONTACT_EMAIL=Talbensheva@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=Talbensheva@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
```

---

### Step 4: Restart Development Server

```bash
npm run dev
```

---

## ✅ Testing the Form

1. Go to your website's contact form
2. Fill out:
   - Name
   - Email
   - Message
3. Click "שלח הודעה" (Send Message)
4. You should see: "ההודעה נשלחה בהצלחה! נחזור אליך בהקדם."
5. Check `Talbensheva@gmail.com` inbox for the email

---

## 📧 Email Features

### What the Email Contains:
- Sender's name
- Sender's email (with reply-to set up)
- Message content
- Formatted HTML with your brand colors
- Right-to-left (RTL) Hebrew layout

### Benefits:
✅ **Automatic** - No email client needed  
✅ **Professional** - Formatted emails with HTML  
✅ **Reliable** - Server-side sending  
✅ **Secure** - Credentials stored in `.env.local`  
✅ **Easy Reply** - Reply-to is set to sender's email  

---

## 🚀 Deployment (Production)

When deploying to Vercel/Netlify:

1. Go to your project settings
2. Add **Environment Variables**:
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASSWORD`

3. Redeploy your site

---

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` - not committed to Git
- ✅ SMTP credentials are server-side only
- ✅ API route validates all inputs
- ✅ Email validation prevents spam
- ✅ Rate limiting recommended for production

---

## 🛠️ Alternative SMTP Services

If you don't want to use Gmail, here are alternatives:

### SendGrid (Recommended for Production)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```
Free tier: 100 emails/day

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASSWORD=your_password
```

### Custom SMTP Server
Use any SMTP server by changing the host, port, and credentials.

---

## ❓ Troubleshooting

### "Error sending email"
- Check `.env.local` exists in project root
- Verify App Password is correct (no spaces)
- Ensure 2FA is enabled on Google Account

### Email not received
- Check spam/junk folder
- Verify `NEXT_PUBLIC_CONTACT_EMAIL` is correct
- Check Gmail SMTP is enabled

### "Invalid credentials"
- Regenerate App Password
- Make sure you're using App Password, not regular password

---

## 📞 Support

If you need help, check:
1. Browser console for errors
2. Server logs (`npm run dev` terminal)
3. Gmail settings for blocked apps

---

**Setup complete! Your contact form will now send emails automatically via SMTP.** 🎉

