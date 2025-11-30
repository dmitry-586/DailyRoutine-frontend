export const timeInputLimits = {
  hours: 23,
  minutes: 59,
} as const

export const timeInputStyles = {
  wrapper: 'space-y-2',
  label: 'block text-sm text-white',
  fields: 'flex items-center gap-2',
  fieldWrapper: 'relative flex-1',
  colon: 'text-light-gray/50',
  suffix:
    'text-light-gray/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm',
  error: 'text-red text-xs',
}
