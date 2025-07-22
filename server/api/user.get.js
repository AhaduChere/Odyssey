import { defineEventHandler, getQuery, sendError, createError } from "h3";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;

  if (!id) {
    return sendError(
      event,
      createError({ statusCode: 400, message: "Missing user ID" }),
    );
  }

  const db = await open({
    filename: "server/database/Odyssey.db",
    driver: sqlite3.Database,
  });

  try {
    const user = await db.get(
      "SELECT username, email FROM Users WHERE user_id = ?",
      id,
    );
    if (!user) {
      return sendError(
        event,
        createError({ statusCode: 404, message: "User not found" }),
      );
    }
    return user;
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, message: err }));
  } finally {
    db.close();
  }
});
