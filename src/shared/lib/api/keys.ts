export const authKeys = {
  me: () => ['auth', 'me'] as const,
  telegram: () => ['auth', 'telegram'] as const,
}

export const settingsKeys = {
  settings: () => ['settings'] as const,
  timezone: () => ['settings', 'timezone'] as const,
}

export const habitKeys = {
  all: () => ['habits'] as const,
  detail: (id: string) => ['habits', id] as const,
}

export const routineKeys = {
  lists: () => ['routines', 'list'] as const,
  detail: (id: string) => ['routines', 'detail', id] as const,
}
