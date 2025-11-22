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
    <div className='bg-background min-h-screen p-4 sm:p-6'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-6 sm:mb-8'>
          <h1 className='mb-2 text-white'>Спринты</h1>
          <p className='text-light-gray'>
            Выполняйте задания и получайте награды
          </p>
        </div>

        {/* Sprint Progress */}
        <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Card className='border-primary/20 hover:border-primary/40 hover:shadow-primary/10 from-gray to-muted border bg-gradient-to-br p-6 transition-all duration-200 hover:shadow-lg'>
            <div className='mb-3 flex items-center gap-3'>
              <div className='bg-primary/20 shadow-primary/10 rounded-xl p-3 shadow-lg'>
                <Target className='text-primary h-6 w-6' />
              </div>
              <span className='text-light-gray text-sm font-medium'>
                Активные задания
              </span>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-4xl font-bold text-white'>
                {selectedTasks.length}
              </p>
              <span className='text-light-gray text-lg'>/ 5</span>
            </div>
            {selectedTasks.length >= 5 && (
              <p className='text-green mt-2 text-xs'>✓ Максимум достигнут</p>
            )}
          </Card>

          <Card className='border-green/20 hover:border-green/40 hover:shadow-green/10 from-gray to-muted border bg-gradient-to-br p-6 transition-all duration-200 hover:shadow-lg'>
            <div className='mb-3 flex items-center gap-3'>
              <div className='bg-green/20 shadow-green/10 rounded-xl p-3 shadow-lg'>
                <Trophy className='text-green h-6 w-6' />
              </div>
              <span className='text-light-gray text-sm font-medium'>
                Выполнено
              </span>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-4xl font-bold text-white'>{completedTasks}</p>
              <span className='text-light-gray text-lg'>
                / {selectedTasks.length}
              </span>
            </div>
            {completedTasks > 0 && (
              <p className='text-green mt-2 text-xs'>
                {Math.round((completedTasks / selectedTasks.length) * 100)}%
                выполнено
              </p>
            )}
          </Card>

          <Card className='border-orange/20 hover:border-orange/40 hover:shadow-orange/10 from-gray to-muted border bg-gradient-to-br p-6 transition-all duration-200 hover:shadow-lg'>
            <div className='mb-3 flex items-center gap-3'>
              <div className='bg-orange/20 shadow-orange/10 rounded-xl p-3 shadow-lg'>
                <Award className='text-orange h-6 w-6' />
              </div>
              <span className='text-light-gray text-sm font-medium'>
                Общий прогресс
              </span>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-4xl font-bold text-white'>
                {Math.round(totalProgress)}
              </p>
              <span className='text-light-gray text-lg'>%</span>
            </div>
            <div className='mt-3'>
              <Progress value={totalProgress} className='h-2' />
            </div>
          </Card>
        </div>

        <Tabs defaultValue='active' className='mb-8'>
          <TabsList className='bg-gray mb-6'>
            <TabsTrigger
              value='active'
              className='hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary transition-all duration-200'
            >
              Текущие ({selectedTasks.length})
            </TabsTrigger>
            <TabsTrigger
              value='available'
              className='hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary transition-all duration-200'
            >
              Доступные ({availableTasks.length - selectedTasks.length})
            </TabsTrigger>
            <TabsTrigger
              value='leaderboard'
              className='hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary transition-all duration-200'
            >
              Таблица лидеров
            </TabsTrigger>
          </TabsList>

          <TabsContent value='active'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {currentTasks.map((task) => {
                const progress = (task.progress / task.total) * 100
                const isCompleted = task.progress >= task.total

                return (
                  <Card
                    key={task.id}
                    className={`from-gray to-muted border bg-gradient-to-br p-6 transition-all duration-200 hover:scale-[1.02] ${
                      isCompleted
                        ? 'border-green/40 shadow-green/10 hover:shadow-green/20 shadow-lg hover:shadow-xl'
                        : 'border-light-gray/10 hover:border-primary/30 hover:shadow-primary/10 hover:shadow-lg'
                    }`}
                  >
                    <div className='mb-4 flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3 className='mb-2 font-semibold text-white'>
                          {task.title}
                        </h3>
                        <div className='text-light-gray flex items-center gap-2 text-sm'>
                          <Clock className='h-4 w-4' />
                          <span>
                            {task.progress} / {task.total}
                          </span>
                        </div>
                      </div>
                      <div className='border-primary/30 bg-primary/20 flex items-center gap-1 rounded-full border px-3 py-1.5'>
                        <Award className='text-primary h-4 w-4' />
                        <span className='text-primary font-semibold'>
                          {task.reward}
                        </span>
                      </div>
                    </div>

                    <div className='mb-4'>
                      <div className='text-light-gray mb-1 flex items-center justify-between text-xs'>
                        <span>Прогресс</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress
                        value={progress}
                        className='h-2.5'
                        indicatorClassName={
                          isCompleted ? 'bg-green' : 'bg-primary'
                        }
                      />
                    </div>

                    {isCompleted ? (
                      <Button className='hover:shadow-green/30 from-green to-green-dark w-full bg-gradient-to-r shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl'>
                        <Trophy className='mr-2 h-4 w-4' />
                        Получить награду
                      </Button>
                    ) : (
                      <div className='text-light-gray py-2 text-center text-sm'>
                        Осталось: {task.total - task.progress}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value='available'>
            {availableTasks.filter((task) => !selectedTasks.includes(task.id))
              .length === 0 ? (
              <div className='py-12 text-center'>
                <p className='text-light-gray'>
                  Все задания добавлены в спринт
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {availableTasks
                  .filter((task) => !selectedTasks.includes(task.id))
                  .map((task) => (
                    <Card
                      key={task.id}
                      className='border-light-gray/10 hover:border-primary/30 hover:shadow-primary/10 from-gray to-muted border bg-gradient-to-br p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
                    >
                      <div className='mb-4 flex items-start justify-between'>
                        <div className='flex-1'>
                          <h3 className='mb-2 font-semibold text-white'>
                            {task.title}
                          </h3>
                          <div className='text-light-gray flex items-center gap-2 text-sm'>
                            <Target className='h-4 w-4' />
                            <span>Цель: {task.total}</span>
                          </div>
                        </div>
                        <div className='border-primary/30 bg-primary/20 flex items-center gap-1 rounded-full border px-3 py-1.5'>
                          <Award className='text-primary h-4 w-4' />
                          <span className='text-primary font-semibold'>
                            {task.reward}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => toggleTask(task.id)}
                        disabled={selectedTasks.length >= 5}
                        className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 w-full transition-all duration-200 hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
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

          <TabsContent value='leaderboard'>
            <Card className='bg-gray border-none'>
              <div className='divide-light-gray/10 divide-y'>
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 ${
                      entry.isUser ? 'bg-primary/10' : ''
                    }`}
                  >
                    <div className='flex items-center gap-4'>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          entry.rank === 1
                            ? 'bg-gold/20 text-gold'
                            : entry.rank === 2
                              ? 'bg-silver/20 text-silver'
                              : entry.rank === 3
                                ? 'bg-bronze/20 text-bronze'
                                : 'bg-gray text-light-gray'
                        }`}
                      >
                        {entry.rank <= 3 ? (
                          <Trophy className='h-5 w-5' />
                        ) : (
                          entry.rank
                        )}
                      </div>
                      <div className='text-2xl'>{entry.avatar}</div>
                      <div>
                        <p
                          className={`${
                            entry.isUser ? 'text-primary' : 'text-white'
                          }`}
                        >
                          {entry.name}
                        </p>
                        <p className='text-light-gray text-sm'>
                          Ранг #{entry.rank}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='text-white'>{entry.points}</p>
                      <p className='text-light-gray text-sm'>очков</p>
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
