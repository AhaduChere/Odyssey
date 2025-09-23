import { defineEventHandler, getQuery, sendError, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const query = getQuery(event);
  const id = query.id;

  if (!id) {
    return sendError(event, createError({ statusCode: 400, message: 'Missing user ID' }));
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('username, email, created_at')
      .eq('user_id', id)
      .maybeSingle();

    if (error) throw error;
    if (!user) {
      return sendError(event, createError({ statusCode: 404, message: 'User not found' }));
    }

    return user;
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, message: 'Error: ' + (err?.message ?? String(err)) }));
  }
});
