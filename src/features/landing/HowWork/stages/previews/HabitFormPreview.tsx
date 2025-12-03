import { X } from 'lucide-react'

export default function HabitFormPreview() {
  return (
    <section className='bg-dark-gray border-gray rounded-2xl border-8 p-5 max-sm:rounded-xl max-sm:border-4 max-sm:p-3.5'>
      <header className='mb-5 flex items-center justify-between max-sm:mb-3.5'>
        <h4 className='text-lg font-medium max-sm:text-base'>
          Создать новую привычку
        </h4>
        <X className='text-light-gray size-6 max-sm:size-5' />
      </header>
      <form className='space-y-3.5 max-sm:space-y-3'>
        <div className='bg-gray rounded-lg p-3.5 max-sm:rounded-md max-sm:p-3'>
          <label className='text-light-gray/90 mb-1.5 block text-sm max-sm:text-xs'>
            Название
          </label>
          <p className='text-base text-white max-sm:text-sm'>Прочитать книгу</p>
        </div>
        <div className='bg-gray rounded-lg p-3.5 max-sm:rounded-md max-sm:p-3'>
          <label className='text-light-gray/90 mb-1.5 block text-sm max-sm:text-xs'>
            Тип привычки
          </label>
          <div className='flex gap-2 max-sm:gap-1.5'>
            <div className='border-primary/30 bg-primary/20 text-primary rounded border px-3 py-1.5 text-sm max-sm:rounded-md max-sm:px-2.5 max-sm:py-1 max-sm:text-xs'>
              ✓ Полезная
            </div>
            <div className='rounded px-3 py-1.5 text-sm text-gray-500 max-sm:rounded-md max-sm:px-2.5 max-sm:py-1 max-sm:text-xs'>
              Вредная
            </div>
          </div>
        </div>
        <div className='bg-gray rounded-lg p-3.5 max-sm:rounded-md max-sm:p-3'>
          <label className='text-light-gray/90 mb-1.5 block text-sm max-sm:text-xs'>
            Формат
          </label>
          <div className='flex gap-2 max-sm:gap-1.5'>
            <div className='rounded px-3 py-1.5 text-sm text-gray-500 max-sm:rounded-md max-sm:px-2.5 max-sm:py-1 max-sm:text-xs'>
              Кол-во
            </div>
            <div className='bg-primary/20 text-primary rounded px-3 py-1.5 text-sm max-sm:rounded-md max-sm:px-2.5 max-sm:py-1 max-sm:text-xs'>
              Время
            </div>
            <div className='rounded px-3 py-1.5 text-sm text-gray-500 max-sm:rounded-md max-sm:px-2.5 max-sm:py-1 max-sm:text-xs'>
              Да/Нет
            </div>
          </div>
          <p className='mt-2.5 text-sm max-sm:mt-2 max-sm:text-xs'>
            Целевое значение: <span className='font-medium'>20 минут</span>
          </p>
        </div>
      </form>
    </section>
  )
}
