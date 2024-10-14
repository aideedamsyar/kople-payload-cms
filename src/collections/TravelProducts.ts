import { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

const TravelProducts: CollectionConfig = {
  slug: 'travel_products',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'id', type: 'text', required: true, unique: true, admin: { readOnly: true }, defaultValue: () => crypto.randomUUID() },
    { name: 'name', type: 'text', required: true },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      required: true,
      editor: lexicalEditor(), // Use the Lexical editor with default configuration
    },
    {
      name: 'description_short',
      type: 'text',
      required: true,
    },
    { name: 'price', type: 'number', required: true },
    { name: 'duration_days', type: 'number' },
    { name: 'available_from', type: 'date' },
    { name: 'available_to', type: 'date' },
    { name: 'date_of_trip', type: 'date', required: true },
    { name: 'location', type: 'text' },
    { name: 'max_participants', type: 'number' },
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'payment_links',
      type: 'text',
      required: true,
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.id) {
          data.id = crypto.randomUUID();
        }
      },
    ],
  },
};

export default TravelProducts;