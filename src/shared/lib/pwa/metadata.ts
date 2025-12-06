import type { Metadata, Viewport } from 'next'
import { pwaConfig } from './config'

export const getPWAMetadata = (): Metadata => pwaConfig.metadata as Metadata

export const getPWAViewport = (): Viewport => pwaConfig.viewport as Viewport

export const getPWAConfig = () => pwaConfig
