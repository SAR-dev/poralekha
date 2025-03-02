import { text, timestamp } from 'drizzle-orm/pg-core';
import { batches } from './batches';
import { createTable } from './base';

export const classes = createTable('classes', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    batchId: text('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
    startAt: timestamp('start_at', { withTimezone: true }).notNull(),
    endAt: timestamp('end_at', { withTimezone: true }).notNull(),
    topic: text('topic').notNull(),
    description: text('description'),
    meetingLink: text('meeting_link'),
    recordingLink: text('recording_link'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
