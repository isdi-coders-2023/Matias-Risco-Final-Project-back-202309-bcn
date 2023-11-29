import { type GameStructureApi } from "../types";
import { type GamesRepositoryStructure } from "./types";
import { gamesToApi } from "../utils/gamesTransformation.js";
import Games from "../model/Games.js";

class GamesRepository implements GamesRepositoryStructure {
  async getGames(): Promise<GameStructureApi[]> {
    const games = await Games.find().limit(10).lean();

    return gamesToApi(games);
  }
}

export default GamesRepository;
