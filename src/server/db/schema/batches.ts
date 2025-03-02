import { varchar, timestamp, unique, text } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { classPackages } from './classPackages';
import { teachers } from './teachers';
import { createTable } from './base';

export const batches = createTable('batches', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: varchar('name').notNull(),
    organizationId: text('organization_id').notNull().references(() => organizations.id),
    classPackageId: text('class_package_id').notNull().references(() => classPackages.id),
    teacherId: text('teacher_id').notNull().references(() => teachers.id, { onDelete: 'cascade' }),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
    unique().on(t.name, t.organizationId),
    unique().on(t.classPackageId, t.teacherId, t.organizationId),
]);