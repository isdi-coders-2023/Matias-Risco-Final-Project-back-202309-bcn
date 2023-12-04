import { Router } from "express";
import GamesController from "../controller/GamesController.js";
import GamesRepository from "../repository/GamesRepository.js";

const gamesRepository = new GamesRepository();
const gamesController = new GamesController(gamesRepository);
const gamesRouter = Router();

gamesRouter.get("/", gamesController.getGames);
gamesRouter.delete("/delete/:idGame", gamesController.deleteGame);
gamesRouter.post("/add", gamesController.addGame);

export default gamesRouter;
