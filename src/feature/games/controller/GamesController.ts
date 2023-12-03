import { type Response, type Request, type NextFunction } from "express";
import { type GameStructureApi } from "../types";
import { type GamesRepositoryStructure } from "../repository/types";
import CustomError from "../../../server/CustomError/CustomError";

export interface GamesJson {
  games: GameStructureApi[];
}

export type GameDeleteRequestParams = Request<{
  idGame: string;
}>;

export type GameDeleteResponseParams = Response<{ game: GameStructureApi }>;

export type GamesResponseBody = Response<GamesJson>;

class GamesController {
  constructor(private readonly gamesRepository: GamesRepositoryStructure) {}

  getGames = async (_res: Request, res: GamesResponseBody) => {
    const games = await this.gamesRepository.getGames();
    res.status(200).json({ games });
  };

  deleteGame = async (
    req: GameDeleteRequestParams,
    res: GameDeleteResponseParams,
    next: NextFunction,
  ) => {
    try {
      const { idGame } = req.params;
      const game = await this.gamesRepository.deleteGame(idGame);
      res.status(200).json({ game });
    } catch (error) {
      const newError = new CustomError(
        404,
        "Document not found",
        (error as Error).message,
      );

      next(newError);
    }
  };
}

export default GamesController;
