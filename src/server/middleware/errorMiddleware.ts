import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../utils/CustomError";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("valvePipe:server:errorMiddleware");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(chalk.redBright(error.privateMessage));

  res.status(error.statusCode).json({ message: error.message });
};
