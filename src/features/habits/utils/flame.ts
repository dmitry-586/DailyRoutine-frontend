import type { FlameStage } from '../types/flame'

export function getCurrentStage(
  streak: number,
  stages: FlameStage[],
): FlameStage {
  let currentStage = stages[0]

  for (let i = stages.length - 1; i >= 0; i--) {
    if (streak >= stages[i].threshold) {
      currentStage = stages[i]
      break
    }
  }

  return currentStage
}

export function getFlameStageStyles(stageId: string): {
  bgClassName: string
  borderClassName: string
  textClassName: string
} {
  const styles: Record<
    string,
    { bgClassName: string; borderClassName: string; textClassName: string }
  > = {
    'stage-1': {
      bgClassName: 'bg-orange/10',
      borderClassName: 'border-orange/20',
      textClassName: 'text-orange',
    },
    'stage-2': {
      bgClassName: 'bg-cyan/10',
      borderClassName: 'border-cyan/20',
      textClassName: 'text-cyan',
    },
    'stage-3': {
      bgClassName: 'bg-blue/10',
      borderClassName: 'border-blue/20',
      textClassName: 'text-blue',
    },
    'stage-4': {
      bgClassName: 'bg-green/10',
      borderClassName: 'border-green/20',
      textClassName: 'text-green',
    },
    'stage-5': {
      bgClassName: 'bg-purple/10',
      borderClassName: 'border-purple/20',
      textClassName: 'text-purple',
    },
  }

  return (
    styles[stageId] || {
      bgClassName: 'bg-gray/10',
      borderClassName: 'border-light-gray/20',
      textClassName: 'text-light-gray',
    }
  )
}

export function getFlameScale(streak: number, maxStreak = 50): number {
  if (streak <= 0) return 1.0

  // Ограничиваем максимальный масштаб до 1.3
  const maxScale = 1.3
  const minScale = 1.0
  const scaleRange = maxScale - minScale

  // Используем логарифмическую функцию для более плавного увеличения
  const normalizedStreak = Math.min(streak / maxStreak, 1)
  const scale = minScale + scaleRange * Math.log10(1 + normalizedStreak * 9)

  return Math.round(scale * 100) / 100
}
