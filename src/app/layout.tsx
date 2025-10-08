import type { Metadata, Viewport } from 'next'
import { Inter, Reggae_One } from 'next/font/google'
import './globals.css'
import ServiceWorkerRegister from './sw-register'

const reggaeOne = Reggae_One({
	variable: '--font-reggae-one',
	weight: ['400'],
	subsets: ['latin'],
})

const inter = Inter({
	variable: '--font-inter',
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Daily Routine',
	description: 'Daily Routine',
	manifest: '/manifest.webmanifest',
	applicationName: 'Daily Routine',
	icons: {
		icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
	},
}

export const viewport: Viewport = {
	themeColor: '#0ea5e9',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${reggaeOne.variable} ${inter.variable} antialiased`}>
				<ServiceWorkerRegister />
				{children}
			</body>
		</html>
	)
}
