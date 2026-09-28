import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface LoginOptions {
  page: Page
  serverURL?: string
  user: {
    email: string
    password: string
  }
}

export async function login({
  page,
  serverURL = 'http://localhost:3000',
  user,
}: LoginOptions): Promise<void> {
  const response = await page.request.post(`${serverURL}/api/users/login`, {
    data: { email: user.email, password: user.password },
    headers: { 'Content-Type': 'application/json' },
  })
  expect(response.ok()).toBeTruthy()

  await page.goto(`${serverURL}/admin`)

  const dashboardArtifact = page.locator('span[title="Dashboard"]')
  await expect(dashboardArtifact).toBeVisible()
}
