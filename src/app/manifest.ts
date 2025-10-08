import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Daily Routine',
		short_name: 'DailyRoutine',
		description: 'Daily Routine',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#0ea5e9',
		lang: 'ru',
		icons: [
			{
				src: '/icons/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/icons/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any',
			},
			{ src: '/logo.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
		],
	}
}
