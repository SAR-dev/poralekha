// https://orm.drizzle.team/docs/seed-overview
import { reset } from "drizzle-seed";
import * as schema from "@/db/seed.schema";
import db, { connection } from "@/db";

const main = async () => {
    await reset(db, schema);
}

await main();

await connection.end();