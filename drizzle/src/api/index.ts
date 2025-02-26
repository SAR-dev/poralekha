import express from "express";
import { rpcHandler } from "typed-rpc/lib/express";
import { DrizzleService } from "./service";

const app = express();

app.use(express.json());
app.post("/api", rpcHandler(DrizzleService));

app.listen(process.env.PORT || 3000);
