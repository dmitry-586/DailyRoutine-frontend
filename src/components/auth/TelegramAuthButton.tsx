import { TelegramAuthProps } from '@/types/auth/auth.type'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import Button from '../ui/Button'

export default function TelegramAuthButton({
	setIsTelegramModalOpen,
	className,
}: TelegramAuthProps) {
	const handleTelegramClick = () => {
		setIsTelegramModalOpen(true)
	}

	return (
		<Button
			type='button'
			variant='primary'
			onClick={handleTelegramClick}
			className={cn('pl-[60px] pr-[30px] min-w-0 w-fit relative', className)}
		>
			<Image
				src='/telegram.svg'
				alt='telegram'
				width={40}
				height={40}
				className='absolute left-[-1px] top-[-1px]'
			/>
			Начать в Telegram
		</Button>
	)
}
