import { DashboardLayout } from '@/components/features/dashboard/DashboardLayout'

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return <DashboardLayout>{children}</DashboardLayout>
}

