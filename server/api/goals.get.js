import { defineEventHandler, getQuery, sendError, createError } from 'h3';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;
  const method = query.method;

  if (!id) return sendError(event, createError({ statusCode: 400, message: 'Missing user ID' }));
  if (!method) return sendError(event, createError({ statusCode: 400, message: 'Missing method type' }));

  const db = await open({
    filename: 'server/database/Odyssey.db',
    driver: sqlite3.Database,
  });

  try {
    const today = new Date().toISOString().split('T')[0];

    if (method === 'dashboard') {
      const deadlines = await db.all(
        'SELECT DISTINCT deadline FROM Goals WHERE user_id = ? AND deadline >= ? ORDER BY deadline ASC LIMIT 30',
        id,
        today
      );

      let upcomingGoals = [];
      if (deadlines.length > 0) {
        const maxDeadline = deadlines[deadlines.length - 1].deadline;
        upcomingGoals = await db.all(
          "SELECT * FROM Goals WHERE user_id = ? AND completed = 'FALSE' AND deadline BETWEEN ? AND ? ORDER BY deadline ASC",
          id,
          today,
          maxDeadline
        );
      }

      const pastDueGoals = await db.all(
        "SELECT * FROM Goals WHERE user_id = ? AND completed = 'FALSE' AND deadline < ? ORDER BY deadline ASC",
        id,
        today
      );

      return { upcoming: upcomingGoals, pastdue: pastDueGoals };
    } else if (method === 'account') {
      const goalsIC = await db.get("SELECT COUNT(*) as count FROM Goals WHERE user_id = ? AND completed = 'FALSE'", id);
      const goalsC = await db.get("SELECT COUNT(*) as count FROM Goals WHERE user_id = ? AND completed = 'TRUE'", id);

      return { incomplete: goalsIC.count, completed: goalsC.count };
    } else if (method === 'archive') {
      const allGoals = await db.all('SELECT * FROM Goals WHERE user_id = ? ORDER BY deadline DESC', id);
      return allGoals;
    }
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, message: 'Error: ' + err }));
  } finally {
    db.close();
  }
});
