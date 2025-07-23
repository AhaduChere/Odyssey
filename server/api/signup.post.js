import { hash } from "bcryptjs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { createError, readBody, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;

  if (!email || !password || !username) {
    throw createError({ statusCode: 400, message: "Missing fields" });
  }

  const db = await open({
    filename: "./server/database/Odyssey.db",
    driver: sqlite3.Database,
  });

  const existingUser = await db.get(
    "SELECT 1 FROM Users WHERE username = ? OR email = ?",
    username,
    email,
  );

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: "Username or email already taken",
    });
  }
  const hashedPassword = await hash(password, 10);

  await db.run(
    'INSERT INTO Users (username, email, hashed_password, created_at) VALUES (?, ?, ?, datetime("now"))',
    username,
    email,
    hashedPassword,
  );

  return { success: true };
});
