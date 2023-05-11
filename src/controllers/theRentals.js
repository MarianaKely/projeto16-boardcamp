

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

    return res.status(500).send(err.message);

  }

}
