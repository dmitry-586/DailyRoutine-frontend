'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import {
	Archive,
	ArchiveRestore,
	Check,
	Clock,
	Flame,
	Pencil,
	Target,
	Trash2,
	X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Habit } from './HabitModal'

interface HabitCardProps extends Habit {
	onComplete?: (habit: Habit) => void
	onClick?: () => void
	onEdit?: (habit: Habit) => void
	onDelete?: (id: string) => void
	onToggleActive?: (habit: Habit) => void
}

export function HabitCard({
	id,
	title,
	type,
	format,
	current,
	target,
	unit = '',
	streak,
	completed = false,
	isActive = true,
	onComplete,
	onClick,
	onEdit,
	onDelete,
	onToggleActive,
}: HabitCardProps) {
	const [isCompleted, setIsCompleted] = useState(completed)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	// Синхронизируем состояние с пропсами
	useEffect(() => {
		setIsCompleted(completed)
	}, [completed])

	// Для вредных привычек логика инвертирована:
	// - completed = true означает "день прошел без срыва" (хорошо)
	// - completed = false означает "был срыв" (плохо)
	const progress =
		format === 'binary'
			? isCompleted
				? 100
				: 0
			: Math.min((current / target) * 100, 100)

	const handleComplete = (e: React.MouseEvent) => {
		e.stopPropagation()
		const newCompleted = !isCompleted
		setIsCompleted(newCompleted)

		onComplete?.({
			id,
			title,
			type,
			format,
			current,
			target,
			unit,
			streak,
			completed: newCompleted,
			isActive,
		})
	}

	const handleRelapse = (e: React.MouseEvent) => {
		e.stopPropagation()
		// Для вредных привычек: отметка срыва
		setIsCompleted(false)
		onComplete?.({
			id,
			title,
			type,
			format,
			current,
			target,
			unit,
			streak,
			completed: false,
		})
	}

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation()
		onEdit?.({
			id,
			title,
			type,
			format,
			current,
			target,
			unit,
			streak,
			completed: isCompleted,
			isActive,
		})
	}

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setShowDeleteDialog(true)
	}

	const handleDeleteConfirm = () => {
		onDelete?.(id)
		setShowDeleteDialog(false)
	}

	const getIcon = () => {
		if (format === 'time') return <Clock className='w-4 h-4' />
		if (format === 'count') return <Target className='w-4 h-4' />
		return null
	}

	return (
		<>
			<div
				className={`bg-[#3D4348] rounded-lg p-4 transition-all duration-200 cursor-pointer relative border ${
					!isActive
						? 'opacity-50 border-[#B3B3B3]/20 hover:border-[#B3B3B3]/30'
						: isCompleted && type === 'good'
						? 'border-[#4CAF50]/30 hover:border-[#4CAF50]/50 hover:shadow-lg hover:shadow-[#4CAF50]/10'
						: isCompleted && type === 'bad'
						? 'border-[#4CAF50]/30 hover:border-[#4CAF50]/50 hover:shadow-lg hover:shadow-[#4CAF50]/10'
						: 'border-[#B3B3B3]/10 hover:border-[#1CBECB]/30 hover:shadow-lg hover:shadow-[#1CBECB]/10 hover:bg-[#3D4348]/95'
				}`}
				onClick={onClick}
			>
				{/* Header */}
				<div className='flex items-start justify-between mb-3'>
					<div className='flex-1 min-w-0'>
						<div className='flex items-center gap-2 mb-1'>
							<h3 className='text-white font-medium text-base truncate'>
								{title}
							</h3>
						</div>
						{format !== 'binary' && (
							<div className='flex items-center gap-2 text-xs text-[#B3B3B3]'>
								{getIcon()}
								<span>
									{current} / {target} {unit}
								</span>
							</div>
						)}
					</div>
					<div className='flex items-center gap-1 px-2 py-1 rounded bg-[#FF9800]/10 border border-[#FF9800]/20 flex-shrink-0 ml-2'>
						<Flame
							className={`w-3.5 h-3.5 ${
								streak > 0 ? 'text-[#FF9800]' : 'text-[#B3B3B3]'
							}`}
						/>
						<span
							className={`text-xs font-medium ${
								streak > 0 ? 'text-[#FF9800]' : 'text-[#B3B3B3]'
							}`}
						>
							{streak}
						</span>
					</div>
				</div>

				{/* Progress Bar - только для полезных привычек с count/time */}
				{type === 'good' && format !== 'binary' && (
					<div className='mb-3'>
						<Progress
							value={progress}
							className='h-2'
							indicatorClassName='bg-[#4CAF50]'
						/>
					</div>
				)}

				{/* Action Buttons */}
				<div className='flex items-center gap-2'>
					{type === 'good' ? (
						<Button
							onClick={handleComplete}
							className={`flex-1 h-9 text-sm transition-all duration-200 ${
								isCompleted
									? 'bg-[#4CAF50] hover:bg-[#4CAF50]/90 hover:shadow-md hover:shadow-[#4CAF50]/20'
									: 'bg-[#1CBECB] hover:bg-[#1CBECB]/90 hover:shadow-md hover:shadow-[#1CBECB]/20'
							}`}
						>
							<Check className='w-4 h-4 mr-1.5' />
							{isCompleted ? 'Выполнено' : 'Отметить'}
						</Button>
					) : (
						<Button
							onClick={handleRelapse}
							className={`flex-1 h-9 text-sm transition-all duration-200 ${
								!isCompleted
									? 'bg-[#F44336] hover:bg-[#F44336]/90 hover:shadow-md hover:shadow-[#F44336]/20'
									: 'bg-[#2D3134] hover:bg-[#3D4348] border border-[#B3B3B3]/20 hover:border-[#B3B3B3]/30'
							}`}
						>
							<X className='w-4 h-4 mr-1.5' />
							Сорвался
						</Button>
					)}
					{/* Action buttons - всегда видимы */}
					{(onEdit || onDelete || onToggleActive) && (
						<div className='flex gap-1 flex-shrink-0'>
							{onToggleActive && (
								<Button
									size='icon'
									variant='ghost'
									className='h-9 w-9 bg-[#B3B3B3]/20 hover:bg-[#B3B3B3]/40 transition-all duration-200 hover:scale-105'
									onClick={e => {
										e.stopPropagation()
										onToggleActive({
											id,
											title,
											type,
											format,
											current,
											target,
											unit,
											streak,
											completed: isCompleted,
											isActive: !isActive,
										})
									}}
								>
									{isActive ? (
										<Archive className='w-4 h-4 text-[#B3B3B3]' />
									) : (
										<ArchiveRestore className='w-4 h-4 text-[#1CBECB]' />
									)}
								</Button>
							)}
							{onEdit && (
								<Button
									size='icon'
									variant='ghost'
									className='h-9 w-9 bg-[#1CBECB]/20 hover:bg-[#1CBECB]/40 transition-all duration-200 hover:scale-105'
									onClick={handleEdit}
								>
									<Pencil className='w-4 h-4 text-[#1CBECB]' />
								</Button>
							)}
							{onDelete && (
								<Button
									size='icon'
									variant='ghost'
									className='h-9 w-9 bg-[#F44336]/20 hover:bg-[#F44336]/40 transition-all duration-200 hover:scale-105'
									onClick={handleDeleteClick}
								>
									<Trash2 className='w-4 h-4 text-[#F44336]' />
								</Button>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent className='bg-[#3D4348] border-[#B3B3B3]/20 text-white'>
					<AlertDialogHeader>
						<AlertDialogTitle>Удалить привычку?</AlertDialogTitle>
						<AlertDialogDescription className='text-[#B3B3B3]'>
							Вы уверены, что хотите удалить привычку "{title}"? Это действие
							нельзя отменить.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className='border-[#B3B3B3]/20'>
							Отмена
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteConfirm}
							className='bg-[#F44336] hover:bg-[#F44336]/90'
						>
							Удалить
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
