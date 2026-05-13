import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'originalTitle',
      title: 'Original title (Wix / source)',
      description: 'Optional. The exact title as published on the original source.',
      type: 'string',
    }),
    defineField({
      name: 'wixSlug',
      title: 'Wix slug (for redirects)',
      description: 'Slug used on the original Wix site (gnatuk.com/post/[wixSlug]). Used for 301 redirects.',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: '~25 words. Shown on listing cards and as the meta description.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().min(20).max(500),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [{ name: 'href', title: 'URL', type: 'url' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'date',
      title: 'Publication date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Project', 'Fleet', 'Team', 'Industry', 'Award', 'Method'],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'surfaces',
      title: 'Surfaces',
      description: 'Which curated listings this post appears in. The detail URL is always /blog/[slug] regardless.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Case Study', value: 'case-study' },
          { title: 'Insight', value: 'insight' },
          { title: 'Blog', value: 'blog' },
        ],
      },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'galleryTags',
      title: 'Gallery tags',
      description: 'Which service filters this post\'s images appear under in /gallery. Leave empty to exclude from gallery.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Robotic Demolition',
          'Hydrodemolition',
          'Diamond Drilling',
          'Cold Cutting',
          'Machine Hire',
        ],
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'galleryExtras',
      title: 'Additional images',
      description: 'Carousel photos beyond the hero. First 2 will appear in the public gallery (per-post cap).',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: 'Publication date, newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'date', media: 'heroImage' },
    prepare({ title, date, media }) {
      return { title, subtitle: date, media };
    },
  },
});
