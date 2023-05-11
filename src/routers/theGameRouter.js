
import { Router } from "express";
import theGamesSchema from "../schemas/joi.js";
import middlewareSchema from "../middlewares/middleware.js";
import { allGames , individualGame } from "../controllers/theGame.js";

const theGameRouter = Router();

theGameRouter.get("/games", allGames);
theGameRouter.post("/games", middlewareSchema(theGamesSchema), individualGame );

export default theGameRouter;