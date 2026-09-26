'use server'

import { logout } from '@payloadcms/next/auth'

import config from '@payload-config'

export const signOutAction = async () => {
  await logout({ config })
}
