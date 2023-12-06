import { Joi } from "express-validation";
import {
  type GameStructureWithOutId,
  tag,
  audience,
  difficulty,
  gameTime,
  graphics,
  grind,
  languages,
  platforms,
} from "../types.js";

export const addGameValidator = {
  body: Joi.object<{ game: GameStructureWithOutId }>().keys({
    game: Joi.object<GameStructureWithOutId>().keys({
      name: Joi.string().required(),
      tags: Joi.array()
        .items(Joi.string().valid(...tag))
        .required(),
      audience: Joi.array()
        .items(Joi.string().valid(...audience))
        .required(),
      difficulty: Joi.string()
        .valid(...difficulty)
        .required(),
      gameTime: Joi.string()
        .valid(...gameTime)
        .required(),
      graphics: Joi.string()
        .valid(...graphics)
        .required(),
      grind: Joi.string()
        .valid(...grind)
        .required(),
      imageUrl: Joi.string().required(),
      languages: Joi.array()
        .items(Joi.string().valid(...languages))
        .required(),
      platforms: Joi.array()
        .items(Joi.string().valid(...platforms))
        .required(),
    }),
  }),
};
