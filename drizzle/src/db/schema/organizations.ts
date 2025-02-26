import { pgTable, uuid, varchar, text, timestamp, serial } from 'drizzle-orm/pg-core';
import { users } from './users';

export const organizations = pgTable('organizations', {
    id: serial('id').primaryKey(),
    ownerId: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name').notNull().unique(),
    logo: text('logo'),
    slug: varchar('slug').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
