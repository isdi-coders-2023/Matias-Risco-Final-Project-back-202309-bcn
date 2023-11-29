import { type NextFunction, type Request, type Response } from "express";
import { endpointNotFound } from "../errorMiddleware";
import type CustomError from "../../CustomError/CustomError";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given a errorMiddleware function endpointNotFound", () => {
  describe("When it receives a req and next", () => {
    const req: Pick<Request, "method" | "path"> = {
      method: "",
      path: "",
    };
    const res = {};
    const next = jest.fn();

    test("Then it should call the next's method with CustomError (404, 'endpoint not found', 'Requested endpoint not found:')", () => {
      const expectError: Partial<CustomError> = {
        statusCode: 404,
        message: "endpoint not found",
        privateMessage: expect.stringContaining(
          "Requested endpoint not found:",
        ) as string,
      };

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectError));
    });
  });
});
