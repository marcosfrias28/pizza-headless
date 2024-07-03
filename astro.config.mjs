import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import auth from "auth-astro";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), auth(), db()],
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true
  }),
  prefetch: true
});