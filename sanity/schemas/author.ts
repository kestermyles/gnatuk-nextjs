import { defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      description: 'e.g. "Managing Director, GNAT UK Limited"',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'blurb',
      title: 'Bio',
      description: '2-4 sentences. Shown under each post they author.',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
});
