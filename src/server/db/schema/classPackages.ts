import { pgTable, integer, varchar, text, timestamp, serial, unique } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';

export const classPackages = pgTable('class_packages', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    organizationId: integer('organization_id').notNull().references(() => organizations.id),
    defTeacherPriceTk: integer('def_teacher_price_tk').notNull(),
    defStudentPriceTk: integer('def_student_price_tk').notNull(),
    summary: text('summary'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
    unique().on(t.name, t.organizationId)
]);