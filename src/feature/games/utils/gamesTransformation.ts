import { type GameStructure, type GameStructureApi } from "../types";

export const gameToApi = ({
  _id: id,
  ...gameBase
}: GameStructure): GameStructureApi => ({ id, ...gameBase });

export const gamesToApi = (games: GameStructure[]): GameStructureApi[] =>
  games.map((game) => gameToApi(game));
