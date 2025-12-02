import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export type TabVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'neutral'

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  variant?: TabVariant
}
