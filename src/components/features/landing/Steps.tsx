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
    <div className="mt-[30px] flex flex-col items-center justify-center">
      <Image src={image} alt={title} width={50} height={50} />
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="text-light-gray mt-2 max-w-[300px] text-center">
        {description}
      </p>
    </div>
  )
}

export default function Steps() {
  return (
    <section className="mt-[30px]">
      <h2 className="text-center text-xl sm:text-2xl">Всего 3 простых шага</h2>
      <div className="flex-wrap justify-center gap-5 sm:flex">
        {steps.map((step) => (
          <Step key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}
