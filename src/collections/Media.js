const media = {
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
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        const { filename } = data;
        
        // Check if the filename contains spaces
        if (filename && /\s/.test(filename)) {
          throw new Error("Filename contains spaces. Please rename the file to remove spaces before uploading.");
        }
      },
    ],
  },
};

export default media;