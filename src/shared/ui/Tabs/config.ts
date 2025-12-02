import type { TabVariant } from './types'

export const tabsStyles = {
  list: 'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
  trigger: {
    base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    variants: {
      default:
        'hover:bg-background/20 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow data-[state=active]:hover:bg-background',
      primary:
        'hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary',
      success:
        'hover:bg-green/20 data-[state=active]:bg-green data-[state=active]:hover:bg-green',
      danger:
        'hover:bg-red/20 data-[state=active]:bg-red data-[state=active]:hover:bg-red',
      neutral:
        'hover:bg-light-gray/20 data-[state=active]:bg-light-gray data-[state=active]:hover:bg-light-gray',
    } satisfies Record<TabVariant, string>,
  },
} as const
