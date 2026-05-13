import { defineField, defineType } from 'sanity';

// Service pages are still managed in code (lib/constants.ts + app/[slug]/page.tsx)
// because they have bespoke layouts. This schema exists so Sanity can store
// FAQ entries and editable copy in future iterations.

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Service name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Short name (nav label)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      description: 'One-line summary used on listings and cards.',
      type: 'text',
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required() },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'slug.current', media: 'heroImage' } },
});
