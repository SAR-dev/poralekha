import { relations } from "drizzle-orm/relations";
import { state, city, users, driver, restaurant, menuItem, category, orders, orderMenuItem, orderStatus, statusCatalog, address, restaurantOwner, comment } from "./schema";

export const cityRelations = relations(city, ({one, many}) => ({
	state: one(state, {
		fields: [city.stateId],
		references: [state.id]
	}),
	restaurants: many(restaurant),
	addresses: many(address),
}));

export const stateRelations = relations(state, ({many}) => ({
	cities: many(city),
}));

export const driverRelations = relations(driver, ({one, many}) => ({
	user: one(users, {
		fields: [driver.userId],
		references: [users.id]
	}),
	orders: many(orders),
}));

export const usersRelations = relations(users, ({many}) => ({
	drivers: many(driver),
	orders: many(orders),
	restaurantOwners: many(restaurantOwner),
	addresses: many(address),
	comments: many(comment),
}));

export const menuItemRelations = relations(menuItem, ({one, many}) => ({
	restaurant: one(restaurant, {
		fields: [menuItem.restaurantId],
		references: [restaurant.id]
	}),
	category: one(category, {
		fields: [menuItem.categoryId],
		references: [category.id]
	}),
	orderMenuItems: many(orderMenuItem),
}));

export const restaurantRelations = relations(restaurant, ({one, many}) => ({
	menuItems: many(menuItem),
	orders: many(orders),
	restaurantOwners: many(restaurantOwner),
	city: one(city, {
		fields: [restaurant.cityId],
		references: [city.id]
	}),
}));

export const categoryRelations = relations(category, ({many}) => ({
	menuItems: many(menuItem),
}));

export const orderMenuItemRelations = relations(orderMenuItem, ({one}) => ({
	order: one(orders, {
		fields: [orderMenuItem.orderId],
		references: [orders.id]
	}),
	menuItem: one(menuItem, {
		fields: [orderMenuItem.menuItemId],
		references: [menuItem.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	orderMenuItems: many(orderMenuItem),
	orderStatuses: many(orderStatus),
	restaurant: one(restaurant, {
		fields: [orders.restaurantId],
		references: [restaurant.id]
	}),
	address: one(address, {
		fields: [orders.deliveryAddressId],
		references: [address.id]
	}),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
	driver: one(driver, {
		fields: [orders.driverId],
		references: [driver.id]
	}),
	comments: many(comment),
}));

export const orderStatusRelations = relations(orderStatus, ({one}) => ({
	order: one(orders, {
		fields: [orderStatus.orderId],
		references: [orders.id]
	}),
	statusCatalog: one(statusCatalog, {
		fields: [orderStatus.statusCatalogId],
		references: [statusCatalog.id]
	}),
}));

export const statusCatalogRelations = relations(statusCatalog, ({many}) => ({
	orderStatuses: many(orderStatus),
}));

export const addressRelations = relations(address, ({one, many}) => ({
	orders: many(orders),
	user: one(users, {
		fields: [address.userId],
		references: [users.id]
	}),
	city: one(city, {
		fields: [address.cityId],
		references: [city.id]
	}),
}));

export const restaurantOwnerRelations = relations(restaurantOwner, ({one}) => ({
	restaurant: one(restaurant, {
		fields: [restaurantOwner.restaurantId],
		references: [restaurant.id]
	}),
	user: one(users, {
		fields: [restaurantOwner.ownerId],
		references: [users.id]
	}),
}));

export const commentRelations = relations(comment, ({one}) => ({
	order: one(orders, {
		fields: [comment.orderId],
		references: [orders.id]
	}),
	user: one(users, {
		fields: [comment.userId],
		references: [users.id]
	}),
}));