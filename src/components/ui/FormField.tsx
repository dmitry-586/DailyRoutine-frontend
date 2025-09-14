import { FormFieldProps } from '@/types/ui/form.interface'

export default function FormField({
	label,
	type,
	required,
	placeholder,
	className,
	labelClassName,
	inputClassName,
}: FormFieldProps) {
	return (
		<div className={`flex flex-col gap-2.5 ${className}`}>
			<label className={`text-[18px] ${labelClassName}`}>{label}</label>
			<input
				type={type}
				className={`w-full h-10 border-2 border-primary rounded-[10px] px-3 focus:outline-none focus:shadow-blue transition-shadow duration-200 ${inputClassName}`}
				required={required}
				placeholder={placeholder}
			/>
		</div>
	)
}
