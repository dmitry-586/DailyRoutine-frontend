export const MAX_PHOTO_SIZE = 5 * 1024 * 1024

export function validatePhotoFile(file: File): string | null {
  if (!file.type.startsWith('image/')) {
    return 'Выберите изображение'
  }

  if (file.size > MAX_PHOTO_SIZE) {
    return 'Размер файла не должен превышать 5MB'
  }

  return null
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Ошибка при чтении файла'))
    reader.readAsDataURL(file)
  })
}
