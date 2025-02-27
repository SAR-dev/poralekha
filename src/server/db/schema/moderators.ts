import { pgTable, integer, varchar, timestamp, serial } from 'drizzle-orm/pg-core';
import { users } from './users';
import { organizations } from './organizations';

export const moderators = pgTable('moderators', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
    organizationId: integer('organization_id').notNull().references(() => organizations.id),
    nickname: varchar('nickname'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});