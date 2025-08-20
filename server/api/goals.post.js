import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { readBody, defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  let db;
  try {
    const { userID, goalname, goaldesc, deadline } = await readBody(event);

    if (!userID || !goalname || !deadline) {
      console.error("Validation Error: Missing required fields", { userID, goalname, deadline });
      throw createError({ statusCode: 400, message: "Missing required fields" });
    }

    db = await open({
      filename: "./server/database/Odyssey.db",
      driver: sqlite3.Database,
    });

    const result = await db.run(
      `INSERT INTO Goals (user_id, goal_name, description, deadline, completed, created_at) 
       VALUES (?, ?, ?, ?, 'FALSE', date('now'))`,
      [userID, goalname, goaldesc || null, deadline]
    );

    return { goalId: result.lastID };
  } catch (error) {
    console.error("Database or API Error:", error.message, error.stack);
    throw createError({ statusCode: 500, message: "Failed to add goal due to a server error." });
  } finally {
    if (db) await db.close();
  }
});
