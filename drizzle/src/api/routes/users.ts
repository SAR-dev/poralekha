import { publicProcedure, router } from "./trpc.js";
import db from "@/db";

export const userRouter = router({
  // /trpc/user.userList
  userList: publicProcedure.query(async () => {
    const users = await db.query.users.findMany();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return users;
  }),
});

export type AppRouter = typeof userRouter;