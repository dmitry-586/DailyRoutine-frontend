'use client'

import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import { Select } from '@/shared/ui/Select'
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
    <div className='bg-background min-h-screen p-4 sm:p-6'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-6 sm:mb-8'>
          <h1 className='mb-2 text-white'>Магазин</h1>
          <p className='text-light-gray'>
            Потратьте заработанные дейлики на награды
          </p>
        </div>

        {/* Balance Card */}
        <div className='from-primary to-green mb-8 border-none bg-gradient-to-r p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='mb-1 text-white/80'>Ваш баланс</p>
              <div className='flex items-center gap-2'>
                <Award className='h-8 w-8 text-white' />
                <span className='text-4xl text-white'>{balance}</span>
                <span className='text-xl text-white/80'>дейликов</span>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-sm text-white/80'>Заработано за неделю</p>
              <p className='text-2xl text-white'>+85</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className='mb-6 space-y-4'>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Filter className='text-light-gray h-4 w-4' />
              <span className='text-light-gray text-sm font-medium'>
                Фильтры:
              </span>
            </div>

            <Select
              value={typeFilter}
              onValueChange={(value) =>
                setTypeFilter(value as 'all' | 'frame' | 'status' | 'theme')
              }
              className='border-light-gray/20 bg-gray w-[140px] text-white'
              options={[
                { value: 'all', label: 'Все типы' },
                { value: 'frame', label: 'Рамки' },
                { value: 'status', label: 'Статусы' },
                { value: 'theme', label: 'Темы' },
              ]}
            />

            <Select
              value={priceFilter}
              onValueChange={(value) =>
                setPriceFilter(value as 'all' | 'affordable' | 'expensive')
              }
              className='border-light-gray/20 bg-gray w-[160px] text-white'
              options={[
                { value: 'all', label: 'Любая цена' },
                { value: 'affordable', label: 'По карману' },
                { value: 'expensive', label: 'Дорогие' },
              ]}
            />

            <Select
              value={availabilityFilter}
              onValueChange={(value) =>
                setAvailabilityFilter(value as 'all' | 'owned' | 'available')
              }
              className='border-light-gray/20 bg-gray w-[160px] text-white'
              options={[
                { value: 'all', label: 'Все' },
                { value: 'available', label: 'Доступные' },
                { value: 'owned', label: 'Купленные' },
              ]}
            />

            {hasActiveFilters && (
              <Button
                size='sm'
                variant='primary'
                onClick={clearFilters}
                className='border-light-gray/20 text-light-gray hover:border-light-gray/30 hover:text-white'
              >
                <X className='mr-1 h-4 w-4' />
                Сбросить
              </Button>
            )}
          </div>

          {hasActiveFilters && (
            <div className='text-light-gray text-sm'>
              Найдено: {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'товар' : 'товаров'}
            </div>
          )}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className='bg-gray rounded-xl p-12 text-center'>
            <p className='text-light-gray mb-4'>Товары не найдены</p>
            {hasActiveFilters && (
              <Button variant='primary' onClick={clearFilters}>
                Сбросить фильтры
              </Button>
            )}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className='bg-gray hover:border-primary/30 hover:shadow-primary/10 flex flex-col border-none p-6 transition-all duration-200 hover:scale-[1.02] hover:border hover:shadow-lg'
              >
                <div className='mb-4 text-center'>
                  <div className='mb-3 text-6xl'>{item.preview}</div>
                  <h3 className='mb-2 text-white'>{item.name}</h3>
                  <p className='text-light-gray mb-3 text-sm'>
                    {item.description}
                  </p>
                  <Badge
                    variant='outline'
                    className='border-light-gray/20 text-light-gray'
                  >
                    {item.type === 'frame'
                      ? 'Рамка'
                      : item.type === 'status'
                        ? 'Статус'
                        : 'Тема'}
                  </Badge>
                </div>

                <div className='mt-auto'>
                  <div className='mb-3 flex items-center justify-center gap-2'>
                    <Award className='text-primary h-5 w-5' />
                    <span className='text-xl text-white'>{item.price}</span>
                  </div>

                  {item.owned ? (
                    <Button
                      className='bg-green hover:bg-green/90 w-full'
                      disabled
                    >
                      <Check className='mr-2 h-4 w-4' />
                      Куплено
                    </Button>
                  ) : (
                    <Button
                      className={`w-full transition-all duration-200 ${
                        canAfford(item.price)
                          ? 'bg-primary hover:bg-primary/90 hover:shadow-primary/20 hover:scale-105 hover:shadow-md'
                          : 'bg-muted text-light-gray cursor-not-allowed'
                      }`}
                      disabled={!canAfford(item.price)}
                    >
                      <ShoppingCart className='mr-2 h-4 w-4' />
                      {canAfford(item.price) ? 'Купить' : 'Недостаточно'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <div className='bg-gray mt-8 border-none p-6'>
          <h3 className='mb-4 text-white'>Как заработать дейлики?</h3>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='flex items-start gap-3'>
              <div className='bg-green/10 rounded-lg p-2'>
                <Award className='text-green h-5 w-5' />
              </div>
              <div>
                <p className='mb-1 text-white'>Выполняйте привычки</p>
                <p className='text-light-gray text-sm'>
                  +10 дейликов за каждую привычку
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <div className='bg-orange/10 rounded-lg p-2'>
                <Award className='text-orange h-5 w-5' />
              </div>
              <div>
                <p className='mb-1 text-white'>Поддерживайте серии</p>
                <p className='text-light-gray text-sm'>
                  Бонусы за длинные серии
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <div className='bg-primary/10 rounded-lg p-2'>
                <Award className='text-primary h-5 w-5' />
              </div>
              <div>
                <p className='mb-1 text-white'>Завершайте спринты</p>
                <p className='text-light-gray text-sm'>
                  Награды за выполнение заданий
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
