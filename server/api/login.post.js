import { compare } from 'bcryptjs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { setCookie, createError, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  if (!username || !password) {
    throw createError({ statusCode: 400, message: 'Missing fields' });
  }

  const db = await open({ filename: './server/database/Odyssey.db', driver: sqlite3.Database });
  const user = await db.get('SELECT user_id, hashed_password FROM Users WHERE username = ?', username);
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const valid = await compare(password, user.hashed_password);
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const { randomUUID } = await import('crypto');
  const token = randomUUID();

  await db.run(
    'INSERT INTO Sessions (token, user_id) VALUES (?, ?)',
    token,
    user.user_id
  );

  setCookie(event, 'session_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, 
  });

  return { userId: user.user_id };
});
