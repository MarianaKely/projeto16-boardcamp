
import { Router } from "express";
import { allRentals , individualRents } from "../controllers/theRentals.js";


const theRentalsRouter = Router();

theRentalsRouter.get("/rentals", allRentals);
theRentalsRouter.post("/rentals", individualRents);


export default theRentalsRouter;