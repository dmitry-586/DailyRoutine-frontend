import Logo from '@/components/ui/Logo'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section className='flex h-screen max-w-[500px] mx-auto flex-col justify-center'>
			<Logo title='Daily Routine' />
			{children}
		</section>
	)
}
