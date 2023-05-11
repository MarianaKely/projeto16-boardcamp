

import { db } from "../database/database.js";

export async function allGames (req, res) {

    try {

      const gamesList = await db.query("SELECT * FROM games;");
      return res.send(gamesList.rows);

    } catch (err) {

      return res.sendStatus(500);

    }


  }

  export async function individualGame (req, res) {

    const { name, image, stockTotal, pricePerDay } = req.body;

    try {

      const mainGame = await db.query(`SELECT * FROM games WHERE name = $1;`, [name]);

      if (mainGame.rows.length) return res.sendStatus(409);
      console.log('invalid');

      await db.query(`INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
       [name, image, stockTotal, pricePerDay]);

      return res.sendStatus(201);

    } catch (err) {

        res.sendStatus(500);
        console.log('ok');

    }
  }