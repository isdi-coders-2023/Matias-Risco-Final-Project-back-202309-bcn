import { type GameStructureApi } from "../types";

export interface GamesRepositoryStructure {
  getGames: () => Promise<GameStructureApi[]>;
  deleteGame: (id: string) => Promise<GameStructureApi>;
}
