import LandingLayout from '@/shared/model/providers/LandingLayout'
import Logo from '@/shared/ui/Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-light-gray/20 bg-gray/50 border-t'>
      <LandingLayout className='flex flex-col items-center justify-between gap-6 py-8 max-sm:py-6 sm:flex-row'>
        <Logo title='Daily Routine' />
        <p className='text-light-gray text-sm'>
          © {currentYear} Daily Routine. Все права защищены.
        </p>
      </LandingLayout>
    </footer>
  )
}
