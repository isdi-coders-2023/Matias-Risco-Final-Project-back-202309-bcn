import { type GameStructureWithOutId, type GameStructure } from "../types";

const gamesMock: GameStructure[] = [
  {
    _id: "AEWFGROUHGO4839oh8H9p8ppphP98H89fh398",
    audience: ["Adults"],
    difficulty: "Dark Souls",
    gameTime: "Average",
    graphics: "Decent",
    grind: "You'll need a second life for grinding",
    languages: ["French"],
    imageUrl: "adsf",
    platforms: [],
    name: "Archer melo",
    tags: [],
  },
  {
    _id: "gwoQA4HGO8349G",
    audience: ["Grandma"],
    difficulty: "Easy to learn / Hard to master",
    gameTime: "Average",
    graphics: "Decent",
    grind: "Only if u care about leaderboards/ranks",
    languages: ["French"],
    imageUrl: "adsf",
    platforms: [],
    name: "Jenga",
    tags: [],
  },
];

export const newGame: GameStructureWithOutId = {
  name: "new game",
  audience: ["Adults"],
  difficulty: "Dark Souls",
  gameTime: "Average",
  graphics: "Bad",
  grind: "Average grind level",
  imageUrl: "asd",
  languages: ["Danish"],
  platforms: ["Linux"],
  tags: ["2D"],
};

export default gamesMock;
