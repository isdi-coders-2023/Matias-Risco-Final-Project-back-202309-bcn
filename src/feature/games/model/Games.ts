import mongoose from "mongoose";
import { type GameStructure } from "../types";

const GameShema = new mongoose.Schema<GameStructure>(
  {
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
  },
  { versionKey: false },
);

const Games = mongoose.model("Games", GameShema, "Games");

export default Games;
