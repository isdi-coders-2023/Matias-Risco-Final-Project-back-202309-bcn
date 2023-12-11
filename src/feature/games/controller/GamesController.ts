import { type Request, type NextFunction } from "express";
import { type GamesRepositoryStructure } from "../repository/types";
import {
  type GameEditRequest,
  type GameAddRequest,
  type GameBodyResponseParams,
  type GameIdRequestParams,
  type GamesResponseBody,
  type RequestQuery,
} from "./types";
import CustomError from "../../../server/CustomError/CustomError.js";

class GamesController {
  constructor(private readonly gamesRepository: GamesRepositoryStructure) {}

  getGames = async (req: Request, res: GamesResponseBody) => {
    const page = (req.query as RequestQuery)?.page;

    const games = await this.gamesRepository.getGames(page);
    res.status(200).json({ games });
  };

  deleteGame = async (
    req: GameIdRequestParams,
    res: GameBodyResponseParams,
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

  addGame = async (
    req: GameAddRequest,
    res: GameBodyResponseParams,
    next: NextFunction,
  ) => {
    try {
      const { game } = req.body;
      const newGame = await this.gamesRepository.createGame(game);

      res.status(200).json({ game: newGame });
    } catch (error) {
      const newError = new CustomError(
        409,
        "Error in add new game",
        (error as Error).message,
      );

      next(newError);
    }
  };

  infoGame = async (
    req: GameIdRequestParams,
    res: GameBodyResponseParams,
    next: NextFunction,
  ) => {
    try {
      const { idGame } = req.params;

      const game = await this.gamesRepository.infoGame(idGame);

      res.status(200).json({ game });
    } catch (error) {
      const newError = new CustomError(
        404,
        "Game not found",
        (error as Error).message,
      );

      next(newError);
    }
  };

  editGame = async (
    req: GameEditRequest,
    res: GameBodyResponseParams,
    next: NextFunction,
  ) => {
    try {
      const { game } = req.body;

      const editedGame = await this.gamesRepository.editGame(game);

      res.status(200).json({ game: editedGame });
    } catch (error) {
      const newError = new CustomError(
        409,
        "Game not found or edited",
        (error as Error).message,
      );

      next(newError);
    }
  };
}

export default GamesController;
