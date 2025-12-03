import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Settings,
  Target,
  Zap,
} from 'lucide-react'

import type { HowWorkStage } from './types'

export const howWorkStages: HowWorkStage[] = [
  {
    id: 'habit-builder',
    number: 1,
    title: 'Настройте привычки',
    description:
      'Соберите каждую привычку под свой сценарий: выберите тип (полезная или вредная), формат отслеживания (да/нет, количество или время) и задайте расписание.',
    visualId: 'habit-form',
    features: [
      {
        id: 'habit-types',
        icon: Target,
        text: 'Полезные и вредные привычки',
        accent: 'emerald',
      },
      {
        id: 'tracking-formats',
        icon: Settings,
        text: 'Три формата: да/нет, количество, время',
        accent: 'emerald',
      },
      {
        id: 'flexible-schedule',
        icon: Calendar,
        text: 'Гибкое расписание по дням недели',
        accent: 'emerald',
      },
      {
        id: 'reminder-time',
        icon: Clock,
        text: 'Управление временем уведомлений',
        accent: 'emerald',
      },
    ],
  },
  {
    id: 'telegram-reminders',
    number: 2,
    title: 'Получайте напоминания',
    description:
      'Бот отправляет напоминания в Telegram и принимает отметки выполнения прямо в чате, подстраиваясь под ваш часовой пояс.',
    visualId: 'telegram-reminders',
    align: 'reversed',
    features: [
      {
        id: 'schedule-notifications',
        icon: Bell,
        text: 'Напоминания по заданному расписанию',
        accent: 'cyan',
      },
      {
        id: 'telegram-check-ins',
        icon: Zap,
        text: 'Отметка выполнения в Telegram',
        accent: 'cyan',
      },
      {
        id: 'format-support',
        icon: CheckCircle2,
        text: 'Поддержка всех форматов отслеживания',
        accent: 'cyan',
      },
      {
        id: 'timezone-awareness',
        icon: Clock,
        text: 'Учет часового пояса',
        accent: 'cyan',
      },
    ],
  },
  {
    id: 'progress-analytics',
    number: 3,
    title: 'Следите за прогрессом',
    description:
      'Визуализируйте динамику привычек, отслеживайте серии выполнения и анализируйте статистику по каждой привычке.',
    visualId: 'progress-dashboard',
    features: [
      {
        id: 'day-by-day-chart',
        icon: BarChart3,
        text: 'Графики выполнения по дням',
        accent: 'emerald',
      },
      {
        id: 'streaks',
        icon: Target,
        text: 'Текущая и максимальная серия',
        accent: 'emerald',
      },
      {
        id: 'habit-analytics',
        icon: Activity,
        text: 'Статистика по привычкам',
        accent: 'emerald',
      },
    ],
  },
]
