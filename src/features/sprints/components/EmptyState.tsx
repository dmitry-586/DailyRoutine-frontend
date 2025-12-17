import { Target, type LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
}

export function EmptyState({
  icon: Icon = Target,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className='py-12 text-center'>
      <Icon className='text-primary mx-auto mb-4 h-12 w-12 opacity-50' />
      <p className='text-light-gray mb-2 text-lg'>{title}</p>
      {description && <p className='text-light-gray text-sm'>{description}</p>}
    </div>
  )
}
