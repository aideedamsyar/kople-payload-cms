import { CollectionConfig } from 'payload';

const PlatformUsers: CollectionConfig = {
  slug: 'platform_users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'clerk_user_id', type: 'text', required: true, unique: true },
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'gender', type: 'text' },
    { name: 'nationality', type: 'text' },
    { name: 'kakao_id', type: 'text' },
    { name: 'instagram_id', type: 'text' },
    { name: 'first_name', type: 'text' },
    { name: 'last_name', type: 'text' },
    {name: 'referral_source', type: 'text'},
  ],
};

export default PlatformUsers;