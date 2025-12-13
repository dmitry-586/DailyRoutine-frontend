'use client'

import { isIOS, isSafari, usePWAInstall } from '@/shared/lib/pwa'
import { Button } from '@/shared/ui'
import { CheckCircle2, Download, Info, Loader2, Share2 } from 'lucide-react'
import type { ComponentType } from 'react'

interface InfoBoxProps {
  icon: ComponentType<{ className?: string }>
  title?: string
  description: string | React.ReactNode
  variant?: 'default' | 'success' | 'warning'
}

const InfoBox = ({
  icon: Icon,
  title,
  description,
  variant = 'default',
}: InfoBoxProps) => {
  const styles = {
    default: {
      container: 'border-light-gray/10 bg-light-gray/5',
      icon: 'text-light-gray',
      title: 'text-light-gray',
      text: 'text-light-gray',
    },
    success: {
      container: 'border-primary/20 bg-primary/5',
      icon: 'text-primary',
      title: 'text-primary',
      text: 'text-light-gray',
    },
    warning: {
      container: 'border-amber-500/20 bg-amber-500/5',
      icon: 'text-amber-500',
      title: 'text-amber-500',
      text: 'text-light-gray',
    },
  }

  const { container, icon, title: titleColor, text } = styles[variant]

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-4 ${container}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${icon}`} />
      <div className='flex-1'>
        {title && (
          <p className={`mb-1 text-sm font-medium ${titleColor}`}>{title}</p>
        )}
        <div className={`text-sm ${text}`}>{description}</div>
      </div>
    </div>
  )
}

export function PWAInstallSection() {
  const { deferredPrompt, isInstalled, isCheckingPrompt, handleInstall } =
    usePWAInstall()

  if (isInstalled) {
    return (
      <InfoBox
        icon={CheckCircle2}
        title='Приложение установлено'
        description='Вы можете использовать приложение в автономном режиме'
        variant='success'
      />
    )
  }

  if (isCheckingPrompt && !isSafari()) {
    return (
      <div className='border-light-gray/10 bg-light-gray/5 flex items-center gap-3 rounded-lg border p-4'>
        <Loader2 className='text-light-gray h-5 w-5 shrink-0 animate-spin' />
        <p className='text-light-gray text-sm'>
          Проверка возможности установки...
        </p>
      </div>
    )
  }

  if (isSafari()) {
    return (
      <div className='border-light-gray/10 bg-light-gray/5 rounded-lg border p-4'>
        <div className='flex items-start gap-3'>
          <Share2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
          <div className='flex-1'>
            <p className='mb-2 text-sm font-medium text-white'>
              {isIOS() ? 'Установка на iOS' : 'Установка в Safari'}
            </p>
            <ol className='text-light-gray space-y-1.5 text-sm'>
              <li className='flex gap-2'>
                <span className='shrink-0 font-semibold'>1.</span>
                <span>
                  Нажмите на кнопку{' '}
                  <span className='font-semibold text-white'>Поделиться</span>{' '}
                  {isIOS() ? 'внизу экрана' : 'в панели инструментов'}
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='shrink-0 font-semibold'>2.</span>
                <span>
                  Выберите{' '}
                  <span className='font-semibold text-white'>
                    На экран «Домой»
                  </span>
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='shrink-0 font-semibold'>3.</span>
                <span>Нажмите «Добавить»</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  if (deferredPrompt) {
    return (
      <Button
        onClick={handleInstall}
        variant='primary'
        className='flex w-fit items-center gap-2'
      >
        <Download size={16} />
        Установить приложение
      </Button>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    return (
      <InfoBox
        icon={Info}
        title='Режим разработки'
        description='Установка PWA доступна только в production. Для тестирования выполните npm run build и npm start'
        variant='warning'
      />
    )
  }

  return (
    <InfoBox
      icon={Info}
      description='Установка приложения доступна в Chrome, Edge, Yandex и других поддерживаемых браузерах. Возможно, приложение уже установлено или браузер не поддерживает PWA.'
    />
  )
}
