import type { ButtonHTMLAttributes } from 'react'

import type { ButtonVariantProps } from './config'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {}
