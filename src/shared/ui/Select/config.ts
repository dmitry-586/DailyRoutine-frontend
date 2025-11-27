export const selectStyles = {
  wrapper: 'relative inline-flex w-full',
  base: 'h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 pr-8 text-sm shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-input/80 focus:outline-none focus:ring-1 focus:ring-ring',
  disabled: 'cursor-not-allowed opacity-50',
  icon: 'pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
} as const
