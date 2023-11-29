import { type Request, type Response } from "express";
import { generalError } from "../errorMiddleware";
import type CustomError from "../../CustomError/CustomError";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given a errorMiddleware function generalError", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const req = {};
  const next = jest.fn();

  describe("When it receives a error without status code, private message and message", () => {
    test("Then it should call the res's method status with 500 and json with { message: 'Error untracked in Api'}", () => {
      const error = {};
      const expectMessage = { message: "Error untracked in Api" };
      const expectStatus = 500;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectMessage);
    });
  });

  describe("When it receives a error with status code 404, private message 'Error Private' and message 'Error Public'", () => {
    test("Then it should call the res's method status with 404 and json with { message: 'Error Public'}", () => {
      const error: Pick<
        CustomError,
        "statusCode" | "privateMessage" | "message"
      > = {
        statusCode: 404,
        privateMessage: "Error Private",
        message: "Error Public",
      };
      const expectMessage = { message: "Error Public" };
      const expectStatus = 404;

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith(expectMessage);
    });
  });
});
