// Basic offline-first service worker
const CACHE_NAME = 'dr-static-v1'
const APP_SHELL = ['/']

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
	)
	self.skipWaiting()
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches
			.keys()
			.then(keys =>
				Promise.all(
					keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
				)
			)
	)
	self.clients.claim()
})

self.addEventListener('fetch', event => {
	const { request } = event
	if (request.method !== 'GET') return

	// Network-first for navigation, cache-first for static
	if (request.mode === 'navigate') {
		event.respondWith(fetch(request).catch(() => caches.match('/')))
		return
	}

	event.respondWith(
		caches.match(request).then(
			cached =>
				cached ||
				fetch(request).then(response => {
					const copy = response.clone()
					caches.open(CACHE_NAME).then(cache => cache.put(request, copy))
					return response
				})
		)
	)
})
