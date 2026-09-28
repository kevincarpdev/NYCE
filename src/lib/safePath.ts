export const isSafePath = (value?: string | null): value is string =>
  Boolean(value && value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\'))

export const isAdminPath = (value: string) => value === '/admin' || value.startsWith('/admin/')
