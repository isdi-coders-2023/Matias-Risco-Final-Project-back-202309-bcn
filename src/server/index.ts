import cors from "cors";
import pingRouter from "../feature/ping/router/pingRouter.js";
import app from "./app.js";
import { corsOptions } from "./utils/corsOptions.js";

app.use(cors(corsOptions));
app.get("/", pingRouter);
