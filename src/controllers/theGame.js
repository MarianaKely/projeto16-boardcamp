

import { db } from "../database/database.js";


export async function allGames(_, res) {

	try {

		const games = await db.query("SELECT * FROM games");
		res.send(games.rows);

	} catch (error) {

		res.status(500).send("Internal Error");

	}
}

export async function individualGame(req, res) {

	const { name, image, stockTotal, pricePerDay } = req.body;

	try {

		const invalid = await db.query(

			`SELECT * FROM games WHERE name = $1`, [name]

		);

		if (invalid.rows.length > 0) {

			return res.status(409).send("Invalid");

		}

		const game = await db.query(

			`INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1, $2, $3, $4) RETURNING *`, [name, image, stockTotal, pricePerDay]

		);

		res.status(201).send("OK!");

	} catch (err) {


		return res.status(500).send("Internal Error");

	}
}