export const authKeys = {
  me: () => ['auth', 'me'] as const,
  telegram: () => ['auth', 'telegram'] as const,
}

export const routineKeys = {
  lists: () => ['routines', 'list'] as const,
  detail: (id: string) => ['routines', 'detail', id] as const,
}
