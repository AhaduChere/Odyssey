import { defineEventHandler, readBody, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const body = await readBody(event);
  const newemail = body.newemail;
  const ID = body.userid;

  if (!newemail || !ID) {
    throw createError({ statusCode: 400, message: 'Missing fields' });
  }

  const { error } = await supabase
    .from('users')
    .update({ email: newemail })
    .eq('user_id', ID);

  if (error) {
    throw createError({ statusCode: 500, message: 'Failed to update email: ' + error.message });
  }

  return { success: true };
});
