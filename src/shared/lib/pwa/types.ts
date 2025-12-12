import type { Metadata } from 'next'

export interface PWAManifestConfig {
  name: string
  short_name: string
  description: string
  start_url: string
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
  background_color: string
  theme_color: string
  lang: string
  orientation: 'portrait' | 'landscape' | 'any'
  scope: string
  icons: Array<{
    src: string
    sizes: string
    type: string
    purpose?: 'any' | 'maskable' | 'any maskable'
  }>
  categories?: readonly string[]
  prefer_related_applications?: boolean
}

export interface PWAMetadataConfig {
  title: string
  description: string
  applicationName: string
  manifest: string
  appleWebApp?: {
    title?: string
    statusBarStyle?: 'default' | 'black' | 'black-translucent'
    capable?: boolean
  }
  icons: Metadata['icons']
  other?: Record<string, string>
}

export interface PWAViewportConfig {
  width?: string
  initialScale?: number
  maximumScale?: number
  userScalable?: boolean
  viewportFit?: 'auto' | 'contain' | 'cover'
  themeColor?: string
}

export interface PWAServiceWorkerConfig {
  cacheName: string
  urlsToCache: string[]
  swPath: string
}

export interface PWAConfig {
  manifest: PWAManifestConfig
  metadata: PWAMetadataConfig
  viewport: PWAViewportConfig
  serviceWorker: PWAServiceWorkerConfig
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}
