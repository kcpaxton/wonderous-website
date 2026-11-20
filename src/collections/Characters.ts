import type { CollectionConfig } from 'payload'

export const Characters: CollectionConfig = {
  slug: 'characters',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Auto-generated from the name if left empty' },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            const src = (value as string) || (siblingData?.name as string) || ''
            return src
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },
    { name: 'title', type: 'text', admin: { description: 'Tagline, e.g. "The Wise Wizard"' } },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Roster tile portrait' } },
    {
      name: 'artwork',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional large art for the character page (falls back to the portrait)' },
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'powerUps',
      type: 'array',
      label: 'Power-ups',
      admin: {
        description: 'Powers and abilities this character can grant to the player.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'Name of this power-up' },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { description: 'Icon for this power-up' },
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          admin: { description: 'Short description of this power-up' },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first' },
    },
  ],
}
