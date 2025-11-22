'use client'

import { Toaster as Sonner, type ToasterProps } from 'sonner'

import { sonnerConfig } from './config'

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner {...sonnerConfig} {...props} />
}

export { Toaster }
