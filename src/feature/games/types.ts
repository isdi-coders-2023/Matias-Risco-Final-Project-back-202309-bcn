type Difficulty =
  | "Just press 'W'"
  | "Easy"
  | "Easy to learn / Hard to master"
  | "Significant brain usage"
  | "Difficult"
  | "Dark Souls";

type Graphics =
  | "You forget what reality is"
  | "Beautiful"
  | "Good"
  | "Decent"
  | "Bad"
  | "Don't look too long at it"
  | "MS-DOS";

type Grid =
  | "Nothing to grind"
  | "Only if u care about leaderboards/ranks"
  | "Isn't necessary to progress"
  | "Average grind level"
  | "Too much grind"
  | "You'll need a second life for grinding";

type GameTime =
  | "Long enough for a cup of coffee"
  | "Short"
  | "Average"
  | "Long"
  | "To infinity and beyond";

export interface GameStructure {
  _id: string;
  name: string;
  plataforms: string[];
  difficulty: Difficulty;
  imageUrl: string;
  languages: string[];
  graphics: Graphics;
  audience: string[];
  grind: Grid;
  gameTime: GameTime;
  tags: string[];
}

export type GameStructureWithOutId = Omit<GameStructure, "_id">;

export interface GameStructureApi extends GameStructureWithOutId {
  id: string;
}
