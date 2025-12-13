import type { Metadata, Viewport } from 'next'
import { pwaConfig } from './config'

export const getPWAMetadata = (): Metadata =>
  ({
    ...pwaConfig.metadata,
    manifest: '/pwa/manifest.json',
  }) as Metadata

export const getPWAViewport = (): Viewport => pwaConfig.viewport as Viewport
