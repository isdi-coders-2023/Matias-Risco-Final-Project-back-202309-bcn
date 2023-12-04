import {
  type GameStructureWithOutId,
  type GameStructure,
  type GameStructureApi,
} from "../types";

export const gameWithOutId = ({
  _id,
  ...game
}: GameStructure): GameStructureWithOutId => game;

export const gamesWithOutId = (
  games: GameStructure[],
): GameStructureWithOutId[] => games.map((game) => gameWithOutId(game));

export const gameAddId = (
  id: string,
  game: GameStructureWithOutId,
): GameStructureApi => ({ id, ...game });

export const gameToApi = ({
  _id: id,
  ...gameBase
}: GameStructure): GameStructureApi => ({ id, ...gameBase });

export const gamesToApi = (games: GameStructure[]): GameStructureApi[] =>
  games.map((game) => gameToApi(game));
