import { chromium } from '@playwright/test'
import fs from 'fs'
import path from 'path'

import { DEMO_PASSWORD, reviewerAccount } from '../src/lib/demo'

const demo = process.env.HUB_DEMO_URL || 'https://hub.2.29.15.99.sslip.io'
const out = path.join(process.cwd(), 'proposal', 'shots')

const settle = async (page: import('@playwright/test').Page) => {
  await page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => undefined)
  await page.evaluate(() => document.fonts.ready)
}

export const captureShots = async () => {
  fs.mkdirSync(out, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } })

  await page.goto(`${demo}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await settle(page)
  await page.screenshot({ path: path.join(out, 'home.png'), fullPage: false })

  await page.goto(`${demo}/library`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await settle(page)
  await page
    .getByRole('heading', { name: /in view/i })
    .scrollIntoViewIfNeeded()
    .catch(() => undefined)
  await page.screenshot({ path: path.join(out, 'library.png'), fullPage: false })

  await page.goto(`${demo}/sign-in`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await settle(page)
  await page.screenshot({ path: path.join(out, 'signin.png'), fullPage: false })

  await page.goto(`${demo}/library/leaving-the-reef-to-breathe`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  })
  await settle(page)
  await page.screenshot({ path: path.join(out, 'leftover.png'), fullPage: false })

  const login = await page.request.post(`${demo}/api/users/login`, {
    data: { email: reviewerAccount.email, password: DEMO_PASSWORD },
  })
  if (!login.ok()) {
    throw new Error(`admin login ${login.status()}`)
  }
  await page.goto(`${demo}/admin/collections/submissions`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  })
  await page.getByText('Submissions').first().waitFor({ timeout: 45000 })
  await settle(page)
  if (!page.url().includes('/admin')) {
    throw new Error(`admin shot landed on ${page.url()}`)
  }
  await page.screenshot({ path: path.join(out, 'admin.png'), fullPage: false })

  await browser.close()
}

if (import.meta.url === `file://${process.argv[1]}`) {
  captureShots()
}
