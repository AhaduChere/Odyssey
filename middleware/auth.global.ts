// middleware/auth.global.ts
import { useCookie } from '#app';

export default defineNuxtRouteMiddleware(async (to) => {
  const userState = useState('user');

  // 1) Hydrate from cookie on the server
  if (!userState.value && process.server) {
    const token = useCookie('session_token').value;
    if (token) {
      // only import and run DB code on the server
      const sqlite3 = await import('sqlite3');
      const { open } = await import('sqlite');
      const db = await open({
        filename: './server/database/Odyssey.db',
        driver: sqlite3.Database,
      });
      const row = await db.get(
        'SELECT user_id FROM Sessions WHERE token = ?',
        token
      );
      if (row) {
        userState.value = { id: row.user_id };
      }
    }
  }

  // 2) Your existing public/auth redirect logic
  const publicPages = ['/Auth'];
  const isPublic = publicPages.includes(to.path);

  if (!userState.value && !isPublic) {
    return navigateTo('/Auth');
  }
  if (userState.value && isPublic) {
    return navigateTo('/');
  }
});
