'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

// Read project credentials from public env. Both must be set in Vercel for the
// embedded Studio at /studio to work. Workflow:
//   1. Create a project at https://sanity.io/manage (free tier)
//   2. Copy the project ID + dataset ("production" is the default)
//   3. Set NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET in Vercel
//   4. Redeploy
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'gnatuk',
  title: 'GNAT UK — Content Studio',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
});
