import { cn } from '@/shared/lib'

interface StatsFieldProps {
  title: string
  icon: React.ReactNode
  iconColor?: string
  value: string
  valueClassName?: string
}
export function StatsField({
  title,
  icon,
  iconColor,
  value,
  valueClassName,
}: StatsFieldProps) {
  return (
    <div className='flex items-center justify-between gap-5'>
      <div className='flex items-center gap-2'>
        <div className={cn('bg-primary/10 rounded-lg p-2', iconColor)}>
          {icon}
        </div>
        <span className='text-light-gray text-sm'>{title}</span>
      </div>
      <span className={cn('font-semibold text-white', valueClassName)}>
        {value}
      </span>
    </div>
  )
}
