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
