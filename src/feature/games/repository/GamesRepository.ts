import { type GameStructureApi } from "../types";
import { type GamesRepositoryStructure } from "./types";
import { gameToApi, gamesToApi } from "../utils/gamesTransformation.js";
import Games from "../model/Games.js";

class GamesRepository implements GamesRepositoryStructure {
  async getGames(): Promise<GameStructureApi[]> {
    const games = await Games.find().limit(10).lean();

    return gamesToApi(games);
  }

  async deleteGame(id: string): Promise<GameStructureApi> {
    try {
      const game = await Games.findByIdAndDelete(id).lean();

      if (!game) {
        throw new Error("document not found");
      }

      return gameToApi(game);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default GamesRepository;
