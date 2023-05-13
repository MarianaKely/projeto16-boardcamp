
import { db } from "../database/database.js";
import dayjs from "dayjs";


export async function individualClient(req, res) {

  const { id } = req.params;

  try {

    const cclient = await db.query(`SELECT * FROM customers WHERE id = $1;`, [ id, ]);

    if (!cclient.rows.length) return res.sendStatus(404);

    return res.send(cclient.rows[0]);

  } catch (err) {

    res.sendStatus(500);
    console.log('ok');

  }

}


export async function changeClientInfo(req, res) {

  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  try {

    const changeInfo = await db.query (`SELECT * FROM customers WHERE cpf = $1 AND id <> $2;`,[cpf, id]);

    if (changeInfo.rows.length) return res.sendStatus(409);
    console.log('invalid');

    await db.query ( `UPDATE customers SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4 WHERE id = $5;`,
      [name, phone, cpf, birthday, id]

    );

    return res.sendStatus(200);

  } catch (err) {

    res.sendStatus(500);
    console.log('ok');

  }

}


export async function clientProfile(req, res) {

  const { name, phone, cpf, birthday } = req.body;

  try {

    const postClient = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf,]);

    if (postClient.rows.length) return res.sendStatus(409);
    console.log('invalid');

    await db.query ( `INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]

    );

    return res.sendStatus(201);

  } catch (err) {

    res.sendStatus(500);
    console.log('ok');

  }

}


export async function allClients(req, res) {

  const {documents} = req.query;

  try {

    const personalClientProfile = documents? await db.query(`SELECT * FROM customers WHERE cpf LIKE $1 || '%';`, [documents]) :
      await db.query("SELECT * FROM customers;");
      
    const myclients = personalClientProfile.rows.map((parameter)=>(

      { ...parameter, dday: dayjs(parameter.dday).format("YYYY-MM-DD"),}

    ));

    return res.send(myclients);

  } catch (err) {

    res.sendStatus(500);
    console.log('ok');

  } parameter

}