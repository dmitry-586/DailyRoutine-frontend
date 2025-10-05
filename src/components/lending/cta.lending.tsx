import { TelegramAuthProps } from '@/types/auth/auth.type'
import TelegramAuthButton from '../auth/TelegramAuthButton'

export default function CTA({ setIsTelegramModalOpen }: TelegramAuthProps) {
	return (
		<section className='bg-gray py-[30px] px-3 flex flex-col items-center justify-center'>
			<h2 className='text-xl text-center max-w-[250px]'>
				Начните формировать привычки сегодня
			</h2>
			<p className='text-light-gray text-center mt-2'>
				Бесплатно • 2 минуты настройки • Работает сразу
			</p>
			<TelegramAuthButton
				setIsTelegramModalOpen={setIsTelegramModalOpen}
				className='mt-[30px]'
			/>
		</section>
	)
}
