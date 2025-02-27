import db from "@/db";
import { Hono } from "hono";

const usersRoute = new Hono();

// Get all users
usersRoute.get("/", async (c) => {
  const allUsers = await db.query.users.findMany();
  return c.json(allUsers);
});

export default usersRoute;