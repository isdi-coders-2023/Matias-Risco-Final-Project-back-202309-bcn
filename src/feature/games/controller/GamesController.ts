import { type Response, type Request } from "express";
import { type GameStructureApi } from "../types";
import { gamesToApi } from "../utils/gamesTransformation.js";
import gamesMock from "../mock/gamesMock.js";

export interface GamesJson {
  games: GameStructureApi[];
}

export type GamesResponseBody = Response<GamesJson>;

class GamesController {
  getGames(_res: Request, res: GamesResponseBody) {
    res.status(200).json({ games: gamesToApi(gamesMock) });
  }
}

export default GamesController;
