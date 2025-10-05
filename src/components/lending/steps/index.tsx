import { steps } from './config'
import Step from './step'

export default function Steps() {
	return (
		<section className='mt-[30px]'>
			<h2 className='text-xl text-center'>Всего 3 простых шага</h2>
			{steps.map(step => (
				<Step key={step.title} {...step} />
			))}
		</section>
	)
}
