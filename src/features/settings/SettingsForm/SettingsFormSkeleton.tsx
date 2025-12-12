export function SettingsFormSkeleton() {
  return (
    <div className='border-light-gray/10 bg-gray space-y-6 rounded-xl border p-6 sm:p-8'>
      {/* Секция "Не беспокоить" */}
      <div className='flex items-center justify-between gap-4'>
        <div className='bg-light-gray/20 h-6 w-48 animate-pulse rounded' />
        <div className='bg-light-gray/20 h-6 w-11 shrink-0 animate-pulse rounded-full' />
      </div>

      {/* Разделитель */}
      <div className='border-light-gray/10 border-t pt-6'>
        <div className='space-y-5'>
          {/* Заголовок */}
          <div className='bg-light-gray/20 h-10 w-40 animate-pulse rounded' />
          {/* Поле ввода и кнопка */}
          <div className='flex items-center gap-2'>
            <div className='bg-light-gray/20 h-10 w-32 animate-pulse rounded-md' />
            <div className='bg-light-gray/20 h-10 w-10 shrink-0 animate-pulse rounded-md' />
          </div>

          <div className='bg-light-gray/20 h-10 w-full animate-pulse rounded-md' />
        </div>
      </div>

      {/* Кнопка сохранения */}
      <div className='flex justify-end pt-4'>
        <div className='bg-light-gray/20 h-10 w-40 animate-pulse rounded-full' />
      </div>
    </div>
  )
}
