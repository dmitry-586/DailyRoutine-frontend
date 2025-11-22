export const sonnerConfig = {
  theme: 'dark' as const,
  className: 'toaster group',
  toastOptions: {
    style: {
      background: 'var(--gray)',
      color: 'var(--foreground)',
      border: '1px solid rgba(179, 179, 179, 0.1)',
    },
  },
} as const
