import { varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { createTable } from './base';
import { users } from './auth';

export const organizations = createTable('organizations', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    ownerId: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name').notNull().unique(),
    logo: text('logo'),
    slug: varchar('slug').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
