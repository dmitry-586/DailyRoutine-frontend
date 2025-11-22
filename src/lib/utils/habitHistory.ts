import type {
	Habit,
	HabitHistoryEntry,
} from '@/components/features/habits/HabitModal'

// Генерируем уникальную историю для каждой привычки на основе её ID
export function generateHistoryForHabit(habit: Habit): HabitHistoryEntry[] {
	const history: HabitHistoryEntry[] = []
	const today = new Date()

	// Генерируем данные за последние 30 дней
	for (let i = 29; i >= 0; i--) {
		const date = new Date(today)
		date.setDate(date.getDate() - i)

		// Используем ID привычки как seed для генерации уникальных данных
		const seed = parseInt(habit.id) || 0
		const daySeed = (seed + i) % 100

		// Генерируем случайные, но стабильные данные на основе seed
		const shouldComplete = daySeed > 20 // 80% вероятность выполнения
		const completed = shouldComplete

		let value = 0
		if (habit.format === 'binary') {
			value = completed ? 1 : 0
		} else if (habit.format === 'time') {
			// Для времени: генерируем значение от 50% до 120% от цели
			const baseValue = habit.target * (0.5 + (daySeed / 100) * 0.7)
			value = completed ? Math.round(baseValue) : Math.round(baseValue * 0.3)
		} else {
			// Для количества: аналогично
			const baseValue = habit.target * (0.5 + (daySeed / 100) * 0.7)
			value = completed ? Math.round(baseValue) : Math.round(baseValue * 0.3)
		}

		history.push({
			date: date.toISOString().split('T')[0],
			value,
			completed,
		})
	}

	return history
}

// Добавляем запись в историю при завершении привычки
export function addHistoryEntry(
	habit: Habit,
	value: number,
	completed: boolean
): Habit {
	const today = new Date().toISOString().split('T')[0]

	// Проверяем, есть ли уже запись на сегодня
	const existingHistory = habit.history || []
	const todayIndex = existingHistory.findIndex(entry => entry.date === today)

	let updatedHistory: HabitHistoryEntry[]

	if (todayIndex >= 0) {
		// Обновляем существующую запись
		updatedHistory = [...existingHistory]
		updatedHistory[todayIndex] = {
			date: today,
			value,
			completed,
		}
	} else {
		// Добавляем новую запись
		updatedHistory = [
			...existingHistory,
			{
				date: today,
				value,
				completed,
			},
		]
	}

	return {
		...habit,
		history: updatedHistory,
		current: value,
		completed,
	}
}
