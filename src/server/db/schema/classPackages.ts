import { integer, varchar, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { createTable } from './base';

export const classPackages = createTable('class_packages', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: varchar('name').notNull(),
    organizationId: text('organization_id').notNull().references(() => organizations.id),
    defTeacherPriceTk: integer('def_teacher_price_tk').notNull(),
    defStudentPriceTk: integer('def_student_price_tk').notNull(),
    summary: text('summary'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
    unique().on(t.name, t.organizationId)
]);