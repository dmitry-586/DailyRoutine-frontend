import { writeFileSync } from 'fs'
import { pwaConfig } from './config'

export function generateServiceWorker(outputPath: string) {
  if (typeof window !== 'undefined') {
    throw new Error(
      'generateServiceWorker может использоваться только на сервере (Node.js)',
    )
  }
  const { cacheName, urlsToCache } = pwaConfig.serviceWorker

  const swContent = `const CACHE_NAME = '${cacheName}'
const urlsToCache = ${JSON.stringify(urlsToCache, null, 2)}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.warn('Не удалось кэшировать некоторые ресурсы:', error)
      })
    }),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/')
        }
        return new Response('', { status: 404, statusText: 'Not Found' })
      })
    }),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
`

  writeFileSync(outputPath, swContent, 'utf-8')
  console.log(`✅ Service Worker сгенерирован: ${outputPath}`)
}
