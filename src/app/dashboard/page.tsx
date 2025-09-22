import UsersList from '@/components/dashboard/UsersList'

export default function DashboardPage() {
	return (
		<section className='max-w-3xl mx-auto py-8 px-4'>
			<h1 className='text-2xl font-semibold'>Пользователи (createdAt desc)</h1>
			<p className='text-foreground/70 mt-2'>Данные загружаются с бэка.</p>

			<div className='mt-6'>
				<UsersList />
			</div>
		</section>
	)
}
