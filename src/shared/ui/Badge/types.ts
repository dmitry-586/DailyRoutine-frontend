import type { HTMLAttributes } from 'react'

import type { BadgeVariantProps } from './config'

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    BadgeVariantProps {}

export type { BadgeVariantProps }
