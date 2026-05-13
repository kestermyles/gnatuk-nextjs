import { defineField, defineType } from 'sanity';

export const accreditation = defineType({
  name: 'accreditation',
  title: 'Accreditation',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Scheme name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level / membership tier',
      description: 'Optional. e.g. "Gold Member", "Audited", "Accredited Contractor"',
      type: 'string',
    }),
    defineField({
      name: 'blurb',
      title: 'What this scheme proves',
      description: 'One sentence on what this credential signals to procurement.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'schemeUrl',
      title: 'Official scheme website',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [{ title: 'Sort order', name: 'sortAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'level', media: 'logo' } },
});
