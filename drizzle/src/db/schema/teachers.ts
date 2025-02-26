import { pgTable, uuid, varchar, text, timestamp, serial } from 'drizzle-orm/pg-core';
import { users } from './users';
import { organizations } from './organizations';

export const teachers = pgTable('teachers', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
    organizationId: uuid('organization_id').notNull().references(() => organizations.id),
    nickname: varchar('nickname'),
    summary: text('summary'),
    portfolio: text('portfolio'),
    mobileNo1: varchar('mobile_no1').notNull().unique(),
    mobileNo2: varchar('mobile_no2').unique(),
    whatsappNo: varchar('whatsapp_no').unique(),
    email: varchar('email').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});