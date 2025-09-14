export type AuthFormVariant = 'login' | 'signup'

export interface AuthFormsProps {
	variant: AuthFormVariant
}

export interface AuthFormConfig {
	label: string
	type: string
	required: boolean
	placeholder: string
}

export type AuthFieldId = 'username' | 'email' | 'password'

export interface TelegramUser {
	id: number
	first_name: string
	last_name?: string
	username?: string
	photo_url?: string
	auth_date: number
	hash: string
}
