
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import theGameRouter from './routers/theGameRouter.js';
import theClientsRouter from './routers/theClientsRouter.js';
import theRentalsRouter from './routers/theRentalsRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(theGameRouter);
app.use(theClientsRouter);
app.use(theRentalsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Hi, Its Me!!!`));