import { type Request, type Response } from "express";
import PingController from "../PingController";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Given a PingController's method getPong", () => {
  describe("When it receives a response", () => {
    const pingController = new PingController();
    const req = {};
    const responseMock: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then it should call the response's method status with status 200", () => {
      const expectedStatusCode = 200;

      pingController.getPong(req as Request, responseMock as Response);

      expect(responseMock.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with message '🏓'", () => {
      const expectMessage = { message: "🏓" };

      pingController.getPong(req as Request, responseMock as Response);

      expect(responseMock.json).toHaveBeenCalledWith(expectMessage);
    });
  });
});
