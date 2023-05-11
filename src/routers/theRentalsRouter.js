
import { Router } from "express";
import { allRentals } from "../controllers/theRentals.js";


const theRentalsRouter = Router();

theRentalsRouter.get("/rentals", allRentals);


export default theRentalsRouter;