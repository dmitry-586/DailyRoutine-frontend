'use server'

import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

type DbUser = {
	id: number
	firstName?: string
	lastName?: string
	username?: string
	photoUrl?: string
	createdAt: string
}

async function getUsers(
	cookieHeader: string
): Promise<{ users: DbUser[]; status: number }> {
	const API_BASE_URL = 'http://localhost:4000'
	try {
		const res = await fetch(`${API_BASE_URL}/users`, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				Cookie: cookieHeader,
			},
		})
		if (!res.ok) {
			return { users: [], status: res.status }
		}
		const data = (await res.json()) as DbUser[]
		return { users: data, status: res.status }
	} catch {
		return { users: [], status: 500 }
	}
}

export default async function DashboardPage() {
	const cookieHeader = cookies().toString()
	const { users, status } = await getUsers(cookieHeader)

	if (status === 401) {
		redirect('/log-in')
	}

	return (
		<section className='max-w-3xl mx-auto py-8 px-4'>
			<h1 className='text-2xl font-semibold'>Пользователи (createdAt desc)</h1>
			<p className='text-foreground/70 mt-2'>Данные загружаются с бэка.</p>

			<div className='mt-6 grid gap-4'>
				{users.length === 0 ? (
					<div className='text-foreground/60'>Нет данных</div>
				) : (
					users.map(user => (
						<div
							key={user.id}
							className='rounded-lg border border-border p-4 flex items-center gap-4'
						>
							{user.photoUrl ? (
								<Image
									src={user.photoUrl}
									alt='avatar'
									width={48}
									height={48}
									className='rounded-full border border-border'
								/>
							) : null}
							<div className='flex-1'>
								<div className='font-medium'>
									{user.firstName} {user.lastName}
								</div>
								<div className='text-foreground/70 text-sm'>
									@{user.username}
								</div>
								<div className='text-foreground/70 text-sm'>ID: {user.id}</div>
							</div>
							<div className='text-foreground/60 text-sm whitespace-nowrap'>
								{new Date(user.createdAt).toLocaleString()}
							</div>
						</div>
					))
				)}
			</div>
		</section>
	)
}
