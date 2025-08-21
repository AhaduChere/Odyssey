import { getCookie, setCookie, defineEventHandler } from "h3";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default defineEventHandler(async (event) => {
  const db = await open({
    filename: "./server/database/Odyssey.db",
    driver: sqlite3.Database,
  });

  const token = getCookie(event, "session_token");
  if (token) {
    await db.run("DELETE FROM Sessions WHERE token = ?", token);
  }

  setCookie(event, "session_token", "", {
    maxAge: 0,
    path: "/",
  });

  return { success: true };
});
