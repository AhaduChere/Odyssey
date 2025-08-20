import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { readBody, defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const { userID, goalname, goaldesc, deadline } = await readBody(event);
    if (!userID || !goalname || !deadline) {

      console.error("Validation Error: Missing required fields", { userID, goalname, deadline });
      throw createError({ statusCode: 400, message: "Missing required fields" });
    }

    const db = await open({
      filename: "./server/database/Odyssey.db",
      driver: sqlite3.Database,
    });

    const result = await db.run(
      `INSERT INTO Goals (user_id, goal_name, description, deadline) 
      VALUES (?, ?, ?, date('now'), ?)`,
      userID,
      goalname,
      goaldesc || null,
      deadline
    );

    await db.close(); // It's good practice to close the database connection

    return { goalId: result.lastID };
  } catch (error) {
    // This is the main error log
    console.error("Database or API Error:", error);

    // Re-throw a generic or specific error to the client
    throw createError({ statusCode: 500, message: "Failed to add goal due to a server error." });
  }
});
