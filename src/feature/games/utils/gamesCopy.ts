import { type GameStructureApi } from "../types";

export const copyGameApi = (game: GameStructureApi): GameStructureApi => {
  const { audience, languages, platforms, tags } = game;
  return {
    ...game,
    audience: [...audience],
    languages: [...languages],
    platforms: [...platforms],
    tags: [...tags],
  };
};
