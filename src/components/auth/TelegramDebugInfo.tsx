'use client'

import { useEffect, useState } from 'react'

interface DebugInfo {
	currentDomain: string
	protocol: string
	isLocalhost: boolean
	popupsBlocked: boolean | null
	scriptLoaded: boolean
	userAgent: string
}

/**
 * Компонент для отладки Telegram Login Widget
 * Используйте только в development режиме!
 * 
 * Добавьте на страницу:
 * {process.env.NODE_ENV === 'development' && <TelegramDebugInfo />}
 */
export default function TelegramDebugInfo() {
	const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Проверяем возможность открытия popup
		const checkPopups = () => {
			try {
				const popup = window.open('', '_blank', 'width=1,height=1')
				if (popup) {
					popup.close()
					return false // не заблокированы
				}
				return true // заблокированы
			} catch {
				return true // заблокированы
			}
		}

		// Проверяем загрузку скрипта Telegram
		const checkTelegramScript = () => {
			const scripts = Array.from(document.scripts)
			return scripts.some(script => script.src.includes('telegram-widget.js'))
		}

		const info: DebugInfo = {
			currentDomain: window.location.hostname,
			protocol: window.location.protocol,
			isLocalhost: window.location.hostname === 'localhost' || 
				window.location.hostname === '127.0.0.1',
			popupsBlocked: checkPopups(),
			scriptLoaded: checkTelegramScript(),
			userAgent: navigator.userAgent,
		}

		setDebugInfo(info)
	}, [])

	if (!debugInfo) return null

	return (
		<div className='fixed bottom-4 right-4 z-50'>
			<button
				onClick={() => setIsVisible(!isVisible)}
				className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg transition-colors'
			>
				🔧 Telegram Debug
			</button>

			{isVisible && (
				<div className='absolute bottom-full right-0 mb-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 max-h-96 overflow-y-auto'>
					<div className='flex justify-between items-center mb-3'>
						<h3 className='font-bold text-lg'>Telegram Widget Debug</h3>
						<button
							onClick={() => setIsVisible(false)}
							className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
						>
							✕
						</button>
					</div>

					<div className='space-y-3 text-sm'>
						{/* Домен */}
						<div className='p-2 bg-gray-50 dark:bg-gray-900 rounded'>
							<div className='font-semibold text-gray-700 dark:text-gray-300'>
								Текущий домен:
							</div>
							<div className='font-mono text-blue-600 dark:text-blue-400'>
								{debugInfo.currentDomain}
							</div>
							{debugInfo.isLocalhost && (
								<div className='text-yellow-600 dark:text-yellow-400 text-xs mt-1'>
									⚠️ Localhost - виджет может не работать стабильно
								</div>
							)}
						</div>

						{/* Протокол */}
						<div className='p-2 bg-gray-50 dark:bg-gray-900 rounded'>
							<div className='font-semibold text-gray-700 dark:text-gray-300'>
								Протокол:
							</div>
							<div className='font-mono'>
								{debugInfo.protocol}
								{debugInfo.protocol === 'http:' && !debugInfo.isLocalhost && (
									<span className='text-red-600 dark:text-red-400 text-xs ml-2'>
										⚠️ Требуется HTTPS для production
									</span>
								)}
							</div>
						</div>

						{/* Popup блокировка */}
						<div className='p-2 bg-gray-50 dark:bg-gray-900 rounded'>
							<div className='font-semibold text-gray-700 dark:text-gray-300'>
								Всплывающие окна:
							</div>
							<div>
								{debugInfo.popupsBlocked ? (
									<span className='text-red-600 dark:text-red-400'>
										🚫 Заблокированы
									</span>
								) : (
									<span className='text-green-600 dark:text-green-400'>
										✅ Разрешены
									</span>
								)}
							</div>
							{debugInfo.popupsBlocked && (
								<div className='text-xs text-red-600 dark:text-red-400 mt-1'>
									Разрешите всплывающие окна для корректной работы виджета
								</div>
							)}
						</div>

						{/* Скрипт Telegram */}
						<div className='p-2 bg-gray-50 dark:bg-gray-900 rounded'>
							<div className='font-semibold text-gray-700 dark:text-gray-300'>
								Скрипт Telegram:
							</div>
							<div>
								{debugInfo.scriptLoaded ? (
									<span className='text-green-600 dark:text-green-400'>
										✅ Загружен
									</span>
								) : (
									<span className='text-yellow-600 dark:text-yellow-400'>
										⏳ Не загружен (откройте модальное окно авторизации)
									</span>
								)}
							</div>
						</div>

						{/* Инструкции */}
						<div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800'>
							<div className='font-semibold text-blue-900 dark:text-blue-300 mb-2'>
								📋 Что нужно проверить:
							</div>
							<ol className='text-xs space-y-1 text-blue-800 dark:text-blue-200 list-decimal list-inside'>
								<li>
									Домен <code className='bg-blue-100 dark:bg-blue-900 px-1 rounded'>
										{debugInfo.currentDomain}
									</code> настроен в @BotFather?
								</li>
								<li>Команда <code className='bg-blue-100 dark:bg-blue-900 px-1 rounded'>/setdomain</code> выполнена?</li>
								<li>Всплывающие окна разрешены?</li>
								<li>Backend endpoint <code className='bg-blue-100 dark:bg-blue-900 px-1 rounded'>/auth/telegram</code> работает?</li>
							</ol>
						</div>

						{/* Быстрые действия */}
						<div className='pt-2 border-t border-gray-200 dark:border-gray-700'>
							<button
								onClick={() => {
									console.log('=== Telegram Debug Info ===')
									console.log('Domain:', debugInfo.currentDomain)
									console.log('Protocol:', debugInfo.protocol)
									console.log('Is Localhost:', debugInfo.isLocalhost)
									console.log('Popups Blocked:', debugInfo.popupsBlocked)
									console.log('Telegram Script:', debugInfo.scriptLoaded)
									console.log('User Agent:', debugInfo.userAgent)
									console.log('=========================')
									alert('Информация выведена в консоль (F12)')
								}}
								className='w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-2 rounded text-sm transition-colors'
							>
								📋 Скопировать в консоль
							</button>
						</div>

						<div className='text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700'>
							Смотрите TELEGRAM_SETUP_QUICK.md для инструкций
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

