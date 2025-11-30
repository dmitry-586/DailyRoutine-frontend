'use client'

import { useScrollLock } from '@/shared/lib/hooks/useScrollLock'
import { cn } from '@/shared/lib/utils/cn'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  useScrollLock(isOpen)

  return (
    <section
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-150',
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-150',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'bg-background relative flex max-h-[90vh] w-full max-w-[90vw] flex-col rounded-[12px] transition-all duration-150',
          className,
          isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
        )}
      >
        <div className='border-light-gray/20 flex items-center justify-between border-b-2 px-5 py-4 max-sm:px-3'>
          <h2 className='font-reggae-one text-foreground text-2xl max-sm:text-xl'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='text-foreground/60 hover:text-foreground cursor-pointer transition-colors duration-200'
          >
            <X size={24} />
          </button>
        </div>
        <div className='custom-scrollbar h-full overflow-y-auto p-5 max-sm:px-3'>
          {children}
        </div>
      </div>
    </section>
  )
}

export default Modal
