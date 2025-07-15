import { hash } from "bcryptjs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

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

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Insert user
  await db.run(
    'INSERT INTO Users (email, hashed_password, created_at) VALUES (?, ?, datetime("now"))',
    email,
    hashedPassword,
  );

  return { success: true };
});
