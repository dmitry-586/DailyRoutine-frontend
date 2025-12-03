import { LucideIcon } from 'lucide-react'

export type StageFeatureAccent = 'emerald' | 'cyan'

export interface StageFeature {
  id: string
  icon: LucideIcon
  text: string
  accent?: StageFeatureAccent
}

export type HowWorkVisualId =
  | 'habit-form'
  | 'telegram-reminders'
  | 'progress-dashboard'

export interface HowWorkStage {
  id: string
  number: number
  title: string
  description: string
  features: StageFeature[]
  visualId: HowWorkVisualId
  align?: 'default' | 'reversed'
}
