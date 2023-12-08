import { type NextFunction } from "express";
import { type GamesRepositoryStructure } from "../../repository/types";
import { type GameStructure, type GameStructureWithOutId } from "../../types";
import { type GameBodyResponseParams, type GameAddRequest } from "../types";
import { newGame } from "../../mock/gamesMock";
import GamesController from "../GamesController";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given the function addGame in GamesController", () => {
  const id = "656aa0000000000000000006";

  const gamesRepository: Partial<GamesRepositoryStructure> = {
    createGame: async (game: GameStructureWithOutId) => ({ id, ...game }),
  };

  const gamesController = new GamesController(
    gamesRepository as GamesRepositoryStructure,
  );

  const req: Partial<GameAddRequest> = {
    body: {
      game: newGame,
    },
  };

  const res: Partial<GameBodyResponseParams> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response  and a Request with the information of the new Game with out id", () => {
    test("then it should call status with Code 200", async () => {
      const expectCode = 200;

      await gamesController.addGame(
        req as GameAddRequest,
        res as GameBodyResponseParams,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
    });
  });

  describe("When it is call with a Response  and a Request with the information of the new Game with out id", () => {
    test("then it should call json with new game", async () => {
      const expectedJson = newGame;

      await gamesController.addGame(
        req as GameAddRequest,
        res as GameBodyResponseParams,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({
        game: expect.objectContaining(expectedJson) as GameStructure,
      });
    });
  });
});
