import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Knowledge Hub/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Leave the work you are not taking forward',
    )
  })
})
