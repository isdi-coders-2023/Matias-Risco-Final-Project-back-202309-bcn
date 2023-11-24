import mongoose from "mongoose";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("valvePipe:database");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.greenBright("Connected to database"));
  } catch (error) {
    debug(
      chalk.redBright(
        `Error can't connect to database: ${(error as Error).message}`,
      ),
    );
  }
};
