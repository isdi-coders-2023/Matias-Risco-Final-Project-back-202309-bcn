import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../utils/CustomError.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("valvePipe:server:errorMiddleware");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const privateMessage = error?.privateMessage ?? error.message;
  const statusCode = error?.statusCode ?? 500;

  debug(chalk.redBright(privateMessage));

  res.status(statusCode).json({ message: error.message });
};

export const endpointNotFound = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const error = new CustomError(
    404,
    "endpoint not found",
    `Requested endpoint not found: ${req.method} ${req.path}`,
  );

  next(error);
};
