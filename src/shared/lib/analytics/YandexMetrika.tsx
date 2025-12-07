'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { Suspense, useEffect, useRef } from 'react'

const YANDEX_METRIKA_ID = 105719814

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void
  }
}

// Компонент для отслеживания навигации (требует Suspense)
function YandexMetrikaTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstRender = useRef(true)

  // Отслеживание изменений пути для SPA-навигации
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ym) return

    // Пропускаем первый рендер, так как первая загрузка уже отслеживается автоматически
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const searchString = searchParams?.toString() || ''
    const url = pathname + (searchString ? `?${searchString}` : '')

    // Вызываем hit при смене страницы
    window.ym(YANDEX_METRIKA_ID, 'hit', url, {
      title: document.title,
      referer: window.location.href,
    })
  }, [pathname, searchParams])

  return null
}

// Основной компонент с инициализацией скрипта
export function YandexMetrika() {
  return (
    <>
      <Script
        id='yandex-metrika'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');
            
            ym(${YANDEX_METRIKA_ID}, 'init', {
              defer: true,
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              accurateTrackBounce: true,
              trackLinks: true
            });
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=''
          />
        </div>
      </noscript>
      <Suspense fallback={null}>
        <YandexMetrikaTracker />
      </Suspense>
    </>
  )
}
