
import { Router } from "express";
import theClientsSchema from "../schemas/joi.js";
import middlewareSchema from "../middlewares/middleware.js";
import { allClients , individualClient , clientProfile , changeClientInfo } from "../controllers/theClients.js";

const theClientsRouter = Router();

theClientsRouter.get("/customers", allClients);
theClientsRouter.post("/customers", middlewareSchema(theClientsSchema), clientProfile);
theClientsRouter.get("/customers/:id", individualClient);
theClientsRouter.put("/customers/:id", middlewareSchema(theClientsSchema), changeClientInfo);

export default theClientsRouter;