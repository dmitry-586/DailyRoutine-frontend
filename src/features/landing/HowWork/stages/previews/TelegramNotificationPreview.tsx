export default function TelegramNotificationPreview() {
  return (
    <section className='bg-dark-gray border-gray rounded-2xl border-8 p-5 max-sm:rounded-xl max-sm:border-4 max-sm:p-3.5'>
      <header className='border-gray mb-3.5 flex items-center gap-3 border-b pb-3 max-sm:mb-3 max-sm:gap-2.5 max-sm:pb-2.5'>
        <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold max-sm:h-8 max-sm:w-8 max-sm:text-xs'>
          DR
        </div>
        <div>
          <h3 className='text-sm font-medium text-white'>Daily Routine Bot</h3>
          <p className='text-light-gray/90 text-xs max-sm:text-[10px]'>Бот</p>
        </div>
      </header>

      <div className='space-y-3.5 max-sm:space-y-3'>
        <article className='flex items-start gap-2 max-sm:gap-1.5'>
          <div className='bg-primary flex size-8 shrink-0 items-center justify-center rounded-full text-xs leading-none font-semibold max-sm:size-6 max-sm:text-[10px]'>
            DR
          </div>
          <div className='bg-background max-w-[85%] rounded-lg rounded-tl-none px-3 py-2.5 max-sm:rounded-md max-sm:px-2.5 max-sm:py-2'>
            <h4 className='mb-2 text-sm font-medium text-white max-sm:mb-1.5 max-sm:text-xs'>
              Утренний обзор привычек:
            </h4>
            <ul className='space-y-1.5 max-sm:space-y-1'>
              <li className='border-gray flex items-center justify-between gap-4 border-b pb-1.5 max-sm:gap-3 max-sm:pb-1'>
                <span className='text-light-gray text-sm max-sm:text-xs'>
                  Прочитать книгу
                </span>
                <span className='text-light-gray/90 text-xs max-sm:text-[10px]'>
                  15/20
                </span>
              </li>
              <li className='border-gray flex items-center justify-between gap-4 border-b pb-1.5 max-sm:gap-3 max-sm:pb-1'>
                <span className='text-light-gray text-sm max-sm:text-xs'>
                  Пробежка
                </span>
                <span className='text-green text-xs max-sm:text-[10px]'>✓</span>
              </li>
              <li className='flex items-center justify-between gap-4 max-sm:gap-3'>
                <span className='text-light-gray text-sm max-sm:text-xs'>
                  Медитация
                </span>
                <span className='text-light-gray/90 text-xs max-sm:text-[10px]'>
                  —
                </span>
              </li>
            </ul>
            <time
              className='text-light-gray/90 mt-2 block text-xs max-sm:mt-1.5 max-sm:text-[10px]'
              dateTime='07:00'
            >
              07:00
            </time>
          </div>
        </article>

        <nav
          className='flex flex-col gap-1.5 max-sm:gap-1'
          aria-label='Действия с привычками'
        >
          <div className='flex gap-1.5 max-sm:gap-1'>
            <button className='border-gray bg-background flex-1 rounded-lg border px-3 py-2 text-sm max-sm:rounded-md max-sm:px-2 max-sm:py-1.5 max-sm:text-xs'>
              Книга
            </button>
            <button className='border-gray bg-background flex-1 rounded-lg border px-3 py-2 text-sm max-sm:rounded-md max-sm:px-2 max-sm:py-1.5 max-sm:text-xs'>
              Пробежка
            </button>
          </div>
          <div className='flex gap-1.5 max-sm:gap-1'>
            <button className='border-gray bg-background flex-1 rounded-lg border px-3 py-2 text-sm max-sm:rounded-md max-sm:px-2 max-sm:py-1.5 max-sm:text-xs'>
              Медитация
            </button>
            <button className='border-gray bg-background flex-1 rounded-lg border px-3 py-2 text-sm max-sm:rounded-md max-sm:px-2 max-sm:py-1.5 max-sm:text-xs'>
              Все
            </button>
          </div>
        </nav>
      </div>
    </section>
  )
}
