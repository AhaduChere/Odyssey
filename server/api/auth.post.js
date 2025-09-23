import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const { token } = await readBody(event);
  if (!token) return { userId: null };

  const { data: session, error } = await supabase.from('sessions').select('user_id').eq('token', token).maybeSingle();

  if (error || !session) return { userId: null };

  return { userId: session.user_id };
});
