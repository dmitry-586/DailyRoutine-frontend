import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
  'flex w-full rounded-md border px-3 py-1 text-sm transition-all focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&[type=number]]:[-moz-appearance:textfield] [&[type=number]]:[&::-webkit-inner-spin-button]:appearance-none [&[type=number]]:[&::-webkit-outer-spin-button]:appearance-none [&[type=time]]:text-center [&[type=time]]:px-5 [&[type=time]]:font-medium',
  {
    variants: {
      variant: {
        default:
          'border-light-gray/20 bg-background text-white placeholder:text-light-gray/50 hover:border-light-gray/30 focus:ring-primary focus:border-primary',
        error:
          'border-red/50 bg-background text-white placeholder:text-light-gray/50 hover:border-red/70 focus:ring-red focus:border-red',
      },
      inputSize: {
        default: 'h-10 px-3 py-1',
        sm: 'h-8 px-2.5 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
)

export type InputVariantProps = VariantProps<typeof inputVariants>
