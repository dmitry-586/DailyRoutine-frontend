'use client'

import { cn } from '@/shared/lib/utils/cn'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
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
          'bg-background border-primary shadow-blue relative mx-4 w-full max-w-md rounded-[20px] border-2 transition-all duration-150',
          className,
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        )}
      >
        <div className='border-primary/60 flex items-center justify-between border-b-2 p-6'>
          <h2 className='font-reggae-one text-foreground text-2xl'>{title}</h2>
          <button
            onClick={onClose}
            className='text-foreground/60 hover:text-foreground cursor-pointer transition-colors duration-200'
          >
            <X size={24} />
          </button>
        </div>
        <div className='p-6'>{children}</div>
      </div>
    </section>
  )
}
