import { cva, type VariantProps } from 'class-variance-authority'

export const radioVariants = cva(
  'relative flex shrink-0 items-center justify-center rounded-full border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-primary text-primary',
        error: 'border-red/50 text-red',
      },
      size: {
        default: 'h-4 w-4',
        sm: 'h-3.5 w-3.5',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export const radioIndicatorVariants = cva(
  'absolute rounded-full bg-current opacity-0 transition-opacity duration-200',
  {
    variants: {
      size: {
        default: 'inset-1',
        sm: 'inset-0.5',
        lg: 'inset-1.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type RadioVariantProps = VariantProps<typeof radioVariants>
