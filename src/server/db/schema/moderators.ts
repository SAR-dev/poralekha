import { integer, varchar, timestamp, serial, text } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { createTable } from './base';
import { users } from './auth';

export const moderators = createTable('moderators', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
    organizationId: text('organization_id').notNull().references(() => organizations.id),
    nickname: varchar('nickname'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});