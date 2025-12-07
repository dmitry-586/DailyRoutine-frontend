'use client'

import { useMediaQuery } from '@/shared/model/hooks/useMediaQuery'
import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  const isMobile = useMediaQuery('(max-width: 1023px)')

  return (
    <SonnerToaster
      position={isMobile ? 'top-center' : 'bottom-right'}
      className='toaster-container'
      toastOptions={{
        unstyled: true,
        duration: 4000,
        classNames: {
          toast: 'toast',
          title: 'toast-title',
          description: 'toast-description',
          actionButton: 'toast-action-button',
          cancelButton: 'toast-cancel-button',
          closeButton: 'toast-close-button',
        },
      }}
      closeButton
    />
  )
}
