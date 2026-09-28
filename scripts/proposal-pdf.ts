import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { chromium } from '@playwright/test'
import fs from 'fs'
import path from 'path'

import { captureShots } from './proposal-shots'

const root = process.cwd()
const dest = path.join(root, 'proposal', 'Kevin-Carpenter_NYCE-Knowledge-Hub-Proposal.pdf')
const local = process.env.PROPOSAL_ORIGIN || 'http://localhost:3000'

type FieldBox = {
  name: string
  xRatio: number
  yRatio: number
  wRatio: number
  hRatio: number
}

const run = async () => {
  if (process.env.SKIP_SHOTS !== '1') {
    await captureShots()
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } })
  await page.goto(`${local}/proposal`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.evaluate(() => document.fonts.ready)

  const heading = await page.locator('h1').first().textContent()
  if (!heading || /not found/i.test(heading)) {
    throw new Error(`Proposal route is not available at ${local}/proposal`)
  }

  const measured = await page.evaluate(() => {
    const sheets = [...document.querySelectorAll('[data-proposal] > section')]
    const accept = document.querySelector('[data-page="accept"]')
    if (!(accept instanceof HTMLElement)) return null
    const pageIndex = sheets.indexOf(accept)
    const sheetRect = accept.getBoundingClientRect()
    const ids = [
      ['sign-name', 'Name'],
      ['sign-title', 'Title'],
      ['sign-signature', 'Signature'],
      ['sign-date', 'Date'],
    ] as const
    const fields = ids.map(([id, name]) => {
      const el = document.getElementById(id)
      if (!el) throw new Error(`Missing ${id}`)
      const box = el.getBoundingClientRect()
      return {
        name,
        xRatio: (box.left - sheetRect.left) / sheetRect.width,
        yRatio: (box.top - sheetRect.top) / sheetRect.height,
        wRatio: box.width / sheetRect.width,
        hRatio: box.height / sheetRect.height,
      }
    })
    return { pageIndex, fields }
  })

  const pdfBytes = await page.pdf({
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })
  await browser.close()

  const pdf = await PDFDocument.load(pdfBytes)
  const form = pdf.getForm()
  const pages = pdf.getPages()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const targetIndex = measured ? Math.min(measured.pageIndex, pages.length - 1) : pages.length - 2
  const target = pages[Math.max(targetIndex, 0)]
  const { width, height } = target.getSize()
  const fields: FieldBox[] = measured?.fields ?? [
    { name: 'Name', xRatio: 0.07, yRatio: 0.62, wRatio: 0.4, hRatio: 0.03 },
    { name: 'Title', xRatio: 0.53, yRatio: 0.62, wRatio: 0.4, hRatio: 0.03 },
    { name: 'Signature', xRatio: 0.07, yRatio: 0.72, wRatio: 0.4, hRatio: 0.03 },
    { name: 'Date', xRatio: 0.53, yRatio: 0.72, wRatio: 0.4, hRatio: 0.03 },
  ]

  for (const field of fields) {
    const text = form.createTextField(field.name)
    const boxHeight = Math.max(field.hRatio * height, 18)
    text.addToPage(target, {
      x: field.xRatio * width,
      y: height - (field.yRatio * height + boxHeight),
      width: field.wRatio * width,
      height: boxHeight,
      borderWidth: 0,
      backgroundColor: rgb(1, 1, 1),
      textColor: rgb(0.08, 0.2, 0.27),
    })
    text.setFontSize(11)
    text.updateAppearances(font)
  }

  fs.writeFileSync(dest, await pdf.save())
  console.log(dest)
}

run()
