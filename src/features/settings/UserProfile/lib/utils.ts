interface ValidationResult {
  isValid: boolean
  error?: string
}

export function formatDisplayName(firstName?: string | null): string {
  return firstName?.trim() || 'Без имени'
}

export function formatUsernameLabel(username?: string | null): string {
  return username ? `@${username}` : 'Username не указан'
}

export function validateFirstName(
  value: string,
  currentValue?: string | null,
): ValidationResult {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return {
      isValid: false,
      error: 'Имя не может быть пустым',
    }
  }

  if (trimmedValue === (currentValue || '')) {
    return {
      isValid: true,
    }
  }

  return {
    isValid: true,
  }
}

export function hasNameChanged(
  newValue: string,
  currentValue?: string | null,
): boolean {
  return newValue.trim() !== (currentValue || '')
}
