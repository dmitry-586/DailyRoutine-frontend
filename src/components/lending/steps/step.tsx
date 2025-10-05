import { StepProps } from '@/types/lending/steps'
import Image from 'next/image'

export default function Step({ image, title, description }: StepProps) {
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
