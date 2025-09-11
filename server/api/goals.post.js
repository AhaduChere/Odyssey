import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { readBody, defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  let db;
  try {
    db = await open({
      filename: './server/database/Odyssey.db',
      driver: sqlite3.Database,
    });

    const body = await readBody(event);
    const { action, userID, goalname, goaldesc, deadline, goalID } = body;

    if (action === 'add') {
      if (!userID || !goalname || !deadline) {
        throw createError({ statusCode: 400, message: 'Missing required fields' });
      }

      await db.run(
        `INSERT INTO Goals (user_id, goal_name, description, deadline, completed, created_at) 
         VALUES (?, ?, ?, ?, 'FALSE', date('now'))`,
        [userID, goalname, goaldesc || null, deadline]
      );
      return { success: true };

    } else if (action === 'complete') {
      if (!goalID) throw createError({ statusCode: 400, message: 'Missing goalID' });
      const result = await db.run(`UPDATE Goals SET completed = 'TRUE', completed_date = date('now') WHERE goal_id = ?`, [goalID]);
      if (result.changes === 0) return { success: false, message: 'No rows updated' };
      return { success: true };

    } else if (action === 'undo') {
      if (!goalID) throw createError({ statusCode: 400, message: 'Missing goalID' });
      const result = await db.run(`UPDATE Goals SET completed = 'FALSE', completed_date = NULL WHERE goal_id = ?`, [goalID]);
      if (result.changes === 0) return { success: false, message: 'No rows updated' };
      return { success: true };

    } else if (action === 'delete') {
      if (!goalID) throw createError({ statusCode: 400, message: 'Missing goalID' });
      const result = await db.run(`DELETE FROM Goals WHERE goal_id = ?`, [goalID]);
      if (result.changes === 0) return { success: false, message: 'No rows deleted' };
      return { success: true };

    } else {
      throw createError({ statusCode: 400, message: 'Invalid action' });
    }
  } catch {
    throw createError({ statusCode: 500, message: 'Failed to process request.' });
  } finally {
    if (db) await db.close();
  }
});
