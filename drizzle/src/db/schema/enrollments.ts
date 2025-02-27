import { pgTable, integer, timestamp, serial, unique } from 'drizzle-orm/pg-core';
import { batches } from './batches';
import { students } from './students';

export const enrollments = pgTable('enrollments', {
    id: serial('id').primaryKey(),
    batchId: integer('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
    studentId: integer('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
    teacherPriceTk: integer('teacher_price_tk'),
    studentPriceTk: integer('student_price_tk'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
    unique().on(t.batchId, t.studentId)
]);