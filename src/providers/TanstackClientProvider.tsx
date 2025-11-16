'use client'

import { createQueryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

const queryClient = createQueryClient()

export default function TanstackClientProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
