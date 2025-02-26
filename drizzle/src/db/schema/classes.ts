import { pgTable, uuid, text, timestamp, serial } from 'drizzle-orm/pg-core';
import { batches } from './batches';
import { classPackages } from './classPackages';
import { teachers } from './teachers';

export const classes = pgTable('classes', {
    id: serial('id').primaryKey(),
    batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
    classPackageId: uuid('class_package_id').notNull().references(() => classPackages.id, { onDelete: 'cascade' }),
    teacherId: uuid('teacher_id').notNull().references(() => teachers.id),
    startAt: timestamp('start_at', { withTimezone: true }).notNull(),
    endAt: timestamp('end_at', { withTimezone: true }).notNull(),
    topic: text('topic').notNull(),
    description: text('description'),
    meetingLink: text('meeting_link'),
    recordingLink: text('recording_link'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
