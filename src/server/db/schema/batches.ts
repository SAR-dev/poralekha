import { pgTable, varchar, timestamp, serial, integer, unique } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { classPackages } from './classPackages';
import { teachers } from './teachers';

export const batches = pgTable('batches', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    organizationId: integer('organization_id').notNull().references(() => organizations.id),
    classPackageId: integer('class_package_id').notNull().references(() => classPackages.id),
    teacherId: integer('teacher_id').notNull().references(() => teachers.id, { onDelete: 'cascade' }),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
    unique().on(t.name, t.organizationId),
    unique().on(t.classPackageId, t.teacherId, t.organizationId),
]);