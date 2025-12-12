export interface FlameStage {
  /** Уникальный идентификатор этапа */
  id: string
  /** Пороговое значение серии (дней подряд) для перехода на этот этап (включительно) */
  threshold: number
  /** Путь к SVG иконке огонька */
  iconPath: string
  /** Название этапа (опционально, для отладки) */
  name?: string
}

export interface FlameEvolutionProps {
  /** Текущая серия привычки (количество дней подряд) */
  streak: number
  /** Дополнительный CSS класс */
  className?: string
  /** Размер иконки в пикселях */
  size?: number
}
