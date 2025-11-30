import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}
