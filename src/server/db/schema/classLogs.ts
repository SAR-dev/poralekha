import { integer, timestamp, text } from 'drizzle-orm/pg-core';
import { classes } from './classes';
import { organizations } from './organizations';
import { teachers } from './teachers';
import { students } from './students';
import { createTable } from './base';

export const classLogs = createTable('class_logs', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    classId: text('class_id').notNull().references(() => classes.id, { onDelete: 'set null' }),
    organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
    teacherId: text('teacher_id').notNull().references(() => teachers.id, { onDelete: 'set null' }),
    studentId: text('student_id').notNull().references(() => students.id, { onDelete: 'set null' }),
    teacherPriceTk: integer('teacher_price_tk').notNull(),
    studentPriceTk: integer('student_price_tk').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
