import type { FlameStage } from './types'

/**
 * Определяет текущий этап эволюции на основе серии (количества дней подряд)
 *
 * @param streak - Текущая серия привычки (дни подряд)
 * @param stages - Массив этапов, отсортированный по возрастанию threshold
 * @returns Текущий этап или последний доступный этап
 */
export function getCurrentStage(
  streak: number,
  stages: FlameStage[],
): FlameStage {
  // Находим последний этап, порог которого не превышен
  let currentStage = stages[0]

  for (let i = stages.length - 1; i >= 0; i--) {
    if (streak >= stages[i].threshold) {
      currentStage = stages[i]
      break
    }
  }

  return currentStage
}

/**
 * Получает CSS классы для фона и границы на основе этапа огонька
 *
 * @param stageId - ID текущего этапа
 * @returns Объект с классами для фона и границы
 */
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

/**
 * Вычисляет прогресс до следующего этапа (в процентах)
 *
 * @param streak - Текущая серия привычки (дни подряд)
 * @param currentStage - Текущий этап
 * @param stages - Массив всех этапов
 * @returns Прогресс от 0 до 100, или 100 если достигнут максимальный этап
 */
export function getProgressToNextStage(
  streak: number,
  currentStage: FlameStage,
  stages: FlameStage[],
): number {
  const currentIndex = stages.findIndex((s) => s.id === currentStage.id)

  // Если это последний этап, прогресс всегда 100%
  if (currentIndex === stages.length - 1) {
    return 100
  }

  const nextStage = stages[currentIndex + 1]
  const stageRange = nextStage.threshold - currentStage.threshold
  const progressInRange = streak - currentStage.threshold

  if (stageRange === 0) return 100

  const progressPercent = Math.min(
    Math.max((progressInRange / stageRange) * 100, 0),
    100,
  )

  return Math.round(progressPercent)
}

/**
 * Вычисляет масштаб для визуального увеличения на основе серии
 * Чем больше серия, тем больше масштаб (от 1.0 до 1.3)
 *
 * @param streak - Текущая серия привычки (дни подряд)
 * @param maxStreak - Максимальная серия для расчета (по умолчанию 100)
 * @returns Масштаб от 1.0 до 1.3
 */
export function getFlameScale(streak: number, maxStreak = 50): number {
  if (streak <= 0) return 1.0

  // Ограничиваем максимальный масштаб до 1.3
  const maxScale = 1.3
  const minScale = 1.0
  const scaleRange = maxScale - minScale

  // Используем логарифмическую функцию для более плавного увеличения
  const normalizedStreak = Math.min(streak / maxStreak, 1)
  const scale = minScale + scaleRange * Math.log10(1 + normalizedStreak * 9)

  return Math.round(scale * 100) / 100 // Округляем до 2 знаков после запятой
}
