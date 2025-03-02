import { varchar, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { createTable } from './base';
import { users } from './auth';

export const teachers = createTable('teachers', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    organizationId: text('organization_id').notNull().references(() => organizations.id),
    nickname: varchar('nickname').notNull(),
    summary: text('summary'),
    portfolio: text('portfolio'),
    mobileNo1: varchar('mobile_no1').notNull(),
    mobileNo2: varchar('mobile_no2'),
    whatsappNo: varchar('whatsapp_no'),
    email: varchar('email').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
    unique().on(t.userId, t.organizationId)
]);