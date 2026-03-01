import { defineEventHandler, getQuery, sendError, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRole);

  const query = getQuery(event);
  const id = query.id;
  const year = Number(query.year);
  const month = Number(query.month);

  if (!id || !year || !month) {
    return sendError(event, createError({ statusCode: 400, message: 'Missing user ID, year, or month' }));
  }

  if (Number.isNaN(year) || Number.isNaN(month) || month < 1 || month > 12) {
    return sendError(event, createError({ statusCode: 400, message: 'Invalid year or month' }));
  }

  try {
    const start = new Date(Date.UTC(year, month - 1, 1)).toISOString().slice(0, 10);
    const nextMonthDate = new Date(Date.UTC(year, month - 1 + 1, 1));
    const nextStart = nextMonthDate.toISOString().slice(0, 10);

    const { data: goalsdata, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', id)
      .gte('deadline', start)
      .lt('deadline', nextStart)
      .order('deadline', { ascending: true });

    if (error) {
      console.error('Deadlines query error:', error);
      throw error;
    }

    return goalsdata;
  } catch (err) {
    console.error('Deadlines handler error:', err);
    return sendError(event, createError({ statusCode: 500, message: 'Error: ' + (err?.message ?? String(err)) }));
  }
});
