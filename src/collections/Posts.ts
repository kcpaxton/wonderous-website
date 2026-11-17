import type { CollectionConfig } from 'payload'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', '_status'],
  },
  access: {
    // Anonymous visitors only see published posts; admins see drafts too.
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  versions: { drafts: true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) data.slug = slugify(data.title)
        if (data?.slug) data.slug = slugify(data.slug)
        return data
      },
    ],
    beforeChange: [
      ({ data }) => {
        if (data._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Auto-generated from the title if left blank.' },
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
  ],
}
