import pingRouter from "../feature/ping/router/pingRouter.js";
import app from "./app.js";

app.get("/", pingRouter);
