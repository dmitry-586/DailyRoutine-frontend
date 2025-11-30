'use client'

import {
  type ChangeEvent,
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import type { SelectOption, SelectProps } from './types'

interface UseSelectFieldParams {
  options: SelectOption[]
  value?: SelectProps['value']
  disabled?: boolean
  onChange?: SelectProps['onChange']
}

interface UseSelectFieldResult {
  containerRef: RefObject<HTMLDivElement | null>
  hiddenSelectRef: RefObject<HTMLSelectElement | null>
  fieldId: string
  isOpen: boolean
  openDirection: 'up' | 'down'
  currentValue: string
  selectedOption?: SelectOption
  toggleOpen: () => void
  close: () => void
  handleSelect: (optionValue: string) => void
}

export const useSelectField = ({
  options,
  value,
  disabled,
  onChange,
}: UseSelectFieldParams): UseSelectFieldResult => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down')
  const containerRef = useRef<HTMLDivElement>(null)
  const hiddenSelectRef = useRef<HTMLSelectElement>(null)
  const fieldId = useId()

  const currentValue = value ? String(value) : (options[0]?.value ?? '')

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === currentValue),
    [options, currentValue],
  )

  useLayoutEffect(() => {
    if (!isOpen || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top

    setOpenDirection(
      spaceBelow < 200 && spaceAbove > spaceBelow ? 'up' : 'down',
    )
  }, [isOpen])

  useEffect(() => {
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

  const close = useCallback(() => setIsOpen(false), [])

  const toggleOpen = useCallback(() => {
    if (disabled) return
    setIsOpen((prev) => !prev)
  }, [disabled])

  const handleSelect = useCallback(
    (optionValue: string) => {
      close()

      if (!hiddenSelectRef.current) return

      hiddenSelectRef.current.value = optionValue

      const syntheticEvent = {
        target: hiddenSelectRef.current,
        currentTarget: hiddenSelectRef.current,
      } as unknown as ChangeEvent<HTMLSelectElement>

      onChange?.(syntheticEvent)
    },
    [close, onChange],
  )

  return {
    containerRef,
    hiddenSelectRef,
    fieldId,
    isOpen,
    openDirection,
    currentValue,
    selectedOption,
    toggleOpen,
    close,
    handleSelect,
  }
}
