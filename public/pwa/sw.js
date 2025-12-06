const CACHE_NAME = 'daily-routine-v2'
const urlsToCache = [
  '/',
  '/pwa/manifest.json',
  '/icons/PWA-icon-192.png',
  '/icons/PWA-icon-512.png',
]

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
  const { request } = event
  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  const isStaticResource =
    url.pathname === '/' ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/pwa/') ||
    url.pathname.startsWith('/_next/static/') ||
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/.test(url.pathname)

  if (!isStaticResource) {
    return
  }

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response
      }

      return fetch(request).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/dashboard') || caches.match('/')
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
