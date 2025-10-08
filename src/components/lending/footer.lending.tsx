import InstallPWAButton from '../ui/InstallPWAButton'
import Logo from '../ui/Logo'

export default function Footer() {
	return (
		<footer className='flex flex-col gap-3'>
			<Logo title='Daily Routine' />
			<InstallPWAButton className='gap-2 w-fit rounded-full px-4' />
		</footer>
	)
}
