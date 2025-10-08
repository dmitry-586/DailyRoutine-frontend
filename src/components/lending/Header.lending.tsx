import { TelegramAuthProps } from '@/types/auth/auth.type'
import TelegramAuthButton from '../auth/TelegramAuthButton'
import Logo from '../ui/Logo'

export default function Header({ setIsTelegramModalOpen }: TelegramAuthProps) {
	return (
		<>
			<header className='flex flex-col'>
				<Logo title='Daily Routine' />
				<section className='w-fit mt-5'>
					<h2 className='text-xl'>Привычки, которые работают!</h2>
					<div className='text-light-gray mt-2'>
						<p>Планируйте на сайте -</p>
						<p className='text-right'>выполняйте в Telegram</p>
					</div>
				</section>
				<TelegramAuthButton
					setIsTelegramModalOpen={setIsTelegramModalOpen}
					className='mt-3 mx-auto'
				/>
			</header>
		</>
	)
}
