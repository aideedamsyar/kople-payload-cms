import { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    {
      name: 'altText',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption',
    },
  ],
};

export default Media;