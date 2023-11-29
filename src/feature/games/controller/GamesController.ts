import { type Response, type Request } from "express";
import { type GameStructureApi } from "../types";
import type GamesRepository from "../repository/GamesRepository";

export interface GamesJson {
  games: GameStructureApi[];
}

export type GamesResponseBody = Response<GamesJson>;

class GamesController {
  constructor(private readonly gamesRepository: GamesRepository) {}

  getGames = async (_res: Request, res: GamesResponseBody) => {
    const games = await this.gamesRepository.getGames();
    res.status(200).json({ games });
  };
}

export default GamesController;
