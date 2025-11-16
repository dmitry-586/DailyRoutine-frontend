import { StepProps } from '@/types'
import Image from 'next/image'

const steps: StepProps[] = [
	{
		image: '/pencil.svg',
		title: 'Создай привычку',
		description: 'Настройте в веб-интерфейсе что, когда и как часто делать',
	},
	{
		image: '/alarm-clock.svg',
		title: 'Получай напоминания',
		description: 'Бот присылает уведомления прямо в Telegram в нужное время',
	},
	{
		image: '/bar-chart.svg',
		title: 'Отслеживай прогресс',
		description: 'Смотрите статистику и получайте персональные советы от ИИ',
	},
]

function Step({ image, title, description }: StepProps) {
	return (
		<div className='flex flex-col items-center justify-center mt-[30px]'>
			<Image src={image} alt={title} width={50} height={50} />
			<h3 className='text-xl mt-5'>{title}</h3>
			<p className='text-light-gray max-w-[300px] text-center mt-2'>
				{description}
			</p>
		</div>
	)
}

export default function Steps() {
	return (
		<section className='mt-[30px]'>
			<h2 className='text-xl text-center sm:text-2xl'>Всего 3 простых шага</h2>
			<div className='sm:flex flex-wrap justify-center gap-5'>
				{steps.map(step => (
					<Step key={step.title} {...step} />
				))}
			</div>
		</section>
	)
}

