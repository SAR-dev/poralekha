import { pgTable, integer, varchar, text, timestamp, serial, unique } from 'drizzle-orm/pg-core';
import { users } from './users';
import { organizations } from './organizations';

export const teachers = pgTable('teachers', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    organizationId: integer('organization_id').notNull().references(() => organizations.id),
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