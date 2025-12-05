'use client'

import { cn } from '@/shared/lib/utils'
import { ISidebarProps } from '@/shared/types/ui.types'
import { X } from 'lucide-react'

import Logo from '../Logo'
import { sidebarStyles } from './config'

export const Sidebar = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  headerClassName,
  className,
}: ISidebarProps) => {
  const positionClass =
    position === 'left' ? sidebarStyles.panel.left : sidebarStyles.panel.right

  const openClass =
    position === 'left'
      ? sidebarStyles.panel.openLeft
      : sidebarStyles.panel.openRight

  const closedClass =
    position === 'left'
      ? sidebarStyles.panel.closedLeft
      : sidebarStyles.panel.closedRight

  return (
    <>
      <button
        aria-hidden={!isOpen}
        tabIndex={-1}
        onClick={onClose}
        className={cn(
          sidebarStyles.backdrop.base,
          isOpen ? sidebarStyles.backdrop.open : sidebarStyles.backdrop.closed,
        )}
      />
      <section
        role='dialog'
        aria-modal={isOpen}
        className={cn(
          sidebarStyles.panel.base,
          positionClass,
          isOpen ? openClass : closedClass,
          headerClassName,
          className,
        )}
      >
        <div className={cn(sidebarStyles.header.base, headerClassName)}>
          <Logo
            title='DailyRoutine'
            imageClassName='size-[38px]'
            titleClassName='text-xl'
          />
          <button onClick={onClose} className={sidebarStyles.closeButton}>
            <X className='size-[38px]' strokeWidth={1.2} />
          </button>
        </div>
        {children}
      </section>
    </>
  )
}

export default Sidebar
