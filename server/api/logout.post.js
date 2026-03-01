import { getCookie, setCookie, defineEventHandler } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const token = getCookie(event, 'session_token');
  if (token) {
    await supabase.from('sessions').delete().eq('token', token);
  }

  setCookie(event, 'session_token', '', {
    maxAge: 0,
    path: '/',
  });

  return { success: true };
});
