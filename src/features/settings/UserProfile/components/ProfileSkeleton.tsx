export function ProfileSkeleton() {
  return (
    <div className='border-light-gray/10 bg-gray flex items-center gap-4 rounded-xl border p-6'>
      <div className='bg-light-gray/20 h-16 w-16 animate-pulse rounded-full' />
      <div className='flex-1 space-y-2'>
        <div className='bg-light-gray/20 h-5 w-32 animate-pulse rounded' />
        <div className='bg-light-gray/20 h-4 w-24 animate-pulse rounded' />
      </div>
    </div>
  )
}
