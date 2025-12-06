import { TimezoneSync } from '@/features/timezone/TimezoneSync'
import { getPWAMetadata, getPWAViewport } from '@/shared/lib/pwa'
import TanstackClientProvider from '@/shared/model/providers/TanstackClientProvider'
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

export const metadata: Metadata = getPWAMetadata()

export const viewport: Viewport = getPWAViewport()

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
