import { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  icon: LucideIcon
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  const Icon = icon
  return (
    <div className='mb-6 max-sm:mb-4'>
      <div className='mb-2 flex items-center gap-3'>
        <Icon className='text-primary size-8 max-sm:size-6' />
        <h2 className='text-2xl leading-none text-white max-sm:text-xl'>
          {title}
        </h2>
      </div>
      {description && (
        <p className='text-light-gray max-sm:text-sm'>{description}</p>
      )}
    </div>
  )
}
