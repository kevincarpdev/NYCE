import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Topics } from './collections/Topics'
import { Submissions } from './collections/Submissions'
import { Files } from './collections/Files'
import { Comments } from './collections/Comments'
import { Suggestions } from './collections/Suggestions'
import { Presences } from './collections/Presences'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL,
  cors: [serverURL],
  csrf: [serverURL],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — NYCE Knowledge Hub',
    },
    components: {
      graphics: {
        Logo: '/components/admin/AdminLogo',
        Icon: '/components/admin/AdminIcon',
      },
      beforeDashboard: ['/components/admin/BeforeDashboard'],
    },
  },
  collections: [Users, Projects, Topics, Submissions, Files, Comments, Suggestions, Presences],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./.db',
    },
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    const { totalDocs } = await payload.count({ collection: 'users' })
    if (totalDocs === 0) {
      const { seed } = await import('./seed')
      await seed(payload)
    }
  },
})
