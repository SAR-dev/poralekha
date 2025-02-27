// https://orm.drizzle.team/docs/seed-overview
import { reset, seed } from "drizzle-seed";
import * as schema from "@/db/seed.schema";
import db, { connection } from "@/db";

const main = async () => {
    await reset(db, schema);
    await seed(db, schema).refine((funcs) => ({
        users: {
            count: 50,
        },
        organizations: {
            count: 10
        }
    }))
}

await main();

await connection.end();