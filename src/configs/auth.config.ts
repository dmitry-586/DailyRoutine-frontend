import { AuthFieldId, AuthFormVariant } from '@/types/auth/auth.type'

export const authFieldRegistry: Record<
	AuthFieldId,
	{
		label: string
		type: string
		required: boolean
		placeholder: string
	}
> = {
	username: {
		label: 'Имя пользователя',
		type: 'text',
		required: true,
		placeholder: 'Введите имя пользователя',
	},
	email: {
		label: 'Email',
		type: 'email',
		required: true,
		placeholder: 'Введите email',
	},
	password: {
		label: 'Пароль',
		type: 'password',
		required: true,
		placeholder: 'Введите пароль',
	},
}

export const authFormConfig: Record<
	AuthFormVariant,
	{
		title: string
		buttonText: string
		linkLabel: string
		linkText: string
		link: string
		fieldIds: AuthFieldId[]
	}
> = {
	login: {
		title: 'Вход в аккаунт',
		buttonText: 'Войти',
		linkLabel: 'Нет аккаунта?',
		linkText: 'Создать аккаунт',
		link: '/sign-up',
		fieldIds: ['username', 'password'],
	},
	signup: {
		title: 'Создать аккаунт',
		buttonText: 'Зарегистрироваться',
		linkLabel: 'Уже есть аккаунт?',
		linkText: 'Войти',
		link: '/log-in',
		fieldIds: ['username', 'email', 'password'],
	},
}
