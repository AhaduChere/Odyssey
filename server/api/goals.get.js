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
    const goalsIP = await db.get(
      "SELECT COUNT(*) as count FROM Goals WHERE user_id = ? AND completed = 'FALSE'",
      id,
    );
    const goalsC = await db.get(
      "SELECT COUNT(*) as count FROM Goals WHERE user_id = ? AND completed = 'TRUE'",
      id,
    );

    let goalStats = { inprogress: goalsIP.count, completed: goalsC.count };

    return goalStats;
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, message: err }));
  } finally {
    db.close();
  }
});
