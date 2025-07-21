import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newemail = body.newemail;
  const ID = body.userid;

  if (!newemail || !ID) {
    throw createError({ statusCode: 400, message: "Missing fields" });
  }

  const db = await open({
    filename: "./server/database/Odyssey.db",
    driver: sqlite3.Database,
  });


  db.run("UPDATE Users SET email = ? WHERE user_id = ?", newemail, ID);
  db.close();
  return { success: true };
});
