import {
  BotLinkCard,
  LogoutButton,
  PWAInstallCard,
  SettingsForm,
  UserProfile,
} from '@/features/settings'
import { PageHeader } from '@/shared/ui'
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
