import Image from 'next/image'

const benefits = [
	'Никаких лишних приложений - все в Telegram',
	'Минимальные усилия - отмечайте выполнение в один клик',
	'Умные советы - ИИ анализирует ваш прогресс',
	'Простой интерфейс - ничего лишнего',
]

export default function Benefits() {
	return (
		<section className='flex flex-col items-center my-[60px]'>
			<h2 className='text-xl text-center sm:text-2xl'>Почему это работает?</h2>
			<div className='flex flex-col gap-5 mt-[30px] mx-auto'>
				{benefits.map(benefit => (
					<div key={benefit} className='flex items-center gap-3'>
						<Image src='/check-mark.svg' alt='check' width={25} height={25} />
						<p className='text-lg'>{benefit}</p>
					</div>
				))}
			</div>
		</section>
	)
}

