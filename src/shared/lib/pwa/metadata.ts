import type { Metadata, Viewport } from 'next'
import { pwaConfig } from './config'

export const getPWAMetadata = (): Metadata => {
  // Используем статический файл из public для надежности
  // Next.js 16 может не всегда автоматически обрабатывать app/manifest.ts
  return {
    ...pwaConfig.metadata,
    manifest: '/pwa/manifest.json',
  } as Metadata
}

export const getPWAViewport = (): Viewport => pwaConfig.viewport as Viewport

export const getPWAConfig = () => pwaConfig
