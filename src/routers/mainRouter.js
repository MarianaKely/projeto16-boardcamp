 
 import { Router } from "express";

import theGamesRouter from "./theGameRouter.js";

const mainRouter = Router();

mainRouter.use(theGamesRouter);


 export default mainRouter;