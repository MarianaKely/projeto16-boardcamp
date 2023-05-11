

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
    
	console.log('ok');;
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
      
	  console.log('ok');;
	  return res.sendStatus(201);

	} catch (err) {

		res.sendStatus(500);
		console.log('ok');

	}
	
  }



  export async function erase (req, res) {

	const { id } = req.params;

	try {

	  const toBeErased = await db.query (`SELECT * FROM rentals WHERE id = $1;`, [id,]);

	  if (!toBeErased.rowCount) 

	  return res.sendStatus(404);

	  const erasedREnt = toBeErased.rows[0];

	  if (erasedREnt.returnDate === null) return res.sendStatus(400);

	  await db.query(`DELETE FROM rentals WHERE id = $1;`, [id]);

	  return res.sendStatus(200);

	} catch (err) {
      
	  console.log('ok');;	
	  return res.sendStatus(500);

	}

  }



  export async function RentalConfig (req, res) {

	const { id } = req.params;

	try {

	  const rentalInfo = await db.query( `SELECT rentals.*, games."pricePerDay" FROM rentals JOIN games ON rentals."gameId" = games.id WHERE rentals.id = $1;`,[id] );

	  if (!rentalInfo.rowCount) 

	  return res.sendStatus(404);
	  console.log('not found');

	  const rentals = rentalInfo.rows[0];

	  if (rentals.returnDate !== null) 
	  
	  return res.sendStatus(400);
	  console.log('invalid');
  
	  const returnDate = dayjs().format("YYYY-MM-DD");

	  const week = dayjs(returnDate).diff(dayjs(rentals.rentDate), "day") - rentals.daysRented;
	  const indebtedness = week > 0 ? week * rentals.pricePerDay : 0;
  
	  await db.query (`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [returnDate, indebtedness, id]);

	  res.sendStatus(200);
	  console.log('ok');

	} catch (err) {
      
	  console.log('ok');
	  return res.sendStatus(500);

	}

  }


  
