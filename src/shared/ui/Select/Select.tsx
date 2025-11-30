'use client'

import { forwardRef, useImperativeHandle, type RefObject } from 'react'

import { SelectDropdown } from './components/SelectDropdown'
import { SelectHiddenField } from './components/SelectHiddenField'
import { SelectLabel } from './components/SelectLabel'
import { SelectTrigger } from './components/SelectTrigger'
import { selectStyles } from './config'
import type { SelectProps } from './types'
import { useSelectField } from './useSelectField'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      label,
      labelClassName,
      placeholder,
      options,
      disabled,
      value,
      name,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const {
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
    } = useSelectField({
      options,
      value,
      disabled,
      onChange,
    })

    useImperativeHandle(
      ref,
      () => hiddenSelectRef.current as HTMLSelectElement,
      [],
    )

    return (
      <div ref={containerRef} className={selectStyles.container}>
        <SelectLabel
          htmlFor={fieldId}
          label={label}
          className={labelClassName}
        />

        <SelectHiddenField
          id={fieldId}
          name={name}
          value={currentValue}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          selectRef={hiddenSelectRef as RefObject<HTMLSelectElement>}
        />

        <SelectTrigger
          disabled={disabled}
          variant={variant}
          size={size}
          className={className}
          isOpen={isOpen}
          hasValue={Boolean(selectedOption)}
          placeholder={placeholder}
          selectedLabel={selectedOption?.label}
          onClick={toggleOpen}
        />

        <SelectDropdown
          isOpen={isOpen}
          openDirection={openDirection}
          options={options}
          currentValue={currentValue}
          onSelect={handleSelect}
          onClose={close}
        />
      </div>
    )
  },
)

Select.displayName = 'Select'
