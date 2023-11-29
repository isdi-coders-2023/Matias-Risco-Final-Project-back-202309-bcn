import { type NextFunction, type Request, type Response } from "express";
import debugCreator from "debug";
import chalk from "chalk";
import CustomError from "../CustomError/CustomError.js";

const debug = debugCreator("valvePipe:server:errorMiddleware");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const publicMessage = error?.message ?? "Error untracked in Api";
  const privateMessage = error?.privateMessage ?? publicMessage;
  const statusCode = error?.statusCode ?? 500;

  debug(chalk.redBright(privateMessage));

  res.status(statusCode).json({ message: publicMessage });
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
