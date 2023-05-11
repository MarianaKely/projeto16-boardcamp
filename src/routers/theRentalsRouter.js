
import { Router } from "express";
import { allRentals , individualRents , RentalConfig } from "../controllers/theRentals.js";


const theRentalsRouter = Router();

theRentalsRouter.get("/rentals", allRentals);
theRentalsRouter.post("/rentals", individualRents);
theRentalsRouter.post("/rentals/:id/return", RentalConfig);


export default theRentalsRouter;