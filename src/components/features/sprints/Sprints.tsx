'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Award, Clock, Target, Trophy } from 'lucide-react'
import { useState } from 'react'

export function Sprints() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
  ])

  const availableTasks = [
    {
      id: '1',
      title: 'Выполнить все привычки 7 дней подряд',
      reward: 100,
      progress: 5,
      total: 7,
    },
    {
      id: '2',
      title: 'Создать 5 новых привычек',
      reward: 50,
      progress: 3,
      total: 5,
    },
    {
      id: '3',
      title: 'Достичь серии в 30 дней',
      reward: 200,
      progress: 7,
      total: 30,
    },
    {
      id: '4',
      title: 'Выполнить 100 привычек',
      reward: 150,
      progress: 67,
      total: 100,
    },
    {
      id: '5',
      title: 'Не пропустить ни одной привычки неделю',
      reward: 80,
      progress: 4,
      total: 7,
    },
    {
      id: '6',
      title: 'Завершить 3 спринта',
      reward: 120,
      progress: 1,
      total: 3,
    },
    {
      id: '7',
      title: 'Набрать 1000 дейликов',
      reward: 100,
      progress: 340,
      total: 1000,
    },
    {
      id: '8',
      title: 'Поделиться прогрессом 5 раз',
      reward: 50,
      progress: 0,
      total: 5,
    },
    {
      id: '9',
      title: 'Отметить все привычки за день',
      reward: 30,
      progress: 0,
      total: 1,
    },
    {
      id: '10',
      title: 'Достичь 90% успешности',
      reward: 150,
      progress: 85,
      total: 90,
    },
  ]

  const leaderboard = [
    { rank: 1, name: 'Алексей М.', points: 1250, avatar: '🎯' },
    { rank: 2, name: 'Мария К.', points: 1180, avatar: '🌟' },
    { rank: 3, name: 'Дмитрий П.', points: 1050, avatar: '⚡' },
    { rank: 4, name: 'Вы', points: 890, avatar: '👤', isUser: true },
    { rank: 5, name: 'Елена С.', points: 820, avatar: '💫' },
  ]

  const toggleTask = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId))
    } else if (selectedTasks.length < 5) {
      setSelectedTasks([...selectedTasks, taskId])
    }
  }

  const currentTasks = availableTasks.filter((task) =>
    selectedTasks.includes(task.id),
  )
  const completedTasks = currentTasks.filter(
    (task) => task.progress >= task.total,
  ).length
  const totalProgress =
    currentTasks.reduce(
      (acc, task) => acc + (task.progress / task.total) * 100,
      0,
    ) / currentTasks.length

  return (
    <div className="min-h-screen bg-[#2D3134] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-white">Спринты</h1>
          <p className="text-[#B3B3B3]">
            Выполняйте задания и получайте награды
          </p>
        </div>

        {/* Sprint Progress */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border border-[#1CBECB]/20 bg-gradient-to-br from-[#3D4348] to-[#32373A] p-6 transition-all duration-200 hover:border-[#1CBECB]/40 hover:shadow-lg hover:shadow-[#1CBECB]/10">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-[#1CBECB]/20 p-3 shadow-lg shadow-[#1CBECB]/10">
                <Target className="h-6 w-6 text-[#1CBECB]" />
              </div>
              <span className="text-sm font-medium text-[#B3B3B3]">
                Активные задания
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-white">
                {selectedTasks.length}
              </p>
              <span className="text-lg text-[#B3B3B3]">/ 5</span>
            </div>
            {selectedTasks.length >= 5 && (
              <p className="mt-2 text-xs text-[#4CAF50]">
                ✓ Максимум достигнут
              </p>
            )}
          </Card>

          <Card className="border border-[#4CAF50]/20 bg-gradient-to-br from-[#3D4348] to-[#32373A] p-6 transition-all duration-200 hover:border-[#4CAF50]/40 hover:shadow-lg hover:shadow-[#4CAF50]/10">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-[#4CAF50]/20 p-3 shadow-lg shadow-[#4CAF50]/10">
                <Trophy className="h-6 w-6 text-[#4CAF50]" />
              </div>
              <span className="text-sm font-medium text-[#B3B3B3]">
                Выполнено
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-white">{completedTasks}</p>
              <span className="text-lg text-[#B3B3B3]">
                / {selectedTasks.length}
              </span>
            </div>
            {completedTasks > 0 && (
              <p className="mt-2 text-xs text-[#4CAF50]">
                {Math.round((completedTasks / selectedTasks.length) * 100)}%
                выполнено
              </p>
            )}
          </Card>

          <Card className="border border-[#FF9800]/20 bg-gradient-to-br from-[#3D4348] to-[#32373A] p-6 transition-all duration-200 hover:border-[#FF9800]/40 hover:shadow-lg hover:shadow-[#FF9800]/10">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-[#FF9800]/20 p-3 shadow-lg shadow-[#FF9800]/10">
                <Award className="h-6 w-6 text-[#FF9800]" />
              </div>
              <span className="text-sm font-medium text-[#B3B3B3]">
                Общий прогресс
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-white">
                {Math.round(totalProgress)}
              </p>
              <span className="text-lg text-[#B3B3B3]">%</span>
            </div>
            <div className="mt-3">
              <Progress value={totalProgress} className="h-2" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="active" className="mb-8">
          <TabsList className="mb-6 bg-[#3D4348]">
            <TabsTrigger
              value="active"
              className="transition-all duration-200 hover:bg-[#1CBECB]/20 data-[state=active]:bg-[#1CBECB] data-[state=active]:hover:bg-[#1CBECB]"
            >
              Текущие ({selectedTasks.length})
            </TabsTrigger>
            <TabsTrigger
              value="available"
              className="transition-all duration-200 hover:bg-[#1CBECB]/20 data-[state=active]:bg-[#1CBECB] data-[state=active]:hover:bg-[#1CBECB]"
            >
              Доступные ({availableTasks.length - selectedTasks.length})
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="transition-all duration-200 hover:bg-[#1CBECB]/20 data-[state=active]:bg-[#1CBECB] data-[state=active]:hover:bg-[#1CBECB]"
            >
              Таблица лидеров
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentTasks.map((task) => {
                const progress = (task.progress / task.total) * 100
                const isCompleted = task.progress >= task.total

                return (
                  <Card
                    key={task.id}
                    className={`border bg-gradient-to-br from-[#3D4348] to-[#32373A] p-6 transition-all duration-200 hover:scale-[1.02] ${
                      isCompleted
                        ? 'border-[#4CAF50]/40 shadow-lg shadow-[#4CAF50]/10 hover:shadow-xl hover:shadow-[#4CAF50]/20'
                        : 'border-[#B3B3B3]/10 hover:border-[#1CBECB]/30 hover:shadow-lg hover:shadow-[#1CBECB]/10'
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold text-white">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                          <Clock className="h-4 w-4" />
                          <span>
                            {task.progress} / {task.total}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-[#1CBECB]/30 bg-[#1CBECB]/20 px-3 py-1.5">
                        <Award className="h-4 w-4 text-[#1CBECB]" />
                        <span className="font-semibold text-[#1CBECB]">
                          {task.reward}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="mb-1 flex items-center justify-between text-xs text-[#B3B3B3]">
                        <span>Прогресс</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress
                        value={progress}
                        className="h-2.5"
                        indicatorClassName={
                          isCompleted ? 'bg-[#4CAF50]' : 'bg-[#1CBECB]'
                        }
                      />
                    </div>

                    {isCompleted ? (
                      <Button className="w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] shadow-lg transition-all duration-200 hover:scale-105 hover:from-[#45a049] hover:to-[#4CAF50] hover:shadow-xl hover:shadow-[#4CAF50]/30">
                        <Trophy className="mr-2 h-4 w-4" />
                        Получить награду
                      </Button>
                    ) : (
                      <div className="py-2 text-center text-sm text-[#B3B3B3]">
                        Осталось: {task.total - task.progress}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="available">
            {availableTasks.filter((task) => !selectedTasks.includes(task.id))
              .length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[#B3B3B3]">Все задания добавлены в спринт</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {availableTasks
                  .filter((task) => !selectedTasks.includes(task.id))
                  .map((task) => (
                    <Card
                      key={task.id}
                      className="border border-[#B3B3B3]/10 bg-gradient-to-br from-[#3D4348] to-[#32373A] p-6 transition-all duration-200 hover:scale-[1.02] hover:border-[#1CBECB]/30 hover:shadow-lg hover:shadow-[#1CBECB]/10"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-2 font-semibold text-white">
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                            <Target className="h-4 w-4" />
                            <span>Цель: {task.total}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 rounded-full border border-[#1CBECB]/30 bg-[#1CBECB]/20 px-3 py-1.5">
                          <Award className="h-4 w-4 text-[#1CBECB]" />
                          <span className="font-semibold text-[#1CBECB]">
                            {task.reward}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => toggleTask(task.id)}
                        disabled={selectedTasks.length >= 5}
                        className="w-full bg-[#1CBECB] transition-all duration-200 hover:scale-105 hover:bg-[#1CBECB]/90 hover:shadow-md hover:shadow-[#1CBECB]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {selectedTasks.length >= 5
                          ? 'Достигнут лимит (5/5)'
                          : 'Добавить в спринт'}
                      </Button>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="border-none bg-[#3D4348]">
              <div className="divide-y divide-[#B3B3B3]/10">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 ${
                      entry.isUser ? 'bg-[#1CBECB]/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          entry.rank === 1
                            ? 'bg-[#FFD700]/20 text-[#FFD700]'
                            : entry.rank === 2
                              ? 'bg-[#C0C0C0]/20 text-[#C0C0C0]'
                              : entry.rank === 3
                                ? 'bg-[#CD7F32]/20 text-[#CD7F32]'
                                : 'bg-[#3D4348] text-[#B3B3B3]'
                        }`}
                      >
                        {entry.rank <= 3 ? (
                          <Trophy className="h-5 w-5" />
                        ) : (
                          entry.rank
                        )}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                      <div>
                        <p
                          className={`${
                            entry.isUser ? 'text-[#1CBECB]' : 'text-white'
                          }`}
                        >
                          {entry.name}
                        </p>
                        <p className="text-sm text-[#B3B3B3]">
                          Ранг #{entry.rank}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{entry.points}</p>
                      <p className="text-sm text-[#B3B3B3]">очков</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
