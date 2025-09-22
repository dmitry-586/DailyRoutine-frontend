'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type DbUser = {
	id: string
	firstName?: string
	lastName?: string
	username?: string
	photoUrl?: string
	createdAt: string
}

export default function UsersList() {
	const [users, setUsers] = useState<DbUser[] | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let isMounted = true
		;(async () => {
			try {
				const res = await fetch('http://localhost:4000/users', {
					method: 'GET',
					credentials: 'omit',
					headers: {
						Accept: 'application/json',
					},
				})
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`)
				}
				const data = (await res.json()) as DbUser[]
				if (isMounted) setUsers(data)
			} catch {
				if (isMounted) setError('Не удалось загрузить пользователей')
			}
		})()
		return () => {
			isMounted = false
		}
	}, [])

	if (error) {
		return <div className='text-red-500 text-sm'>{error}</div>
	}
	if (!users) {
		return <div className='text-foreground/60'>Загрузка...</div>
	}
	if (users.length === 0) {
		return <div className='text-foreground/60'>Нет данных</div>
	}

	return (
		<div className='grid gap-4'>
			{users.map(user => (
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
						<div className='text-foreground/70 text-sm'>@{user.username}</div>
						<div className='text-foreground/70 text-sm'>ID: {user.id}</div>
					</div>
					<div className='text-foreground/60 text-sm whitespace-nowrap'>
						{new Date(user.createdAt).toLocaleString()}
					</div>
				</div>
			))}
		</div>
	)
}
