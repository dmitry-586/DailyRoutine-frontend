import { BotLinkCard } from '@/features/settings/BotLink/BotLinkCard'
import { LogoutButton } from '@/features/settings/LogoutButton/LogoutButton'
import { PWAInstallCard } from '@/features/settings/PWAInstall/PWAInstallCard'
import { SettingsForm } from '@/features/settings/SettingsForm/SettingsForm'
import { UserProfile } from '@/features/settings/UserProfile/UserProfile'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Settings as SettingsIcon } from 'lucide-react'

export default function SettingsPage() {
  return (
    <>
      <PageHeader title='Настройки' icon={SettingsIcon} />
      <div className='max-w-2xl space-y-6'>
        <UserProfile />
        <SettingsForm />
        <BotLinkCard />
        <PWAInstallCard />
        <LogoutButton />
      </div>
    </>
  )
}
