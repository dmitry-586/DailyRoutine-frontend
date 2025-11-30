import { cva, type VariantProps } from 'class-variance-authority'

export const selectVariants = cva(
  'min-w-[130px] appearance-none rounded-md border text-sm transition-all focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-light-gray/20 bg-background text-white hover:border-light-gray/30 focus:ring-primary focus:border-primary',
        error:
          'border-red/50 bg-background text-white hover:border-red/70 focus:ring-red focus:border-red',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-8 px-2.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type SelectVariantProps = VariantProps<typeof selectVariants>

export const selectStyles = {
  container: 'relative',
  label: 'mb-2 block text-sm text-white',
  trigger:
    'flex items-center justify-between gap-3 text-left transition-colors disabled:cursor-not-allowed',
  placeholder: 'text-light-gray/50',
  value: 'text-white',
  chevron: 'text-light-gray/50 size-4 transition-transform',
  overlay: 'fixed inset-0 z-40',
  dropdown:
    'border-light-gray/20 bg-background custom-scrollbar absolute z-50 max-h-60 w-full overflow-y-auto rounded-md border shadow-lg',
  dropdownTop: 'bottom-full mb-1',
  dropdownBottom: 'top-full mt-1',
  option:
    'w-full px-3 py-2 text-left text-sm text-white transition-colors first:rounded-t-md last:rounded-b-md',
  optionActive: 'bg-primary/20 text-primary font-medium',
  optionIdle: 'hover:bg-muted',
  optionLabel: 'block truncate',
}
