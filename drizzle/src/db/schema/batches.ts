import { pgTable, uuid, varchar, timestamp, serial } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { classPackages } from './classPackages';

export const batches = pgTable('batches', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    organizationId: uuid('organization_id').notNull().references(() => organizations.id),
    classPackageId: uuid('class_package_id').notNull().references(() => classPackages.id),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});