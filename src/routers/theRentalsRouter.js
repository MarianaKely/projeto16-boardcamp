
import { Router } from "express";
import { allRentals , individualRents } from "../controllers/theRentals.js";


const theRentalsRouter = Router();

theRentalsRouter.get("/rentals", allRentals);
rentalsRouter.post("/rentals", individualRents);


export default theRentalsRouter;