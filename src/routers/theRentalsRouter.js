
import { Router } from "express";
import { allRentals , individualRents , erase , RentalConfig } from "../controllers/theRentals.js";


const theRentalsRouter = Router();

theRentalsRouter.get("/rentals", allRentals);
theRentalsRouter.post("/rentals", individualRents);
theRentalsRouter.delete("/rentals/:id", erase);
theRentalsRouter.post("/rentals/:id/return", RentalConfig);


export default theRentalsRouter;