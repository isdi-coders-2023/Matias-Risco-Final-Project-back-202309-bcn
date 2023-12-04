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

type Audience = "Kids" | "Teens" | "Adults" | "Grandma";

type Languages =
  | "English"
  | "French"
  | "German"
  | "Russian"
  | "Danish"
  | "Dutch"
  | "Finnish"
  | "Italian"
  | "Japanese"
  | "Norwegian"
  | "Polish"
  | "Spanish";

type Tag =
  | "Indie"
  | "Action"
  | "Adventure"
  | "Casual"
  | "RPG"
  | "Simulation"
  | "Strategy"
  | "Singleplayer"
  | "Early Access"
  | "Free to Play"
  | "2D"
  | "3D"
  | "Atmospheric"
  | "Fantasy"
  | "Story Rich"
  | "Colorful"
  | "Multiplayer"
  | "Puzzle"
  | "Exploration"
  | "Pixel Graphics"
  | "Massively Multiplayer"
  | "Cute"
  | "Sports"
  | "Violent"
  | "First-Person"
  | "Combat"
  | "Racing"
  | "Action-Adventure"
  | "Anime"
  | "Arcade"
  | "Funny"
  | "Sci-fi"
  | "Shooter"
  | "Relaxing"
  | "Horror"
  | "Gore";

type Platforms = "VR" | "Windows" | "Linux" | "Mac";

export interface GameStructure {
  _id: string;
  name: string;
  platforms: Platforms[];
  difficulty: Difficulty;
  imageUrl: string;
  languages: Languages[];
  graphics: Graphics;
  audience: Audience[];
  grind: Grid;
  gameTime: GameTime;
  tags: Tag[];
}

export type GameStructureWithOutId = Omit<GameStructure, "_id">;

export interface GameStructureApi extends GameStructureWithOutId {
  id: string;
}
