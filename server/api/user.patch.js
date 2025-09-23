import { defineEventHandler, readBody, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newusername = body.newusername;
  const ID = body.userid;

  if (!newusername || !ID) {
    throw createError({ statusCode: 400, message: 'Missing fields' });
  }

  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const { error } = await supabase
    .from('users')
    .update({ username: newusername })
    .eq('user_id', ID);

  if (error) {
    throw createError({ statusCode: 500, message: 'Failed to update username: ' + error.message });
  }

  return { success: true };
});
