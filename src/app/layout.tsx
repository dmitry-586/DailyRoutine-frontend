import { TimezoneSync } from '@/features/timezone/TimezoneSync'
import { YandexMetrika } from '@/shared/lib/analytics'
import { getPWAMetadata, getPWAViewport } from '@/shared/lib/pwa'
import { generateLandingMetadata } from '@/shared/lib/seo'
import TanstackClientProvider from '@/shared/model/providers/TanstackClientProvider'
import { Toaster } from '@/shared/ui/Toaster'
import type { Metadata, Viewport } from 'next'
import { Inter, Reggae_One } from 'next/font/google'
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

const pwaMetadata = getPWAMetadata()
const seoMetadata = generateLandingMetadata()

export const metadata: Metadata = {
  ...pwaMetadata,
  ...seoMetadata,
  title: seoMetadata.title,
  description: seoMetadata.description,
  keywords: seoMetadata.keywords,
  metadataBase: seoMetadata.metadataBase,
  alternates: seoMetadata.alternates,
  openGraph: seoMetadata.openGraph,
  robots: seoMetadata.robots,
  other: {
    ...pwaMetadata.other,
    ...seoMetadata.other,
  },
  icons: pwaMetadata.icons,
  applicationName: pwaMetadata.applicationName,
  manifest: pwaMetadata.manifest,
  appleWebApp: pwaMetadata.appleWebApp,
}

export const viewport: Viewport = getPWAViewport()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${reggaeOne.variable} ${inter.variable} antialiased`}>
        <YandexMetrika />
        <TanstackClientProvider>
          <TimezoneSync />
          {children}
        </TanstackClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
