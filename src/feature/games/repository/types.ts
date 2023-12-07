import { type GameStructureWithOutId, type GameStructureApi } from "../types";

export interface GamesRepositoryStructure {
  getGames: () => Promise<GameStructureApi[]>;
  deleteGame: (id: string) => Promise<GameStructureApi>;
  createGame: (game: GameStructureWithOutId) => Promise<GameStructureApi>;
  infoGame?: (id: string) => Promise<GameStructureApi>;
}
