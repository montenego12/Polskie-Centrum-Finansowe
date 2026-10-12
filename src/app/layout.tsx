import type { Metadata } from 'next'
import './globals.css'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
