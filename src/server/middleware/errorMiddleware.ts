import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../utils/CustomError";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("valvePipe:server:errorMiddleware");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const privateMessage = error.privateMessage ?? error.message;
  debug(chalk.redBright(privateMessage));

  res.status(error.statusCode).json({ message: error.message });
};

export const methodNotFound = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = new CustomError(
    404,
    "method not found",
    `Requested method not foud: ${req.method} ${req.path}`,
  );
  next(error);
};
