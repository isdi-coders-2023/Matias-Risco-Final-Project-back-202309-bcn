import { type NextFunction, type Request } from "express";
import GamesController, {
  type GameDeleteResponseParams,
  type GameDeleteRequestParams,
} from "../GamesController";
import { gameToApi, gamesToApi } from "../../utils/gamesTransformation";
import gamesMock from "../../mock/gamesMock";
import { type GamesRepositoryStructure } from "../../repository/types";
import type CustomError from "../../../../server/CustomError/CustomError";

describe("Given the function deleteGame in GamesController", () => {
  const gamesRepository: GamesRepositoryStructure = {
    getGames: async () => gamesToApi(gamesMock),
    async deleteGame(id: string) {
      const game = gamesMock.find(({ _id }) => _id === id);
      if (!game) {
        throw new Error("document not found");
      }

      return gameToApi(game);
    },
  };
  const gamesController = new GamesController(gamesRepository);
  const archerMelo = gamesMock[0];

  const res: Pick<GameDeleteResponseParams, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it is call with a Response and a Request with id of Archer melo Game as a parameter", () => {
    const req: Pick<GameDeleteRequestParams, "params"> = {
      params: {
        idGame: archerMelo._id,
      },
    };

    test("then it should call status with Code 200", async () => {
      const expectCode = 200;

      await gamesController.deleteGame(
        req as GameDeleteRequestParams,
        res as GameDeleteResponseParams,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectCode);
    });

    test("then it should call json with 'Archer melo'", async () => {
      const expectedJson = {
        game: gameToApi(archerMelo),
      };

      await gamesController.deleteGame(
        req as GameDeleteRequestParams,
        res as GameDeleteResponseParams,
        next,
      );

      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When it is call with a Response and a Request with non existing id Game as a parameter", () => {
    test("then it should call next with  404 Document not found", async () => {
      const req: Pick<GameDeleteRequestParams, "params"> = {
        params: {
          idGame: "0000000000000000",
        },
      };

      const expectedError: Partial<CustomError> = {
        statusCode: 404,
        message: "Document not found",
      };

      await gamesController.deleteGame(
        req as GameDeleteRequestParams,
        res as GameDeleteResponseParams,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
