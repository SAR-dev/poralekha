import { integer, timestamp, unique, text } from 'drizzle-orm/pg-core';
import { batches } from './batches';
import { students } from './students';
import { createTable } from './base';

export const enrollments = createTable('enrollments', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    batchId: text('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
    studentId: text('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
    teacherPriceTk: integer('teacher_price_tk'),
    studentPriceTk: integer('student_price_tk'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
    unique().on(t.batchId, t.studentId)
]);