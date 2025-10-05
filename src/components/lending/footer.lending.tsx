import Link from 'next/link'
import Logo from '../ui/Logo'

export default function Footer() {
	return (
		<footer className='flex flex-col gap-3'>
			<Logo title='Daily Routine' />
			<Link href='/privacy' className='text-light-gray'>
				Политика конфиденциальности
			</Link>
		</footer>
	)
}
