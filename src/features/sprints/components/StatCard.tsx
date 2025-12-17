import { Progress } from '@/shared/ui'
import type { LucideIcon } from 'lucide-react'
import { getStatCardColors } from './config'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  maxValue?: number
  suffix?: string
  iconColor: 'primary' | 'green' | 'orange'
  showSuccess?: boolean
  successText?: string
  showProgress?: boolean
  progressValue?: number
}

export function StatCard({
  icon: Icon,
  label,
  value,
  maxValue,
  suffix,
  iconColor,
  showSuccess,
  successText,
  showProgress,
  progressValue,
}: StatCardProps) {
  const colors = getStatCardColors(iconColor)

  return (
    <div
      className={`${colors.border} from-gray to-muted rounded-lg border bg-gradient-to-br p-6 transition-all duration-200 hover:shadow-lg`}
    >
      <div className='mb-3 flex items-center gap-3'>
        <div className={`${colors.iconBg} rounded-xl p-3 shadow-lg`}>
          <Icon className={`${colors.icon} h-6 w-6`} />
        </div>
        <span className='text-light-gray text-sm font-medium'>{label}</span>
      </div>
      <div className='flex items-baseline gap-2'>
        <p className='text-4xl font-bold text-white'>{value}</p>
        {maxValue !== undefined && (
          <span className='text-light-gray text-lg'>/ {maxValue}</span>
        )}
        {suffix && <span className='text-light-gray text-lg'>{suffix}</span>}
      </div>
      {showSuccess && successText && (
        <p className='text-green mt-2 text-xs'>{successText}</p>
      )}
      {showProgress && progressValue !== undefined && (
        <div className='mt-3'>
          <Progress value={progressValue} className='h-2' />
        </div>
      )}
    </div>
  )
}
