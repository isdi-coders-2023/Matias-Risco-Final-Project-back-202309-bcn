import { type GameStructureApi } from "../types";

export interface GamesRepositoryStructure {
  getGames: () => Promise<GameStructureApi[]>;
}
