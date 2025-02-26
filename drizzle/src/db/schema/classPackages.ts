import { pgTable, uuid, varchar, text, timestamp, decimal, serial } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';

export const classPackages = pgTable('class_packages', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull().unique(),
    organizationId: uuid('organization_id').notNull().references(() => organizations.id),
    defTeacherPriceTk: decimal('def_teacher_price_tk').notNull(),
    defStudentPriceTk: decimal('def_student_price_tk').notNull(),
    summary: text('summary'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
