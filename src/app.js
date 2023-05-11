
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import theGameRouter from './routers/theGameRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(theGameRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hi, Its Me!!!`));