import "dotenv/config";
import "./server/index.js";
import { startServer } from "./server/app.js";
import chalk from "chalk/index.js";
import { connectToDatabase } from "./database/index.js";
import debugCreator from "debug";

const port = process.env.PORT ?? 4000;
const debug = debugCreator("valvePipe:index");

if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MongoDB String"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
