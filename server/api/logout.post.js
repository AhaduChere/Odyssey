import { getCookie, setCookie } from 'h3';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'session_token');
  if (token) {
    const db = await open({ filename: './server/database/Odyssey.db', driver: sqlite3.Database });
    await db.run('DELETE FROM Sessions WHERE token = ?', token);
  }

  // Clear cookie
  setCookie(event, 'session_token', '', { maxAge: 0, path: '/' });
  return { success: true };
});
