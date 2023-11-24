import "dotenv/config";
import "./server/index.js";
import { startServer } from "./server/app.js";

const port = process.env.PORT ?? 4000;

startServer(+port);
