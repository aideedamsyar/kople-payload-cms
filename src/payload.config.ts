// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { s3Storage } from '@payloadcms/storage-s3';

import { Users } from './collections/Users';
import Media from './collections/Media';
import Bookings from './collections/Bookings';
import TravelProducts from './collections/TravelProducts';
import PlatformUsers from './collections/PlatformUsers';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Type assertion for environment variables
const bucket = process.env.S3_BUCKET as string; // Ensure this is defined
const accessKeyId = process.env.S3_ACCESS_KEY_ID as string; // Ensure this is defined
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string; // Ensure this is defined
const region = process.env.S3_REGION as string; // Ensure this is defined
const endpoint = process.env.S3_ENDPOINT as string; // Ensure this is defined

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Bookings, TravelProducts, PlatformUsers],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        }
      },
      bucket, // Use the assert-defined bucket
      config: {
        forcePathStyle: true, // Important for using Supabase
        credentials: {
          accessKeyId, // Use the assert-defined access key ID
          secretAccessKey, // Use the assert-defined secret access key
        },
        region, // Use the assert-defined region
        endpoint, // Use the assert-defined endpoint
      },
    }),
  ],
});