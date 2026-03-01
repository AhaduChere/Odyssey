import { setCookie, createError, readBody, defineEventHandler } from 'h3';
import { createClient } from '@supabase/supabase-js';
import { compare } from 'bcryptjs';
import { randomUUID } from 'crypto';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  try {
    const { username, password } = await readBody(event);
    if (!username || !password) {
      console.error('Login error: Missing fields', { username, password });
      throw createError({ statusCode: 400, message: 'Missing fields' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, hashed_password')
      .eq('username', username)
      .single();

    if (error || !user) {
      console.error('Login error: User not found', { error, username });
      throw createError({ statusCode: 401, message: 'Invalid credentials' });
    }

    const valid = await compare(password, user.hashed_password);
    if (!valid) {
      console.error('Login error: Invalid password for user', username);
      throw createError({ statusCode: 401, message: 'Invalid credentials' });
    }

    const token = randomUUID();

    const { error: sessionError } = await supabase.from('sessions').insert({
      token,
      user_id: user.user_id,
    });

    if (sessionError) {
      console.error('Login error: Failed to insert session', sessionError);
      throw createError({ statusCode: 500, message: 'Session creation failed' });
    }

    setCookie(event, 'session_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return { userId: user.user_id };
  } catch (err) {
    console.error('Unexpected login error:', err);
    throw err;
  }
});
