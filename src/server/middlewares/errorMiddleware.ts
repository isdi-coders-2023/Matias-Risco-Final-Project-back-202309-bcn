import { type NextFunction, type Request, type Response } from "express";
import debugCreator from "debug";
import chalk from "chalk";
import CustomError from "../CustomError/CustomError.js";
import { ValidationError } from "express-validation";

const debug = debugCreator("valvePipe:server:errorMiddleware");

interface CustomValidation extends ValidationError {
  privateMessage: string;
}

export const generalError = (
  error: CustomError | CustomValidation,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ValidationError) {
    error.privateMessage =
      error.details.body?.reduce(
        (accumulator, { message }, pocition) =>
          pocition === 0 ? `${message}` : `${accumulator} \n ${message}`,
        "",
      ) ?? "";
  }

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
