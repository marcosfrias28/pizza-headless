import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";
import 'dotenv/config'


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), auth(), db()],
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true
  }),
  prefetch: true,
});