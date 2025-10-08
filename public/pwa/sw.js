const CACHE_NAME = 'daily-routine-v1'
const urlsToCache = [
	'/',
	'/pwa/manifest.json',
	'/icons/icon-192.png',
	'/icons/icon-512.png',
]

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(urlsToCache).catch(error => {
				console.warn('Не удалось кэшировать некоторые ресурсы:', error)
			})
		})
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
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
		})
	)
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})
