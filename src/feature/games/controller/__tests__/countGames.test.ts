import { type Request, type Response } from "express";
import { type GamesRepositoryStructure } from "../../repository/types";
import gamesMock from "../../mock/gamesMock";
import GamesController from "../GamesController";
import type CustomError from "../../../../server/CustomError/CustomError";

describe("Given the function countGames in GamesController", () => {
  const req = {};

  const res: Pick<Response<{ numberGames: number }>, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next = jest.fn();

  describe("When it is call with Reuest, Response and nextFunction", () => {
    const gamesRepository: Partial<GamesRepositoryStructure> = {
      countGame: async () => gamesMock.length,
    };

    const gamesController = new GamesController(
      gamesRepository as GamesRepositoryStructure,
    );

    test("Then it should call status with a 200", async () => {
      const expectCode = 200;

      await gamesController.countGame(
        req as Request,
        res as Response<{ numberGames: number }>,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
    });

    test("Then it should call json with a { numberGames: 2 }}", async () => {
      const expectedJson = { numberGames: 2 };

      await gamesController.countGame(
        req as Request,
        res as Response<{ numberGames: number }>,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When it is call with Reuest, Response and nextFunction but there is a error", () => {
    test("it should call next 400 'Error problem in asking the number of games'", async () => {
      const expectedError: Partial<CustomError> = {
        statusCode: 400,
        message: "Error problem in asking the number of games",
      };

      const gamesRepository: Partial<GamesRepositoryStructure> = {
        async countGame() {
          throw new Error();
        },
      };

      const gamesController = new GamesController(
        gamesRepository as GamesRepositoryStructure,
      );

      await gamesController.countGame(
        req as Request,
        res as Response<{ numberGames: number }>,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
