import Image from 'next/image'
import { benefits } from './config'

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
