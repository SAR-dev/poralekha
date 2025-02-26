import { pgTable, varchar, text, timestamp, pgEnum, serial } from 'drizzle-orm/pg-core';

const roleEnum = pgEnum('role', ['admin', 'teacher', 'student']);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    avatar: text('avatar'),
    email: varchar('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: roleEnum('role').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});