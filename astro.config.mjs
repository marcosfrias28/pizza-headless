import { defineConfig } from 'astro/config'
import db from '@astrojs/db'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import { config } from 'dotenv'
config()

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), db()],
  output: 'server',
  adapter: vercel({
    webAnalytics: {enabled: true},
  }),
})
