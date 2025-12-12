import type { FlameStage } from './types'

export const FLAME_STAGES: FlameStage[] = [
  {
    id: 'stage-1',
    threshold: 0,
    iconPath: '/assets/mdi_fire.svg',
    name: 'Начальный',
  },
  {
    id: 'stage-2',
    threshold: 10,
    iconPath: '/assets/mdi_fire-3.svg',
    name: 'Опытный',
  },
  {
    id: 'stage-3',
    threshold: 20,
    iconPath: '/assets/mdi_fire-2.svg',
    name: 'Развивающийся',
  },
  {
    id: 'stage-4',
    threshold: 30,
    iconPath: '/assets/mdi_fire-4.svg',
    name: 'Мастер',
  },
  {
    id: 'stage-5',
    threshold: 50,
    iconPath: '/assets/mdi_fire-5.svg',
    name: 'Легенда',
  },
]
