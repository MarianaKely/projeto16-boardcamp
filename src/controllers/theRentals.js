

import dayjs from "dayjs";
import { db } from "../database/database.js";


export async function allRentals (req, res) {

  try {

    const covenant = await db.query ( `SELECT rentals.*, customers.name AS customer, games.name AS game FROM rentals 
      JOIN customers ON rentals."customerId" = customers.id 
      JOIN games ON rentals."gameId" = games.id;`

    );

    const locate = covenant.rows.map ((parameter) => ({

      ...parameter, rentDate: dayjs(parameter.rentDate).format("YYYY-MM-DD"), returnDate:

	  parameter.returnDate !== null ? dayjs(parameter.returnDate).format("YYYY-MM-DD") : null, customer: { id: parameter.customerId, name: parameter.customer }, game: { id: parameter.gameId, name: parameter.game },

    }));

    return res.send(locate);

  } catch (err) {

    return res.sendStatus(500);

  }


}



export async function individualRents (req, res) {

	const { customerId, gameId, daysRented } = req.body;

	if ( isNaN(Number(customerId)) || isNaN(Number(gameId)) || isNaN(Number(daysRented)) || daysRented <= 0 )

	  return res.sendStatus(400);
	  console.log('invalid');

	try {

	  const user = await db.query (`SELECT * FROM customers WHERE id = $1;`, [customerId]);
	  const userGames = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId,]);

	  if (!user.rowCount || !userGames.rowCount)

		return res.sendStatus(400);
		console.log('invalid');

	  const game = userGames.rows[0];
  
	  const rentalGameId = await db.query (`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [game.id]);

	  if (rentalGameId.rowCount === game.stockTotal) 
	  
	  return res.sendStatus(400);
	  console.log('invalid');
  
	  const rentDate = dayjs().format("YYYY-MM-DD");
	  const originalPrice = daysRented * game.pricePerDay;
  
	  await db.query (`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5)`,
		[customerId, gameId, rentDate, daysRented, originalPrice]

	  );

	  return res.sendStatus(201);

	} catch (err) {

		res.sendStatus(500);
		console.log('ok');

	}
	
  }
  
