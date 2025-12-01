export const getDailyFocusMessage = (
  totalHabits: number,
  completedToday: number,
): string => {
  if (totalHabits === 0) {
    return 'Добавьте первую привычку и запустите прогресс'
  }

  if (completedToday === 0) {
    return 'Начните с одного действия — отметьте любую привычку'
  }

  const completionRate = Math.round((completedToday / totalHabits) * 100)

  if (completionRate <= 25) {
    return 'Хорошее начало — продолжайте в своём темпе'
  }

  if (completionRate <= 50) {
    return 'Середина пути — выберите следующую привычку'
  }

  if (completionRate <= 75) {
    return 'Отличный темп — осталось немного до плана'
  }

  if (completionRate < 100) {
    return 'Почти 100% — закройте оставшиеся привычки'
  }

  return 'План на день выполнен — крутой результат!'
}
