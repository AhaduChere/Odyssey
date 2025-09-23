import { hash } from 'bcryptjs';
import { defineEventHandler, readBody, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const body = await readBody(event);
  const { username, email, password } = body;

  if (!email || !password || !username) {
    throw createError({ statusCode: 400, message: 'Missing fields' });
  }

  try {
    const { data: existing, error: existingErr } = await supabase
      .from('users')
      .select('user_id')
      .or(`username.eq.${username},email.eq.${email}`)
      .maybeSingle();

    if (existingErr) {
      throw createError({ statusCode: 500, message: 'Database error: ' + existingErr.message });
    }

    if (existing) {
      throw createError({ statusCode: 409, message: 'Username or email already taken' });
    }

    const hashedPassword = await hash(password, 10);

    const { error: insertErr } = await supabase.from('users').insert({
      username,
      email,
      hashed_password: hashedPassword,
      created_at: new Date().toISOString(),
    });

    if (insertErr) {
      throw createError({ statusCode: 500, message: 'Failed to create user: ' + insertErr.message });
    }

    return { success: true };
  } catch (err) {
    if (err?.statusCode) throw err;
    throw createError({ statusCode: 500, message: 'Unexpected server error' });
  }
});
