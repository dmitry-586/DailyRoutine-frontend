interface HabitCardStyleParams {
  isActive: boolean
  isCompleted: boolean
}

export const CARD_BASE_STYLES =
  'bg-gray relative flex cursor-pointer flex-col rounded-lg border p-4 transition-all duration-200'

export const getCardContainerClassName = ({
  isActive,
  isCompleted,
}: HabitCardStyleParams): string => {
  if (!isActive) {
    return 'border-light-gray/20 hover:border-light-gray/30 opacity-50'
  }

  if (isCompleted) {
    return 'border-green/30 hover:border-green/50 hover:shadow-green/10 hover:shadow-lg'
  }

  return 'border-light-gray/10 hover:border-primary/30 hover:bg-gray/95 hover:shadow-primary/10 hover:shadow-lg'
}
