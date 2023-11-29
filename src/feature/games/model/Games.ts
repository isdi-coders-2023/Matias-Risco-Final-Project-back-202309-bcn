import mongoose from "mongoose";
import { type GamesStructure } from "../types";

const GameShema = new mongoose.Schema<GamesStructure>({
  name: {
    type: String,
    required: true,
  },
  audience: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  gameTime: {
    type: String,
    required: true,
  },
  graphics: {
    type: String,
    required: true,
  },
  grind: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  plataforms: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const Games = mongoose.model("Games", GameShema, "Games");

export default Games;
