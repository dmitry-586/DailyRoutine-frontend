import { cn } from '@/shared/lib'

interface LandingLayoutProps {
  children: React.ReactNode
  backgroundColor?: string
  className?: string
}

export function LandingLayout({
  children,
  backgroundColor,
  className,
}: LandingLayoutProps) {
  return (
    <main className={`bg-${backgroundColor}`}>
      <section className={cn('mx-auto max-w-6xl px-5 max-sm:px-3', className)}>
        {children}
      </section>
    </main>
  )
}
