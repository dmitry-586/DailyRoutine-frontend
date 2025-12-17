export type StatCardColor = 'primary' | 'green' | 'orange'

interface StatCardColorClasses {
  border: string
  iconBg: string
  icon: string
}

export function getStatCardColors(color: StatCardColor): StatCardColorClasses {
  const colorClasses: Record<StatCardColor, StatCardColorClasses> = {
    primary: {
      border:
        'border-primary/20 hover:border-primary/40 hover:shadow-primary/10',
      iconBg: 'bg-primary/20 shadow-primary/10',
      icon: 'text-primary',
    },
    green: {
      border: 'border-green/20 hover:border-green/40 hover:shadow-green/10',
      iconBg: 'bg-green/20 shadow-green/10',
      icon: 'text-green',
    },
    orange: {
      border: 'border-orange/20 hover:border-orange/40 hover:shadow-orange/10',
      iconBg: 'bg-orange/20 shadow-orange/10',
      icon: 'text-orange',
    },
  }

  return colorClasses[color]
}
