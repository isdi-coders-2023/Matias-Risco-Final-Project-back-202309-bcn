import chalk from "chalk";
import express from "express";
import debugCreator from "debug";

const debug = debugCreator("valvePipe:server");
const app = express();

app.disable("x-powered-by");

export const startServer = (port: number) =>
  app.listen(port, () => {
    debug(chalk.green(`Listening on port: ${port}`));
  });

export default app;
