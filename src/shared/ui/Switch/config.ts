export const switchStyles = {
  base: 'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  checked: 'bg-green',
  unchecked: 'bg-light-gray/30',
  disabled: 'cursor-not-allowed opacity-50',
  thumb:
    'pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200',
  thumbChecked: 'translate-x-5',
  thumbUnchecked: 'translate-x-0',
} as const
