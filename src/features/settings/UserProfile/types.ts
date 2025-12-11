export interface ProfileFormData {
  firstName: string
}

export interface ProfileViewData {
  displayName: string
  usernameLabel: string
  avatarSrc?: string
}

export interface ProfileEditState {
  isEditing: boolean
  isPending: boolean
  formData: ProfileFormData
  viewData: ProfileViewData
  handlers: {
    onEdit: () => void
    onCancel: () => void
    onSave: () => Promise<void>
    onChangeName: (value: string) => void
  }
}
