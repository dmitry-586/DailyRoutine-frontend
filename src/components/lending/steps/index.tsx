import { steps } from './config'
import Step from './step'

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
