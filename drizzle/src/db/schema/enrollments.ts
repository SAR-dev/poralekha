import { pgTable, uuid, timestamp, decimal, serial } from 'drizzle-orm/pg-core';
import { batches } from './batches';
import { teachers } from './teachers';
import { students } from './students';
import { classPackages } from './classPackages';

export const enrollments = pgTable('enrollments', {
    id: serial('id').primaryKey(),
    batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
    teacherId: uuid('teacher_id').notNull().references(() => teachers.id, { onDelete: 'cascade' }),
    studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
    classPackageId: uuid('class_package_id').notNull().references(() => classPackages.id, { onDelete: 'cascade' }),
    teacherPriceTk: decimal('teacher_price_tk'),
    studentPriceTk: decimal('student_price_tk'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});