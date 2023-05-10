
import { Router } from "express";
import { theGamesSchema } from "../schemas/joi.js";
import { middleware } from "../middlewares/middleware.js";
import { allGames , individualGame } from "../controllers/theGame.js";


const theGamesRouter = Router ();

theGamesRouter.get('/games' , allGames);
theGamesRouter.post('games' , middleware(theGamesSchema), individualGame);

export default theGamesRouter;