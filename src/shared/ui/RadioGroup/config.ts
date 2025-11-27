export const radioGroupStyles = {
  root: 'grid gap-2',
  wrapper: 'inline-flex items-center',
  input: 'sr-only',
  item: 'relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary text-primary transition-all duration-200',
  checked: 'border-primary bg-primary/10',
  disabled: 'cursor-not-allowed opacity-50',
  indicator:
    'absolute inset-1 rounded-full bg-primary opacity-0 transition-opacity duration-200',
  indicatorChecked: 'opacity-100',
} as const
