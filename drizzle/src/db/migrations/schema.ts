import { pgTable, foreignKey, unique, serial, varchar, integer, boolean, timestamp, text, numeric, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const city = pgTable("city", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	stateId: integer("state_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.stateId],
			foreignColumns: [state.id],
			name: "city_state_id_state_id_fk"
		}),
	unique("city_ak_1").on(table.name, table.stateId),
]);

export const driver = pgTable("driver", {
	id: serial().primaryKey().notNull(),
	carMake: varchar("car_make", { length: 255 }).notNull(),
	carModel: varchar("car_model", { length: 255 }).notNull(),
	carYear: integer("car_year").notNull(),
	userId: integer("user_id").notNull(),
	online: boolean().notNull(),
	delivering: boolean().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "driver_user_id_users_id_fk"
		}),
]);

export const menuItem = pgTable("menu_item", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	restaurantId: integer("restaurant_id").notNull(),
	categoryId: integer("category_id").notNull(),
	description: text().notNull(),
	ingredients: text().notNull(),
	price: numeric({ precision: 12, scale:  2 }).notNull(),
	active: boolean().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.restaurantId],
			foreignColumns: [restaurant.id],
			name: "menu_item_restaurant_id_restaurant_id_fk"
		}),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.id],
			name: "menu_item_category_id_category_id_fk"
		}),
]);

export const category = pgTable("category", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
}, (table) => [
	unique("category_name_unique").on(table.name),
]);

export const orderMenuItem = pgTable("order_menu_item", {
	id: serial().primaryKey().notNull(),
	orderId: integer("order_id").notNull(),
	menuItemId: integer("menu_item_id").notNull(),
	quantity: integer().notNull(),
	itemPrice: numeric("item_price", { precision: 12, scale:  2 }).notNull(),
	price: numeric({ precision: 12, scale:  2 }).notNull(),
	comment: text(),
}, (table) => [
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_menu_item_order_id_orders_id_fk"
		}),
	foreignKey({
			columns: [table.menuItemId],
			foreignColumns: [menuItem.id],
			name: "order_menu_item_menu_item_id_menu_item_id_fk"
		}),
]);

export const orderStatus = pgTable("order_status", {
	id: serial().primaryKey().notNull(),
	orderId: integer("order_id").notNull(),
	statusCatalogId: integer("status_catalog_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_status_order_id_orders_id_fk"
		}),
	foreignKey({
			columns: [table.statusCatalogId],
			foreignColumns: [statusCatalog.id],
			name: "order_status_status_catalog_id_status_catalog_id_fk"
		}),
]);

export const orders = pgTable("orders", {
	id: serial().primaryKey().notNull(),
	restaurantId: integer("restaurant_id").notNull(),
	estimatedDeliveryTime: timestamp("estimated_delivery_time", { mode: 'string' }).notNull(),
	actualDeliveryTime: timestamp("actual_delivery_time", { mode: 'string' }),
	deliveryAddressId: integer("delivery_address_id").notNull(),
	userId: integer("user_id").notNull(),
	driverId: integer("driver_id"),
	price: numeric({ precision: 12, scale:  2 }).notNull(),
	discount: numeric({ precision: 12, scale:  2 }).notNull(),
	finalPrice: numeric("final_price", { precision: 12, scale:  2 }).notNull(),
	comment: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.restaurantId],
			foreignColumns: [restaurant.id],
			name: "orders_restaurant_id_restaurant_id_fk"
		}),
	foreignKey({
			columns: [table.deliveryAddressId],
			foreignColumns: [address.id],
			name: "orders_delivery_address_id_address_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "orders_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.driverId],
			foreignColumns: [driver.id],
			name: "orders_driver_id_driver_id_fk"
		}),
]);

export const restaurantOwner = pgTable("restaurant_owner", {
	id: serial().primaryKey().notNull(),
	restaurantId: integer("restaurant_id").notNull(),
	ownerId: integer("owner_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.restaurantId],
			foreignColumns: [restaurant.id],
			name: "restaurant_owner_restaurant_id_restaurant_id_fk"
		}),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "restaurant_owner_owner_id_users_id_fk"
		}),
	unique("restaurant_owner_restaurant_id_owner_id_unique").on(table.restaurantId, table.ownerId),
]);

export const restaurant = pgTable("restaurant", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	streetAddress: varchar("street_address", { length: 255 }).notNull(),
	zipCode: varchar("zip_code", { length: 16 }).notNull(),
	cityId: integer("city_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index().using("btree", table.name.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.cityId],
			foreignColumns: [city.id],
			name: "restaurant_city_id_city_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	contactPhone: varchar("contact_phone", { length: 255 }).notNull(),
	phoneVerified: boolean("phone_verified").notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerified: boolean("email_verified").notNull(),
	confirmationCode: varchar("confirmation_code", { length: 255 }),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_contact_phone_unique").on(table.contactPhone),
	unique("users_email_unique").on(table.email),
]);

export const address = pgTable("address", {
	id: serial().primaryKey().notNull(),
	streetAddress1: varchar("street_address_1", { length: 255 }).notNull(),
	streetAddress2: varchar("street_address_2", { length: 255 }),
	zipCode: varchar("zip_code", { length: 16 }).notNull(),
	deliveryInstructions: varchar("delivery_instructions", { length: 255 }),
	userId: integer("user_id").notNull(),
	cityId: integer("city_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "address_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.cityId],
			foreignColumns: [city.id],
			name: "address_city_id_city_id_fk"
		}),
]);

export const state = pgTable("state", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 2 }).notNull(),
}, (table) => [
	unique("state_name_unique").on(table.name),
	unique("state_code_unique").on(table.code),
]);

export const comment = pgTable("comment", {
	id: serial().primaryKey().notNull(),
	orderId: integer("order_id").notNull(),
	userId: integer("user_id").notNull(),
	commentText: text("comment_text").notNull(),
	isComplaint: boolean("is_complaint").notNull(),
	isPraise: boolean("is_praise").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "comment_order_id_orders_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comment_user_id_users_id_fk"
		}),
]);

export const statusCatalog = pgTable("status_catalog", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
}, (table) => [
	unique("status_catalog_name_unique").on(table.name),
]);
