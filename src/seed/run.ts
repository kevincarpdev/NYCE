import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '@payload-config'

const cwd = process.cwd()
for (const file of ['.db', '.db-wal', '.db-shm']) {
  const target = path.resolve(cwd, file)
  if (fs.existsSync(target)) fs.unlinkSync(target)
}

const uploads = path.resolve(cwd, 'files')
if (fs.existsSync(uploads)) fs.rmSync(uploads, { recursive: true, force: true })

await getPayload({ config })
process.exit(0)
