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
    const goalsIC = await db.get(
      "SELECT COUNT(*) as count FROM Goals WHERE user_id = ? AND completed = 'FALSE'",
      id,
    );
    const goalsC = await db.get(
      "SELECT COUNT(*) as count FROM Goals WHERE user_id = ? AND completed = 'TRUE'",
      id,
    );

    const today = new Date().toISOString().split("T")[0];
    const deadlines = await db.all(
      "SELECT DISTINCT deadline FROM Goals WHERE user_id = ? AND deadline >= ? ORDER BY deadline ASC LIMIT 30",
      id,
      today,
    );

    if (deadlines.length === 0) {
      // no upcoming goals
      return [];
    }

    const maxDeadline = deadlines[deadlines.length - 1].deadline;

    const upcomingGoals = await db.all(
      "SELECT * FROM Goals WHERE user_id = ? AND deadline BETWEEN ? AND ? ORDER BY deadline ASC",
      id,
      today,
      maxDeadline,
    );

    let goalsdata = {
      incomplete: goalsIC.count,
      completed: goalsC.count,
      upcoming: upcomingGoals,
    };

    return goalsdata;
  } catch (err) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Error: " + err }),
    );
  } finally {
    db.close();
  }
});
