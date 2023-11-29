import { type Request, type Response } from "express";
import GamesController, { type GamesResponseBody } from "../GamesController";
import { gamesToApi } from "../../utils/gamesTransformation";
import gamesMock from "../../mock/gamesMock";

describe("Given the function getGames in GamesController", () => {
  describe("When it is call with a Response as a parameter", () => {
    const gamesController = new GamesController();
    const req = {};
    const res: Pick<GamesResponseBody, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    test("then it should call status with Code 200", () => {
      const expectCode = 200;

      gamesController.getGames(req as Request, res as GamesResponseBody);

      expect(res.status).toHaveBeenCalledWith(expectCode);
    });

    test("then it should call json with 'Archer melo' and 'Jenga'", () => {
      const expectedJson = {
        games: gamesToApi(gamesMock),
      };

      gamesController.getGames(req as Request, res as GamesResponseBody);

      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });
});
