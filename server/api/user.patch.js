import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { createError, readBody, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newusername = body.newusername;
  const ID = body.userid;

  if (!newusername || !ID) {
    throw createError({ statusCode: 400, message: "Missing fields" });
  }

  const db = await open({
    filename: "./server/database/Odyssey.db",
    driver: sqlite3.Database,
  });

  db.run("UPDATE Users SET username = ? WHERE user_id = ?", newusername, ID);
  db.close();
  return { success: true };
});
