import { defineEventHandler, getQuery, sendError, createError } from 'h3';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;
  const year = query.year;
  const month = query.month;

  if (!id || !year || !month) {
    return sendError(event, createError({ statusCode: 400, message: 'Missing user ID, year, or month' }));
  }

  const db = await open({
    filename: 'server/database/Odyssey.db',
    driver: sqlite3.Database,
  });

  try {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;

    const goalsdata = await db.all(
      'SELECT * FROM Goals WHERE user_id = ? AND strftime("%Y-%m", deadline) = ? ORDER BY deadline ASC',
      id,
      monthStr
    );
    return goalsdata;
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, message: 'Error: ' + err }));
  } finally {
    db.close();
  }
});
