import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'featureSections',
      type: 'array',
      label: 'Feature sections',
      admin: {
        description:
          'Sections displayed below the characters. Drag entries to change their order.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'richText',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Upload an image or video to display beside this text.',
          },
        },
        {
          name: 'mediaPosition',
          type: 'radio',
          label: 'Media position',
          required: true,
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center (media above text)', value: 'center' },
            { label: 'Center (text above media)', value: 'center-text-top' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            layout: 'horizontal',
            description: 'Choose which side of the section displays the image or video.',
          },
        },
      ],
    },
    {
      name: 'blogCallout',
      type: 'group',
      label: 'Blog callout section',
      admin: {
        description: 'Featured callout section for the blog. Displayed after feature sections.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable blog callout',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            condition: (_, { blogCallout }) => blogCallout?.enabled,
          },
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          admin: {
            condition: (_, { blogCallout }) => blogCallout?.enabled,
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'CTA text',
          defaultValue: 'See my posts',
          admin: {
            condition: (_, { blogCallout }) => blogCallout?.enabled,
          },
        },
      ],
    },
  ],
}