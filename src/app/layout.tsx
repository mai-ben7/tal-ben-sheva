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
        {/* Favicon */}
        <link 
          rel="icon" 
          type="image/x-icon" 
          href="/favicon.ico?v=2" 
        />
        <link 
          rel="shortcut icon" 
          type="image/x-icon" 
          href="/favicon.ico" 
        />
        <link 
          rel="apple-touch-icon" 
          href="/favicon.ico" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="32x32" 
          href="/favicon.ico" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="16x16" 
          href="/favicon.ico" 
        />
        {/* Prevent favicon caching */}
        <meta name="msapplication-TileColor" content="#8e44ad" />
        <meta name="theme-color" content="#8e44ad" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        
        {/* Font Awesome - Load asynchronously */}
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          as="style"
        />
        <noscript>
          <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          />
        </noscript>
      </head>
      <body className={`${heebo.variable} ${assistant.variable} font-assistant`}>
        {/* Load Font Awesome asynchronously */}
        <Script 
          id="fontawesome-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{__html: `
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(link);
          `}}
        />
        {/* Hydration handler */}
        <Script 
          id="hydration-handler"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{__html: `
            document.body.classList.add('hydrated');
          `}}
        />
        {children}
      </body>
    </html>
  )
}
