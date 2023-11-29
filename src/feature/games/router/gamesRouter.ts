import { Router } from "express";
import GamesController from "../controller/GamesController.js";

const gamesRouter = Router();
const gamesController = new GamesController();

gamesRouter.get("/", gamesController.getGames);

export default gamesRouter;
