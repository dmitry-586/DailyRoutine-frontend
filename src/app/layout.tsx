import type { Metadata } from 'next'
import { Inter, Reggae_One } from 'next/font/google'
import './globals.css'

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
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${reggaeOne.variable} ${inter.variable} antialiased`}>
				{children}
			</body>
		</html>
	)
}
