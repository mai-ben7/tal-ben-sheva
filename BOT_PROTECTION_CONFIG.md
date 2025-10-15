# Bot Protection Configuration

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Email Configuration
```env
# Email Configuration (Required for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=Talbensheva@gmail.com
```

### Optional Bot Protection Configuration
```env
# Bot Protection Configuration (Optional - defaults provided)
BOT_PROTECTION_RATE_LIMIT_WINDOW=30000
BOT_PROTECTION_MIN_NAME_LENGTH=2
BOT_PROTECTION_MIN_MESSAGE_LENGTH=10
BOT_PROTECTION_MAX_REPEATED_CHARS=4
```

## Bot Protection Features

### 1. Email Domain Validation
- Blocks temporary email services (tempmail.com, 10minutemail.com, etc.)
- Blocks domains containing: "temp", "spam", "fake", "throwaway"
- Blocks domains shorter than 4 characters
- Blocks .xyz domains

### 2. Bot Pattern Detection
- Detects email patterns like "hilton15@" or "15hilton@"
- Detects short names with many digits
- Blocks obvious bot keywords: "test", "spam", "bot", "fake"

### 3. Content Validation
- Names must be at least 2 characters
- Messages must be at least 10 characters
- Blocks repeated characters (like "aaaaa")
- Blocks messages with only letters and very short length

### 4. Rate Limiting
- 30-second window between submissions per IP
- Returns 429 status for rate limit violations

### 5. Honeypot Field
- Hidden "company" field that bots may fill
- If filled, returns success without sending email

### 6. Enhanced Logging
- Logs all suspicious attempts with IP, email, and reason
- Logs legitimate submissions for monitoring

### 7. Generic Error Responses
- Returns generic error messages to avoid revealing blocking reasons
- "Invalid email address" for domain issues
- "Invalid data" for pattern detection
- "Please fill out the form more completely" for content issues

## Monitoring

Check your server logs for:
- `[BOT_PROTECTION]` entries for blocked attempts
- `[LEGITIMATE_SUBMISSION]` entries for successful submissions

## Testing

Test with both legitimate and suspicious inputs to ensure the system works correctly.
