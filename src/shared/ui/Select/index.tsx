'use client'

import { cn } from '@/shared/lib/utils/cn'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { selectVariants, type SelectVariantProps } from './config'

interface SelectOption {
  label: string
  value: string
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    SelectVariantProps {
  options: SelectOption[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      options,
      disabled,
      value,
      name,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [openDirection, setOpenDirection] = React.useState<'up' | 'down'>(
      'down',
    )
    const containerRef = React.useRef<HTMLDivElement>(null)
    const hiddenSelectRef = React.useRef<HTMLSelectElement>(null)

    const currentValue = value ? String(value) : options[0]?.value || ''
    const selectedOption = options.find((opt) => opt.value === currentValue)

    React.useImperativeHandle(
      ref,
      () => hiddenSelectRef.current as HTMLSelectElement,
    )

    React.useLayoutEffect(() => {
      if (!isOpen || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      setOpenDirection(
        spaceBelow < 200 && spaceAbove > spaceBelow ? 'up' : 'down',
      )
    }, [isOpen])

    React.useEffect(() => {
      if (!isOpen) return

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    const handleSelect = (optionValue: string) => {
      setIsOpen(false)

      if (hiddenSelectRef.current) {
        hiddenSelectRef.current.value = optionValue

        const syntheticEvent = {
          target: hiddenSelectRef.current,
          currentTarget: hiddenSelectRef.current,
        } as unknown as React.ChangeEvent<HTMLSelectElement>

        onChange?.(syntheticEvent)
      }
    }

    return (
      <div ref={containerRef} className='relative'>
        <select
          ref={hiddenSelectRef}
          name={name}
          value={currentValue}
          onChange={onChange}
          onBlur={onBlur}
          className='sr-only'
          tabIndex={-1}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type='button'
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            selectVariants({ variant, size, className }),
            'flex items-center justify-between gap-3 text-left',
            disabled && 'cursor-not-allowed',
          )}
        >
          <span
            className={selectedOption ? 'text-white' : 'text-light-gray/50'}
          >
            {selectedOption?.label || 'Выберите...'}
          </span>
          <ChevronDown
            className={cn(
              'text-light-gray/50 size-4 transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {isOpen && (
          <>
            <div
              className='fixed inset-0 z-40'
              onClick={() => setIsOpen(false)}
            />
            <div
              className={cn(
                'border-light-gray/20 bg-background custom-scrollbar absolute z-50 max-h-60 w-full overflow-y-auto rounded-md border shadow-lg',
                openDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1',
              )}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm text-white transition-colors first:rounded-t-md last:rounded-b-md',
                    currentValue === option.value
                      ? 'bg-primary/20 text-primary font-medium'
                      : 'hover:bg-muted',
                  )}
                  title={option.label}
                >
                  <span className='block truncate'>{option.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  },
)
Select.displayName = 'Select'

export { Select, selectVariants }
export type { SelectVariantProps }
