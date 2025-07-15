import { useCookie } from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
  const userState = useState("user");

  if (!userState.value && import.meta.env.SSR) {
    const token = useCookie("session_token").value;
    if (token) {
      const sqlite3 = (await import("sqlite3")).default;
      const { open } = await import("sqlite");

      const db = await open({
        filename: "./server/database/Odyssey.db",
        driver: sqlite3.Database,
      });

      const row = await db.get(
        "SELECT user_id FROM Sessions WHERE token = ?",
        token,
      );
      if (row) {
        userState.value = { id: row.user_id };
      }
    }
  }

const isAuthPage = to.path === "/Auth";

if (!userState.value && !isAuthPage) return navigateTo("/Auth");
if (userState.value && isAuthPage) return navigateTo("/");
});
