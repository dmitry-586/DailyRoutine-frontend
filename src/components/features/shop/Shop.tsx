'use client'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Award, Check, Filter, ShoppingCart, X } from 'lucide-react'
import { useMemo, useState } from 'react'

export function Shop() {
  const balance = 340
  const [typeFilter, setTypeFilter] = useState<
    'all' | 'frame' | 'status' | 'theme'
  >('all')
  const [priceFilter, setPriceFilter] = useState<
    'all' | 'affordable' | 'expensive'
  >('all')
  const [availabilityFilter, setAvailabilityFilter] = useState<
    'all' | 'owned' | 'available'
  >('all')

  const items = [
    {
      id: '1',
      name: 'Золотая рамка',
      description: 'Премиальная рамка для профиля',
      price: 500,
      type: 'frame',
      preview: '🖼️',
      owned: false,
    },
    {
      id: '2',
      name: 'Статус VIP',
      description: 'VIP статус на 30 дней',
      price: 1000,
      type: 'status',
      preview: '⭐',
      owned: false,
    },
    {
      id: '3',
      name: 'Серебряная рамка',
      description: 'Элегантная серебряная рамка',
      price: 300,
      type: 'frame',
      preview: '🔲',
      owned: true,
    },
    {
      id: '4',
      name: 'Тема "Океан"',
      description: 'Красивая синяя тема оформления',
      price: 400,
      type: 'theme',
      preview: '🌊',
      owned: false,
    },
    {
      id: '5',
      name: 'Статус Герой',
      description: 'Эксклюзивный статус героя',
      price: 800,
      type: 'status',
      preview: '🦸',
      owned: false,
    },
    {
      id: '6',
      name: 'Радужная рамка',
      description: 'Уникальная анимированная рамка',
      price: 1500,
      type: 'frame',
      preview: '🌈',
      owned: false,
    },
    {
      id: '7',
      name: 'Тема "Закат"',
      description: 'Теплая оранжевая тема',
      price: 350,
      type: 'theme',
      preview: '🌅',
      owned: false,
    },
    {
      id: '8',
      name: 'Бронзовая рамка',
      description: 'Стартовая рамка для новичков',
      price: 100,
      type: 'frame',
      preview: '🥉',
      owned: true,
    },
  ]

  const canAfford = (price: number) => balance >= price

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Фильтр по типу
      if (typeFilter !== 'all' && item.type !== typeFilter) return false

      // Фильтр по цене
      if (priceFilter === 'affordable' && item.price > balance) return false
      if (priceFilter === 'expensive' && item.price <= balance) return false

      // Фильтр по доступности
      if (availabilityFilter === 'owned' && !item.owned) return false
      if (availabilityFilter === 'available' && item.owned) return false

      return true
    })
  }, [typeFilter, priceFilter, availabilityFilter, balance])

  const hasActiveFilters =
    typeFilter !== 'all' ||
    priceFilter !== 'all' ||
    availabilityFilter !== 'all'

  const clearFilters = () => {
    setTypeFilter('all')
    setPriceFilter('all')
    setAvailabilityFilter('all')
  }

  return (
    <div className="min-h-screen bg-[#2D3134] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 text-white">Магазин</h1>
          <p className="text-[#B3B3B3]">
            Потратьте заработанные дейлики на награды
          </p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 border-none bg-gradient-to-r from-[#1CBECB] to-[#4CAF50] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-white/80">Ваш баланс</p>
              <div className="flex items-center gap-2">
                <Award className="h-8 w-8 text-white" />
                <span className="text-4xl text-white">{balance}</span>
                <span className="text-xl text-white/80">дейликов</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">Заработано за неделю</p>
              <p className="text-2xl text-white">+85</p>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#B3B3B3]" />
              <span className="text-sm font-medium text-[#B3B3B3]">
                Фильтры:
              </span>
            </div>

            <Select
              value={typeFilter}
              onValueChange={(value: any) => setTypeFilter(value)}
            >
              <SelectTrigger className="w-[140px] border-[#B3B3B3]/20 bg-[#3D4348] text-white">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent className="border-[#B3B3B3]/20 bg-[#3D4348] text-white">
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="frame">Рамки</SelectItem>
                <SelectItem value="status">Статусы</SelectItem>
                <SelectItem value="theme">Темы</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={priceFilter}
              onValueChange={(value: any) => setPriceFilter(value)}
            >
              <SelectTrigger className="w-[160px] border-[#B3B3B3]/20 bg-[#3D4348] text-white">
                <SelectValue placeholder="Цена" />
              </SelectTrigger>
              <SelectContent className="border-[#B3B3B3]/20 bg-[#3D4348] text-white">
                <SelectItem value="all">Любая цена</SelectItem>
                <SelectItem value="affordable">По карману</SelectItem>
                <SelectItem value="expensive">Дорогие</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={availabilityFilter}
              onValueChange={(value: any) => setAvailabilityFilter(value)}
            >
              <SelectTrigger className="w-[160px] border-[#B3B3B3]/20 bg-[#3D4348] text-white">
                <SelectValue placeholder="Доступность" />
              </SelectTrigger>
              <SelectContent className="border-[#B3B3B3]/20 bg-[#3D4348] text-white">
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="available">Доступные</SelectItem>
                <SelectItem value="owned">Купленные</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-[#B3B3B3]/20 text-[#B3B3B3] transition-all duration-200 hover:border-[#B3B3B3]/30 hover:text-white"
              >
                <X className="mr-1 h-4 w-4" />
                Сбросить
              </Button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="text-sm text-[#B3B3B3]">
              Найдено: {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'товар' : 'товаров'}
            </div>
          )}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="rounded-xl bg-[#3D4348] p-12 text-center">
            <p className="mb-4 text-[#B3B3B3]">Товары не найдены</p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-[#B3B3B3]/20"
              >
                Сбросить фильтры
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col border-none bg-[#3D4348] p-6 transition-all duration-200 hover:scale-[1.02] hover:border hover:border-[#1CBECB]/30 hover:shadow-lg hover:shadow-[#1CBECB]/10"
              >
                <div className="mb-4 text-center">
                  <div className="mb-3 text-6xl">{item.preview}</div>
                  <h3 className="mb-2 text-white">{item.name}</h3>
                  <p className="mb-3 text-sm text-[#B3B3B3]">
                    {item.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="border-[#B3B3B3]/20 text-[#B3B3B3]"
                  >
                    {item.type === 'frame'
                      ? 'Рамка'
                      : item.type === 'status'
                        ? 'Статус'
                        : 'Тема'}
                  </Badge>
                </div>

                <div className="mt-auto">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <Award className="h-5 w-5 text-[#1CBECB]" />
                    <span className="text-xl text-white">{item.price}</span>
                  </div>

                  {item.owned ? (
                    <Button
                      className="w-full bg-[#4CAF50] hover:bg-[#4CAF50]/90"
                      disabled
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Куплено
                    </Button>
                  ) : (
                    <Button
                      className={`w-full transition-all duration-200 ${
                        canAfford(item.price)
                          ? 'bg-[#1CBECB] hover:scale-105 hover:bg-[#1CBECB]/90 hover:shadow-md hover:shadow-[#1CBECB]/20'
                          : 'cursor-not-allowed bg-[#32373A] text-[#B3B3B3]'
                      }`}
                      disabled={!canAfford(item.price)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {canAfford(item.price) ? 'Купить' : 'Недостаточно'}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-8 border-none bg-[#3D4348] p-6">
          <h3 className="mb-4 text-white">Как заработать дейлики?</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#4CAF50]/10 p-2">
                <Award className="h-5 w-5 text-[#4CAF50]" />
              </div>
              <div>
                <p className="mb-1 text-white">Выполняйте привычки</p>
                <p className="text-sm text-[#B3B3B3]">
                  +10 дейликов за каждую привычку
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#FF9800]/10 p-2">
                <Award className="h-5 w-5 text-[#FF9800]" />
              </div>
              <div>
                <p className="mb-1 text-white">Поддерживайте серии</p>
                <p className="text-sm text-[#B3B3B3]">
                  Бонусы за длинные серии
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#1CBECB]/10 p-2">
                <Award className="h-5 w-5 text-[#1CBECB]" />
              </div>
              <div>
                <p className="mb-1 text-white">Завершайте спринты</p>
                <p className="text-sm text-[#B3B3B3]">
                  Награды за выполнение заданий
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
