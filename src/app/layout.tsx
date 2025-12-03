import { TimezoneSync } from '@/features/timezone/TimezoneSync'
import TanstackClientProvider from '@/shared/model/TanstackClientProvider'
import type { Metadata, Viewport } from 'next'
import { Inter, Reggae_One } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const reggaeOne = Reggae_One({
  variable: '--font-reggae-one',
  weight: ['400'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
})

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Daily Routine',
  description: 'Daily Routine - управляйте своими ежедневными задачами',
  manifest: '/pwa/manifest.json',
  applicationName: 'Daily Routine',
  appleWebApp: {
    title: 'Daily Routine',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#32373a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${reggaeOne.variable} ${inter.variable} antialiased`}>
        <TanstackClientProvider>
          <TimezoneSync />
          {children}
        </TanstackClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
