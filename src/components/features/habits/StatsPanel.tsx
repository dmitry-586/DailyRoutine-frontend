'use client'

import { Card } from '@/components/ui/Card'
import { Award, Flame, Target, TrendingUp } from 'lucide-react'

interface StatsPanelProps {
  totalHabits: number
  completedToday: number
  currentStreak: number
  dailyCoins: number
}

export function StatsPanel({
  totalHabits,
  completedToday,
  currentStreak,
  dailyCoins,
}: StatsPanelProps) {
  const completionRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <div className="space-y-4">
      <Card className="border-none bg-[#3D4348] p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#1CBECB]/10 p-2">
                <Target className="h-4 w-4 text-[#1CBECB]" />
              </div>
              <span className="text-sm text-[#B3B3B3]">Выполнено сегодня</span>
            </div>
            <span className="font-semibold text-white">
              {completedToday}/{totalHabits}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#FF9800]/10 p-2">
                <Flame className="h-4 w-4 text-[#FF9800]" />
              </div>
              <span className="text-sm text-[#B3B3B3]">Текущая серия</span>
            </div>
            <span className="font-semibold text-white">
              {currentStreak} дней
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#4CAF50]/10 p-2">
                <TrendingUp className="h-4 w-4 text-[#4CAF50]" />
              </div>
              <span className="text-sm text-[#B3B3B3]">Общий прогресс</span>
            </div>
            <span className="font-semibold text-white">{completionRate}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#1CBECB]/10 p-2">
                <Award className="h-4 w-4 text-[#1CBECB]" />
              </div>
              <span className="text-sm text-[#B3B3B3]">Дейлики</span>
            </div>
            <span className="font-semibold text-[#1CBECB]">{dailyCoins}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
