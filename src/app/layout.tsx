import type { Metadata, Viewport } from 'next'
import { Heebo, Assistant } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// Font configuration
const heebo = Heebo({ 
  subsets: ['latin'],
  variable: '--font-heebo',
  display: 'swap',
})

const assistant = Assistant({ 
  subsets: ['latin'],
  variable: '--font-assistant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'טל בן שבע - שחקנית | זמרת | רקדנית',
  description: 'שחקנית מקצועית, בוגרת בית צבי - בית הספר לאמנויות הבמה. מוכנה לעבודה ופתוחה להזדמנויות חדשות.',
  keywords: 'שחקנית, זמרת, רקדנית, בית צבי, תיאטרון, מוזיקל, דרמה, קומדיה',
  authors: [{ name: 'טל בן שבע' }],
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Font Awesome */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
      </head>
      <body className={`${heebo.variable} ${assistant.variable} font-assistant`}>
        {/* jQuery for GSAP compatibility */}
        <Script 
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        {/* GSAP TweenMax */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  )
}
