import { pgTable, integer, timestamp, serial } from 'drizzle-orm/pg-core';
import { classes } from './classes';
import { organizations } from './organizations';
import { teachers } from './teachers';
import { students } from './students';

export const classLogs = pgTable('class_logs', {
    id: serial('id').primaryKey(),
    classId: integer('class_id').notNull().references(() => classes.id, { onDelete: 'set null' }),
    organizationId: integer('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
    teacherId: integer('teacher_id').notNull().references(() => teachers.id, { onDelete: 'set null' }),
    studentId: integer('student_id').notNull().references(() => students.id, { onDelete: 'set null' }),
    teacherPriceTk: integer('teacher_price_tk').notNull(),
    studentPriceTk: integer('student_price_tk').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
