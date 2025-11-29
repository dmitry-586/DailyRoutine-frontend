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
