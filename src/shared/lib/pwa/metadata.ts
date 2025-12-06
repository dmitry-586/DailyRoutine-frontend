import type { Metadata, Viewport } from 'next'
import { pwaConfig } from './config'

/**
 * Генерирует метаданные для Next.js из PWA конфигурации
 */
export function getPWAMetadata(): Metadata {
  return pwaConfig.metadata as Metadata
}

/**
 * Генерирует viewport конфигурацию для Next.js из PWA конфигурации
 */
export function getPWAViewport(): Viewport {
  return pwaConfig.viewport as Viewport
}

/**
 * Получает полную PWA конфигурацию
 */
export function getPWAConfig() {
  return pwaConfig
}
