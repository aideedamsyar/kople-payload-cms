import { CollectionConfig } from 'payload';

const Bookings: CollectionConfig = {
  slug: 'bookings',
  access: {
    read: ({ req }) => (req.query?.aggregated ? true : !!req.user),
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'clerk_user_id', type: 'text', required: true },
    { name: 'name', type: 'text', required: true }, // Full name field
    { name: 'product_id', type: 'text', required: true },
    { name: 'booking_date', type: 'date', required: true, defaultValue: () => new Date() },
    { name: 'payment_status', type: 'text', required: true },
    { name: 'payment_method', type: 'text', required: true }, // New 'payment_method' field
  ],
};

export default Bookings;