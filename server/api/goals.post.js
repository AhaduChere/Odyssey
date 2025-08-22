import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { readBody, defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
  let db;
  try {
    const body = await readBody(event);
    const { action, userID, goalname, goaldesc, deadline, goalID } = body;

    if (action === "add") {
      if (!userID || !goalname || !deadline) {
        console.error("Validation Error: Missing required fields", { userID, goalname, deadline });
        throw createError({ statusCode: 400, message: "Missing required fields" });
      }

      db = await open({
        filename: "./server/database/Odyssey.db",
        driver: sqlite3.Database,
      });

      try {
        await db.run(
          `INSERT INTO Goals (user_id, goal_name, description, deadline, completed, created_at) 
           VALUES (?, ?, ?, ?, 'FALSE', date('now'))`,
          [userID, goalname, goaldesc || null, deadline]
        );
        return { success: true };
      } catch (err) {
        console.error("DB Insert Error:", err.message, err.stack);
        throw createError({ statusCode: 500, message: "Failed to insert goal." });
      }
    }

    else if (action === "update") {
      if (!goalID) {
        console.error("Validation Error: Missing goalID");
        throw createError({ statusCode: 400, message: "Missing goalID" });
      }

      db = await open({
        filename: "./server/database/Odyssey.db",
        driver: sqlite3.Database,
      });

      try {
        const result = await db.run(
          `UPDATE Goals SET completed = 'TRUE', completed_date = date('now') WHERE goal_id = ?`,
          [goalID]
        );
        if (result.changes === 0) {
          return { success: false, message: "No rows updated" };
        }
        return { success: true };
      } catch (err) {
        console.error("DB Update Error:", err.message, err.stack);
        throw createError({ statusCode: 500, message: "Failed to update goal." });
      }
    }

    else if (action === "edit") {
      // TODO: add edit 
      return { success: false };
    }

    else {
      throw createError({ statusCode: 400, message: "Invalid action" });
    }
  } catch (error) {
    console.error("Database or API Error:", error?.message, error?.stack);
    throw createError({ statusCode: 500, message: "Failed to process request." });
  } finally {
    if (db) await db.close();
  }
});
